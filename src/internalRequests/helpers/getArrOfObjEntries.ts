import { AdminProductInterface } from "../interfaces/adminProductINterface";

export const getArrOfObjEntries = (obj: Partial<AdminProductInterface>) => {
  let keys = Object.keys(obj);
  let values = Object.values(obj);
  keys = keys.map((item) => (item = `"${item}"`));
  values = values.map((item) => (item = `'${item}'`));
  return { keys, values };
};
