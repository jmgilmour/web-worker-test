/* eslint-disable no-undef, no-restricted-globals */
importScripts("../comlink.min.js");

(function () {
  self.registerInstance = async (type, port) => {
    self[type] = await Comlink.wrap(port);
  };
})();
