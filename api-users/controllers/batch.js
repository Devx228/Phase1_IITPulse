import { Batch } from "../models/index.js";
import { v4 as uuid } from "uuid";

export const createBatch = async function (req, res) {
  try {
    const body = req.body;
    console.log(body.roles);
    console.log(body);
    await Promise.all(
      body.promoCode.map(async (element) => {
        let alreadyExist = await Batch.findOne({ promoCode: element });
        console.log(element);
        if (alreadyExist) {
          res.status(500).json({
            error: `${element} already exists as a PromoCode for batch ${alreadyExist.name}`,
          });
        }
      })
    );
    const newBatch = await Batch.create({
      ...body,
      _id: `IITP_BATCH_${uuid().replace(/-/g, "_")}`,
      promoCode: [
        ...body.promoCode,
        `${body.name.slice(0, 3).toUpperCase() + uuid().slice(0, 3)}`,
      ],
    });
    res.status(200).json({ message: "Batch created", data: newBatch });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteBatch = async function (req, res) {
  try {
    const { id } = req.query;

    await Batch.findByIdAndDelete(id);
    res.status(200).json({ message: `Batch deleted with id ${id} ` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getBatch = async function (req, res) {
  try {
    const { id } = req.query;
    let existingBatch;
    if (id) {
      existingBatch = await Batch.findById(id);
    } else {
      existingBatch = await Batch.find();
    }
    res.status(200).json(existingBatch);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllBatches = async function (req, res) {
  try {
    const { fields } = req.query;

    let query = Batch.find();

    if (fields) {
      const fieldsArray = fields.split(",");

      query = query.select(fieldsArray.join(" "));
    }

    const allBatches = await query.exec();
    res.status(200).json(allBatches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateBatch = async function (req, res) {
  try {
    const body = req.body;
    const { id } = req.body;
    // console.log({body})
    for (let i = 0; i < body.promoCode.length; i++) {
      const element = body.promoCode[i];
      let alreadyExist = await Batch.find({ promoCode: element });
      console.log("1", element, alreadyExist);
      if (alreadyExist?.length > 1) {
        if (alreadyExist[0]._id != id)
          return res.status(500).json({
            error: `${element} already exists as a PromoCode for batch ${alreadyExist[0]?.name}`,
          });
        return res.status(500).json({
          error: `${element} already exists as a PromoCode for batch ${alreadyExist[1]?.name}`,
        });
      } else if (alreadyExist.length === 1 && alreadyExist[0]?._id != id) {
        return res.status(500).json({
          error: `${element} already exists as a PromoCode for batch ${alreadyExist[0]?.name}`,
        });
      } else {
      }
    }
    // console.log(id);
    await Batch.findByIdAndUpdate(id, body);
    res.status(200).json({ message: `Batch updated with id " ${id}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const joinBatch = async function (req, res, next) {
  try {
    const { promoCode: clientPromoCode } = req.body;
    if (clientPromoCode === "VIA_ADMIN") {
      return next();
    }
    const currentBatchData = await Batch.findOne({
      promoCode: { $in: [clientPromoCode] },
    });
    if (!currentBatchData) {
      return res.status(404).json({ error: "Batch not found" });
    }
    req.body.batch = currentBatchData?._id;
    req.body.institute = currentBatchData.institute || "institute";
    let currentRoles = req.body.roles || [];
    if (currentRoles) {
      console.log({ currentBatchData });
      req.body.roles = [
        ...new Set([
          ...currentRoles?.filter((role) => role?.id !== "ROLE_STUDENT"),
          ...currentBatchData.roles?.map((role) => ({
            id: role,
            from: currentBatchData.validity.from,
            to: currentBatchData.validity.to,
          })),
        ]),
      ];
    } else {
      req.body.roles = currentBatchData.roles;
    }
    const standard = req.body?.standard;
    let batchHasStandard = currentBatchData?.classes?.find(
      (element) => toString(element) == toString(standard)
    );
    console.log(batchHasStandard);
    if (!batchHasStandard) {
      return res.status(404).json({ error: "Standard not found in the batch" });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
