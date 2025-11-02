const API_KEY = "edd8cb6d8c104b2f9caac5b29a4814a9"
const BASE_URL = `https://api.rawg.io/api/games?key=${API_KEY}`;

const gameList = document.getElementById("gameList");
const searchInput = document.getElementById("searchInput");

async function fetchGames(query = "") {
  const url = query ? `${BASE_URL}&search=${query}` : BASE_URL;
  const res = await fetch(url);
  const data = await res.json();
  displayGames(data.results);
}

function displayGames(games) {
  gameList.innerHTML = games.map(game => `
    <div class="card">
      <img src="${game.background_image}" alt="${game.name}">
      <h3>${game.name}</h3>
      <button onclick="viewDetails(${game.id})">ดูรายละเอียด</button>
      <button onclick="addToFavorites(${game.id}, '${game.name}', '${game.background_image}')">❤️</button>
    </div>
  `).join("");
}

function viewDetails(id) {
  window.location.href = `game.html?id=${id}`;
}

function addToFavorites(id, name, image) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  if (!favorites.some(f => f.id === id)) {
    favorites.push({ id, name, image });
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert("เพิ่มเกมลงใน Favorites แล้ว!");
  } else {
    alert("เกมนี้ถูกบันทึกไว้แล้ว");
  }
}

searchInput.addEventListener("input", e => {
  fetchGames(e.target.value);
});

fetchGames();
