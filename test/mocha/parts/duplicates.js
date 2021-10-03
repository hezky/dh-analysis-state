import { assert } from "chai";

import Duplicates from "parts/duplicates";

describe("duplicates", () => {
  it("duplicates : methoda set + getByGroup", () => {
    const duplicates = new Duplicates();
    const newA = { sKey: "0.0.1", path: "aaa/bbb/ccc" };
    const dupA = { sKey: "0.0.2", path: "aaa/bbb/ddd" };
    const newB = { sKey: "0.0.3", path: "aaa/bbb/eee" };
    const dupB = { sKey: "0.0.4", path: "aaa/bbb/fff" };
    duplicates.set(newA, dupA);
    duplicates.set(newB, dupB);
    assert.deepEqual(duplicates.getByGroup("0"), {
      "0.0.1": "aaa/bbb/ccc",
      "0.0.2": "aaa/bbb/ddd",
    });
  });

  it("duplicates : methoda set + getDuplicateKeys", () => {
    const duplicates = new Duplicates();
    const newA = { sKey: "0.0.1", path: "aaa/bbb/ccc" };
    const dupA = { sKey: "0.0.2", path: "aaa/bbb/ddd" };
    duplicates.set(newA, dupA);
    assert.deepEqual(duplicates.getDuplicateKeys("0.0.1"), ["0.0.1", "0.0.2"]);
    assert.deepEqual(duplicates.getDuplicateSKeys("0.0.1"), ["0.0.1", "0.0.2"]);
  });

  it("duplicates : methoda set + getGroups", () => {
    const duplicates = new Duplicates();
    const newA = { sKey: "0.0.1", path: "aaa/bbb/ccc" };
    const dupA = { sKey: "0.0.2", path: "aaa/bbb/ddd" };
    const newB = { sKey: "0.0.3", path: "aaa/bbb/eee" };
    const dupB = { sKey: "0.0.4", path: "aaa/bbb/fff" };
    duplicates.set(newA, dupA);
    duplicates.set(newB, dupB);
    assert.deepEqual(duplicates.getGroups(), ["0", "1"]);
  });

  it("duplicates : methoda set + getStoreGroup, getStoreSKeys", () => {
    const duplicates = new Duplicates();
    const newA = { sKey: "0.0.1", path: "aaa/bbb/ccc" };
    const dupA = { sKey: "0.0.2", path: "aaa/bbb/ddd" };
    duplicates.set(newA, dupA);
    assert.deepEqual(duplicates.getStoreGroup(), {
      ["0"]: { "0.0.1": "aaa/bbb/ccc", "0.0.2": "aaa/bbb/ddd" },
    });
    assert.deepEqual(duplicates.getStoreSKeys(), {
      "0.0.1": "0",
      "0.0.2": "0",
    });
  });
});
