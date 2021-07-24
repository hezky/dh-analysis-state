import { TYPE_TREE_LIST, VALUE_UNKNOWN } from "constants/atributes";

import makeAnalysisAbstract from "./abstract";

const makeAnalysisList = (value, name = VALUE_UNKNOWN, index, parrent) => {
  const obj = makeAnalysisAbstract(value, name, index, parrent);
  obj.duplicate = false;
  obj.typeNode = TYPE_TREE_LIST;
  return obj;
};

export default makeAnalysisList;
