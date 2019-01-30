const removeChildNodes = function(parentNode) {
  while (parentNode.firstChild) {
    parentNode.removeChild(parentNode.firstChild);
  }
};

export {
  removeChildNodes,
};
