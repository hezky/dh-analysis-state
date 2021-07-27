# dh-analysis-state

[Použití v anglickém jazyce (Readme in English)](https://github.com/hezky/dh-analysis-state/blob/master/README.md)

> Nástroj k analýze stavu proměnných. Analýza objektů, polí a jejich vnitřních části s kontrolou jestli sdílejí stejnou adresu paměti.

<a name="metoda_register"></a>
## Metoda register

> Zaregistrování proměnné k analýze.

*použití* :
``` javascript
import Analysis from "@dh-analysis/state";

const analysis = new Analysis(); // nebo new Analysis(ownReporter);
const variable = {...};
...
analysis.register(variable, "variable");
...
```

<a name="metoda_report"></a>
## Metoda report

> Zobrazení výsledků analýzy.

*použití* :
``` javascript
import Analysis from "@dh-analysis/state";

const analysis = new Analysis(); // nebo new Analysis(ownReporter);
const variable = {...};
...
analysis.register(variable, "variable");
analysis.report(); // zobrazí analýzu
```

Defaultně se zobrazuje report pomocí (console.log): seznam duplicitních adres a jejich aktuální cesty v analyzované proměnné. Defaultní report, lze nahradit vlastním reportem, který vložte do konstruktoru.

----

## Příklad použití
``` javascript
const analysis = new Analysis(); // nebo new Analysis(ownReporter);
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
analysis.report(); // zobrazí analýzu
```

**method report** : console.log - output
``` text
group : 0
 - user/ccc/oldAdress
 - user/aaa/newAdress

group : 1
 - user/ddd/oldAge
 - user/bbb/newAge
```

Proměnná **user** má 2 skupiny duplicit. Označené zde jako **group 0** a **group 1**. U každé duplicity se zobrazuje hloubková cesta v objektu k danému místu duplicity.

## Použití vlastního reportu

K vytvoření vlastního reportu využijte svázaný lokální proměnné duplicity - **storeGroup** a **storeSKeys** .

**storeSKeys** : seznam id klíčů. Každý klíč má hodnotu identifikátor skupiny duplicity.

Příklad **storeSKeys** :
``` text
{
  sKey1: group1,
  sKey5: group1,
  sKey7: group2
}
```

**storeGroup** : seznam id skupin. U Každé id skupiny je hodnotou seznam cest ke stejnému duplicitnímu objektu případně pole.

Příklad **storeGroup** :
``` text
{
  group1: {
    sKey1: pathA/pathB/pathC,
    sKey5: pathF/pathG/pathH
  },
  group2: {
    sKey7: pathX/pathY/pathZ
  }
}
```

## Příklad defautního reportu k vytvoření vlastního reportu
``` javascript
let defaultReporter = function () {
  const groups = this.duplicates.storeGroup;
  for (const propsG in groups) {
    const group = groups[propsG];
    let paths = [];
    for (const propsK in group) {
      const path = group[propsK];
      paths.push(path);
    }
    paths = paths.sort();
    console.log(`group : ${propsG}`);
    paths.forEach((path) => {
      console.log(` - ${path}`);
    });
    console.log();
  }
};

export default defaultReporter;
```
