import { assert } from "chai";

import Duplicates from "parts/duplicates";

describe("duplicate", () => {
  it("duplicate : set", () => {
    const duplicates = new Duplicates();
    const aNew = { sKey: "0", path: "pathA" };
    const dupl = { sKey: "1", path: "pathB" };
    duplicates.set(aNew, dupl);
    const expected = {
      0: { 0: "pathA", 1: "pathB" },
    };
    assert.deepEqual(duplicates.storeGroup, expected);
  });
});
