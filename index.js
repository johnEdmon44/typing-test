const easyWords = ["apple", "banana", "cat", "dog", "elephant", "flower", "grape", "happy", "ice cream", "jelly", "kite", "lion", "monkey", "nap", "orange", "pizza", "queen", "rabbit", "sun", "turtle", "umbrella", "violet", "watermelon", "xylophone", "yellow", "zebra", "air", "boat", "cloud", "dance"];

const mediumWords = ["butterfly", "chocolate", "dolphin", "elephant", "fantastic", "guitar", "happiness", "island", "jungle", "kangaroo", "lemon", "mountain", "notebook", "oxygen", "parrot", "question", "rainbow", "sunflower", "tiger", "umbrella", "violin", "whisper", "xylophone", "yacht", "zeppelin"];

const hardWords = ["accommodate", "boulevard", "cappuccino", "dexterity", "exquisite", "flamboyant", "gargantuan", "hierarchy", "impeccable", "juxtapose", "knowledge", "labyrinth", "magnificent", "nebulous", "obsequious", "pulchritude", "quintessential", "resilience", "serendipity", "tesseract", "ubiquitous", "vociferous", "wanderlust", "xenophobia", "yesterday", "zealous"];

const getDifficulty = document.getElementById("difficulty");
const getStart = document.getElementById("start");
const getTimer = document.getElementById("timer");
const getCountdown = document.getElementById("countdown");
const getWords = document.getElementById("words");
const getInputField = document.getElementById("inputField");
const getEnd = document.getElementById("end");
const getScore = document.getElementById("score");
const getGamerOver = document.getElementById("game--over");
const getSelectedDifficulty = document.getElementById("selectedDifficulty");
const getBtnLeaderboard = document.getElementById("showLeaderboard");
const getLeaderboardContainer = document.getElementById("leaderboard");


let generatedWords = [];
let selectedDifficulty;
let countDownInterval;
let score = 0;

const leaderboards = JSON.parse(localStorage.getItem("leaderboards")) || [];

renderLeaderboard();


function generateWords() {
  const shuffleArray = selectedDifficulty.sort(() => 0.5 - Math.random());
  const result = shuffleArray.slice(0, 3);
  getWords.textContent = result.join(" ");

  return result;
}


function countDown() {
  const timerValue = parseInt(getTimer.value);
  let remainingTime = timerValue;

  countDownInterval = setInterval(() => {
    getCountdown.textContent = remainingTime;
    remainingTime--;

    if (remainingTime < 0) {
      getCountdown.textContent = "Times up!"
      clearInterval(countDownInterval);
      resetGame();
      gameOver();
      addToLeaderboards();
      renderLeaderboard();
    }
  }, 1000);
}


function difficulty() {
  const difficultyValue = getDifficulty.value;

  if (difficultyValue === "easy") {
    selectedDifficulty = easyWords;
  } else if (difficultyValue === "medium") {
    selectedDifficulty = mediumWords;
  } else if (difficultyValue === "hard") {
    selectedDifficulty = hardWords;
  }
}


function compareInput(inputValue) {
  if (generatedWords.join(" ") === inputValue) {
    generatedWords = generateWords();
    getInputField.value = "";
    updateScore();
  }
}


function gameOver() {
  getGamerOver.style.visibility = "visible";
  getScore.textContent = score;
  getSelectedDifficulty.textContent = getDifficulty.value;
}


function startGame() {
  getStart.style.visibility = "hidden";
  getEnd.style.visibility = "visible";
  getCountdown.textContent = ""; 
  getScore.textContent = "";
  getInputField.value = "";
  getGamerOver.style.visibility =  "hidden"; 
  getSelectedDifficulty.textContent = "";
  score = 0;
}


function resetGame() {
  getInputField.value = "";
  generatedWords = []; 
  getStart.style.visibility = "visible"; 
  getEnd.style.visibility = "hidden"; 
  getCountdown.textContent = ""; 
  getWords.textContent = "";
}


function updateScore() {
  const difficulty = getDifficulty.value;

  if (difficulty === "easy") {
    score += 10;
  } else if (difficulty === "medium") {
    score += 20;
  } else if (difficulty === "hard") {
    score =+ 30;
  }
}


function addToLeaderboards() {
  const leaderboards = JSON.parse(localStorage.getItem("leaderboards")) || [];

  const gameDetails = {
    id: generateRandomId(),
    time: getTimer.value,
    score: score,
    difficulty: getDifficulty.value,
  }

  leaderboards.push(gameDetails);

  localStorage.setItem("leaderboards", JSON.stringify(leaderboards));
}


function generateRandomId() {
  const min = 1000000000;
  const max = 9999999999; 
  const randomId = Math.floor(Math.random() * (max - min + 1)) + min;

  return randomId;
}


function renderLeaderboard() {
  const storedLeaderboard = localStorage.getItem("leaderboards");
  const leaderboards = storedLeaderboard ? JSON.parse(storedLeaderboard) : [];


  if(leaderboards.length > 0) {
    const leaderboardList = document.createElement("ul");
    leaderboardList.classList.add("leaderboard--list");
    leaderboardList.textContent = "";

    const sortedLeaderboard = leaderboards.sort((a, b) => b.score - a.score); // sort by highest
    const topTen = sortedLeaderboard.slice(0, 10);

    topTen.forEach((game, count) => {
      const listItem = document.createElement("li");
      const scoreItem = document.createElement("p");
      const timeItem = document.createElement("p");
      const difficultyItem = document.createElement("p");

      listItem.classList.add("list--item")

      listItem.textContent = count + 1;
      scoreItem.textContent = `Score: ${game.score}`;
      timeItem.textContent = `Time: ${game.time}`;
      difficultyItem.textContent = `Difficulty: ${game.difficulty}`;

      leaderboardList.appendChild(listItem);
      listItem.appendChild(scoreItem);
      listItem.appendChild(timeItem);
      listItem.appendChild(difficultyItem);
    });

    getLeaderboardContainer.appendChild(leaderboardList);
  }
}


getStart.addEventListener("click", () => {
  difficulty();
  countDown();
  generatedWords = generateWords();
  startGame();
});


getInputField.addEventListener("input", () => {
  const inputValue = getInputField.value;
  compareInput(inputValue);
});


getEnd.addEventListener("click", () => {
  clearInterval(countDownInterval);
  generatedWords = [];
  resetGame();
});


getBtnLeaderboard.addEventListener("click", () => {
  const leaderboardList = document.querySelector(".leaderboard--list");

  leaderboardList.classList.toggle("show");

  if(leaderboardList.classList.contains("show")) {
    getBtnLeaderboard.textContent = "Hide leaderboard";
  } else {
    getBtnLeaderboard.textContent = "Show leaderboard";
  }
})