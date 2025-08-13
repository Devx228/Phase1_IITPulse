import ExamModel from "../models/Exam.model.js";
import { uniqueId } from "../utils/utils.js";

export async function createExam(req, res) {
  try {
    const { name, fullName } = req.body;
    const body = {
      _id: uniqueId("EX"),
      name,
      fullName,
      createdBy: req?.user,
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
    };
    const newExam = new ExamModel(body);
    await newExam.save();
    res.status(201).json(newExam);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getExams(req, res) {
  try {
    const exams = await ExamModel.find();
    res.status(200).json(exams);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

export async function updateExam(req, res) {
  try {
    const { name, fullName, id: examId } = req.body;
    const body = {
      ...req.body,
      name,
      fullName,
      modifiedAt: new Date().toISOString(),
    };
    const updatedExam = await ExamModel.findByIdAndUpdate(examId, body, {
      new: true,
    });
    res.status(200).json(updatedExam);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteExam(req, res) {
  try {
    const { id: examId } = req.params;
    console.log(req.query, req.params);
    console.log(examId);
    const deletedExam = await ExamModel.findByIdAndDelete(examId);
    res.status(200).json(deletedExam);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
