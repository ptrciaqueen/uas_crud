const { Op } = require("sequelize");
const ResponseHandler = require("../../helpers/handler");
const service = require("./notes.service");

const createNote = async (req, res) => {
  const response = new ResponseHandler(res);
  try {
    const picture = req.file.path;
    const urlArr = picture.split("\\");
    const imgPath = urlArr.slice(1, urlArr.length).join("");

    const user = req.user;

    const noteData = {
      title: req.body.title,
      note: req.body.note,
      img_url: imgPath,
      user_id: user.id,
    };

    const newNote = await service.createNote(noteData);
    if (!newNote) {
      return response.resp([], 400, "Failed create new note", 400);
    }

    return response.resp(newNote);
  } catch (err) {
    console.log(err);
    return response.resp([], 400, err, 400);
  }
};

const findAllNotes = async (req, res) => {
  const response = new ResponseHandler(res);
  try {
    const pageAsNumber = Number.parseInt(req.query.page);
    const limitAsNumber = Number.parseInt(req.query.limit);
    let keyword = req.query.keyword;

    let query = {};

    if (keyword) {
      query.title = {
        [Op.like]: `%${keyword}%`,
      };
    }

    let page = 0;
    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
      page = pageAsNumber;
    }

    let limit = 5;
    if (!Number.isNaN(limitAsNumber) && limitAsNumber > 0) {
      limit = limitAsNumber;
    }

    const { rows, count } = await service.getAllNotes(page, limit, query);

    return response.resp({
      notes: rows,
      totalPage: Math.ceil(count / limit),
    });
  } catch (err) {
    console.log(err);
    return response.resp([], 400, err, 400);
  }
};

const findNoteById = async (req, res) => {
  const response = new ResponseHandler(res);
  try {
    const query = {
      id: req.params.id,
    };
    const note = await service.getNoteByQuery(query);
    if (!note) {
      return response.resp([], 404, "No note found", 404);
    }

    return response.resp(note);
  } catch (err) {
    console.log(err);
    return response.resp([], 400, err, 400);
  }
};

const deleteNoteById = async (req, res) => {
  const response = new ResponseHandler(res);
  try {
    const deleted = await service.deleteNoteById(req.params.id);
    if (!deleted) {
      return response.resp([], 400, "Failed delete note", 400);
    }

    return response.resp("Note deleted");
  } catch (err) {
    console.log(err);
    return response.resp([], 400, err, 400);
  }
};

const updateNoteById = async (req, res) => {
  const response = new ResponseHandler(res);
  try {
    let newData = {};
    if (req.body.title) newData.title = req.body.title;
    if (req.body.note) newData.note = req.body.note;
    console.log(req.body);

    const updated = await service.updateNoteById(req.params.id, newData);
    if (!updated) {
      return response.resp([], 400, "Cannot update note", 400);
    }

    return response.resp("Note updated");
  } catch (err) {
    console.log(err);
    return response.resp([], 400, err, 400);
  }
};

module.exports = {
  createNote,
  findAllNotes,
  findNoteById,
  deleteNoteById,
  updateNoteById,
};
