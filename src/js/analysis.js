import { isArray, isObject } from "@dh-utils/common";

import { TYPE_NODES, UNKNOWN } from "constants/atributes";
import Analyzed from "parts/analyzed";
import Duplicates from "parts/duplicates";
import makeAnalysisObj from "parts/analyzed/makeAnalysisObj";
import makeIterator from "parts/makeIterator";
import defaultReporter from "reporter/defaultReporter";
import { checkIsList, checkIsNode } from "utils/check";

const defaultIndex = (iterator) => iterator.value();
const defaultName = (iterator) => `${UNKNOWN}-${iterator.value()}`;

class Analysis {
  #iterator;
  #known;
  #reporter;

  constructor(reporter = defaultReporter) {
    this.#reporter = reporter;
    this.#reporter = this.#reporter.bind(this);
    this.reset();
  }

  reset() {
    this.analyzed = new Analyzed();
    this.duplicates = new Duplicates();
    this.#iterator = makeIterator();
    this.#known = new Map();
  }

  _registerChildren(analysisObj) {
    const { value } = analysisObj;
    switch (true) {
      case isArray(value):
        {
          value.forEach((child, index) => {
            const name = `${index}`;
            const parrentSKey = analysisObj.sKey;
            this.register(child, name, index, parrentSKey);
          });
        }
        break;
      case isObject(value):
        {
          let index = 0;
          for (const name in value) {
            const child = value[name];
            const parrentSKey = analysisObj.sKey;
            this.register(child, name, index, parrentSKey);
            index++;
          }
        }
        break;
      default: {
        throw new Error("Unknown node.");
      }
    }
  }

  _registerDuplicate(analysisObj) {
    const duplicatedSKey = this.#known.get(analysisObj.value);
    const duplicatedObj = this.analyzed.get(duplicatedSKey);
    this.duplicates.set(analysisObj, duplicatedObj);
    const listDuplicates = Object.keys(this.duplicates.get(duplicatedSKey));
    listDuplicates.forEach((item) => {
      const objA = this.analyzed.get(item);
      objA.duplicate = listDuplicates;
    });
  }

  _registerNode(item) {
    const analysisObj = makeAnalysisObj(item, TYPE_NODES.NODE);
    this.analyzed.add(analysisObj);
    if (this.#known.has(analysisObj.value) === false) {
      this.#known.set(analysisObj.value, analysisObj.sKey);
    } else {
      this._registerDuplicate(analysisObj);
    }
    this._registerChildren(analysisObj);
  }

  _registerList(item) {
    this.analyzed.add(makeAnalysisObj(item, TYPE_NODES.LEAF));
  }

  register(
    value,
    name = defaultName(this.#iterator),
    index = defaultIndex(this.#iterator),
    parrentSKey = null
  ) {
    const parrent = this.analyzed.get(parrentSKey) || undefined;
    const item = {
      index,
      name,
      parrent,
      value,
    };
    switch (true) {
      case checkIsNode(value):
        this._registerNode(item);
        break;
      case checkIsList(value):
        this._registerList(item);
        break;
      default: {
        throw new Error("Unknown node.");
      }
    }

    if (index === undefined) {
      this.#iterator.next();
    }
  }

  report() {
    return this.#reporter();
  }
}

export default Analysis;
