import './App.css';
import './index.css';
import styled from 'styled-components';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SignUp from './pages/SignUp';
import SignUpName from './pages/SignUpName';
import Login from './pages/Login';
import MyPage from './pages/MyPage';
import EditInfo from './pages/EditInfo';
import StudyRoom from './pages/StudyRoom';
import CreateStudyRoom from './pages/CreateStudyRoom';
import StudyRoomAdmin from './pages/StudyRoomAdmin';
import StudyRoomMember from './pages/StudyRoomMember';
import LiveRoom from './pages/LiveRoom';
//import VideoRoomComponent from './components/OpenVidu/VideoRoomComponent';

function App() {
  return (
    <ContentWrap>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StudyRoom />}></Route>
          <Route path="/SignUp" element={<SignUp />}></Route>
          <Route path="/SignUpName" element={<SignUpName />}></Route>
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/MyPage" element={<MyPage />}></Route>
          <Route path="/EditInfo" element={<EditInfo />}></Route>
          <Route path="/CreateStudyRoom" element={<CreateStudyRoom />}></Route>
          <Route path="/StudyRoomAdmin" element={<StudyRoomAdmin />}></Route>
          <Route path="/StudyRoomMember" element={<StudyRoomMember />}></Route>
          <Route path="/LiveRoom" element={<LiveRoom />}></Route>
          {/* <Route path="/VideoRoomComponent" element={<VideoRoomComponent />} /> */}
        </Routes>
      </BrowserRouter>
    </ContentWrap>
  );
}

export default App;

const ContentWrap = styled.div`
  min-height: 100%;
  margin: 0px;
  padding: 0px;
`;
