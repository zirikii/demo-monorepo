const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const { chromium } = require("playwright");

const root = path.join(__dirname, "..");

function contentType(filePath) {
  if (filePath.endsWith(".css")) return "text/css";
  if (filePath.endsWith(".js")) return "text/javascript";
  if (filePath.endsWith(".svg")) return "image/svg+xml";
  if (filePath.endsWith(".png")) return "image/png";
  if (filePath.endsWith(".jpg") || filePath.endsWith(".jpeg")) return "image/jpeg";
  return "text/html";
}

function createServer() {
  return http.createServer((req, res) => {
    const url = new URL(req.url, "http://localhost");
    const pathname = url.pathname === "/" ? "/index.html" : decodeURIComponent(url.pathname);
    const filePath = path.join(root, pathname);

    if (!filePath.startsWith(root)) {
      res.writeHead(403);
      res.end("Forbidden");
      return;
    }

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end("Not found");
        return;
      }

      res.writeHead(200, { "Content-Type": contentType(filePath) });
      res.end(data);
    });
  });
}

function listen(server) {
  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => {
      resolve(server.address().port);
    });
  });
}

async function closeServer(server) {
  await new Promise((resolve) => server.close(resolve));
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

(async () => {
  const server = createServer();
  const port = await listen(server);
  const browser = await chromium.launch();

  try {
    const page = await browser.newPage();
    await page.goto(`http://127.0.0.1:${port}/index.html`);

    await page.locator("#loginToggle").click();

    const loadingState = await page.locator("#loginToggle").evaluate((button) => ({
      disabled: button.disabled,
      isLoading: button.classList.contains("is-loading"),
      ariaBusy: button.getAttribute("aria-busy"),
      spinnerVisible: getComputedStyle(button.querySelector(".login-btn__spinner")).display !== "none",
    }));

    assert(loadingState.disabled, "login button should be disabled while auth request is in flight");
    assert(loadingState.isLoading, "login button should have loading class while auth request is in flight");
    assert(loadingState.ariaBusy === "true", "login button should expose aria-busy=true while loading");
    assert(loadingState.spinnerVisible, "login button spinner should be visible while loading");

    const panelHiddenWhileLoading = await page.locator("#loginPanel").evaluate((panel) => panel.hidden);
    assert(panelHiddenWhileLoading, "login panel should wait for the auth request before opening");

    await page.waitForFunction(() => {
      const button = document.getElementById("loginToggle");
      const panel = document.getElementById("loginPanel");
      return (
        button &&
        panel &&
        !button.disabled &&
        !button.classList.contains("is-loading") &&
        button.getAttribute("aria-busy") === "false" &&
        button.getAttribute("aria-expanded") === "true" &&
        panel.hidden === false
      );
    });

    console.log("Login button loading-state smoke test passed");
  } finally {
    await browser.close();
    await closeServer(server);
  }
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
