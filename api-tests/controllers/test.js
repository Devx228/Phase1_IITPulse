import mongoose from "mongoose";
import { isValidObjectId, uniqueId } from "../utils/utils.js";
import { TestModel, TestResponse } from "../models/index.js";

export const getTest = async function (req, res) {
  try {
    let queries = buildQueryFromRequest(req);
    const result = await TestModel.find(queries).sort({ createdAt: -1 });
    res.status(200).json(result);
  } catch (error) {
    handleError(res, error, 400, "Failed to get test");
  }
};

export const getRecentTest = async function (req, res) {
  try {
    const count = parseInt(req.query.count || 1);
    const tests = await getRecentTestsFromModel(count);
    const testResponse = await getTestResponses(tests);
    const responseData = buildRecentTestResponseData(tests, testResponse);
    res.status(200).json(responseData);
  } catch (error) {
    handleError(res, error, 400, "Failed to get recent test");
  }
};

export const getTestByStudent = async function (req, res) {
  try {
    const id = req.params.id || req.query.id;
    if (!id) {
      return res.status(400).json({ message: "Test ID not found" });
    }
    const result = await TestModel.findById(id);
    if (!result) {
      return res.status(404).json({ message: "Test not found" });
    }
    const newObj = transformTestResult(result);
    res.status(200).json(newObj);
  } catch (error) {
    handleError(res, error, 404, "Failed to get test by student");
  }
};

export async function getTestResultAdmin(req, res) {
  const { testId } = req.query;

  if (!testId) {
    return res.status(400).json({ message: "Test Id not found" });
  }

  try {
    const test = await TestModel.findById(testId);
    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }

    const testResponse = await TestResponse.findById(testId, { __v: 0 });
    if (!testResponse) {
      return res.status(404).json({ message: "Test Response not found" });
    }

    const result = formatTestResultForAdmin(test, testResponse);
    res.status(200).json(result);
  } catch (error) {
    console.error("TEST_RESULT_ERROR", error);
    res.status(400).json({ message: error.message });
  }
}

function formatTestResultForAdmin(test, testResponse) {
  return {
    ...extractTestDetails(test),
    ...extractTestResponseDetails(testResponse),
    testId: test._id,
  };
}

function extractTestDetails(test) {
  return test.toObject().result; // Assuming 'result' contains relevant test details
}

function extractTestResponseDetails(testResponse) {
  return testResponse.toObject(); // Convert Mongoose document to a plain object
}

export async function getTestResultByStudent(req, res) {
  const { testId, studentId } = req.query;

  if (!testId) {
    return res.status(400).json({ message: "Invalid Test ID" });
  }

  try {
    const resultObj = await TestResponse.findById(
      testId,
      getTestResponseProjection(studentId)
    );
    const testObj = await TestModel.findById(testId);

    if (!resultObj || !testObj) {
      return res.status(404).json({ message: "Test not found" });
    }

    let studentResult = resultObj.submittedBy[studentId];
    if (!studentResult || !studentResult.sections) {
      return res
        .status(404)
        .json({ message: "Test not submitted by the user yet" });
    }

    const compiledResult = compileStudentTestResult(
      studentId,
      studentResult,
      testObj,
      resultObj
    );
    res.status(200).json(compiledResult);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
}

function getTestResponseProjection(studentId) {
  return {
    averageMarks: 1,
    averageCompletionTimeInSeconds: 1,
    highestMarks: 1,
    lowestMarks: 1,
    totalAppeared: 1,
    [`submittedBy.${studentId}`]: 1,
  };
}

function compileStudentTestResult(
  studentId,
  studentResult,
  testObj,
  resultObj
) {
  let totalMarks = 0,
    totalQues = 0,
    attempted = 0;

  const finalStudentResultSections = studentResult.sections.map(
    (sec, secIndex) => {
      return {
        ...sec,
        subSections: sec.subSections.map((subSec, subSecIndex) => {
          let maxMarks = getMaxMarks(subSec.markingScheme.correct);
          totalMarks += parseInt(subSec.toBeAttempted) * maxMarks;
          totalQues += subSec.totalQuestions;
          return formatSubSection(
            subSec,
            testObj,
            secIndex,
            subSecIndex,
            () => attempted++
          );
        }),
      };
    }
  );

  studentResult.sections = finalStudentResultSections;

  return {
    ...studentResult,
    averageMarks: resultObj.averageMarks,
    averageCompletionTimeInSeconds: resultObj.averageCompletionTimeInSeconds,
    highestMarks: resultObj.highestMarks,
    lowestMarks: resultObj.lowestMarks,
    totalAppeared: resultObj.totalAppeared,
    marksObtained: studentResult.totalMarks,
    totalMarks,
    totalQuestions: totalQues,
    attempted,
  };
}

function getMaxMarks(marksArray) {
  return marksArray.reduce((max, mark) => Math.max(max, mark), 0);
}

function formatSubSection(
  subSection,
  testObj,
  secIndex,
  subSecIndex,
  incrementAttempted
) {
  return {
    ...subSection,
    questions: Object.values(subSection.questions).map((ques, quesIndex) => {
      if (ques.selectedOptions.length > 0) incrementAttempted();
      return {
        ...ques,
        ...extractQuestionDetails(testObj, secIndex, subSecIndex, quesIndex),
      };
    }),
  };
}

function extractQuestionDetails(testObj, secIndex, subSecIndex, quesIndex) {
  const question =
    testObj.sections[secIndex].subSections[subSecIndex].questions[quesIndex];
  return {
    en: question.en,
    hi: question.hi,
    correctAnswersTest: question.correctAnswers,
    difficulty: question.difficulty,
    subject: question.subject,
    chapters: question.chapters,
    topics: question.topics,
    averageTimeTakenInSeconds: question.averageTimeTakenInSeconds,
    quickestResponse: question.quickestResponse,
  };
}

export const getTestById = async function (req, res) {
  try {
    const id = req.params.id || req.query.id;
    if (!id) {
      return res.status(400).json({ message: "Test ID not found" });
    }
    const result = await TestModel.findById(id);
    return res.status(200).json(result);
  } catch (error) {
    handleError(res, error, 400, "Failed to get test by ID");
  }
};

export const createTest = async function (req, res) {
  try {
    let id = uniqueId("TT");
    const result = await TestModel.create({ _id: id, ...req.body });
    res.status(200).json({
      message: `New test created with id: ${id}`,
      data: result,
    });
  } catch (error) {
    handleError(res, error, 400, "Failed to create test");
  }
};

export const updateTest = async function (req, res) {
  try {
    const id = req.body._id;
    if (!id) {
      return res.status(400).json({ message: "Invalid ID" });
    }
    const updatedTest = await TestModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res
      .status(200)
      .json({ message: `Test updated with id: ${updatedTest._id}` });
  } catch (error) {
    handleError(res, error, 400, "Failed to update test");
  }
};

export const deleteTest = async function (req, res) {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ message: "Invalid test id" });

    await TestModel.findByIdAndDelete(id);
    res.status(200).json({ message: `Test deleted with id: ${id}` });
  } catch (error) {
    handleError(res, error, 400, "Failed to delete test");
  }
};

function getSafeQuestions(questions) {
  let safeQuestions = [];
  if (!questions || !questions.length) return safeQuestions;
  for (let key = 0; key < questions?.length; key++) {
    const value = questions[key];
    safeQuestions[key] = {
      id: value._id,
      markingScheme: value.markingScheme,
      en: {
        question: value.en.question,
        options: value.en.options,
        solution: value.en.solution,
      },
      hi: {
        question: value.hi.question,
        options: value.hi.options,
        solution: value.hi.solution,
      },
      type: value.type,
    };
  }

  return suffleQuestion(safeQuestions);
}

export const validateKey = async (req, res) => {
  try {
    const { key, testId } = req.body;
    const test = await TestModel.findById(testId);
    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }
    if (test.testAccessKeys[userId] !== key) {
      return res.status(401).json({ status: "error", message: "Invalid key" });
    }
    res.status(200).json({ message: "Test found" });
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};

function suffleQuestion(questions) {
  let length = questions.length;
  let temp = Array(length).fill(null);
  let set = new Set();
  questions.forEach((item) => {
    let randomInteger = getRandInteger(0, length);
    while (set.has(randomInteger)) {
      randomInteger = getRandInteger(0, length);
    }
    set.add(randomInteger);
    temp[randomInteger] = item;
  });
  return temp;
}

function getRandInteger(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  let randomIndex = Math.floor(Math.random() * (max - min)) + min;
  //console.log(randomIndex);
  return randomIndex;
}

function buildQueryFromRequest(req) {
  let queries = {};
  if (req.query.status) {
    const regex = new RegExp(`(?:^|\W)${req.query.status}(?:$|\W)`, "i");
    queries.status = regex;
  }
  if (req.query.batch && req.query.batch.length !== 0) {
    queries["batches._id"] = { $in: [req.query.batch] };
  }
  const userId = req.userId;
  if (userId && req.query.excludeAttempted === "true") {
    queries["result.students._id"] = { $nin: [userId] };
  }
  return queries;
}

function handleError(res, error, statusCode, defaultMessage) {
  console.error(error);
  res.status(statusCode).json({ message: error.message || defaultMessage });
}

function getRecentTestsFromModel(count) {
  return TestModel.find(
    {
      $or: [
        { "result.publishProps.isPublished": true },
        { "result.publishProps.type": "immediately" },
      ],
    },
    "_id name"
  )
    .sort({ createdAt: -1 })
    .limit(count);
}

function getTestResponses(tests) {
  return TestResponse.find(
    {
      testId: { $in: tests.map((test) => test._id) },
    },
    "_id averageMarks highestMarks lowestMarks totalAppeared"
  );
}

function buildRecentTestResponseData(tests, testResponses) {
  return testResponses.map((item) => {
    return {
      id: item._id,
      name: tests.find((test) => test._id.toString() === item._id.toString())
        ?.name,
      highestMarks: item.highestMarks,
      lowestMarks: item.lowestMarks,
      averageMarks: item.averageMarks,
      totalAppeared: item.totalAppeared,
    };
  });
}

function transformTestResult(result) {
  const resMongoToJsObj = { ...result.toObject() };
  return {
    ...resMongoToJsObj,
    id: resMongoToJsObj._id,
    sections: resMongoToJsObj.sections.map((sec) => ({
      ...sec,
      subSections: sec.subSections.map((subSec) => ({
        ...subSec,
        questions: getSafeQuestions(subSec.questions),
      })),
    })),
  };
}
