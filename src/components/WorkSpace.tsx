import { useContext } from "react";
import styled from "styled-components";
import { getExactLine } from "../utils/getExactLine";
import { notesContext } from "../context/NotesContext";

const Time = styled.div`
  text-align: center;
  margin: 0 auto;
  padding-top: 20px;
`;
const Wrapper = styled.div`
  width: 70%;
  height: 93%;
  @media (max-width: 576px) {
    width: 60%;
    font-size: 14px;
  }
`;

const Content = styled.textarea`
  width: 100%;
  height: 94%;
  padding: 20px;
  font-size: 16px;
  outline: none;
  border: none;
`;

const options: Intl.DateTimeFormatOptions = {
  day: "numeric",
  month: "long",
  year: "numeric",
  hour: "numeric",
  minute: "numeric",
};

const WorkSpace: React.FC = () => {
  const noteContext = useContext(notesContext);

  return (
    <Wrapper>
      <Time>{new Date().toLocaleString("en-US", options)}</Time>
      <Content
        value={noteContext?.currentNote?.content as string}
        onChange={(e) => {
          if (!noteContext?.currentNote) return;
          const value = e.target.value;
          const newNote = {
            id: Number(noteContext.currentNote.id),
            content: value,
            title: getExactLine(value, 0) || `Новая заметка`,
            subTitle: getExactLine(value, 1) || `Дополнительный текст`,
            date: Date.now(),
          };
          noteContext?.setCurrentNote(newNote);
          noteContext?.editNote(newNote);
        }}
      />
    </Wrapper>
  );
};

export default WorkSpace;
