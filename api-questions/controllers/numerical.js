import mongoose from "mongoose";
import { NumericalQuestion } from "../models/index.js";
import { isValidObjectId, uniqueId } from "../utils/utils.js";

export const getQuestions = async function (req, res) {
  try {
    const questions = await NumericalQuestion.find();
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
    const question = await NumericalQuestion.findById(id);
    res.status(200).json(question);
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};

export const createQuestion = async function (req, res) {
  // const { id } = req.body;
  let id = uniqueId("QI");
  console.log({ data: req?.body });
  try {
    const result = await NumericalQuestion.create({ _id: id, ...req.body });
    res
      .status(200)
      .json({ message: `new numericalTypeQuestion created with id: ${id}` });
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
      const id = uniqueId("QI");
      delete item.id;
      return { _id: id, ...item };
    });
    await NumericalQuestion.insertMany(finalData);
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
    } = req.body;
    console.log({ hello: "jskdf", count: "2" });
    const response = await NumericalQuestion.findByIdAndUpdate(
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
      (await NumericalQuestion.aggregate([
        {
          $match: q1,
        },
        { $sample: { size: easyCount } },
      ])) || [];

    let mediumQuestions =
      (await NumericalQuestion.aggregate([
        {
          $match: q2,
        },
        { $sample: { size: mediumCount } },
      ])) || [];

    let hardQuestions =
      (await NumericalQuestion.aggregate([
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

    await NumericalQuestion.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: `numericalTypeQuestion is deleted with id: ${id}` });
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};
