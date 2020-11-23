/* eslint-disable no-undef */
importScripts("./comlink.min.js");
importScripts("./helpers/registerLogging.js");

function get(object, path, value) {
  const pathArray = Array.isArray(path)
    ? path
    : path.split(".").filter((key) => key);
  const pathArrayFlat = pathArray.flatMap((part) =>
    typeof part === "string" ? part.split(".") : part
  );
  return pathArrayFlat.reduce((obj, key) => obj && obj[key], object) || value;
}

Comlink.expose({
  registerLogging,

  records: {},
  handlers: [],

  get ids() {
    return Object.keys(this.records);
  },

  get values() {
    return Object.values(this.records);
  },

  registerHandler(handler) {
    this.handlers.push(handler);
  },

  getById(id) {
    return this.records[id];
  },

  findBy(field, value) {
    const index = this.values.findIndex(
      (record) => get(record, field) === value
    );
    return this.values[index];
  },

  streamRecords(callback, chunkSize) {
    const size = this.values.length;
    for (let i = 0; i < size; i += chunkSize) {
      const chunked = this.values.slice(i, i + chunkSize);
      callback(chunked);
    }
  },

  addOrUpdate(record) {
    const transaction = {};
    if (this.records[record.id]) {
      // UPDATE
      this.records[record.id] = Object.assign(this.records[record.id], record);
      transaction.update = this.records[record.id];
    } else {
      // ADD
      this.records[record.id] = record;
      transaction.add = this.records[record.id];
    }
    this.publishTransaction(transaction);
  },

  remove(record) {
    const removed = this.records[record.id];
    delete this.records[record.id];
    this.publishTransaction({ remove: removed });
  },

  publishTransaction(transaction) {
    this.handlers.forEach((handler) => handler(transaction));
  }
});
