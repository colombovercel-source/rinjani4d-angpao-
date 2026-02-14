async function claimAngpao() {
  const userId = document.getElementById("userId").value.trim();
  if (!userId) {
    alert("Silakan masukkan User ID terlebih dahulu.");
    return;
  }

  try {
    const res = await fetch("/api/claim", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId })
    });

    const data = await res.json();

    if (!data.success) {
      alert(data.message);
      return;
    }

    document.getElementById("popupText").innerHTML = `
      User ID <b>${data.userId}</b><br>
      Mendapatkan angpao sebesar<br>
      <span style="color:gold;font-size:22px">
        Rp ${data.amount.toLocaleString("id-ID")}
      </span>
    `;

    document.getElementById("popup").style.display = "block";
    loadHistory();

  } catch (err) {
    alert("Server sedang sibuk, silakan coba lagi.");
  }
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

async function loadHistory() {
  try {
    const res = await fetch("/api/claim");
    const data = await res.json();

    const list = document.getElementById("historyList");
    list.innerHTML = "";

    data.history.forEach(item => {
      const li = document.createElement("li");
      li.textContent =
        `${item.userId} mendapatkan Rp ${item.amount.toLocaleString("id-ID")}`;
      list.appendChild(li);
    });
  } catch {}
}

loadHistory();
