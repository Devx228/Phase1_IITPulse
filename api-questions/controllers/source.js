import SourceModel from "../models/Source.model.js";
import { uniqueId } from "../utils/utils.js";

export async function getSources(req, res) {
  try {
    const sources = await SourceModel.find();
    res.status(200).json(sources);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export async function getSource(req, res) {
  const { id } = req.params;
  try {
    const source = await SourceModel.findById(id);
    res.status(200).json(source);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export async function createSource(req, res) {
  const { name } = req.body;
  const newSource = new SourceModel({
    _id: uniqueId("SO"),
    name,
    createdAt: new Date().toISOString(),
    udpatedAt: new Date().toISOString(),
  });
  try {
    await newSource.save();
    return res.status(201).json(newSource);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function updateSource(req, res) {
  const { id, name } = req.body;

  try {
    const updatedSource = await SourceModel.findByIdAndUpdate(
      id,
      { name },
      {
        new: true,
      }
    );
    return res.json(updatedSource);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}

export async function deleteSource(req, res) {
  const { id } = req.params;
  await SourceModel.findByIdAndRemove(id);
  return res.json({ message: "Source deleted successfully." });
}
