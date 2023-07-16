export interface Note {
  date: number;
  content: string;
  title: string;
  subTitle: string;
  id: number;
}

export interface NotesState {
  allNotes: Note[];
  currentNote: Note | null;
}

export enum NotesActions {
  GET_ALL_NOTES = "GET_ALL_NOTES",
  SET_CURRENT_NOTE = "SET_CURRENT_NOTE",
  UPDATE_NOTE = "UPDATE_NOTE",
  DELETE_NOTE = "DELETE_NOTE",
  ADD_NOTE = "ADD_NOTE",
}
