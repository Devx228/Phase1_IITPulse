const SAMPLE_TEST_FINAL = {
  id: "IITP_122372347",
  description: "jhadssdns",
  type: "ifjljf",
  correctAnswer: ["jkasdjzdh"],
  source: "anurag",
  subject: {
    id: "String",
    name: "String",
  },
  chapter: {
    id: "String",
    name: "String",
  },
  topics: "dkjzhcz",
  difficulty: "jdhfzxcfghgfh",
  solution: "jkzxczcdhdzi",
  isProofRead: "true",
  createdAt: "ikszhczx",
  modifiedAt: "dhjfckjdxc",
  uploadedBy: {
    type: "kjschcjz",
    uploadedById: "jadhzsndxa",
  },
  options: [
    {
      id: "sjahdasj",
      value: "jdkskjsx",
    },
  ],
};
import axios from "axios";

axios.post("http://localhost:8081/mcq/new/", SAMPLE_TEST_FINAL).then((res) => {
  console.log(res.data);
});
