import * as Comlink from "comlink";

export default class {
  constructor(src) {
    this.worker = Comlink.wrap(new Worker(src));
    Object.keys(console).forEach((key) => {
      this.worker.registerLogging(key, Comlink.proxy(console[key]));
    });
    this.links = {};
  }

  async getPort() {
    if (!this.port) {
      this.port = await this.worker[Comlink.createEndpoint]();
    }
    return this.port;
  }

  async linkTo(webWorker) {
    const { name } = webWorker.constructor;
    if (this.links[name]) return this.links[name];

    const port = await webWorker.getPort();
    await this.worker.registerInstance(name, Comlink.transfer(port, [port]));
    this.links[name] = port;
    return port;
  }
}
