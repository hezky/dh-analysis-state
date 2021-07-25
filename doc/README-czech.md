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
