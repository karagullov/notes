import { useContext } from "react";
import styled from "styled-components";
import ListItem from "./ListItem";
import { notesContext } from "../context/NotesContext";

const SidebarWrapper = styled.div`
  width: 30%;
  height: 96.5%;
  overflow-y: scroll;
  @media (max-width: 768px) {
    width: 40%;
  }
`;

const Sidebar: React.FC = () => {
  const noteContext = useContext(notesContext);

  return (
    <SidebarWrapper>
      {[...(noteContext?.allNotes || [])].reverse().map((note) => (
        <ListItem key={note.id} note={note} />
      ))}
    </SidebarWrapper>
  );
};

export default Sidebar;
