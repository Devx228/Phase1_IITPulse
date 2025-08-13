import mongoose from "mongoose";

const OptionMCQSchema = mongoose.Schema({
  id: { type: String, required: true }, // OP_ABCXYZ
  value: String,
});

const OptionNumericalDigitSchema = mongoose.Schema({
  id: { type: String, required: true }, // OP_ABCXYZ
  value: Number, // Number only
});

const OptionNumericalRangeSchema = mongoose.Schema({
  id: { type: String, required: true }, // OP_ABCXYZ
  value: {
    from: Number,
    to: Number,
  },
});

const SubjectSchema = mongoose.Schema({
  id: { type: String, required: true }, // SB_ABC123
  name: String,
  chapters: [String],
  modifiedAt: String,
});

const ChapterSchema = mongoose.Schema({
  id: { type: String, required: true }, // CH_ABC123
  name: String,
  subject: String,
  topics: [String],
});

const MarkingSchemeSchema = {
  // index-wise marks (index+1 = no. of correct options)
  correct: [Number],
  incorrect: Number, // -1
};

const OptionMCQModel = mongoose.model("OptionMCQModel", OptionMCQSchema);
const OptionNumericalDigitModel = mongoose.model(
  "OptionNumericalDigit",
  OptionNumericalDigitSchema
);
const OptionNumericalRangeModel = mongoose.model(
  "OptionNumericalRange",
  OptionNumericalRangeSchema
);

const SubjectSchemaModel = mongoose.model("Subject", SubjectSchema);

const ChapterSchemaModel = mongoose.model("ChapterSchema", ChapterSchema);

const MarkingSchemeModel = mongoose.model("MarkingScheme", MarkingSchemeSchema);

export {
  OptionMCQModel,
  OptionNumericalDigitModel,
  OptionNumericalRangeModel,
  ChapterSchema,
  SubjectSchemaModel,
  ChapterSchemaModel,
  MarkingSchemeModel,
};
