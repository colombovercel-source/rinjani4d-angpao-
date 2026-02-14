const MAX_HISTORY = 50;
const HISTORY_KEY = "imlek_history";
const CLAIM_PREFIX = "imlek_claim_";

function randomUserId() {
  return "MBR" + Math.random().toString(36).substring(2, 7).toUpperCase();
}

function randomAmount() {
  return (Math.floor(Math.random() * 10) + 1) * 50000;
}

function initHistory() {
  let history = JSON.parse(localStorage.getItem(HISTORY_KEY));
  if (!history) {
    history = [];
    for (let i = 0; i < MAX_HISTORY; i++) {
      history.push({
        user: randomUserId(),
        amount: randomAmount()
      });
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
    li.textContent = `${item.user} berhasil mendapatkan Rp ${item.amount.toLocaleString("id-ID")}`;
    ul.appendChild(li);
  });
}

function claimAngpao() {
  const userId = document.getElementById("userId").value.trim();
  if (!userId) {
    alert("User ID wajib diisi!");
    return;
  }

  if (localStorage.getItem(CLAIM_PREFIX + userId)) {
    alert("User ID ini sudah pernah klaim angpao.");
    return;
  }

  const reward = randomAmount();
  localStorage.setItem(CLAIM_PREFIX + userId, reward);

  let history = JSON.parse(localStorage.getItem(HISTORY_KEY));
  history.unshift({ user: userId, amount: reward });
  history = history.slice(0, MAX_HISTORY);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));

  document.getElementById("popupText").innerHTML =
    `User ID <b>${userId}</b><br><br>
     Mendapatkan Angpao Sebesar<br>
     <b>Rp ${reward.toLocaleString("id-ID")}</b>`;

  document.getElementById("popup").style.display = "block";
  renderHistory(history);
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

initHistory();
