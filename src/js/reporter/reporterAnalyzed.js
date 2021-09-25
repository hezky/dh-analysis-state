import { isArray, isObject } from "@dh-utils/common";

const defaultReporter = function() {
  const store = this.analyzed.getStore();
  let first = true;
  for (const sKey in store) {
    // log empty line
    if (first === false) {
      console.log();
    } else {
      first = false;
    }
    const item = store[sKey];
    console.log("item : ", item);
  }
};

export default defaultReporter;
