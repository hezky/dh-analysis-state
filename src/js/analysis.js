import { isArray, isObject } from "@dh-utils/common";

import { TYPE_NODES, UNKNOWN } from "constants/atributes";
import Analyzed from "parts/analyzed";
import Duplicates from "parts/duplicates";
import makeAnalysisObj from "parts/makeAnalysisObj";
import makeIterator from "parts/makeIterator";
import defaultReporter from "reporter/default";
import { checkIsList, checkIsNode } from "utils/check";

const defaultIndex = (iterator) => iterator.value();
const defaultName = (iterator) => `${UNKNOWN}-${iterator.value()}`;

class Analysis {
  constructor(reporter = defaultReporter) {
    this.reporter = reporter;
    this.reporter = this.reporter.bind(this);
    this.reset();
  }

  reset() {
    this.analyzed = new Analyzed();
    this.duplicates = new Duplicates();
    this.iterator = makeIterator();
    this.known = new Map();
  }

  _registerChildren(analysisObj) {
    analysisObj.child = {};
    const { value } = analysisObj;
    switch (true) {
      case isArray(value):
        {
          value.forEach((child, index) => {
            const name = `${index}`;
            analysisObj.child[index] = child;
            this.register(child, name, index, analysisObj);
          });
        }
        break;
      case isObject(value):
        {
          let index = 0;
          for (const property in value) {
            const child = value[property];
            analysisObj.child[property] = child;
            this.register(child, property, index, analysisObj);
            index++;
          }
        }
        break;
      default: {
        throw "unknow node ...";
      }
    }
  }

  _registerDuplicate(analysisObj) {
    const duplicatedSKey = this.known.get(analysisObj.value);
    const duplicatedObj = this.analyzed.get(duplicatedSKey);
    this.duplicates.set(analysisObj, duplicatedObj);
    analysisObj.duplicate = this.duplicates.get(this.duplicates.sKey);
    duplicatedObj.duplicate = this.duplicates.get(this.duplicates.sKey);
  }

  _registerNode(item) {
    const analysisObj = makeAnalysisObj(item, TYPE_NODES.NODE);
    this.analyzed.add(analysisObj);
    if (this.known.has(analysisObj.value) === false) {
      this.known.set(analysisObj.value, analysisObj.sKey);
    } else {
      this._registerDuplicate(analysisObj);
    }
    this._registerChildren(analysisObj);
  }

  _registerList(item) {
    this.analyzed.add(makeAnalysisObj(item, TYPE_NODES.LIST));
  }

  register(
    value,
    name = defaultName(this.iterator),
    index = defaultIndex(this.iterator),
    parrent
  ) {
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
        throw "unknow node ...";
      }
    }

    if (index === undefined) {
      this.iterator.next();
    }
  }

  report() {
    return this.reporter();
  }
}

export default Analysis;
