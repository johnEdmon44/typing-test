const easyWords = ["apple", "banana", "cat", "dog", "elephant", "flower", "grape", "happy", "ice cream", "jelly", "kite", "lion", "monkey", "nap", "orange", "pizza", "queen", "rabbit", "sun", "turtle", "umbrella", "violet", "watermelon", "xylophone", "yellow", "zebra", "air", "boat", "cloud", "dance"];

const mediumWords = ["butterfly", "chocolate", "dolphin", "elephant", "fantastic", "guitar", "happiness", "island", "jungle", "kangaroo", "lemon", "mountain", "notebook", "oxygen", "parrot", "question", "rainbow", "sunflower", "tiger", "umbrella", "violin", "whisper", "xylophone", "yacht", "zeppelin"];

const hardWords = ["accommodate", "boulevard", "cappuccino", "dexterity", "exquisite", "flamboyant", "gargantuan", "hierarchy", "impeccable", "juxtapose", "knowledge", "labyrinth", "magnificent", "nebulous", "obsequious", "pulchritude", "quintessential", "resilience", "serendipity", "tesseract", "ubiquitous", "vociferous", "wanderlust", "xenophobia", "yesterday", "zealous"];

const getDifficulty = document.getElementById("difficulty");
const getStart = document.getElementById("start");
const getTimer = document.getElementById("timer");
const getCountdown = document.getElementById("countdown");
const getWords = document.getElementById("words");

let selectedDifficulty;

function generateWords() {
  const shuffleArray = selectedDifficulty.sort(() => 0.5 - Math.random());
  const result = shuffleArray.slice(0, 3);
  getWords.textContent = result.join(" ");
}

function countDown() {
  const timerValue = parseInt(getTimer.value);
  let remainingTime = timerValue;

  const timer = setInterval(() => {
    getCountdown.textContent = remainingTime;
    remainingTime--;

    if (remainingTime < 0) {
      getCountdown.textContent = "Times up!"
      clearInterval(timer);
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


getStart.addEventListener("click", () => {
  difficulty();
  countDown();
  generateWords();
});