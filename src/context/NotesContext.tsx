import { createContext, useReducer } from "react";
import { Note, NotesActions, NotesState } from "./types";
import { openDB } from "../components/OpenIndexedDB";

interface NoteContext extends NotesState {
  deleteNote: () => void;
  editNote: (note: Note) => void;
  addNote: () => void;
  setCurrentNote: (note: Note) => void;
  getAllNotes: (search: string) => void;
  getNoteById: (noteId: number) => Promise<Note>;
}

export const notesContext = createContext<NoteContext | null>(null);

const INIT_STATE: NotesState = {
  allNotes: [],
  currentNote: null,
};

interface ReducerProps {
  state: NotesState;
  action: {
    type: string;
    payload: any;
  };
}

const reducer = (
  state: NotesState,
  action: ReducerProps["action"]
): NotesState => {
  switch (action.type) {
    case NotesActions.GET_ALL_NOTES:
      return {
        ...state,
        allNotes: action.payload,
        currentNote: action.payload.find(
          (v: Note) => v.id === state.currentNote?.id
        )
          ? state.currentNote
          : [...action.payload].reverse()[0],
      };
    case NotesActions.SET_CURRENT_NOTE:
      return { ...state, currentNote: action.payload };
    default:
      return state;
  }
};

const NotesContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const getAllNotes = async (searchText: string = "") => {
    try {
      const db = await openDB();
      const transaction = db.transaction(["notes"], "readonly");
      const store = transaction.objectStore("notes");
      const request = store.getAll();

      request.onsuccess = (event: any) => {
        const notes = event.target.result as Note[];

        if (searchText.trim() === "") {
          dispatch({
            type: NotesActions.GET_ALL_NOTES,
            payload: notes,
          });
          if (notes.length === 0) {
            addNote();
          }
        } else {
          const filteredNotes = notes.filter((note) =>
            note.title.toLowerCase().includes(searchText.toLowerCase())
          );
          dispatch({
            type: NotesActions.GET_ALL_NOTES,
            payload: filteredNotes,
          });
        }
      };

      request.onerror = (event: any) => {
        console.error(event.target.error);
      };
    } catch (e) {
      console.error(e);
    }
  };

  const setCurrentNote = async (note: Note) => {
    try {
      dispatch({
        type: NotesActions.SET_CURRENT_NOTE,
        payload: note,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const getNoteById = async (noteId: number) => {
    try {
      const db = await openDB();
      const transaction = db.transaction(["notes"], "readonly");
      const store = transaction.objectStore("notes");
      const request = store.get(noteId);

      return new Promise((resolve, reject) => {
        request.onsuccess = (event: any) => {
          resolve(event.target.result as Note);
        };

        request.onerror = (event: any) => {
          reject(event.target.error);
        };
      });
    } catch (e) {
      console.error(e);
    }
  };

  const addNote = async () => {
    try {
      const db = await openDB();
      const transaction = db.transaction(["notes"], "readwrite");
      const store = transaction.objectStore("notes");
      const newNote = {
        id: Date.now(),
        content: "",
        title: "Новая заметка",
        subTitle: "Дополнительный текст",
        date: Date.now(),
      };
      const request = store.add(newNote);

      request.onsuccess = async (event: any) => {
        dispatch({
          type: NotesActions.ADD_NOTE,
          payload: event.target.result,
        });
        await getAllNotes();
        setCurrentNote(newNote);
      };

      request.onerror = (event: any) => {
        console.error(event.target.error);
      };
    } catch (e) {
      console.error(e);
    }
  };

  const editNote = async (note: Note) => {
    try {
      const db = await openDB();
      const transaction = db.transaction(["notes"], "readwrite");
      const store = transaction.objectStore("notes");
      store.put(note);
      await getAllNotes();
    } catch (e) {
      console.error(e);
    }
  };

  const deleteNote = async () => {
    if (!state.currentNote) return;
    try {
      const db = await openDB();
      const transaction = db.transaction(["notes"], "readwrite");
      const store = transaction.objectStore("notes");
      store.delete(state.currentNote.id);
      await getAllNotes();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <notesContext.Provider
      value={{
        allNotes: state.allNotes,
        currentNote: state.currentNote,
        getNoteById: getNoteById as (noteId: number) => Promise<Note>,
        deleteNote,
        editNote,
        addNote,
        setCurrentNote,
        getAllNotes,
      }}
    >
      {children}
    </notesContext.Provider>
  );
};

export default NotesContextProvider;
