**Admin**

```ts
{
  id: string, // INSTITUTE_ID_AD_ABCDEF123
  _password: string, // hashed
  name: string,
  email: string,
  contact: number,
  institute: InstituteID,
  validity: Validity,
  userType: USER_TYPE.USER_ADMIN,
  createdAt: Date,
  modifiedAt: Date,
  createdBy: SuperAdminID,
  access: [Access],
  payment: PaymentID,
}
```

**Super Admin**

```ts
{
  id: string, // IITP_SA_ABCDEF123
  _password: string, // hashed
  name: string,
  email: string,
  contact: number,
  institute: InstituteID, // locked to IITP
  userType: USER_TYPE.USER_SUPER_ADMIN,
  createdAt: Date,
  modifiedAt: Date,
  userType: "SuperAdmin",
}
```

**Teacher**

```ts
{
  id: string, // INSTITUTE_ID_TR_ABCDEF123
  _password: string, // hashed
  name: string,
  email: string,
  contact: number,
  institute: InstituteID,
  userType: USER_TYPE.USER_TEACHER,
  validity: Validity,
  access: [ // Subjective to availbality to the institute
    Access<Pattern>,
    Access<Test>,
    Access<QuestionBank>,
    Access<Subject>,
  ],
  previousTests: [
    {
      id: TestId,
      name: string,
      exam: oneOf(EXAMS),
      createdAt: Date,
    }
  ],
  createdBy: Admin | SuperAdmin,
  createdAt: Date,
  modifiedAt: Date,
}
```

**Student**

```ts
{
  id: string, // INSTITUTE_ID_ST_ABCDEF123
  _password: string, // hashed
  name: string,
  email: string,
  contact: number,
  address: Address,
  parentDetails: {
    name: string,
    contact: number,
  },
  school: string,
  batch: Batch,
  stream: string,
  institute: InstituteID,
  userType: USER_TYPE.USER_STUDENT,
  validity: Validity,
  access: [ // Subjective to availbality to the institute
    Access<ViewTest>,
    Access<Result>
  ],
  attemptedTests: [
    {
      ...Test,
      marks: number,
      section: {
        ...Section,
        marks: number,
        SubSection: {
          ...SubSection,
          questions: [
            {
              ...Question,
              marks: number,
              timeTaken: number, // minutes
              isAttempted: boolean,
              isSeen: boolean,
            }
          ],
        }
      },

    }
  ],
  createdBy: Admin | SuperAdmin,
  createdAt: Date,
  modifiedAt: Date,
}
```

**Operator**

```ts
{
  id: string, // INSTITUTE_ID_OR_ABCDEF123
  _password: string, // hashed
  name: string,
  email: string,
  contact: number,
  address: string,
  institute: InstituteID,
  userType: USER_TYPE.USER_OPERATOR,
  validity: Validity,
  access: [ // Subjective to availbality to the institute
    Access<QuestionBank>,
  ],
  createdBy: Admin | SuperAdmin,
  createdAt: Date,
  modifiedAt: Date,
}
```

**Manager**

```ts
{
  id: string, // INSTITUTE_ID_MG_ABCDEF123
  _password: string, // hashed
  name: string,
  email: string,
  contact: number,
  institute: InstituteID,
  validity: Validity,
  userType: USER_TYPE.USER_MANAGER,
  access: [ // Subjective to availbality to the institute
    Access, // Variable
  ],
  createdBy: Admin | SuperAdmin,
  createdAt: Date,
  modifiedAt: Date,
}
```

**Utility**

```ts
const Validity = {
  from: Date,
  to: Date,
};

const Access = {
  type: ACCESS_TYPES.ACCESS_PREVIOUS_YEAR_PAPERS,
  validity: Validity,
};

const Institute = {
  id: String, // IS_KV123
  _password: string, // hashed
  name: String,
  poc: [POC],
  logo: URL,
  location: GEOLocation,
  website: URL, // optional
};

const Payment = {
  id: string,
  _password: string, // hashed
  _transactionId: string,
  _password: string, // hashed
  mode: String, // Offline | Online | UPI | NEFT
  date: Date,
  amount: Number, // To discuss -> What to keep
};

const Batch = {
  id: string,
  _password: string, // hashed
  name: string,
  duration: Validity,
  branch: string, // Select branch -> Palasia / GTB / SouthTKG
};
```

**Constants**

```ts
const ACCESS_TYPES = {
  ACCESS_PREVIOUS_YEAR_PAPERS: "ACCESS_PREVIOUS_YEAR_PAPERS",
  ACCESS_PRACTICE_QUESTIONS: "ACCESS_PRACTICE_QUESTIONS",
  ACCESS_CREATE_STUDENT: "ACCESS_CREATE_STUDENT",
};

const USER_TYPE = {
  USER_SUPER_ADMIN: "SUPER_ADMIN",
  USER_ADMIN: "ADMIN",
  USER_STUDENT: "STUDENT",
  USER_MANAGER: "MANAGER",
  USER_TEACHER: "TEACHER",
  USER_OPERATOR: "OPERATOR",
};
```
