**Test**

```ts
{
  id: string, //TT_AB123
  name: string,
  description: string,
  sections: [Section],
  exam: oneOf(EXAMS),
  status: string, // ongoing | active | inactive | expired
  validity: Validity,
  attemptedBy: {
    studentsCount: number,
    locations: [string],
  },
  result: Result,
  createdBy: Admin | Teacher,
  createdAt: Date,
  modifiedAt: Date,
}
```

**Utility**

```ts
const EXAMS = {
  JEE_MAINS: {
    id: string,
    name: "JEE_MAINS",
    fullName: "JOINT ENTRANCE EXAMINATION MAINS",
  },
  JEE_ADVANCED: {
    id: string,
    name: "JEE_ADVANCED",
    fullName: "JOINT ENTRANCE EXAMINATION ADVANCED",
  },
  NEET: {
    id: string,
    name: "NEET",
    fullName: "NATIONAL ELIGIBILITY ENTRANCE TEST",
  },
  CAT: {
    id: string,
    name: "CAT",
    fullName: "COMMON ADMISSION TEST",
  },
};

const Result = {
  maxMarks: number,
  averageMarks: number,
  averageCompletionTime: number, // minutes
  students: [
    {
      name: string,
      id: StudentId,
      marks: number,
    },
  ],
};
```
