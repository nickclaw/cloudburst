
export class Runtime {

  _nodes = [];

  register(node) {
    this._nodes.push(node);
  }

  async init() {
    const promises = this._nodes
      .map(node => node.init());

    await Promise.all(promises);
  }

  async teardown() {

  }
}

export default new Runtime();
