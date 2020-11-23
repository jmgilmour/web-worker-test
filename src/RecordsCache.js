import * as Comlink from "comlink";

import WebWorker from "./WebWorker";

class RecordsCache extends WebWorker {
  constructor() {
    super("RecordsCache.worker.js");
    this.handlers = [];
    this.worker.registerHandler(
      Comlink.proxy(async (transaction) => {
        this.handlers.forEach((handler) => handler(transaction));
      })
    );
  }

  async getById(id) {
    return this.worker.getById(id);
  }

  async findBy(field, value) {
    return this.worker.findBy(field, value);
  }

  async streamRecords(callback, chunkSize = 1) {
    return this.worker.streamRecords(Comlink.proxy(callback), chunkSize);
  }

  async addOrUpdate(record) {
    return this.worker.addOrUpdate(record);
  }

  async remove(record) {
    return this.worker.remove(record);
  }

  addTransactionHandler(handler) {
    this.handlers.push(handler);
  }

  removeTransactionHandler(handler) {
    const index = this.handlers.indexOf(handler);
    this.handlers.splice(index, 1);
  }
}

export default new RecordsCache();
