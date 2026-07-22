import type { Locator, Page } from "@playwright/test";

/**
 * Inject a fake cursor + click ripple so the recorded walkthrough video clearly
 * shows where the "user" is pointing and clicking (Playwright doesn't render the
 * real OS cursor in headless video). Uses Optus teal so it reads on-brand.
 */
export async function installCursor(page: Page) {
  await page.addInitScript(() => {
    function mount() {
      if (document.getElementById("pw-cursor")) return;
      const style = document.createElement("style");
      style.textContent = `
        #pw-cursor{position:fixed;top:0;left:0;width:22px;height:22px;border-radius:50%;
          background:rgba(57,168,175,0.35);border:2px solid #39A8AF;box-shadow:0 0 0 2px rgba(255,255,255,0.7);
          z-index:2147483647;pointer-events:none;transform:translate(-50%,-50%);transition:width .08s,height .08s;}
        .pw-ripple{position:fixed;width:10px;height:10px;border-radius:50%;background:rgba(254,205,3,0.6);
          z-index:2147483646;pointer-events:none;transform:translate(-50%,-50%);animation:pw-r .5s ease-out forwards;}
        @keyframes pw-r{from{opacity:.7;width:10px;height:10px}to{opacity:0;width:60px;height:60px}}
      `;
      document.head.appendChild(style);
      const dot = document.createElement("div");
      dot.id = "pw-cursor";
      document.body.appendChild(dot);
      window.addEventListener(
        "mousemove",
        (e) => {
          dot.style.left = `${e.clientX}px`;
          dot.style.top = `${e.clientY}px`;
        },
        true,
      );
      window.addEventListener(
        "mousedown",
        (e) => {
          const r = document.createElement("div");
          r.className = "pw-ripple";
          r.style.left = `${e.clientX}px`;
          r.style.top = `${e.clientY}px`;
          document.body.appendChild(r);
          setTimeout(() => r.remove(), 500);
        },
        true,
      );
    }
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", mount);
    } else {
      mount();
    }
  });
}

export async function moveTo(page: Page, target: Locator) {
  try {
    await target.scrollIntoViewIfNeeded({ timeout: 4000 });
  } catch {
    /* sticky/nested-scroll containers can make this flaky; ignore */
  }
  const box = await target.boundingBox().catch(() => null);
  if (!box) return;
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 22 });
}

export async function pointAndClick(page: Page, target: Locator, settle = 500) {
  await moveTo(page, target);
  await page.waitForTimeout(220);
  try {
    await target.click({ timeout: 4000 });
  } catch {
    await target.dispatchEvent("click");
  }
  await page.waitForTimeout(settle);
}

export async function typeInto(page: Page, target: Locator, text: string) {
  await moveTo(page, target);
  await target.click();
  await target.fill("");
  await target.pressSequentially(text, { delay: 55 });
  await page.waitForTimeout(300);
}

export async function beat(page: Page, ms = 800) {
  await page.waitForTimeout(ms);
}

/**
 * Run a walkthrough step but never let a flaky selector abort the recording —
 * the goal is a complete demo video, so individual non-critical steps degrade
 * gracefully.
 */
export async function safe(label: string, fn: () => Promise<void>) {
  try {
    await fn();
  } catch (err) {
    console.warn(`[walkthrough] step skipped: ${label} -> ${(err as Error).message}`);
  }
}

export async function goTo(page: Page, name: RegExp | string, settle = 1300) {
  const link = page.getByRole("link", { name }).first();
  await pointAndClick(page, link, settle);
}
