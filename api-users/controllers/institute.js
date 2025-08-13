import Institute from "./../models/Institute.model.js";
const generateUniqueId = (name) => {
  let id = name.slice(0, 3).toUpperCase() + Math.floor(Math.random() * 10000);
  return id;
};
export const createInstitute = async function (req, res) {
  try {
    const body = {
      _id: generateUniqueId(req.body.name),
      ...req.body,
    };
    console.log(body);
    const b = await Institute.create(body);

    res.status(200).json({ message: "Institute created", data: b });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteInstitute = async function (req, res) {
  try {
    const { _id } = req.query;

    const b = await Institute.findByIdAndDelete(_id);
    res.status(200).json({ message: `Institute deleted with _id ${_id} ` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getInstitute = async function (req, res) {
  try {
    console.log(req);
    const { _id } = req.query;
    console.log({ _id });
    let b;
    if (_id) {
      b = await Institute.findOne({ _id });
      console.log(b);
    } else {
      b = await Institute.find();
    }
    res.status(200).json(b);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const updateInstitute = async function (req, res) {
  try {
    const body = req.body;
    const { _id } = req.body;
    console.log(_id);
    const b = await Institute.findByIdAndUpdate(_id, body);
    res.status(200).json({ message: `Institute updated with _id " ${_id}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
