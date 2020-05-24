const resetButton = document.getElementsByClassName('btn__reset')[0];
const startDiv = document.getElementById('overlay');
const ul = document.getElementsByTagName('ul');
const keyRow = document.getElementsByClassName('keyrow');
const tries = document.getElementsByClassName('tries');
const images = document.getElementsByTagName('img');

const phrases = [];

resetButton.addEventListener('click', (e) => {
  e.preventDefault();
  startDiv.style.display = 'none';
});
