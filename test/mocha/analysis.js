import { assert } from "chai";

import Analysis from "";

describe("analysis", () => {
  it("analysis : duplicate array", () => {
    const analysis = new Analysis();
    const user1 = { name: "arthur" };
    const users = [user1, { name: "arthur" }, user1, { name: "Joe" }, user1];
    analysis.register(users, "users");
    const expectedGroup = {
      0: { "0_2": "users/2", "0_0": "users/0", "0_4": "users/4" },
    };
    const expectedKeys = { "0_2": "0", "0_0": "0", "0_4": "0" };
    assert.deepEqual(analysis.duplicates.storeGroup, expectedGroup);
    assert.deepEqual(analysis.duplicates.storeSKeys, expectedKeys);
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
      0: { "0_1_0": "user/aaa/newAdress", "0_3_0": "user/ccc/oldAdress" },
      1: { "0_2_0": "user/bbb/newAge", "0_4_0": "user/ddd/oldAge" },
    };
    const expectedKeys = {
      "0_1_0": "0",
      "0_2_0": "1",
      "0_3_0": "0",
      "0_4_0": "1",
    };
    assert.deepEqual(analysis.duplicates.storeGroup, expectedGroup);
    assert.deepEqual(analysis.duplicates.storeSKeys, expectedKeys);
  });
});
