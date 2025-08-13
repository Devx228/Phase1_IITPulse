import mongoose from "mongoose";
import { McqQuestion } from "../models/index.js";
import {
  createAutogenerateQuery,
  isValidObjectId,
  uniqueId,
} from "../utils/utils.js";

export const getChapter = async function (req, res, next) {
  try {
    res.status(200).json({ chapter: "circular motion" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getQuestionsByDifficulty = async function (req, res) {
  try {
    const { chapters, topics, difficulties } = req.query;
    console.log(difficulties);
    if (!difficulties)
      return res
        .status(500)
        .json({ status: "invalid", message: "Invalid Params" });
    // const result = await McqQuestion.find({
    //   difficulty: { $in: difficulties },
    // });
    const result = await McqQuestion.find({
      $or: [
        { difficulty: { $in: difficulties } },
        { chapter: { $in: chapters } },
        { topics: { $in: topics } },
      ],
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const autoGenerate = async function (req, res) {
  try {
    const {
      chapters = [],
      topics = [],
      difficulties,
      totalQuestions = 30,
      type,
      rejectedQuestions = [],
      subject,
    } = req.query;
    // Array of difficulty levels
    const difficultyLevels = ["easy", "medium", "hard"];

    // Generate queries for each difficulty level
    const difficultyQueries = difficultyLevels.map((level) => {
      const query = createAutogenerateQuery(req.query);
      query.difficulty = { $regex: new RegExp(level, "i") };
      return query;
    });

    const temp = JSON.parse(difficulties);

    const difficultyCounts = difficultyLevels.map((level) => {
      if (!temp[level]) {
        return Math.floor(totalQuestions / 3) + (totalQuestions % 3);
      }
      return temp[level];
    });

    const [easyCount, mediumCount, hardCount] = difficultyCounts;

    const questionsByDifficulty = await Promise.all(
      difficultyQueries.map((query, index) => {
        const count = [easyCount, mediumCount, hardCount][index];
        return McqQuestion.aggregate([
          { $match: query },
          { $sample: { size: count } },
        ]);
      })
    );

    const [easyQuestions, mediumQuestions, hardQuestions] =
      questionsByDifficulty;

    // console.log({ result1, result2, result3 });
    const result = [...easyQuestions, ...mediumQuestions, ...hardQuestions];
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getQuestions = async (req, res) => {
  let queries = {};
  let page = parseInt(req.query.page);
  let size = parseInt(req.query.size) || 10;
  if (req.query.subject) {
    queries.subject = { $regex: new RegExp(req.query.subject, "i") };
  }
  if (req.query.search) {
    queries["en.question"] = {
      $regex: new RegExp(req.query.search, "i"),
    };
  }

  const filters = {
    ...queries,
  };
  if (req.query.type) {
    filters.type = { $in: req.query.type };
  }
  if (req.query.difficulty) {
    filters.difficulty = { $in: req.query.difficulty };
  }
  if (req.query.sub) {
    filters.subject = { $in: req.query.sub };
  }

  if (req.query.chapters) {
    filters.chapters = { $elemMatch: { name: { $in: req.query.chapters } } };
  }

  if (req.query.topics) {
    filters["chapters.topics"] = { $elemMatch: { $in: req.query.topics } };
  }
  try {
    console.log(queries, filters);
    let totalDocs = (await McqQuestion.countDocuments(filters)) || 1;

    let questions = await McqQuestion.find(filters, { __v: 0 })
      .limit(size)
      .skip((page - 1) * size)
      .exec();

    let currentPage = page || 1;

    res.status(200).json({
      totalDocs,
      currentPage,
      data: questions.map((question) => {
        let newQuestion = question.toObject();
        newQuestion.id = newQuestion._id;
        delete newQuestion.__v;
        return newQuestion;
      }),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getQuestionsById = async function (req, res) {
  try {
    const id = req.params.id;
    // if (!isValidObjectId(id))
    //   return res.status(404).json({ message: `Invalid User id ${id}` });
    if (!id)
      return res.status(404).json({ message: `Invalid Question id ${id}` });
    const question = await McqQuestion.findById(id);
    res.status(200).json(question);
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};

export const createQuestion = async function (req, res) {
  try {
    // const { id } = req.body;
    if (!req.body.type)
      return res.status(400).json({ message: "type is required" });
    const id = uniqueId("Q" + req.body.type.toUpperCase().charAt(0));
    //console.log(req.body);
    await McqQuestion.create({ _id: id, ...req.body });
    res
      .status(200)
      .json({ message: `new mcqTypeQuestion created with id: ${id}` });
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};

export const createQuestionBulk = async function (req, res) {
  try {
    const data = req.body;
    const finalData = data?.map((item) => {
      if (!item.type)
        return res
          .status(400)
          .json({ message: "Type is required, not found in " + item.id });
      let id = uniqueId("Q" + item.type.toUpperCase().charAt(0));
      delete item.id;
      return { _id: id, ...item };
    });
    await McqQuestion.insertMany(finalData);
    res.status(200).json({ message: `new questions created` });
  } catch (error) {
    console.log(error.message);
    res.status(501).send({ message: error.message });
  }
};

export const updateQuestion = async function (req, res) {
  try {
    const id = req.params.id;
    const {
      description,
      correctAnswers,
      sources,
      subject,
      topics,
      chapters,
      difficulty, // easy | medium | hard
      isProofRead,
      modifiedAt,
      uploadedBy,
      options,
      en,
      hi,
      exams,
    } = req.body;
    const response = await McqQuestion.findByIdAndUpdate(
      id,
      {
        description,
        correctAnswers,
        sources,
        subject,
        topics,
        chapters,
        difficulty, // easy | medium | hard
        isProofRead,
        modifiedAt,
        uploadedBy,
        en,
        hi,
        options,
        exams,
      },
      { new: true }
    );

    res
      .status(200)
      .json({ message: `mcqType question Updated with id: ${id}`, response });
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};

export const deleteQuestion = async function (req, res) {
  try {
    const id = req.body.id;
    console.log(id);
    await McqQuestion.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: `mcqTypeQuestion is deleted with id: ${id}` });
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};
