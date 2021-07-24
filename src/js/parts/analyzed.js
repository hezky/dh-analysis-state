class Analyzed {
  constructor() {
    this.store = {};
  }

  add(obj) {
    this.store[obj.sKey] = obj;
  }
}

export default Analyzed;
