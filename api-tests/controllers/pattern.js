import { PatternModel } from "../models/index.js";
import { isValidObjectId, uniqueId } from "../utils/utils.js";

export const getPatterns = async function (req, res) {
  try {
    const result = await PatternModel.find().sort({ createdAt: -1 });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPatternById = async function (req, res) {
  try {
    const id = req.query.id;
    if (!id) {
      return res.status(400).json({ message: "Invalid id " + id });
    }
    const result = await PatternModel.findById(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPatternsByExam = async function (req, res) {
  try {
    const { exam } = req.query;
    console.log("EXAMMMM", exam);
    const result = await PatternModel.find({ exam: exam });
    console.log("RESULTTTTTT", result);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPattern = async function (req, res) {
  try {
    const { sections } = req.body;
    let pattern = {
      ...req.body,
      _id: uniqueId("PT"), //PT_uuid
      sections: sections.map((sec) => ({
        ...sec,
        id: uniqueId("PT_SE_" + sec.subject.slice(0, 3).toUpperCase()),
        subSections: sec.subSections.map((sub) => ({
          ...sub,
          id: uniqueId("PT_SS_" + sub.type.toUpperCase()),
        })),
      })),
    };
    console.log("pattern", pattern);
    const result = await PatternModel.create(pattern);
    res.status(200).json({ message: `Pattern created with id ${pattern._id}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update pattern by id
export const updatePattern = async function (req, res) {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ message: "Invalid id " + id });
    }
    console.log("body", req.body);
    console.log("id", id);
    const patternWithoutId = { ...req.body };
    delete patternWithoutId._id;
    console.log("patternWithoutId", patternWithoutId);
    const result = await PatternModel.findByIdAndUpdate(id, patternWithoutId);
    res.status(200).json({ message: `Pattern updated with id ${id}` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// delete pattern by id
export const deletePattern = async function (req, res) {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ message: "Invalid id " + id });
    }
    const result = await PatternModel.findByIdAndDelete(id);
    res.status(200).json({ message: `Pattern deleted with id ${id}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
