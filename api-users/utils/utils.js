import { v4 as uuid } from "uuid";

export const checkIfValidUUID = (uuid) => {
  let str = "" + uuid;

  str = str.match(
    "/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi"
  );
  console.log(str);
  //   if (str === null) {
  //     return false;
  //   }
  return true;
};

export const getFutureDate = (days) => {
  return new Date(new Date().setDate(new Date().getDate() + 400)).toISOString();
};
export function uniqueId(prefix = "", suffix = "") {
  let id = uuid().replace(/-/g, "_");
  if (prefix.length && suffix.length) {
    return `${prefix}_${id}_${suffix}`;
  } else if (prefix.length) {
    return `${prefix}_${id}`;
  } else if (suffix.length) {
    return `${id}_${suffix}`;
  } else {
    return id;
  }
}
export const getCurrentDate = () => {
  return new Date().toISOString();
};
