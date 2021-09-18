/* eslint-disable */

let defaultReporter = function () {
  const groups = this.duplicates.storeGroup;
  for (const propsG in groups) {
    const group = groups[propsG];
    let paths = [];
    let propsK;
    for (propsK in group) {
      const path = group[propsK];
      paths.push(path);
    }
    paths = paths.sort();
    console.groupCollapsed(`group : ${propsG}`);
    console.table(paths);
    console.groupEnd();
  }
};

export default defaultReporter;
