import { isArray, isObject } from "@dh-utils/common";

import { UNKNOWN } from "constants/atributes";
import Analyzed from "parts/analyzed";
import Duplicates from "parts/duplicates";
import makeAnalysisList from "parts/makeAnalysis/list";
import makeAnalysisNode from "parts/makeAnalysis/node";
import makeIterator from "parts/makeIterator";
import { checkList, checkNode } from "utils/check";

const defaultReporter = () => {
  console.log("hellooo ...");
};

class Analysis {
  constructor(reporter = defaultReporter) {
    this.analyzed = new Analyzed();
    this.iterator = makeIterator();
    this.duplicates = new Duplicates();
    this.known = new Map();
    this.reporter = reporter.bind(this);
  }

  _createIndex(index) {
    return index ? index : this.iterator.value();
  }

  _createName(name) {
    return name ? name : `${UNKNOWN}_${this.iterator.value()}`;
  }

  _registerArrayChildren(value, analysisObj) {
    if (isArray(value)) {
      analysisObj.child = {};
      value.forEach((child, index) => {
        analysisObj.child[index] = child;
        if (checkNode(child)) {
          this.register(child, `${index}`, index, analysisObj);
        } else if (checkList(child)) {
          this._registerList(child, `${index}`, index, analysisObj);
        }
      });
    }
  }

  _registerObjectChildren(value, analysisObj) {
    if (isObject(value)) {
      analysisObj.child = {};
      let index = 0;
      for (const property in value) {
        const child = value[property];
        analysisObj.child[property] = child;
        if (checkNode(child)) {
          this.register(child, property, index, analysisObj);
        } else if (checkList(child)) {
          this._registerList(child, property, index, analysisObj);
        }
        index++;
      }
    }
  }

  _registerList(value, name, index, parrent) {
    const analysisObj = makeAnalysisList(value, name, index, parrent);
    this.analyzed.add(analysisObj);
  }

  registerDuplicate(value, analysisObj) {
    const aNew = { sKey: analysisObj.sKey, path: analysisObj.path };
    const duplObj = this.known.get(value);
    const dupl = { sKey: duplObj.sKey, path: duplObj.path };
    this.duplicates.set(aNew, dupl);
    analysisObj.duplicate = this.duplicates.get(aNew.sKey);
  }

  register(value, name, index, parrent) {
    const _index = this._createIndex(index);
    const _name = this._createName(name);
    if (checkNode(value)) {
      const analysisObj = makeAnalysisNode(value, _name, _index, parrent);
      this.analyzed.add(analysisObj);
      if (this.known.has(value) == false) {
        this.known.set(value, analysisObj);
      } else {
        this.registerDuplicate(value, analysisObj);
      }
      this._registerArrayChildren(value, analysisObj);
      this._registerObjectChildren(value, analysisObj);
    } else if (checkList(value)) {
      this._registerList(value, _name, _index, parrent);
    }

    if (index === undefined) {
      this.iterator.next();
    }
  }

  report() {
    let result;
    if (isArray(this.reporter)) {
      result = this.reporter.map((elem) => elem());
    } else {
      result = this.reporter();
    }
    return result;
  }
}

export default Analysis;
