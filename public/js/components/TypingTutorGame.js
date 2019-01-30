import { fetchRandomQuote } from '../api-client.js';
import TypingTutorView from './TypingTutorView.js';

class TypingTutorGame {
  constructor() {
    this.isRoundInProgress = false;
    this.currentStrokeCount = -1;
    this.targetText = null;
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
  }

  handleKeyStroke(key) {
    if (!this.isRoundInProgress) return;
    this.currentStrokeCount += 1;
    const targetChar = this.targetText[this.currentStrokeCount];
    this.view.renderKeystroke(key, targetChar);
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
