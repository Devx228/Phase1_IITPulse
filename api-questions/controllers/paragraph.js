import mongoose from "mongoose";
import { ParagraphModel } from "../models/index.js";
import { isValidObjectId, uniqueId } from "../utils/utils.js";

export const getQuestions = async function (req, res) {
  try {
    const questions = await ParagraphModel.find();
    res.status(200).json({ questions });
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};

export const getQuestionById = async function (req, res) {
  try {
    const id = req.params.id;
    // if (!isValidObjectId(id))
    //   return res.status(404).json({ message: `Invalid User id ${id}` });
    if (!id)
      return res.status(404).json({ message: `Invalid Question id ${id}` });
    const question = await ParagraphModel.findById(id);
    res.status(200).json(question);
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};

export const createQuestion = async function (req, res) {
  // const { id } = req.body;
  let id = uniqueId("QP");
  console.log({ data: req?.body });
  let newData = {
    _id: id,
    ...req.body,
    questions: req.body.questions.map((item) => {
      delete item.id;
      return {
        _id: uniqueId("Q" + item.type.toUpperCase().charAt(0)),
        ...item,
      };
    }),
  };
  delete newData.id;
  try {
    const result = await ParagraphModel.create(newData);
    console.log({ newData });
    res.status(200).json({
      message: `new numericalTypeQuestion created with id: ${id}`,
      result,
    });
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};

export const createQuestionBulk = async function (req, res) {
  try {
    const data = req.body;
    const finalData = data?.map((paragraph) => {
      if (!paragraph.type)
        return res
          .status(400)
          .json({ message: "Type is required, not found in " + paragraph.id });
      delete paragraph.id;

      return {
        _id: uniqueId("QP"),
        ...paragraph,
        questions: paragraph.questions.map((question) => {
          delete question.id;
          return {
            _id: uniqueId("Q" + question.type.toUpperCase().charAt(0)),
            ...question,
          };
        }),
      };
    });
    const result = await ParagraphModel.insertMany(finalData);
    res.status(200).json({
      message: `New paragraph questions created, TotalCount ${result?.length}`,
    });
  } catch (error) {
    console.log("ERROR_createQuestionBulk", error.message);
    res.status(501).send({ message: error.message });
  }
};

export const updateQuestion = async function (req, res) {
  try {
    const id = req.params.id;
    const {
      description,
      correctAnswer, // Option<Range> | Option<Digit>,
      sources,
      subject,
      chapters,
      topics,
      difficulty, // easy | medium | hard
      isProofRead,
      modifiedAt,
      uploadedBy,
      en,
      hi,
      exams,
      questions,
    } = req.body;

    const response = await ParagraphModel.findByIdAndUpdate(
      id,
      {
        description,
        correctAnswer, // Option<Range> | Option<Digit>,
        sources,
        subject,
        chapters,
        topics,
        difficulty, // easy | medium | hard
        isProofRead,
        modifiedAt,
        exams,
        en,
        hi,
        uploadedBy,
        questions,
      },
      { new: true }
    );
    console.log({ response });
    res.status(200).json({
      message: `Numerical Type question Updated with id: ${id}`,
      response,
    });
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};

export const autoGenerateInteger = async function (req, res) {
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
    const queries = {};

    if (chapters && chapters.length) {
      queries.chapters = { $in: chapters };
    }
    // if (topics && topics.length) {
    //   queries.push({ topic: { $in: topics } });
    // }
    if (subject) {
      queries.subject = { $regex: new RegExp(subject, "i") };
    }
    if (type) {
      queries.type = { $regex: new RegExp(type, "i") };
    }

    if (rejectedQuestions && rejectedQuestions.length) {
      queries._id = { $nin: rejectedQuestions };
    }

    let q1 = { ...queries };
    let q2 = { ...queries };
    let q3 = { ...queries };
    q1.difficulty = { $regex: new RegExp("easy", "i") };
    q2.difficulty = { $regex: new RegExp("medium", "i") };
    q3.difficulty = { $regex: new RegExp("hard", "i") };

    console.log(q1, q2, q3, "typeeee");
    let temp = JSON.parse(difficulties);
    console.log(temp);

    let easyCount = 0,
      mediumCount = 0,
      hardCount = 0;

    if (!temp.easy && !temp.medium && !temp.hard) {
      easyCount = Math.floor(totalQuestions / 3) + (totalQuestions % 3);
      mediumCount = Math.floor(totalQuestions / 3) + (totalQuestions % 3);
      hardCount = Math.floor(totalQuestions / 3) + (totalQuestions % 3);
    } else {
      easyCount = temp.easy;
      mediumCount = temp.medium;
      hardCount = temp.hard;
    }

    let easyQuestions =
      (await ParagraphModel.aggregate([
        {
          $match: q1,
        },
        { $sample: { size: easyCount } },
      ])) || [];

    let mediumQuestions =
      (await ParagraphModel.aggregate([
        {
          $match: q2,
        },
        { $sample: { size: mediumCount } },
      ])) || [];

    let hardQuestions =
      (await ParagraphModel.aggregate([
        {
          $match: q3,
        },
        { $sample: { size: hardCount } },
      ])) || [];

    // console.log({ result1, result2, result3 });
    const result = [...easyQuestions, ...mediumQuestions, ...hardQuestions];
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteQuestion = async function (req, res) {
  try {
    const id = req.body.id;

    await ParagraphModel.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: `numericalTypeQuestion is deleted with id: ${id}` });
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};
