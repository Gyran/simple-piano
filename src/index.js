import createPiano from './piano.js';

const audioContext = new (window.AudioContext || window.webkitAudioContext)();

const piano = createPiano(audioContext);

const setup = () => {
  const playNote = (note) => {
    piano.playNote(note);
  };
  const stopNote = (note) => {
    piano.stopNote(note);
  };

  const notePressed = (event) => {
    if (!event.buttons & 1) {
      // if not the primary button is pressed, don't do anything
      // https://w3c.github.io/uievents/#dom-mouseevent-buttons
      return;
    }

    const { note } = event.target.dataset;
    event.target.dataset.pressed = true;
    playNote(note);
  };
  const noteReleased = (event) => {
    const { note } = event.target.dataset;
    event.target.dataset.pressed = false;

    stopNote(note);
  };

  const $keys = document.querySelectorAll('.js-key');
  $keys.forEach(($key) => {
    $key.addEventListener('mousedown', notePressed);
    $key.addEventListener('mouseover', notePressed);
    $key.addEventListener('mouseup', noteReleased);
    $key.addEventListener('mouseout', noteReleased);

    $key.addEventListener('touchstart', notePressed);
    $key.addEventListener('touchend', noteReleased);
  });

  console.log('READY!');
};

setup();
