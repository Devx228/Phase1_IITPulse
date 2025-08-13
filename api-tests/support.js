import { TestModel } from "./models/index.js";

const updateAttemptedQuestions = (subSection, question, actualTestQuestion) => {
  if (
    subSection.type === "single" ||
    subSection.type === "multiple" ||
    subSection.type === "integer"
  ) {
    if (question.selectedOptions.length > 0 || question.enteredAnswer) {
      if (actualTestQuestion.attemptedBy) {
        actualTestQuestion.attemptedBy += 1;
      } else {
        actualTestQuestion.attemptedBy = 1;
      }
    }
  }
};

const updateOptionsAttempted = (selectedOptions, actualTestQuestion) => {
  actualTestQuestion.en.options.forEach((option) => {
    if (selectedOptions.includes(option.id)) {
      option.attemptedBy = option.attemptedBy + 1;
    }
  });
  actualTestQuestion.hi.options.forEach((option) => {
    if (selectedOptions.includes(option.id)) {
      option.attemptedBy = option.attemptedBy + 1;
    }
  });
};

const updateAverageTimeTaken = (
  timeTakenInSeconds,
  oldAttemptedBy,
  actualTestQuestion
) => {
  const avg = actualTestQuestion.averageTimeTakenInSeconds;
  actualTestQuestion.averageTimeTakenInSeconds = timeTakenInSeconds
    ? avg
      ? (avg * oldAttemptedBy + timeTakenInSeconds) / (oldAttemptedBy + 1)
      : timeTakenInSeconds
    : avg;
};

const updateQuickestResponse = (timeTakenInSeconds, actualTestQuestion) => {
  const quickestResponse = actualTestQuestion.quickestResponse;
  actualTestQuestion.quickestResponse = quickestResponse
    ? Math.min(quickestResponse, timeTakenInSeconds)
    : timeTakenInSeconds;
};

const calculateQuestionMarks = (
  type,
  markingScheme,
  correctAnswers,
  question
) => {
  let marks = 0,
    wrong = [],
    correct = [];

  if (type === "multiple") {
    for (const option of question.selectedOptions) {
      if (!correctAnswers.includes(option)) {
        marks = markingScheme.incorrect;
        break;
      } else {
        marks = markingScheme.correct[correct.indexOf(option)];
        correct.push(option);
      }
    }
    wrong = question.selectedOptions.filter(
      (option) => !correctAnswers.includes(option)
    );
  } else if (type === "integer") {
    const { from, to } = correctAnswers;
    const enteredAnswer = parseFloat(question.enteredAnswer);
    if (enteredAnswer != null && enteredAnswer >= from && enteredAnswer <= to) {
      marks += markingScheme.correct[0];
      correct.push(enteredAnswer);
    } else {
      marks += markingScheme.incorrect;
      wrong.push(enteredAnswer);
    }
  } else if (type === "single") {
    if (question.selectedOptions[0] == null) {
      // when no option is selected no marks is added or deducted
    } else if (correctAnswers.includes(question.selectedOptions[0])) {
      marks = markingScheme.correct[0];
      correct.push(question.selectedOptions[0]);
      // when answer is correct
    } else {
      // when answer is incorrect
      marks = markingScheme.incorrect;
      wrong.push(question.selectedOptions[0]);
    }
  }
  return { marks, wrong, correct };
};

const ResultForOneStudent = function (actualTest, studentResponse) {
  try {
    const studentTestResponse = studentResponse;
    let totalMarks = 0,
      totalTime = 0;
    let finalStudentResponse = { ...studentTestResponse };

    studentTestResponse.sections.forEach((section, si) => {
      section.subSections.forEach((subSection, subi) => {
        Object.values(subSection.questions).forEach((question, i) => {
          const actualTestQuestion =
            actualTest.sections[si].subSections[subi].questions[i];
          const oldAttemptedBy = actualTestQuestion.attemptedBy || 0;

          updateAttemptedQuestions(subSection, question, actualTestQuestion);

          if (subSection.type === "single" || subSection.type === "multiple") {
            updateOptionsAttempted(
              question.selectedOptions,
              actualTestQuestion
            );
          }

          const timeTakenInSeconds =
            parseInt(question.status.timeTakenInSeconds) || 0;

          updateAverageTimeTaken(
            timeTakenInSeconds,
            oldAttemptedBy,
            actualTestQuestion
          );
          updateQuickestResponse(timeTakenInSeconds, actualTestQuestion);

          totalTime += timeTakenInSeconds;

          const sectionIndex = actualTest.sections.findIndex(
            (sec) => sec.id === section.id
          );
          const currentSection = actualTest.sections[sectionIndex];
          const subSectionIndex = currentSection.subSections.findIndex(
            (subSec) => subSec.id === subSection.id
          );
          const currentSubSection = currentSection.subSections[subSectionIndex];

          const correctAnswers =
            currentSubSection.questions
              ?.map((quest) => quest.correctAnswers)
              .flat() || [];
          const markingScheme = currentSubSection.markingScheme;

          const { marks, wrong, correct } = calculateQuestionMarks(
            subSection.type,
            markingScheme,
            correctAnswers,
            question
          );

          totalMarks += parseInt(marks) ? parseInt(marks) : 0;

          finalStudentResponse.sections[sectionIndex].subSections[
            subSectionIndex
          ].questions[question.id] = {
            id: question.id,
            selectedOptions: question.selectedOptions,
            marks: marks,
            wrongAnswers: wrong,
            correctAnswers: correct,
            timeTakenInSeconds,
          };
        });
      });
    });

    finalStudentResponse.totalMarks = totalMarks;
    finalStudentResponse.totalTimeTakenInSeconds = totalTime;

    return { result: finalStudentResponse, actualTestModified: actualTest };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export { ResultForOneStudent };
