import ClassModel from "../models/Class.model.js";
import { uniqueId } from "../utils/utils.js";

export async function getClasses(req, res) {
  try {
    const sources = await ClassModel.find();
    res.status(200).json(sources);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export async function getClass(req, res) {
  const { id } = req.params;
  try {
    const source = await ClassModel.findById(id);
    res.status(200).json(source);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export async function createClass(req, res) {
  const { name, fullName, createdBy } = req.body;
  console.log(req.body);
  const newClass = new ClassModel({
    _id: uniqueId("CL"),
    name,
    fullName,
    createdAt: new Date().toISOString(),
    modifiedAt: new Date().toISOString(),
    createdBy,
  });
  try {
    await newClass.save();
    return res.status(201).json(newClass);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}

export async function updateClass(req, res) {
  const { id, name, fullName } = req.body;

  try {
    const updatedClass = await ClassModel.findByIdAndUpdate(
      id,
      { name, fullName },
      {
        new: true,
      }
    );
    return res.json(updatedClass);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}

export async function deleteClass(req, res) {
  const { id } = req.params;
  await ClassModel.findByIdAndRemove(id);
  return res.json({ message: "Class deleted successfully." });
}
