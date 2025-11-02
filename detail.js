const API_KEY = "edd8cb6d8c104b2f9caac5b29a4814a9"
const urlParams = new URLSearchParams(window.location.search);
const gameId = urlParams.get("id");
const gameDetail = document.getElementById("gameDetail");


async function fetchGameDetail() {
  if (!gameId) {
    gameDetail.innerHTML = "<p>ไม่พบข้อมูลเกม</p>";
    return;
  }

  try {
    const res = await fetch(`https://api.rawg.io/api/games/${gameId}?key=${API_KEY}`);
    const game = await res.json();

    if (!game.name) {
      gameDetail.innerHTML = "<p>ไม่พบข้อมูลเกมนี้</p>";
      return;
    }

    gameDetail.innerHTML = `
      <div class="card">
        <img src="${game.background_image || 'https://via.placeholder.com/600x300'}" alt="${game.name}">
        <h2>${game.name}</h2>
        <p><strong>Released:</strong> ${game.released || 'N/A'}</p>
        <p><strong>Rating:</strong> ${game.rating || 'N/A'}</p>
        <p>${game.description_raw || 'ไม่มีคำอธิบายเพิ่มเติม'}</p>
      </div>
    `;
  } catch (error) {
    console.error(error);
    gameDetail.innerHTML = "<p>เกิดข้อผิดพลาดในการโหลดข้อมูล</p>";
  }
}

fetchGameDetail();
