const favoriteList = document.getElementById("favoriteList");
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

function displayFavorites() {
  if (favorites.length === 0) {
    favoriteList.innerHTML = "<p>ยังไม่มีเกมที่ถูกบันทึก</p>";
    return;
  }

  favoriteList.innerHTML = favorites.map(game => `
    <div class="card">
      <img src="${game.image}" alt="${game.name}">
      <h3>${game.name}</h3>
      <button onclick="removeFavorite(${game.id})">ลบออก</button>
    </div>
  `).join("");
}

function removeFavorite(id) {
  favorites = favorites.filter(g => g.id !== id);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  displayFavorites();
}

displayFavorites();
