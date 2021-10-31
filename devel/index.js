/* in you case use 'import Analysis from "@dh-analysis/state"' */
import Analysis from "";

import reporter from "reporter/reporterTreeColor2";

/* or use 'new Analysis(ownReporter);' */
const analysis = new Analysis(reporter);
const address = { street: "Street 123" };
const age = { name: "Jack", age: 12, phone: "123 456 789" };
const user = {
  name: "arthur",
  aaa: { newAddress: address },
  bbb: { newAge: age },
  ccc: { oldAddress: address },
  ddd: { a: "a", b: "b", oldAge: age, x: "x" },
  eee: { superAddress: address },
};

/* register variable */
analysis.register(user, "user");

/* empty line */
console.log();

/* show analysis */
analysis.report();
