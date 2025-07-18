import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";


interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

interface NotesState {
  notes: Note[];
  addNote: (note: Note) => void;
  removeNote: (id: string) => void;
  updateNote: (id: string, updatedNote: Partial<Note>) => void;
}

const useNotes = create<NotesState>()(
  devtools(
    persist(
      (set) => ({
        notes: [],
        addNote: (note) => set((state) => (
          {
            notes: [...state.
              notes, note]
          }
        )),
        updateNote: (id, updatedNote) => set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id ? { ...note, ...updatedNote } : note
          ),
        })),
        removeNote: (id) => set((state) => (
          { notes: state.notes.filter((note) => note.id !== id) }
        )),
      }), {
      name: "notes-storage",
      storage: createJSONStorage(() => localStorage),
    })));

export default useNotes;
