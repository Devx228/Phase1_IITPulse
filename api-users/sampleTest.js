import axios from "axios";

const PERMISSIONS = {
  QUESTION: {
    CREATE: "CREATE_QUESTION",
    READ: "READ_QUESTION",
    READ_GLOBAL: "READ_GLOBAL_QUESTION",
    UPDATE: "UPDATE_QUESTION",
    DELETE: "DELETE_QUESTION",
  },
  USER: {
    CREATE: "CREATE_USER",
    READ: "READ_USER",
    UPDATE: "UPDATE_USER",
    DELETE: "DELETE_USER",
  },
  TEST: {
    CREATE: "CREATE_TEST",
    READ: "READ_TEST",
    READ_GLOBAL: "READ_GLOBAL_TEST",
    UPDATE: "UPDATE_TEST",
    DELETE: "DELETE_TEST",
    VIEW_RESULT: "VIEW_RESULT",
    PUBLISH_RESULT: "PUBLISH_RESULT",
    EXPORT_RESULT: "EXPORT_RESULT",
  },
  BATCH: {
    CREATE: "CREATE_BATCH",
    READ: "READ_BATCH",
    UPDATE: "UPDATE_BATCH",
    DELETE: "DELETE_BATCH",
  },
  SUBJECT: {
    CREATE: "CREATE_SUBJECT",
    READ: "READ_SUBJECT",
    UPDATE: "UPDATE_SUBJECT",
    DELETE: "DELETE_SUBJECT",
    MANAGE_CHAPTER: "MANAGE_CHAPTER",
    MANAGE_TOPIC: "MANAGE_TOPIC",
  },
  PATTERN: {
    CREATE: "CREATE_PATTERN",
    READ: "READ_PATTERN",
    UPDATE: "UPDATE_PATTERN",
    DELETE: "DELETE_PATTERN",
  },
  ROLE: {
    CREATE: "CREATE_ROLE",
    READ: "READ_ROLE",
    UPDATE: "UPDATE_ROLE",
    DELETE: "DELETE_ROLE",
  },
};

const operatorData = {
  password: "password", // hashed
  name: "dev",
  email: "dev@gmail.com",
  contact: 9876543210,
  address: "ujjain",
  institute: "IITP_IIT",
  gender: "male",
  userType: "operator",
  validity: {
    from: "2021-08-08T00:00:00.000Z",
    to: "2022-08-08T00:00:00.000Z",
  },
  roles: [],
  createdBy: "kuldeep",
  createdAt: "2021-08-08T00:00:00.000Z",
  modifiedAt: "2021-08-08T00:00:00.000Z",
};

const managerData = {
  password: "password", // hashed
  name: "rajesh joshi",
  email: "rajesh@gamil.com",
  contact: 9876543210,
  institute: "IITP_AD_ABC",
  gender: "male",
  validity: {
    from: "2021-08-08T00:00:00.000Z",
    to: "2022-08-08T00:00:00.000Z",
  },
  userType: "manager",
  roles: [],
  createdBy: "Anurag",
  createdAt: "2021-08-08T00:00:00.000Z",
  modifiedAt: "2021-08-08T00:00:00.000Z",
};

const teacherData = {
  name: "Yash",
  email: "yash@gmail.com",
  password: "password",
  contact: 9876543210,
  institute: "INST_IITP_ABCDE123",
  gender: "male",
  userType: "teacher",
  validity: {
    from: "2021-08-08T00:00:00.000Z",
    to: "2022-08-08T00:00:00.000Z",
  },
  roles: [],
  previousTests: [],
  createdBy: "kuldeep",
  createdAt: "2021-08-08T00:00:00.000Z",
  modifiedAt: "2021-08-08T00:00:00.000Z",
};

const studentData = {
  name: "Kuldeep",
  email: "nagark@gmail.com",
  password: "password",
  contact: 9876543210,
  address: "ujjain",
  gender: "male",
  parentDetails: {
    name: "father",
    contact: 9876543210,
  },
  school: "kv",
  batch: "ioy",
  stream: "maths",
  institute: "IITP",
  userType: "student",
  validity: {
    from: "2021-08-08T00:00:00.000Z",
    to: "2022-08-08T00:00:00.000Z",
  },
  roles: [],
  attemptedTests: [],
  createdBy: "Anurag",
  createdAt: "2021-08-08T00:00:00.000Z",
  modifiedAt: "2021-08-08T00:00:00.000Z",
};
const superadminData = {
  password: "password", // hashed
  name: "Anurag",
  email: "anurag@gmail.com",
  gender: "male",
  contact: 9976543210,
  institute: "IITP_IIT", // locked to IITP
  userType: "superadmin",
  createdAt: "2021-08-08T00:00:00.000Z",
  modifiedAt: "2021-08-08T00:00:00.000Z",
};
const adminData = {
  name: "Kuldeep Nagar",
  password: "password",
  email: "admin@email.com",
  contact: 9876543210,
  gender: "male",
  institute: "INST_IITP_ABCDE123",
  validity: {
    from: "2021-08-08T00:00:00.000Z",
    to: "2022-08-08T00:00:00.000Z",
  },
  userType: "admin",
  createdAt: new Date().toISOString(),
  modifiedAt: new Date().toISOString(),
  createdBy: {
    userType: "superadmin",
    id: "SUP_ADMIN_SUNIL_GUPTA",
  },
  roles: [
    {
      id: "ROLE_ADMIN",
      from: new Date().toISOString(),
      to: new Date().toISOString(),
    },
  ],
};

const updateAdminData = {
  name: "Kuldeep Nagar",
  password: "password",
  email: "admin@email.com",
  contact: 9691566671,
  gender: "male",
  institute: "INST_IITP_ABCDE123",
  validity: {
    from: "2021-08-08T00:00:00.000Z",
    to: "2022-08-08T00:00:00.000Z",
  },
  userType: "admin",
  createdAt: new Date().toISOString(),
  modifiedAt: new Date().toISOString(),
  createdBy: "SUP_ADMIN_SUNIL_GUPTA",
  roles: [],
};

const newStudent = {
  name: "batch testing",
  email: "test_batch3@email.com",
  password: "password",
  standard: 12,
  dob: "01/01/2000", // DD/MM/YYYY
  school: "Kendriya Vidyalaya, Dewas (M.P)",
  aadhaar: "123456789012",
  contact: 9876543210,
  city: "dewas",
  state: "madhya pradesh",
  gender: "male",
  parentName: "Parent Name",
  parentContact: 1234567890,
  parentDetails: { name: "Parent Name", contact: 9876543210 },
  promoCode: "IITP_11",
  batch: "",
  currentAddress: "Street 1, Long Island",
  permanentAddress: "Street 2, Long Island",
  stream: "PCM",
  institute: "IITP",
  userType: "student",
  validity: {
    from: "2022-04-15T13:45:33.082Z",
    to: "2023-05-20T13:45:33.082Z",
  },
  roles: [
    {
      id: "ROLE_STUDENT",
      from: "2022-04-15T13:45:33.082Z",
      to: "2023-05-20T13:45:33.082Z",
    },
  ],
  attemptedTests: [],
  createdBy: { id: "IITP", userType: "admin" },
  createdAt: new Date().toISOString(),
  modifiedAt: new Date().toISOString(),
};

const role = {
  // _id: { type: String, required: true }, // INSTITUTE_ID_AD_ABCDEF123
  // id: "ROLE_STUDENT",
  name: "Student",
  createdAt: new Date().toISOString(),
  modifiedAt: new Date().toISOString(),
  createdBy: {
    userType: "superadmin",
    id: "SUP_ADMIN_SUNIL_GUPTA",
  },
  members: [],
  permissions: [
    ...Object.values(PERMISSIONS.QUESTION),
    ...Object.values(PERMISSIONS.PATTERN),
    ...Object.values(PERMISSIONS.USER),
    ...Object.values(PERMISSIONS.TEST),
    ...Object.values(PERMISSIONS.BATCH),
    ...Object.values(PERMISSIONS.SUBJECT),
    ...Object.values(PERMISSIONS.ROLE),
  ],
};

const subject = {
  _id: "SUB_IITP_Physics",
  name: "Physics",
  chapters: [
    {
      id: "CH_IITP_RayOptics",
      name: "Ray Optics",
      topics: ["optics", "ray", "refraction", "reflection"],
    },
  ],
};

// Create Role
// axios.post("http://localhost:8080/roles/create", role).then((res) => {
//   console.log(res.data);
// });

// axios.post("http://localhost:8080/teacher/create", teacherData).then((res) => {
//   console.log(res.data);
// });

axios.post("http://localhost:5000/student/create", newStudent).then((res) => {
  console.log(res.data);
});

// axios.post("http://localhost:8080/manager/create", managerData).then((res) => {
//   console.log(res.data);
// });

// axios
//   .post("http://localhost:8080/superadmin/create", superadminData)
//   .then((res) => {
//     console.log(res.data);
//   });

// axios
//   .post("http://localhost:8080/operator/create", operatorData)
//   .then((res) => {
//     console.log(res.data);
//   });

// axios.post("https://iitpulse.in/admin/create", adminData).then((res) => {
//   console.log(res.data);
// });

// axios
//   .patch(
//     "http://localhost:8080/admin/update?id=IITP_AD_1af302f0_6496_478c_b4d0_89d84483ed0e",
//     updateAdminData
//   )
//   .then((res) => {
//     console.log(res.data);
//   });

// Create Subject
// axios.post("http://localhost:5001/subject/create", subject).then((res) => {
//   console.log(res.data);
// });
