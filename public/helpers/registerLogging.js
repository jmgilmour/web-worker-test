/* eslint-disable no-restricted-globals */
(function () {
  self.console = {};

  self.registerLogging = (type, callback) => {
    self.console[type] = callback;
  };
})();
