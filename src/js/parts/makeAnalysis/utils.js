const makeAtributeDeep = (parrent) => (parrent ? parrent.deep + 1 : 0);

const makeAtributeSKey = (index, parrent) =>
  parrent ? `${parrent.sKey}.${index}` : `${index}`;

const makeAtributePath = (name = "", parrent) => {
  let result = "";
  result += parrent?.path?.length ? `${parrent.path}/` : ``;
  result += name;
  return result;
};

export { makeAtributeDeep, makeAtributeSKey, makeAtributePath };
