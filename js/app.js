const startButton = document.getElementsByClassName('btn__reset')[0];
const qwerty = document.getElementById('qwerty');
const startDiv = document.getElementById('overlay');
const ul = document.getElementsByTagName('ul')[0];
const images = document.getElementsByTagName('img');

const phrases = ['i want to learn react', 'breaks are essential', 'the switch is fun', 'going for exceeds', 'coding takes practice'];

function randomPhrase() {
  const num = Math.floor(Math.random() * 5);
  return num;
}

const phrase = phrases[randomPhrase()];
const phraseLength = phrase.length;

startButton.addEventListener('click', (e) => {
  e.preventDefault();
  startDiv.style.display = 'none';
  for (let i = 0; i < phraseLength; i++) {
    const li = document.createElement('li');
    li.className = 'letter';
    ul.appendChild(li);
    li.textContent = phrase[i];
    if (li.textContent === ' ') {
      li.className = 'space';
    }
  }
});

qwerty.addEventListener('click', (e) => {
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
    if (phrase.indexOf(button.textContent) < 0) {
      let incorrectGuesses = 0;
      incorrectGuesses += 1;
      button.className = 'lose';
      button.disabled = true;
      const lose = document.getElementsByClassName('lose');
      for (i = 0; i < lose.length; i++) {
        images[i].src = 'images/lostHeart.png';
      }
    }
  }
});
