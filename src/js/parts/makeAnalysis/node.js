import { TYPE_TREE_NODE, VALUE_UNKNOWN } from "constants/atributes";

import makeAnalysisAbstract from "./abstract";

const makeAnalysisNode = (value, name = VALUE_UNKNOWN, index, parrent) => {
  const obj = makeAnalysisAbstract(value, name, index, parrent);
  obj.typeNode = TYPE_TREE_NODE;
  return obj;
};

export default makeAnalysisNode;
