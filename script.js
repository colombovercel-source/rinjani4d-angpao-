const MAX_HISTORY = 50;
const HISTORY_KEY = "imlek_history";const MAX_HISTORY = 50;
const HISTORY_KEY = "imlek_history";
const CLAIM_PREFIX = "imlek_claim_";

let currentUser = null;
let currentReward = null;

function randomUser() {
  return "MBR" + Math.random().toString(36).substring(2,7).toUpperCase();
}

function randomAmount() {
  return (Math.floor(Math.random() * 10) + 1) * 50000;
}

function initHistory() {
  let history = JSON.parse(localStorage.getItem(HISTORY_KEY));
  if (!history) {
    history = [];
    for (let i = 0; i < MAX_HISTORY; i++) {
      history.push({ user: randomUser(), amount: randomAmount() });
    }
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }
  renderHistory(history);
}

function renderHistory(history) {
  const ul = document.getElementById("history");
  ul.innerHTML = "";
  history.forEach(item => {
    const li = document.createElement("li");
    li.textContent =
      `${item.user} mendapatkan Rp ${item.amount.toLocaleString("id-ID")}`;
    ul.appendChild(li);
  });
}

function prepareClaim() {
  const userId = document.getElementById("userId").value.trim();
  if (!userId) return alert("User ID wajib diisi!");
  if (localStorage.getItem(CLAIM_PREFIX + userId))
    return alert("User ID ini sudah pernah klaim.");

  currentUser = userId;
  currentReward = randomAmount();

  const btn = document.getElementById("claimBtn");
  btn.textContent = "CLAIM ANGPAO";
  btn.onclick = claimAngpao;
}

function claimAngpao() {
  localStorage.setItem(CLAIM_PREFIX + currentUser, currentReward);

  document.getElementById("angpao").classList.add("torn");
  const reward = document.getElementById("reward");
  reward.textContent = "Rp " + currentReward.toLocaleString("id-ID");
  reward.classList.add("show");

  let history = JSON.parse(localStorage.getItem(HISTORY_KEY));
  history.unshift({ user: currentUser, amount: currentReward });
  history = history.slice(0, MAX_HISTORY);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  renderHistory(history);

  setTimeout(() => {
    document.getElementById("popupUser").textContent = currentUser;
    document.getElementById("popupAmount").textContent =
      "Mendapatkan Angpao Sebesar Rp " +
      currentReward.toLocaleString("id-ID");

    document.getElementById("popup").style.display = "block";
  }, 800);
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

initHistory();

const CLAIM_PREFIX = "imlek_claim_";

let currentUser = null;
let currentReward = null;

function randomUser() {
  return "MBR" + Math.random().toString(36).substring(2,7).toUpperCase();
}

function randomAmount() {
  return (Math.floor(Math.random() * 10) + 1) * 50000;
}

function initHistory() {
  let history = JSON.parse(localStorage.getItem(HISTORY_KEY));
  if (!history) {
    history = [];
    for (let i = 0; i < MAX_HISTORY; i++) {
      history.push({ user: randomUser(), amount: randomAmount() });
    }
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }
  renderHistory(history);
}

function renderHistory(history) {
  const ul = document.getElementById("history");
  ul.innerHTML = "";
  history.forEach(item => {
    const li = document.createElement("li");
    li.textContent =
      `${item.user} mendapatkan Rp ${item.amount.toLocaleString("id-ID")}`;
    ul.appendChild(li);
  });
}

function prepareClaim() {
  const userId = document.getElementById("userId").value.trim();
  if (!userId) return alert("User ID wajib diisi!");
  if (localStorage.getItem(CLAIM_PREFIX + userId))
    return alert("User ID ini sudah pernah klaim.");

  currentUser = userId;
  currentReward = randomAmount();

  const btn = document.getElementById("claimBtn");
  btn.textContent = "CLAIM ANGPAO";
  btn.onclick = claimAngpao;
}

function claimAngpao() {
  localStorage.setItem(CLAIM_PREFIX + currentUser, currentReward);

  document.getElementById("angpao").classList.add("torn");
  const reward = document.getElementById("reward");
  reward.textContent = "Rp " + currentReward.toLocaleString("id-ID");
  reward.classList.add("show");

  let history = JSON.parse(localStorage.getItem(HISTORY_KEY));
  history.unshift({ user: currentUser, amount: currentReward });
  history = history.slice(0, MAX_HISTORY);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  renderHistory(history);

  setTimeout(() => {
    document.getElementById("popupText").innerHTML =
      `User ID <b>${currentUser}</b><br><br>
       Mendapatkan Angpao Sebesar<br>
       <b>Rp ${currentReward.toLocaleString("id-ID")}</b>`;
    document.getElementById("popup").style.display = "block";
  }, 800);
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

initHistory();
