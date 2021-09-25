const defaultReporter = function () {
  const groups = this.duplicates.getStoreGroup();
  let first = true;
  for (const keyGroup in groups) {
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
    console.log(`group : ${keyGroup}`);
    paths.forEach((path) => {
      console.log(` - ${path}`);
    });
  }
};

export default defaultReporter;
