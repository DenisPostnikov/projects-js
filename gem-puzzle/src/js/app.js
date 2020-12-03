import '../scss/style.scss';
import PicturePuzzle from './PicturePuzzle';

const dimmension = prompt('Выберите размер поля', 3);
const picturePuzzle = new PicturePuzzle(
  document.querySelector('#puzzle-wrapper'),
  '../src/images/bg.jpg',
  600,
  dimmension
);

// Modal window
const modal = document.querySelector('#success-modal');
const modalHeading = document.querySelector('.modal__heading');
modal.style.display = 'block';

picturePuzzle.onFinished = function () {
  setTimeout(() => {
    modal.classList.add('open');
    this.el.classList.add('blur-it');
    modalHeading.textContent = `Ура! Вы решили головоломку за ${output.textContent} и ${picturePuzzle.numberOfMovements} ходов`;
  }, 500);
  modal.querySelector('.trigger').onclick = () => {
    modal.classList.remove('open');
    this.el.classList.remove('blur-it');
  };

  running = 1;
  startPause();
};

// Timer
const timerButtonStart = document.querySelector('.timer__button_start');
const timerButtonReset = document.querySelector('.timer__button_reset');
const output = document.querySelector('.timer__output');
let time = 0;
let running = 0;

timerButtonStart.addEventListener('click', startPause);
timerButtonReset.addEventListener('click', reset);

function startPause() {
  if (running === 0) {
    running = 1;
    increment();
    timerButtonStart.innerHTML = 'Pause';
  } else {
    running = 0;
    timerButtonStart.innerHTML = 'Resume';
  }
}
function reset() {
  running = 0;
  time = 0;

  timerButtonStart.innerHTML = 'Start';
  output.innerHTML = '00:00';

  picturePuzzle.numberOfMovements = 0;
  document.querySelector('.moves__counter').textContent = '0';
}

function increment() {
  if (running == 1) {
    setTimeout(function () {
      time++;
      let mins = Math.floor(time / 10 / 60);
      let secs = Math.floor((time / 10) % 60);

      if (mins < 10) {
        mins = '0' + mins;
      }
      if (secs < 10) {
        secs = '0' + secs;
      }

      output.innerHTML = mins + ':' + secs;
      increment();
    }, 100);
  }
}
