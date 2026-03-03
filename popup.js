document.addEventListener("DOMContentLoaded", init);

const toggleBtn = document.getElementById("toggleBlocking");
const statusText = document.getElementById("statusText");
const optionsBtn = document.getElementById("openOptions");

function init() {
  chrome.storage.local.get(["blockingEnabled", "blockedSites"], (result) => {
    const enabled = result.blockingEnabled !== false; // default true
    const sites = result.blockedSites || [];

    updateUI(enabled, sites.length);
  });
}

toggleBtn.addEventListener("click", () => {
  chrome.storage.local.get(["blockingEnabled"], (result) => {
    const currentlyEnabled = result.blockingEnabled !== false;
    const newState = !currentlyEnabled;

    chrome.storage.local.set({ blockingEnabled: newState }, () => {
      updateUI(newState);
    });
  });
});

optionsBtn.addEventListener("click", () => {
  chrome.runtime.openOptionsPage();
});

function updateUI(enabled, siteCount = null) {
  if (enabled) {
    toggleBtn.textContent = "Disable Blocking";
    statusText.textContent = `Blocking is ON`;
  } else {
    toggleBtn.textContent = "Enable Blocking";
    statusText.textContent = `Blocking is OFF`;
  }

  if (siteCount !== null) {
    statusText.textContent += `\nBlocked Sites: ${siteCount}`;
  }
}