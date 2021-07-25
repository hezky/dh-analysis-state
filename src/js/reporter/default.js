let defaultReporter = function () {
  const groups = this.duplicates.storeGroup;
  for (const propsG in groups) {
    const group = groups[propsG];
    console.log(`group : ${propsG}`);
    for (const propsK in group) {
      const path = group[propsK];
      console.log(` - ${path}`);
    }
    console.log();
  }
};

export default defaultReporter;
