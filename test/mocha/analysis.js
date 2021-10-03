/* eslint-disable */

import { assert } from "chai";

import Analysis from "";

describe("analysis", () => {
  it("analysis : duplicate array", () => {
    const analysis = new Analysis();
    const user1 = { name: "arthur" };
    const users = [user1, { name: "arthur" }, user1, { name: "Joe" }, user1];
    analysis.register(users, "users");
    const expectedGroup = {
      0: { "0.2": "users/2", "0.0": "users/0", "0.4": "users/4" },
    };
    const expectedKeys = { "0.2": "0", "0.0": "0", "0.4": "0" };
    assert.deepEqual(analysis.duplicates.getStoreGroup(), expectedGroup);
    assert.deepEqual(analysis.duplicates.getStoreSKeys(), expectedKeys);
  });

  it("analysis : duplicate object", () => {
    const analysis = new Analysis();
    const adress = { street: "Street 123" };
    const age = { age: 12 };
    const user = {
      name: "arthur",
      aaa: { newAdress: adress },
      bbb: { newAge: age },
      ccc: { oldAdress: adress },
      ddd: { oldAge: age },
    };
    analysis.register(user, "user");
    const expectedGroup = {
      0: { "0.1.0": "user/aaa/newAdress", "0.3.0": "user/ccc/oldAdress" },
      1: { "0.2.0": "user/bbb/newAge", "0.4.0": "user/ddd/oldAge" },
    };
    const expectedKeys = {
      "0.1.0": "0",
      "0.2.0": "1",
      "0.3.0": "0",
      "0.4.0": "1",
    };

    assert.deepEqual(analysis.duplicates.getStoreGroup(), expectedGroup);
    assert.deepEqual(analysis.duplicates.getStoreSKeys(), expectedKeys);
  });
});
