import { v4 as uuid } from "uuid";
export function isValidObjectId(id) {
  return id.includes("IITP");
}

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
