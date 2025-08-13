import mongoose from "mongoose";
import { TestModel, TestResponse } from "../models/index.js";
import { ResultForOneStudent } from "../support.js";

async function findAndUpdateTestResponse(test, result, user) {
  const query = { _id: test.id };
  const submittedByField = `submittedBy.${user.id}`;

  const prevTest = await TestResponse.findById(test.id);

  let {
    highestMarks = 0,
    lowestMarks = 0,
    averageMarks = 0,
    totalAppeared = 0,
    averageCompletionTimeInSeconds = 0,
  } = prevTest || {};

  highestMarks = Math.max(highestMarks, parseInt(result.totalMarks));
  lowestMarks = Math.min(lowestMarks, parseInt(result.totalMarks));
  totalAppeared += 1;
  averageMarks =
    (averageMarks * (totalAppeared - 1) + parseInt(result.totalMarks)) /
    totalAppeared;
  averageCompletionTimeInSeconds =
    (averageCompletionTimeInSeconds * (totalAppeared - 1) +
      parseInt(result.totalTimeTakenInSeconds)) /
    totalAppeared;

  const update = {
    [submittedByField]: result,
    highestMarks,
    lowestMarks,
    averageMarks,
    totalAppeared,
    averageCompletionTimeInSeconds,
    modifiedAt: new Date().toISOString(),
  };

  const options = { upsert: true, new: true, setDefaultsOnInsert: true };

  return TestResponse.findOneAndUpdate(query, update, options);
}

async function updateUserTestAttempt(user, testId) {
  return mongoose.connection.db.collection("users").updateOne(
    { _id: user.id },
    {
      $push: {
        attemptedTests: {
          submittedOn: new Date().toISOString(),
          testId: testId,
        },
      },
    }
  );
}

export const Result = async (req, res) => {
  try {
    const { user, test } = req.body;

    if (!test.id) {
      return res
        .status(404)
        .json({ status: "error", message: "Test ID not found" });
    }

    const hasAlreadySubmitted = await TestResponse.exists({
      _id: test.id,
      [`submittedBy.${user.id}.id`]: test.id,
    });

    if (hasAlreadySubmitted) {
      return res.status(403).json({
        status: "failed",
        message: "Test already submitted by user.",
      });
    }

    const actualTest = await TestModel.findById(test.id);
    if (!actualTest) {
      return res
        .status(404)
        .json({ status: "error", message: "test not found" });
    }

    const { result, actualTestModified } = ResultForOneStudent(
      actualTest,
      test
    );

    await findAndUpdateTestResponse(test, result, user);
    await updateUserTestAttempt(user, test.id);

    actualTestModified.result = {
      averageCompletionTimeInSeconds: result.averageCompletionTimeInSeconds,
      averageMarks: result.averageMarks,
      highestMarks: result.highestMarks,
      lowestMarks: result.lowestMarks,
      students: [
        ...actualTestModified.result.students,
        {
          _id: req.user.id,
          name: req.user.name,
          marks: result.totalMarks,
          submittedOn: new Date().toISOString(),
        },
      ],
    };

    await TestModel.findByIdAndUpdate({ _id: test.id }, actualTestModified);

    res.status(200).json({ status: "success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
