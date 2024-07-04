import api from "./api";

export default class NotesApi {
  static async createNote(body) {
    return await api.post("/notes", body);
  }

  static async getAllNotes(limit, page, query) {
    return await api.get(
      `/notes?limit=${limit}&page=${page}${query ? `&keyword=${query}` : ""}`,
    );
  }

  static async getNoteById(id) {
    return await api.get(`/notes/${id}`);
  }

  static async updateNoteById(id, body) {
    return await api.put(`/notes/${id}`, body);
  }

  static async deleteNoteById(id) {
    return await api.delete(`/notes/${id}`);
  }
}
