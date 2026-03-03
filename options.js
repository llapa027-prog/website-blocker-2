document.addEventListener("DOMContentLoaded", loadSites);

document.getElementById("addSite").addEventListener("click", addSite);

function loadSites() {
  chrome.storage.local.get(["blockedSites"], (result) => {
    const sites = result.blockedSites || [];
    renderSites(sites);
  });
}

function addSite() {
  const input = document.getElementById("siteInput");
  const site = input.value.trim();

  if (!site) return;

  chrome.storage.local.get(["blockedSites"], (result) => {
    const sites = result.blockedSites || [];
    sites.push(site);

    chrome.storage.local.set({ blockedSites: sites }, () => {
      renderSites(sites);
      input.value = "";
    });
  });
}

function renderSites(sites) {
  const list = document.getElementById("siteList");
  list.innerHTML = "";

  sites.forEach((site, index) => {
    const li = document.createElement("li");
    li.textContent = site;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";

    removeBtn.onclick = () => {
      sites.splice(index, 1);
      chrome.storage.local.set({ blockedSites: sites }, () => {
        renderSites(sites);
      });
    };

    li.appendChild(removeBtn);
    list.appendChild(li);
  });
}