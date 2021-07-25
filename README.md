# dh-analysis-state

[Readme in Czech (Readme v Češtině)](https://github.com/hezky/dh-analysis-state/blob/master/doc/README-czech.md)

> A tool for analyzing the state of variables. Analyze objects, arrays, and their internal parts to see if they share the same memory address.

<a name="metoda_register"></a>
## Method register

> Registering a variable for analysis.

*use* :
``` javascript
import Analysis from "@dh-analysis/state";

const analysis = new Analysis(); // or new Analysis(ownReporter);
const variable = {...};
analysis.register(variable, "variable");
...
```

<a name="metoda_report"></a>
## Metoda report

> Display analysis results.

*use* :
``` javascript
import Analysis from "@dh-analysis/state";

const analysis = new Analysis(); // or new Analysis(ownReporter);
const variable = {...};
...
analysis.register(variable, "variable");
analysis.report(); // displays the analysis
```

By default, the report is displayed using (console.log): a list of duplicate addresses and their current paths in the analyzed variable. The default report can be replaced by your own report, which you insert into the constructor.

----

## Example of use

``` javascript
const analysis = new Analysis(); // or new Analysis(ownReporter);
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
analysis.report(); // displays the analysis
```

**metoda report** : console.log - výstup
``` text
group : 0
 - user/ccc/oldAdress
 - user/aaa/newAdress

group : 1
 - user/ddd/oldAge
 - user/bbb/newAge
```

The variable **user** has 2 groups of duplicates. Marked here as **group 0** and **group 1**. For each duplicate, the depth path in the object to that duplicate location is displayed.
