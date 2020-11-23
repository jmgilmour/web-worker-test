/* eslint-disable no-undef */
importScripts("./comlink.min.js");
importScripts("../helpers/registerInstance.js");
importScripts("../helpers/registerLogging.js");

Comlink.expose({
  registerInstance,
  registerLogging,

  async load(id) {
    return fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => response.json())
      .then((user) => {
        // ["address", "company", "email", "username", "phone", "website"].forEach(
        //   (field) => delete user[field]
        // );
        user.viewers = Math.floor(Math.random() * 100) + 1;
        return user;
      })
      .then((user) => RecordsCache.addOrUpdate(user));
  },

  async simulateUpdates() {
    const id = Math.floor(Math.random() * 10) + 1;
    RecordsCache.addOrUpdate({
      id,
      viewers: Math.floor(Math.random() * 100) + 1
    });
    setTimeout(() => this.simulateUpdates(), 100);
  }
});
