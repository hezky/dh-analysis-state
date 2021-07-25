let defaultReporter = function () {
  const groups = this.duplicates.storeGroup;
  for (const propsG in groups) {
    const group = groups[propsG];
    let paths = [];
    for (const propsK in group) {
      const path = group[propsK];
      paths.push(path);
    }
    paths = paths.sort();
    console.log(`group : ${propsG}`);
    paths.forEach((path) => {
      console.log(` - ${path}`);
    });
    console.log();
  }
};

export default defaultReporter;
