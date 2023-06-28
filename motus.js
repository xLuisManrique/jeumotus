const inputs = document.querySelector(".inputs");
resetBtn = document.querySelector(".reset-btn");
hint = document.querySelector(".hint span");
guessLeft = document.querySelector(".guess-left span");
wrongLetter = document.querySelector(".wrong-letter span");
typingInput = document.querySelector(".typing-input");

let word, maxGuesses, corrects = [], incorrects = [];

function randomWord() {
  // getting random mots from motsList
  let randomObj = motsList[Math.floor(Math.random() * motsList.length)];
  // getting mot from randomObj
  word = randomObj.word;
  // max guesses
  maxGuesses = 6; corrects = [], incorrects = [];
  // hint
  hint.innerText = randomObj.hint; 
  //guesses
  guessLeft.innerText = maxGuesses;
  // wrong letter
  wrongLetter.innerText = incorrects;
  // inputs
  let html = "";
  for (let i = 0; i < word.length; i++) {
    html += `<input type="text" disabled>`
  }
  inputs.innerHTML = html;
}
randomWord();

function initGame(e){
  let key = e.target.value;
  if(key.match(/^[A-Za-z]+$/) && !incorrects.includes(`${key}`)
    && !corrects.includes(key)){
      // if user letter found in the word or not found
      if(word.includes(key)){
        for (let i = 0; i < word.length; i++) {
          // show matched letter in the input
          if(word[i] === key){
            corrects.push(key);
            inputs.querySelectorAll("input")[i].value = key;
          }
        }
      } else {
        maxGuesses--; // decrement maxguesses by 1
        incorrects.push(`${key}`);
      }
      guessLeft.innerText = maxGuesses;
      wrongLetter.innerText = incorrects;
  }
  typingInput.value = "";

  setTimeout(() => {
    // alert if user found all letter
    if (corrects.length === word.length){
      alert(`WINNER! Good Job ;)! The Motus is: ${word.toUpperCase()}`);
      randomWord(); // call randomword func, so the game reset
    } else if(maxGuesses < 1){ // alert if user has no remaining guesses
      alert("Game Over! Sorry, bad luck :(!")
      for (let i = 0; i < word.length; i++) {
        inputs.querySelectorAll("input")[i].value = word[i];
      }
    }
  });
}

resetBtn.addEventListener("click", randomWord);
typingInput.addEventListener("input", initGame);
inputs.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());