const searchBtn = document.getElementById('searchBtn');
const playerNameInput = document.getElementById('playerName');
const playerStats = document.getElementById('playerStats');
const playerUsername = document.getElementById('playerUsername');
const playerRank = document.getElementById('playerRank');
const playerWins = document.getElementById('playerWins');
const playerGoals = document.getElementById('playerGoals');
const playerMVP = document.getElementById('playerMVP');
const errorMsg = document.getElementById('error');

// Replace this with your RapidAPI key
const RAPIDAPI_KEY = 'YOUR_API_KEY_HERE';

searchBtn.addEventListener('click', () => {
  const username = playerNameInput.value.trim();
  if (!username) return;

  fetchPlayerStats(username);
});

function fetchPlayerStats(username) {
  errorMsg.textContent = '';
  playerStats.classList.add('hidden');

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': RAPIDAPI_KEY,
      'X-RapidAPI-Host': 'rocket-league1.p.rapidapi.com'
    }
  };

  fetch(`https://rocket-league1.p.rapidapi.com/players?name=${encodeURIComponent(username)}`, options)
    .then(response => response.json())
    .then(data => {
      if (!data || !data[0]) {
        errorMsg.textContent = 'Player not found!';
        return;
      }

      const player = data[0];
      playerUsername.textContent = player.displayName;
      playerRank.textContent = player.ranked ? player.ranked[0].tierName : 'N/A';
      playerWins.textContent = player.wins ?? 'N/A';
      playerGoals.textContent = player.goals ?? 'N/A';
      playerMVP.textContent = player.mvps ?? 'N/A';

      playerStats.classList.remove('hidden');
    })
    .catch(err => {
      console.error(err);
      errorMsg.textContent = 'Error fetching player data.';
    });
}
