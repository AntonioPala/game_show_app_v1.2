const startDiv = document.getElementById('overlay');
const startButton = document.getElementsByClassName('btn__reset')[0];
const qwerty = document.getElementById('qwerty');
const phraseDiv = document.getElementById('phrase');
const images = document.getElementsByTagName('img');
const letters = document.getElementsByClassName('letter');
const spaces = document.getElementsByClassName('space');
const revealed = document.getElementsByClassName('show');
const buttons = qwerty.getElementsByTagName('button');


const phrases = ['i want to learn react', 'breaks are essential', 'the switch is fun',
'going for exceeds', 'coding takes practice'];

let missed = 0;

function getRandomPhraseAsArray(phrases) {
    const num = Math.floor(Math.random() * 5);
    const randomPhrase = phrases[num];
    const chars = randomPhrase.split("");
    return chars;
}

let chars = getRandomPhraseAsArray(phrases);

function addPhraseToDisplay(chars) {
  for (let i = 0; i < chars.length; i++) {
    const li = document.createElement('li');
    li.className = 'letter';
    li.textContent = chars[i];
    if (li.textContent === ' ') {
      li.className = 'space';
    }
    phraseDiv.firstElementChild.appendChild(li);
  }
}

function reset() {
  missed = 0;
  for (i = 0; i < images.length; i++) {
    images[i].src = 'images/liveHeart.png';
  }
  for (i = 0; i < buttons.length; i++) {
    buttons[i].className = '';
    buttons[i].disabled = false;
  }
  const newUl = document.createElement('ul');
  phraseDiv.removeChild(phraseDiv.firstElementChild);
  phraseDiv.appendChild(newUl);
  const newPhrase = getRandomPhraseAsArray(phrases);
  chars = newPhrase;
  addPhraseToDisplay(newPhrase);
}

function checkLetter(e) {
  const lis = document.getElementsByClassName('letter');
  const button = e.target;
  if (button.tagName === 'BUTTON') {
    for (i = 0; i < lis.length; i++) {
      if (button.textContent === lis[i].textContent) {
        lis[i].className += ' show';
        button.className = 'chosen';
        button.disabled = true;
      }
    }
    if (chars.indexOf(button.textContent) < 0) {
      button.className = 'lose';
      button.disabled = true;
      missed += 1;
      for (i = 0; i < missed; i++) {
        images[i].src = 'images/lostHeart.png';
      }
      if (missed === 5) {
        startDiv.style.display = '';
        startDiv.className = 'lose';
        startButton.textContent = 'Try Again';
        phraseDiv.style.display = 'none';
        if (startDiv.lastElementChild.tagName !== 'P') { //preventing duplicate "You Lose!" message
        const p = document.createElement('p');
        p.textContent = "You Lose!";
        startDiv.appendChild(p);
      } else {
          startDiv.lastElementChild.textContent = 'You Lose!';
        }
        startButton.addEventListener('click', (e) => {
          e.preventDefault();
          reset();
          if (phraseDiv.style.display === 'none') {
            phraseDiv.style.display = '';
          }
        })
      }
    }
  }
}


startButton.addEventListener('click', (e) => {
  if (startButton.textContent === 'Start Game') {
    e.preventDefault();
 }
  startDiv.style.display = 'none';
  if (startButton.textContent === 'Start Game') {
    addPhraseToDisplay(chars);
  }
});

qwerty.addEventListener('click', (e) => {
  checkLetter(e);
  window.setTimeout(function checkWin() { //setTimeout function included so the player can see the completed phrase
    if (letters.length === revealed.length) {
      startDiv.style.display = '';
      startDiv.className = 'win';
      startButton.textContent = 'Play Again';
      phraseDiv.style.display = 'none';
      if (startDiv.lastElementChild.tagName !== 'P') { //preventing duplicate "You Win!" message
      const p = document.createElement('p');
      p.textContent = "You Win!";
      startDiv.appendChild(p);
    } else {
        startDiv.lastElementChild.textContent = 'You Win!';
      }
      startButton.addEventListener('click', (e) => {
        e.preventDefault();
        reset();
        if (phraseDiv.style.display === 'none') {
          phraseDiv.style.display = '';
        }
      })
    }
  }, 850);
});
