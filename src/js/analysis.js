import { isArray, isObject } from "@dh-utils/common";

import { UNKNOWN } from "constants/atributes";
import Analyzed from "parts/analyzed";
import Duplicates from "parts/duplicates";
import makeAnalysisList from "parts/makeAnalysis/makeAnalysisList";
import makeAnalysisNode from "parts/makeAnalysis/makeAnalysisNode";
import makeIterator from "parts/makeIterator";
import defaultReporter from "reporter/default";
import { checkIsList, checkIsNode } from "utils/check";

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

  _createIndex(index) {
    return index ? index : this.iterator.value();
  }

  _createName(name) {
    return name ? name : `${UNKNOWN}-${this.iterator.value()}`;
  }

  _registerArrayChildren(value, analysisObj) {
    if (isArray(value)) {
      analysisObj.child = {};
      value.forEach((child, index) => {
        analysisObj.child[index] = child;
        if (checkIsNode(child)) {
          this.register(child, `${index}`, index, analysisObj);
        } else if (checkIsList(child)) {
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
        if (checkIsNode(child)) {
          this.register(child, property, index, analysisObj);
        } else if (checkIsList(child)) {
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

  _registerDuplicate(value, analysisObj) {
    const aNew = { sKey: analysisObj.sKey, path: analysisObj.path };
    const sKeyDupl = this.known.get(value);
    const duplObj = this.analyzed.get(sKeyDupl);
    const dupl = { sKey: duplObj.sKey, path: duplObj.path };
    this.duplicates.set(aNew, dupl);
    analysisObj.duplicate = this.duplicates.get(aNew.sKey);
    duplObj.duplicate = this.duplicates.get(dupl.sKey);
  }

  register(value, name, index, parrent) {
    const _index = this._createIndex(index);
    const _name = this._createName(name);
    if (checkIsNode(value)) {
      const analysisObj = makeAnalysisNode(value, _name, _index, parrent);
      this.analyzed.add(analysisObj);
      if (this.known.has(value) == false) {
        this.known.set(value, analysisObj.sKey);
      } else {
        this._registerDuplicate(value, analysisObj);
      }
      this._registerArrayChildren(value, analysisObj);
      this._registerObjectChildren(value, analysisObj);
    } else if (checkIsList(value)) {
      this._registerList(value, _name, _index, parrent);
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
