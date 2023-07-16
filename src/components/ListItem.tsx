import styled from "styled-components";
import { notesContext } from "../context/NotesContext";
import React, { useContext } from "react";
import { Note } from "../context/types";

const ListNote = styled.div<{ isselected: string }>`
  width: 100%;
  height: 15%;
  background-color: ${({ theme, isselected }) => (isselected ? theme.bg2 : "")};
  border-bottom-width: 80%;
  border-bottom: 1px solid ${({ theme }) => theme.bg2};
  padding: 15px 25px;
  @media (max-width: 375px) {
    padding: 15px 10px;
  }
  @media (max-width: 320px) {
    padding: 15px 5px;
  }
`;

const Time = styled.div`
  display: inline-block;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const SubTitile = styled.div`
  display: inline-block;
  font-size: 15px;
  color: ${({ theme }) => theme.text3};
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;
const Title = styled.h2`
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;
const Wrapper = styled.div`
  display: flex;
  margin-top: 8px;
  gap: 8px;
`;

interface NoteItemProps {
  note: Note;
}

const ListItem: React.FC<NoteItemProps> = ({ note }) => {
  const noteContext = useContext(notesContext);

  return (
    <ListNote
      isselected={noteContext?.currentNote?.id === note.id ? "selected" : ""}
      onClick={() => noteContext?.setCurrentNote(note)}
    >
      <Title>
        {note.title.length > 10 ? `${note.title.slice(0, 10)}...` : note.title}
      </Title>
      <Wrapper>
        <Time>
          {new Date(note.date).toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
          })}
        </Time>
        <SubTitile>
          {note.subTitle.length > 5
            ? `${note.subTitle.slice(0, 5)}...`
            : note.subTitle}
        </SubTitile>
      </Wrapper>
    </ListNote>
  );
};

export default ListItem;
