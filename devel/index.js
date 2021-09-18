/* in you case use 'import Analysis from "@dh-analysis/state"' */
import Analysis from "";

/* or use 'new Analysis(ownReporter);' */
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

/* register variable */
analysis.register(user, "user");

/* show analysis */
analysis.report();
