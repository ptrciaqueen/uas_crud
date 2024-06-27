const { Notes } = require("../../models");

const createNote = async (data) => {
  return await Notes.create(data);
};

const getNoteByQuery = async (query) => {
  return await Notes.findOne({
    where: query,
  });
};

const getAllNotes = async (page, limit, query) => {
  return await Notes.findAndCountAll({
    where: query,
    limit,
    offset: limit * page,
  });
};

const updateNoteById = async (id, data) => {
  return await Notes.update(data, { where: { id } });
};

const deleteNoteById = async (id) => {
  return await Notes.destroy({ where: { id } });
};

module.exports = {
  createNote,
  getNoteByQuery,
  getAllNotes,
  updateNoteById,
  deleteNoteById,
};
