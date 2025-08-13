import { SubjectModel } from "../models/index.js";
import { uniqueId } from "../utils/utils.js";

export const getSubjects = async function (req, res) {
  try {
    const result = await SubjectModel.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getChapter = async function (req, res) {
  //console.log("Aa gaya");
  try {
    const { subject } = req.query;
    console.log("Sub", subject);
    let regex = new RegExp(subject, "i");
    const currentSubject = await SubjectModel.findOne({
      name: { $regex: regex },
    });
    if (!currentSubject) {
      return res.status(404).json({ error: "Subject not found" });
    }
    console.log(currentSubject);
    res.status(200).json(currentSubject.chapters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getAllChapters = async function (req, res) {
  try {
    let chapters = [];
    const subjects = await SubjectModel.find();
    subjects.forEach((subject) => {
      subject.chapters.forEach((chapter) => {
        chapters.push({
          subject: subject.name,
          name: chapter.name,
          id: chapter.id,
          topics: chapter.topics,
        });
      });
    });
    res.status(200).json(chapters);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export async function getTopics(req, res) {
  try {
    const { subjectId, chapters } = req.query;
    const currentSubject = await SubjectModel.findById(subjectId);
    if (!currentSubject) {
      return res.status(404).json({ error: "Subject not found" });
    }
    let topics = [];
    currentSubject.chapters.forEach((chapter) => {
      if (chapters.includes(chapter.name)) {
        topics = [...topics, ...chapter.topics];
      }
    });
    res.status(200).json(topics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getAllTopics(req, res) {
  try {
    const subjects = await SubjectModel.find();
    let topics = [];
    subjects.forEach((subject) => {
      subject.chapters.forEach((chapter) => {
        topics = [
          ...topics,
          ...chapter.topics.map((topic) => ({
            subject: subject.name,
            subjectId: subject._id,
            chapter: chapter.name,
            topic,
          })),
        ];
      });
    });
    res.status(200).json(topics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const createSubject = async function (req, res) {
  try {
    const { name, chapters } = req.body;
    const subjectExists = await SubjectModel.findOne({
      name: name,
    });
    if (subjectExists) {
      return res.status(400).json({ error: "Subject already exists" });
    }
    const body = {
      ...req.body,
      _id: uniqueId("SB"),
      name,
      chapters: chapters?.map((ch) => ({
        ...ch,
        id: uniqueId("CH"),
      })),
    };
    const result = await SubjectModel.create(body);
    res
      .status(200)
      .json({ message: `subject created with id ${body._id}`, data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const updateSubject = async function (req, res) {
  try {
    const { id, name } = req.body;
    const res = await SubjectModel.findById(id);
    const result = await SubjectModel.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    res.status(200).json({ message: `Subject updated`, data: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateSubjectName = async function (req, res) {
  try {
    const { id, name } = req.body;
    console.log(id,name);
    const result = await SubjectModel.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    console.log({result});
    res.status(200).json({ message: `Subject updated`, data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteSubject = async function (req, res) {
  try {
    const { id } = req.query;
    await SubjectModel.findByIdAndDelete(id);
    res.status(200).json({ message: `Subject deleted with id ${id} ` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const createChapter = async function (req, res) {
  console.log(req);
  try {
    const { name: chapter, subjectId } = req.body;
    console.log(chapter, subjectId);
    // check if the same chapter already exists
    const subject = await SubjectModel.findById(subjectId).select("chapters");
    const chapterExists = subject.chapters.find(
      (ch) => ch?.name?.toLowerCase() === chapter?.toLowerCase()
    );
    console.log(subject.chapters, chapterExists);
    if (chapterExists) {
      return res.status(400).json({ error: "Chapter already exists" });
    }

    const result = await SubjectModel.findByIdAndUpdate(
      subjectId,
      {
        $push: {
          chapters: {
            name: chapter,
            id: uniqueId("CH"),
          },
        },
      },
      { new: true }
    );

    return res.status(200).json({
      message: "success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteChapter = async function (req, res) {
  try {
    const { subjectId, chapter } = req.body;
    const result = await SubjectModel.findOneAndUpdate(
      { _id: subjectId },
      { $pull: { chapters: { name: chapter } } },
      { new: true }
    );
    res.status(200).json({ message: `Chapter deleted`, data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateChapter = async function(req, res){
  try{
    const {subjectId, chapter, oldChapter} = req.body;
    const result = await SubjectModel.findOneAndUpdate(
      {_id:subjectId},
      {
        $set: { "chapters.$[chapter]": chapter },
      },
      {
        arrayFilters: [
          { "chapter": oldChapter },
        ],
        new: true
      }
    )
    console.log(req.body);
    res.status(200).json({ message: `Chapter updated`, result });
  } catch(error){
    res.status(500).json({ error: error.message });
  }
}



export async function createTopic(req, res) {
  try {
    const { name: topic, chapter, subject: subjectId } = req.body;
    // check if topic already exists irrespective of letter case//
    // topics is an array of string

    const topicExists = await SubjectModel.findOne({
      _id: subjectId,
      "chapters.name": chapter,
      "chapters.topics": { $in: [topic] },
    });

    if (topicExists) {
      return res.status(400).json({
        status: "error",
        message: `Topic ${topic} already exists in ${chapter}`,
      });
    }

    const result = await SubjectModel.findOneAndUpdate(
      { _id: subjectId, "chapters.name": chapter },
      {
        $push: {
          "chapters.$.topics": topic,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const deleteTopic = async function (req, res) {
  try {
    const { subjectId, chapter, topic } = req.body;
    const result = await SubjectModel.findOneAndUpdate(
      { _id: subjectId, "chapters.name": chapter },
      {
        $pull: {
          "chapters.$.topics": topic,
        },
      },
      { new: true }
    );
    res.status(200).json({ message: `Topic deleted`, data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTopic = async function(req, res){
  try{
    const {subject, chapter, name, oldTopic} = req.body
    // console.log(subject, chapter, name);
    const result = await SubjectModel.findOneAndUpdate(
      { _id: subject, "chapters.name": chapter },
      {
        $set: { "chapters.$[chapter].topics.$[topic]": name },
      },
      {
        arrayFilters: [
          { "chapter.name": chapter },
          { "topic": oldTopic }
        ],
        new: true
      }
    );
    
    console.log({result})
    res.status(200).json({message:`Topic updated successfully!`, result})
  } catch(error){
    res.status(500).json({ error: error.message });
  }
}