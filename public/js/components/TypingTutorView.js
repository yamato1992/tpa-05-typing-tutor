import { removeChildNodes } from '../dom-utils.js';

class TypingTutorView {
  constructor() {
    this.learnerKeystrokesEl = null;
    this.typingScoreEl = null;
    this.callbacks = {};
  }

  registerStartRoundCallback(callback) {
    this.callbacks.startRound = callback;
  }

  registerHandleKeystrokeCallback(callback) {
    this.callbacks.handleKeystroke = callback;
  }

  initDOMAndListeners() {
    this.learnerKeystrokesEl = document.querySelector('.learner-keystrokes');
    this.typingScoreEl = document.querySelector('.typing-score');

    document
      .querySelector('body')
      .addEventListener('keyup', this.handleDocumentKeyUp.bind(this));

    document
      .querySelector('.btn-start-round')
      .addEventListener('click', this.handleStartRound.bind(this));
  }

  handleStartRound(evt) {
    // prevent the default behavior of button being "pressed"
    // when you type a space
    evt.target.blur();
    this.clearKeystrokes();
    this.callbacks.startRound();
  }

  clearKeystrokes() {
    removeChildNodes(this.learnerKeystrokesEl);
  }

  handleDocumentKeyUp(evt) {
    if (evt.key.length !== 1) return;
    this.callbacks.handleKeystroke(evt.key);
  }

  renderTargetText(text) {
    document.querySelector('.target-text').innerText = text;
  }

  renderKeystroke(typedChar, targetChar) {
    const spanEl = document.createElement('SPAN');
    spanEl.innerText = typedChar;
    spanEl.className = (typedChar === targetChar) ? 'key-correct' : 'key-incorrect';
    this.learnerKeystrokesEl.appendChild(spanEl);
  }

  renderTypingScore(score) {
    this.typingScoreEl.innerText = `Your score is ${score} %!!`;
  }
}

export default TypingTutorView;
