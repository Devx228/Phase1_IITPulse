import mongoose from "mongoose";
import { v4 as uuid } from "uuid";

export function isValidObjectId(id) {
  return id.includes("IITP_");
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

// Function to generate query objects
export function createAutogenerateQuery(filters) {
  const query = {};

  if (filters.chapters && filters.chapters.length) {
    query.chapters = { $in: filters.chapters };
  }

  if (filters.topics && filters.topics.length) {
    query.topic = { $in: filters.topics };
  }

  if (filters.subject) {
    query.subject = { $regex: new RegExp(filters.subject, "i") };
  }

  if (filters.type) {
    query.type = { $regex: new RegExp(filters.type, "i") };
  }

  if (filters.rejectedQuestions && filters.rejectedQuestions.length) {
    query._id = { $nin: filters.rejectedQuestions };
  }

  return query;
}
