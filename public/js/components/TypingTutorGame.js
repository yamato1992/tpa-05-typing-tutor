import { fetchRandomQuote } from '../api-client.js';
import TypingTutorView from './TypingTutorView.js';

class TypingTutorGame {
  constructor() {
    this.isRoundInProgress = false;
    this.currentStrokeCount = -1;
    this.targetText = null;
    this.correctTypingCount = 0;
  }

  init() {
    this.view = new TypingTutorView();
    this.view.registerStartRoundCallback(this.startRound.bind(this));
    this.view.registerHandleKeystrokeCallback(this.handleKeyStroke.bind(this));
    this.view.initDOMAndListeners();
  }

  startRound() {
    this.isRoundInProgress = true;
    this.currentStrokeCount = -1;
    this.initTargetText();
    this.correctTypingCount = 0;
  }

  endRound() {
    this.isRoundInProgress = false;
  }

  handleKeyStroke(key) {
    if (!this.isRoundInProgress) return;
    this.currentStrokeCount += 1;
    const targetChar = this.targetText[this.currentStrokeCount];
    this.countCorrectType(key, targetChar);
    this.view.renderKeystroke(key, targetChar);
    if (this.hasFinishedRound()) {
      const score = this.calcCorrectTypingRate();
      this.view.renderTypingScore(score);
      this.endRound();
    }
  }

  countCorrectType(key, targetChar) {
    if (key === targetChar) {
      this.correctTypingCount += 1;
    }
  }

  hasFinishedRound() {
    return this.currentStrokeCount === this.targetText.length - 1;
  }

  calcCorrectTypingRate() {
    return Math.floor(this.correctTypingCount / this.targetText.length * 100);
  }

  initTargetText() {
    fetchRandomQuote()
      .then((quoteText) => {
        this.view.renderTargetText(quoteText);
        this.targetText = quoteText.split('');
      });
  }
}

export default TypingTutorGame;
