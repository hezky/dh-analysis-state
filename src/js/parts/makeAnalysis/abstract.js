import { findOutTheType } from "@dh-utils/common";

import { VALUE_UNKNOWN } from "constants/atributes";

import { makeAtributeDeep, makeAtributeSKey, makeAtributePath } from "./utils";

const makeAnalysisAbstract = (value, name = VALUE_UNKNOWN, index, parrent) => {
  const obj = {};
  obj.deep = makeAtributeDeep();
  obj.name = name;
  obj.parrent = parrent;
  obj.path = makeAtributePath(name, parrent);
  obj.sKey = makeAtributeSKey(index, parrent);
  obj.typeValue = findOutTheType(value);
  obj.value = value;
  return obj;
};

export default makeAnalysisAbstract;
