import mongoose from "mongoose";

export const QuestionObjective = {
  id: String, // QT_MCQ123
  selectedOptions: [String],
  marks: Number,
  wrongAnswers: [String],
  correctAnswers: [String],
  timeTakenInSeconds: Number,
  _id: false,
};

export const QuestionInteger = {
  id: String, // QT_MCQ123
  marks: Number,
  wrongAnswers: Number,
  enteredAnswer: Number,
  correctAnswers: {
    from: Number,
    to: Number,
  },
  timeTakenInSeconds: Number,
  _id: false,
};

const ResponseSchema = mongoose.Schema({
  id: String,
  userType: String,
  sections: [
    {
      id: String,
      subSections: [
        {
          id: String,
          questions: {
            type: Object,
            of:
              mongoose.Schema(QuestionObjective) ||
              mongoose.Schema(QuestionInteger),
          },
          _id: false,
        },
      ],
      _id: false,
    },
  ],
  status: String,
  validity: {
    from: String,
    to: String,
  },
  createdAt: String,
  modifiedAt: String,
  totalMarks: Number,
  totalTimeTakenInSeconds: Number,
  _id: false,
});

const TestResponseSchema = mongoose.Schema(
  {
    _id: { type: String, required: true }, // TR_ABCSXYZ
    highestMarks: Number,
    averageMarks: Number,
    lowestMarks: Number,
    totalAppeared: Number,
    averageCompletionTimeInSeconds: Number,
    modifiedAt: String,
    submittedBy: {
      type: Object,
      of: ResponseSchema,
    },
  },
  {
    collection: "testResponse",
  }
);

const ResponseModel = mongoose.model("TestResponse", TestResponseSchema);
export default ResponseModel;
