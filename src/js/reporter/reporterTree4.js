import { isArray, isObject } from "@dh-utils/common";

// ─ ┬ └ │ ├
const CHAR = {
  ACT_NO_CHILDREN: "─",
  ACT_IS_CHILDREN: "┬",

  PAR_NT_CHILDREN: "├",
  PAR_LT_CHILDREN: "└",
  PAR_NO_CHILDREN: " ",
};

const logEmpty = (deep, storeDeep, parseSKey) => {
  let result = "";
  for (let i = 0; i < deep-1; i++){
    if (i == 0){
      result += parseSKey[i+1] < storeDeep[i]-1 ? "│" : " ";
    } else {
      result += parseSKey[i+1] < storeDeep[i]-1 ? " │" : "  ";
    }
    // console.log(i,"...",parseSKey[i+1]+" < "+storeDeep[i]-1+" - "+(parseSKey[i+1]<storeDeep[i]-1));
  }
  return result;
}

const transformDeepToSpace = (deep) => deep;

const logActSpace = (isChildren) =>
  isChildren ? "─"+CHAR.ACT_IS_CHILDREN : "─"+CHAR.ACT_NO_CHILDREN;

const logParSpace = (deep, index, parrentChildrenCount) =>
  index < parrentChildrenCount - 1
    ? (deep - 1 === 0 ? "" : " ") +CHAR.PAR_NT_CHILDREN
    : index === parrentChildrenCount - 1
    ? (deep - 1 === 0 ? "" : " ")+CHAR.PAR_LT_CHILDREN
    : (deep - 1 === 0 ? "" : " ")+CHAR.PAR_NO_CHILDREN;

const defaultReporter = function () {
  const store = this.analyzed.getStore();
  const storeDeep = [];
  let first = true;
  for (let _sKey in store) {
    const obj = store[_sKey];
    const { deep, children, sKey } = obj;

    if (sKey.length === 1) {
      // log empty line
      if (first === false) {
        console.log();
      } else { - 1
        first = false;
      }

      console.log(sKey);
    } else {
      const { deep, children, index, sKey } = obj;
      const parseSKey = sKey.split(".");
      const childCount = children?.length || 0;
      const parentChildrenCount = obj?.parrent
        ? this.analyzed.get(obj.parrent)?.children?.length || "E"
        : " ";
      storeDeep[deep-1] = this.analyzed.get(obj.parrent)?.children?.length || 0;
      // console.log(">> " + storeDeep);
      const _empty = logEmpty(deep, storeDeep, parseSKey);
      const _childPos = logActSpace(!!childCount);
      // if (sKey === "0.5.0"){
        // console.log((deep-1) +"=["+parseSKey+"]|["+storeDeep+"]");
      // }
      const _parPos = logParSpace(deep, index, parentChildrenCount);
      const _dupl = obj.duplicate ? " - duplicate" : "";
      console.log(_empty + _parPos + _childPos + sKey+_dupl);
    }
  }
};

export default defaultReporter;

// const { deep, children, sKey } = obj;
// const childCount = children?.length || 0;

// console.log(
//   "obj : ",
//   deep,
//   "...",
//   childCount,
//   "...",
//   childCountParrent,
//   "...",
//   sKey
// );
