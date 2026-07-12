import type { Locator, Page } from "@playwright/test";

export async function installCursor(page: Page) {
  await page.addInitScript(() => {
    function mount() {
      if (document.getElementById("pw-cursor")) return;
      const style = document.createElement("style");
      style.textContent = `
        #pw-cursor{position:fixed;top:0;left:0;width:22px;height:22px;border-radius:50%;
          background:rgba(255,212,59,0.55);border:2px solid #3d1475;box-shadow:0 0 0 2px rgba(255,255,255,0.7);
          z-index:2147483647;pointer-events:none;transform:translate(-50%,-50%);transition:width .08s,height .08s;}
        .pw-ripple{position:fixed;width:10px;height:10px;border-radius:50%;background:rgba(95,37,159,0.45);
          z-index:2147483646;pointer-events:none;transform:translate(-50%,-50%);animation:pw-r .5s ease-out forwards;}
        @keyframes pw-r{from{opacity:.7;width:10px;height:10px}to{opacity:0;width:60px;height:60px}}
      `;
      document.head.appendChild(style);
      const dot = document.createElement("div");
      dot.id = "pw-cursor";
      document.body.appendChild(dot);
      window.addEventListener(
        "mousemove",
        (event) => {
          dot.style.left = `${event.clientX}px`;
          dot.style.top = `${event.clientY}px`;
        },
        true,
      );
      window.addEventListener(
        "mousedown",
        (event) => {
          const ripple = document.createElement("div");
          ripple.className = "pw-ripple";
          ripple.style.left = `${event.clientX}px`;
          ripple.style.top = `${event.clientY}px`;
          document.body.appendChild(ripple);
          setTimeout(() => ripple.remove(), 500);
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

export async function pointAndClick(page: Page, target: Locator, settle = 600) {
  await target.scrollIntoViewIfNeeded({ timeout: 4_000 }).catch(() => undefined);
  const box = await target.boundingBox().catch(() => null);
  if (box) {
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 18 });
  }
  await page.waitForTimeout(180);
  await target.click({ timeout: 4_000 });
  await page.waitForTimeout(settle);
}

export async function scrollAndPause(page: Page, delta: number, pause = 900) {
  await page.mouse.wheel(0, delta);
  await page.waitForTimeout(pause);
}
