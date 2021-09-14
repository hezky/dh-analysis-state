import { isArray, isObject } from "@dh-utils/common";

const checkIsList = (val) => !(isArray(val) || isObject(val));
const checkIsNode = (val) => isArray(val) || isObject(val);

export { checkIsList, checkIsNode };
