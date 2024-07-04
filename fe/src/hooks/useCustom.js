import { useQuery, useMutation } from "@tanstack/react-query";
import AuthApi from "@/data/auth";
import NotesApi from "@/data/notes";

export const useLogin = () => {
  return useMutation({
    mutationFn: async (body) => {
      const data = await AuthApi.login(body);
      return data;
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: async (body) => {
      const data = await AuthApi.register(body);
      return data;
    },
  });
};

export const useCreateNote = () => {
  return useMutation({
    mutationFn: async (body) => {
      const data = await NotesApi.createNote(body);
      return data;
    },
  });
};

export const useGetAllNote = (limit, page, query) => {
  return useQuery({
    queryKey: ["get_all_note"],
    queryFn: async () => {
      const data = await NotesApi.getAllNotes(limit, page, query);
      return data;
    },
  });
};

export const useGetNoteById = (id) => {
  return useQuery({
    queryKey: ["get_note"],
    queryFn: async () => {
      const data = await NotesApi.getNoteById(id);
      return data;
    },
  });
};

export const useUpdateNoteById = () => {
  return useMutation({
    mutationFn: async (params) => {
      const { id, body } = params;
      const data = await NotesApi.updateNoteById(id, body);
      return data;
    },
  });
};

export const useDeleteNoteById = () => {
  return useMutation({
    mutationFn: async (id) => {
      const data = await NotesApi.deleteNoteById(id);
      return data;
    },
  });
};
