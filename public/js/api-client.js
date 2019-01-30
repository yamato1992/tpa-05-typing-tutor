import { normalizeTargetText } from './string-utils.js';

const fetchRandomQuote = function() {
  return fetch('https://talaikis.com/api/quotes/random/')
    .then(response => response.json())
    .then(payload => normalizeTargetText(payload.quote));
};

export {
  fetchRandomQuote,
};
