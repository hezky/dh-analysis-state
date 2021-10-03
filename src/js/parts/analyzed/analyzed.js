class Analyzed {
  #store;

  constructor() {
    this.#store = {};
  }

  add(obj) {
    this.#store[obj.sKey] = obj;
  }

  get(sKey) {
    return this.#store[sKey];
  }

  getStore() {
    return this.#store;
  }
}

export default Analyzed;
