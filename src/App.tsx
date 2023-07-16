import styled from "styled-components";
import "./App.css";
import Nav from "./components/Nav";
import Sidebar from "./components/Sidebar";
import WorkSpace from "./components/WorkSpace";

const NotesWrapper = styled.div`
  width: 70%;
  height: 500px;
  max-height: 500px;
  margin: 50px auto;
  border-radius: 10px;
  border: 1px solid #000;

  @media (max-width: 576px) {
    width: 100%;
    height: 100vh;
    border-radius: 0;
    border: none;
    margin: 0;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 93%;
`;

const App: React.FC = () => {
  return (
    <NotesWrapper>
      <Nav />
      <Wrapper>
        <Sidebar />
        <WorkSpace />
      </Wrapper>
    </NotesWrapper>
  );
};

export default App;
