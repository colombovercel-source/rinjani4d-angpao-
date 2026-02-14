/* BACKGROUND ANGPAO */
const bg = document.getElementById("bgAngpao");

function spawnBgAngpao() {
  const s = document.createElement("span");
  s.textContent = "🧧";
  s.style.left = Math.random() * 100 + "%";
  s.style.animationDuration = (8 + Math.random() * 6) + "s";
  bg.appendChild(s);
  setTimeout(() => s.remove(), 15000);
}
setInterval(spawnBgAngpao, 600);

/* SYSTEM */
const MAX_HISTORY = 50;
const HISTORY_KEY = "angpao_history";
const CLAIM_KEY = "angpao_claim_";

let currentUser = "";
let currentReward = 0;

function randomUser() {
  return "MBR" + Math.random().toString(36).substr(2,5).toUpperCase();
}

function randomReward() {
  return (Math.floor(Math.random() * 10) + 1) * 50000;
}

function initHistory() {
  let data = JSON.parse(localStorage.getItem(HISTORY_KEY));
  if (!data) {
    data = [];
    for (let i = 0; i < MAX_HISTORY; i++) {
      data.push({ user: randomUser(), amount: randomReward() });
    }
    localStorage.setItem(HISTORY_KEY, JSON.stringify(data));
  }
  renderHistory(data);
}

function renderHistory(data) {
  const ul = document.getElementById("history");
  ul.innerHTML = "";
  data.forEach(d => {
    const li = document.createElement("li");
    li.textContent = `${d.user} mendapatkan Rp ${d.amount.toLocaleString("id-ID")}`;
    ul.appendChild(li);
  });
}

function prepareClaim() {
  const userId = document.getElementById("userId").value.trim();
  if (!userId) return alert("User ID wajib diisi!");
  if (localStorage.getItem(CLAIM_KEY + userId))
    return alert("User ID ini sudah pernah claim.");

  currentUser = userId;
  currentReward = randomReward();

  const btn = document.getElementById("claimBtn");
  btn.textContent = "CLAIM ANGPAO";
  btn.onclick = claimAngpao;
}

function claimAngpao() {
  localStorage.setItem(CLAIM_KEY + currentUser, currentReward);

  document.getElementById("angpaoMain").classList.add("torn");
  const reward = document.getElementById("reward");
  reward.textContent = "Rp " + currentReward.toLocaleString("id-ID");
  reward.classList.add("show");

  let data = JSON.parse(localStorage.getItem(HISTORY_KEY));
  data.unshift({ user: currentUser, amount: currentReward });
  data = data.slice(0, MAX_HISTORY);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(data));
  renderHistory(data);

  setTimeout(() => {
    document.getElementById("popupUser").textContent = currentUser;
    document.getElementById("popupAmount").textContent =
      "Mendapatkan Angpao Rp " + currentReward.toLocaleString("id-ID");
    document.getElementById("popup").style.display = "block";
  }, 800);
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

initHistory();
