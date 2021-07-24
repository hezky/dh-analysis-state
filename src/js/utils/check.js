import { isArray, isObject } from "@dh-utils/common";

const checkList = (val) => !(isArray(val) || isObject(val));
const checkNode = (val) => isArray(val) || isObject(val);

export { checkList, checkNode };
