import styled from "styled-components/macro";
import plus from "../assets/plus.png";
import React, { useState, useContext, useEffect } from "react";
import { notesContext } from "../context/NotesContext";
import useDebounce from "../hooks/useDebounce";

const Header = styled.header`
  width: 100%;
  min-height: 10%;
  background-color: ${({ theme }) => theme.bg1};
  border-radius: 10px 10px 0 0;
  padding: 9px 20px 0 20px;
  display: flex;
  justify-content: space-between;
  @media (max-width: 425px) {
    border-radius: 0;
  }
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  @media (max-width: 768px) {
    width: 15px;
    height: 15px;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const IconBlock = styled.div`
  width: 50px;
  height: 30px;
  background-color: ${({ theme }) => theme.bg4};
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
  }
`;

const Search = styled.input`
  width: 200px;
  height: 30px;
  border: none;
  border-radius: 5px;
  padding-left: 10px;
  &::placeholder {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  @media (max-width: 768px) {
    width: 40%;
    height: 30px;
  }
  @media (max-width: 768px) {
    width: 50%;
  }
`;

function Nav() {
  const noteContext = useContext(notesContext);
  const [search, setSearch] = useState("");
  const debauncedSearch = useDebounce(search, 200);

  useEffect(() => {
    noteContext?.getAllNotes(debauncedSearch);
  }, [debauncedSearch]);

  return (
    <>
      <Header>
        <IconWrapper>
          <IconBlock onClick={noteContext?.addNote}>
            <Icon src={plus} alt="plus" />
          </IconBlock>
          <IconBlock onClick={noteContext?.deleteNote}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              width="20px"
              height="20px"
              color={noteContext?.currentNote ? "" : "gray"}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </IconBlock>
          <IconBlock>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              width="20px"
              height="20px"
              color={noteContext?.currentNote ? "" : "gray"}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </IconBlock>
        </IconWrapper>
        <Search
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="search"
        />
      </Header>
    </>
  );
}

export default Nav;