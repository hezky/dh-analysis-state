import { findOutTheType } from "@dh-utils/common";

import { TYPE_NODES, VALUE_UNKNOWN } from "constants/atributes";

const determineDeep = (parrent) => (parrent ? parrent.deep + 1 : 0);

const determineSKey = (index, parrent) =>
  parrent ? `${parrent.sKey}.${index}` : `${index}`;

const determinePath = (name = "", parrent) =>
  parrent?.path?.length ? `${parrent.path}/${name}` : `${name}`;

const makeAnalysisObj = (
  { index = null, name = VALUE_UNKNOWN, parrent = null, value },
  type
) => {
  const obj = {};
  obj.deep = determineDeep(parrent);
  obj.name = name;
  obj.parrent = parrent;
  obj.path = determinePath(name, parrent);
  obj.sKey = determineSKey(index, parrent);
  obj.typeValue = findOutTheType(value);
  obj.value = value;
  obj.typeNode = type;

  if (type === TYPE_NODES.LIST) {
    obj.duplicate = false;
  }

  return obj;
};

export default makeAnalysisObj;
