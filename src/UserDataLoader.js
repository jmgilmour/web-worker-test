import WebWorker from "./WebWorker";
import RecordsCache from "./RecordsCache";

class UserDataLoader extends WebWorker {
  constructor() {
    super("UserDataLoader.worker.js");
    this.linkTo(RecordsCache).then(() => {
      this.worker.simulateUpdates();
    });
  }

  async load(id) {
    return this.worker.load(id);
  }
}

export default new UserDataLoader();
