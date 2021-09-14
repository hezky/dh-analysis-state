class Analyzed {
  constructor() {
    this.store = {};
  }

  add(obj) {
    this.store[obj.sKey] = obj;
  }

  get(sKey) {
    return this.store[sKey];
  }
}

export default Analyzed;
