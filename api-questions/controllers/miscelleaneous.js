import { NumericalQuestion } from "../models/index.js";
import { McqQuestion } from "../models/index.js";
export const toggleProofReadQuestion = async function (req, res) {
  try {
    const { id, type, isProofRead } = req.body.data;
    console.log({ id, type, isProofRead });
    if (type === "single" || type === "multiple") {
      let obj = await McqQuestion.findOneAndUpdate(
        {
          _id: id,
        },
        {
          isProofRead: isProofRead,
        }
      );
      console.log(obj);
      res.json({ status: "success" });
    } else if (type === "integer") {
      await NumericalQuestion.findOneAndUpdate(
        { _id: id },
        { isProofRead: isProofRead }
      );
      res.json({ status: "success" });
    } else {
      res.json({ status: "lost" });
    }
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};
