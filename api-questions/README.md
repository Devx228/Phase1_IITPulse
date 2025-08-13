# Questions API

**MCQ**

```ts
{
  id: string, // QM_ABCSXYZ
  description: QuillHTMLString,
  type: QuestionType,
  correctAnswer: [OptionID],
  source: string,
  subject: {
    id: SubjectID,
    name: string,
  },
  chapter: {
    id: ChapterID,
    name: string,
  },
  topics: [string],
  difficulty: string, // easy | medium | hard
  solution: QuillHTMLString,
  isProofRead: boolean,
  createdAt: string,
  modifiedAt: string,
  uploadedBy: {
    type: string, // operator | teacher | admin
    uploadedById: string,
  },  options: [Option],
}
```

**Numerical Range**

```ts
{
  id: string, // QN_ABCSXYZ
  description: QuillHTMLString,
  type: QuestionType<Numerical>,
  correctAnswer: OptionID // Option<Range> | Option<Digit>,
  source: string,
  subject: {
    id: SubjectID,
    name: string,
  },
  chapter: {
    id: ChapterID,
    name: string,
  },
  topics: [string],
  difficulty: string, // easy | medium | hard
  solution: QuillHTMLString,
  isProofRead: boolean,
  createdAt: string,
  modifiedAt: string,
  uploadedBy: {
    type: string, // operator | teacher | admin
    uploadedById: string,
  },
}
```

**Utility**

```ts
const QuestionType = {
  MCQ: "MULTIPLE_CHOICE_QUESTION", // Matrix, Paragraph,
  NUMERICAL: "NUMERICAL_TYPE_QUESTION", // Decimal | Int
};

const SUBJECTS = {
  SUBJECT_NAME: {
    id: string,
    name: "SUBJECT_NAME",
    chapters: [Chapter],
  },
};

const Chapter = {
  id: string,
  name: string,
  topics: [Topics],
};

const Topic = {
  id: string,
  name: "TOPIC NAME",
};

const SUBJECTS = {
  PHYSICS: "PHYSICS",
  MATHS: "MATHS",
  CHEMISTRY: "CHEMISTRY",
  BIOLOGY: "BIOLOGY",
};

const TOPICS = {
  HYDROGEN_BONDING: "HYDROGEN_BONDING",
  CUBE_ROOT_OF_UNITY: "CUBE_ROOT_OF_UNITY",
};

const OptionMCQ = {
  id: string, // OP_ABCXYZ,
  value: QuillHTMLString,
};

const OptionNumericalDigit = {
  id: string, // OP_ABCXYZ,
  value: Number, // Single digit
};

const OptionNumericalRange = {
  id: string, // OP_ABCXYZ,
  value: {
    from: number,
    to: number,
  },
};

const Subject = {
  id: string, // SB_ABC123
  name: oneOf(SUBJECTS),
  chapters: [ChapterId],
  modifiedAt: string,
};

const Chapter = {
  id: string, // CH_ABC123
  name: string,
  subject: SubjectID,
  topics: [TopicID], // Yet to be decided -> Obj or ID
};

const MarkingScheme = {
  correct: [number], // index-wise marks (index+1 = no. of correct options)
  incorrect: number, // -1
};
```
