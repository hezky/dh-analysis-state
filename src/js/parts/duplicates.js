import makeIterator from "parts/makeIterator";

class Duplicates {
  #iterator;
  #storeGroup;
  #storeSKeys;

  constructor() {
    this.#iterator = makeIterator();
    this.#storeGroup = {};
    this.#storeSKeys = {};

    this.get = this.getByKey;
    this.getDuplicateSKeys = this.getDuplicateKeys;
  }

  getByGroup(group) {
    return this.#storeGroup[group];
  }

  getByKey(sKey) {
    const group = this.#storeSKeys[sKey];
    return this.#storeGroup[group];
  }

  getDuplicateKeys(sKey) {
    return Object.keys(this.get(sKey));
  }

  getGroups() {
    return Object.keys(this.#storeGroup);
  }

  getStoreGroup() {
    return this.#storeGroup;
  }

  getStoreSKeys() {
    return this.#storeSKeys;
  }

  set(aNew, dupl) {
    const group = this.#storeSKeys[dupl.sKey];
    if (!group) {
      const newGroup = this.#iterator.value();
      this.#storeGroup[newGroup] = {};
      this.#storeGroup[newGroup][aNew.sKey] = aNew.path;
      this.#storeGroup[newGroup][dupl.sKey] = dupl.path;
      this.#storeSKeys[aNew.sKey] = newGroup;
      this.#storeSKeys[dupl.sKey] = newGroup;
      this.#iterator.next();
    } else {
      this.#storeGroup[group][aNew.sKey] = aNew.path;
      this.#storeSKeys[aNew.sKey] = group;
    }
  }
}

export default Duplicates;
