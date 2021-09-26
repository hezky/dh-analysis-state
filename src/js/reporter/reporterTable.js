const reporterTable = function () {
  const groups = this.duplicates.getStoreGroup();
  let first = true;
  for (const keyGroup in groups) {
    // log empty line
    if (first === false) {
      console.log();
    } else {
      first = false;
    }
    const group = groups[keyGroup];
    let paths = [];
    for (const sKey in group) {
      const path = group[sKey];
      paths.push(path);
    }
    paths = paths.sort();
    console.groupCollapsed(`group : ${keyGroup}`);
    console.table(paths);
    console.groupEnd();
  }
};

export default reporterTable;
