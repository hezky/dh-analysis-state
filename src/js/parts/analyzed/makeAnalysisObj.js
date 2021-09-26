import { isArray, findOutTheType } from "@dh-utils/common";

import { VALUE_UNKNOWN } from "constants/atributes";

const determineDeep = (parrent) => (parrent ? parrent.deep + 1 : 0);

const determineSKey = (index, parrent) =>
  parrent ? `${parrent.sKey}.${index}` : `${index}`;

const determinePath = (name = "", parrent = null) =>
  parrent?.path?.length ? `${parrent.path}/${name}` : `${name}`;

const makeAnalysisParrent = (parrent, childSKey) => {
  if (parrent) {
    if (!isArray(parrent.children)) {
      parrent.children = [];
    }
    parrent.children.push(childSKey);
    return parrent;
  }
};

/*o be thrown.

 ********************************************
 ANALYSIS OBJECT
- atributes :
  ... deep       - deep in struct
  ... duplicate  - duplicate in memory
  ... children   - list children keys
  ... index      - index
  ... name       - name property in parrent value
  ... parrent    - parrent key
  ... path       - path in state
  ... sKey       - key, id, identification
  ... typeValue  - type
  ... value      - value
  ... typeNode   - typconste of node = [list, node]
  ************************Tree********************
*/
const makeAnalysisObj = (
  { index = null, name = VALUE_UNKNOWN, parrent = null, value = null },
  type
) => {
  const obj = {};

  obj.deep = determineDeep(parrent);
  obj.duplicate = false;
  obj.index = index;
  obj.name = name;
  obj.parrent = parrent?.sKey;
  obj.path = determinePath(name, parrent);
  obj.sKey = determineSKey(index, parrent);
  obj.typeValue = findOutTheType(value);
  obj.value = value;
  obj.typeNode = type;

  const childSKey = obj.sKey;
  makeAnalysisParrent(parrent, childSKey);

  return obj;
};

export default makeAnalysisObj;
