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
const getGamerOver = document.getElementById("gameOver");


let generatedWords = [];
let selectedDifficulty;
let countDownInterval;
let score = 0;


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
    score += 10;
  }
}


function gameOver() {
  getScore.textContent = score;
  getScore.style.visibility = "visible";
  getGamerOver.style.visibility = "visible";
}


function startGame() {
  getStart.style.visibility = "hidden";
  getEnd.style.visibility = "visible";
  getCountdown.textContent = ""; 
  getScore.textContent = "";
  getInputField.value = "";
  getGamerOver.style.visibility =  "hidden"; 
}


function resetGame() {
  getInputField.value = "";
  generatedWords = []; 
  getStart.style.visibility = "visible"; 
  getEnd.style.visibility = "hidden"; 
  getCountdown.textContent = ""; 
  getWords.textContent = "";
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
