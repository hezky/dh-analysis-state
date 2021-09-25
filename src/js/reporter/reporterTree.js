import { isArray, isObject } from "@dh-utils/common";

// "─"."┬"."└"."│"."├"." "
const CHAR = {
  ACT_EXIST_CHILDREN: "─┬",
  ACT_NO_CHILDREN: "──",

  PAR_LAST_CHILDREN: "└",
  PAR_MORE_CHILDREN: "├",

  ANY_CHILDREN: "│",
  EMPTY: "",
  SPACE: " ",
};

const getCountChildrenOfParrent = (analyzed, parrent) =>
  analyzed.get(parrent)?.children?.length || 0;

const logFirstLine = (bFirstCycle, sKey) => {
  if (sKey.length === 1) {
    if (bFirstCycle === false) {
      console.log();
    } else {
      bFirstCycle = false;
    }
    console.log("o " + sKey);
  }
  return bFirstCycle;
};

const logAct = (childCount) =>
  childCount ? CHAR.ACT_EXIST_CHILDREN : CHAR.ACT_NO_CHILDREN;

const logPar = (deep, index, childCount) =>
  `${deep - 1 > 0 ? CHAR.SPACE : CHAR.EMPTY}${
    index < childCount - 1
      ? CHAR.PAR_MORE_CHILDREN
      : index === childCount - 1
      ? CHAR.PAR_LAST_CHILDREN
      : CHAR.SPACE
  }`;

const logPos = (deep, storeDeep, parsedSKey) => {
  let result = "";
  for (let i = 0; i < deep - 1; i++) {
    result += `${i > 0 ? CHAR.SPACE : CHAR.EMPTY}${
      parsedSKey[i + 1] < storeDeep[i] - 1 ? CHAR.ANY_CHILDREN : CHAR.SPACE
    }`;
  }
  return result;
};

const defaultReporter = function () {
  const store = this.analyzed.getStore();
  const storeDeep = [];
  let bFirstCycle = true;
  for (let _sKey in store) {
    const obj = store[_sKey];
    const { deep, parrent, sKey } = obj;
    bFirstCycle = logFirstLine(bFirstCycle, sKey);

    if (sKey.length > 1) {
      const { deep, duplicate, children, index, path, parrent } = obj;
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
      console.log(_empty + _parPos + _childPos + CHAR.EMPTY + sKey);
    }
  }
};

export default defaultReporter;
