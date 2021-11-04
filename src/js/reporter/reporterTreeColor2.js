import chalk from "chalk";

import { TYPE_NODES } from "constants/atributes";

// "─"."┬"."└"."│"."├"." "
const CHAR = {
  ACT_EXIST_CHILDREN: "─┬",
  ACT_NO_CHILDREN: "──",

  PAR_LAST_CHILDREN: "└",
  PAR_MORE_CHILDREN: "├",

  ANY_CHILDREN: "│",
  EMPTY: "",
  FIRST: "_",
  LEAF: "o",
  NODE: "[+]",
  SPACE: " ",
};

let duplicateKeys = [];

const getCountChildrenOfParrent = (analyzed, parrent) =>
  analyzed.get(parrent)?.children?.length || 0;

const logFirstLine = (bFirstCycle, sKey) => {
  if (sKey.length === 1) {
    if (bFirstCycle === false) {
      console.log();
    } else {
      bFirstCycle = false;
    }
    console.log(CHAR.FIRST);
  }
  return bFirstCycle;
};

const logAct = (childCount) =>
  childCount ? CHAR.ACT_EXIST_CHILDREN : CHAR.ACT_NO_CHILDREN;

const logPar = (deep, index, childCount) => {
  let result = deep - 1 > 0 ? CHAR.SPACE : CHAR.EMPTY;
  switch (true) {
    case index < childCount - 1:
      result += CHAR.PAR_MORE_CHILDREN;
      break;
    case index === childCount - 1:
      result += CHAR.PAR_LAST_CHILDREN;
      break;
    default:
      result += CHAR.SPACE;
      break;
  }
  return result;
};

const logPos = (deep, storeDeep, parsedSKey) => {
  let result = "";
  for (let i = 0; i < deep - 1; i++) {
    result += `${i > 0 ? CHAR.SPACE : CHAR.EMPTY}${
      parsedSKey[i + 1] < storeDeep[i] - 1 ? CHAR.ANY_CHILDREN : CHAR.SPACE
    }`;
  }
  return result;
};

const reporterTree = function () {
  const store = this.analyzed.getStore();
  const storeDeep = [];
  let bFirstCycle = true;
  for (let _sKey in store) {
    const obj = store[_sKey];
    const { deep, parrent, sKey } = obj;
    bFirstCycle = logFirstLine(bFirstCycle, sKey);

    if (sKey.length > 1) {
      const { duplicate, children, index, typeNode } = obj;
      if (duplicate) {
        duplicateKeys = duplicateKeys.concat(duplicate);
      }
      const countChildOfParrent = getCountChildrenOfParrent(
        this.analyzed,
        parrent
      );
      const childCount = children?.length || 0;
      storeDeep[deep - 1] = countChildOfParrent;
      const parsedSKey = sKey.split(".");
      const _empty = logPos(deep, storeDeep, parsedSKey);
      const _parPos = logPar(deep, index, countChildOfParrent);
      const _childPos = logAct(childCount);
      if (
        duplicate ||
        duplicateKeys.some((itemKey) => sKey.startsWith(itemKey))
      ) {
        const _dupl = duplicate
          ? `${chalk.red("=")}[${duplicate.join(", ")}]`
          : "";
        console.log(
          _empty + chalk.red(_parPos + _childPos) + CHAR.SPACE + sKey + _dupl
        );
      } else {
        if (typeNode === TYPE_NODES.LEAF) {
          console.log(_empty + chalk.green(_parPos + _childPos + CHAR.LEAF));
        } else {
          console.log(_empty + _parPos + _childPos + CHAR.NODE);
        }
      }
    }
  }
};

export default reporterTree;
