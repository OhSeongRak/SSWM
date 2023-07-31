import './App.css';
import './index.css';
import styled from 'styled-components';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';


import SignUp from './pages/SignUp';
import SignUpName from './pages/SignUpName';
import Login from './pages/Login'
import MyPage from './pages/MyPage';
import EditInfo from './pages/EditInfo';
import StudyRoom from './pages/StudyRoom';
import CreateStudyRoom from './pages/CreateStudyRoom';
import StudyRoomAdmin from './pages/StudyRoomAdmin';
import StudyRoomMember from './pages/StudyRoomMember';
import LiveRoom from './pages/LiveRoom';

function App() {
  const data = useSelector((state) => {
    // store의 state 전부를 객체로 받아옴
    return state;
  });
  console.log(data)
  console.log('여기호출')
  
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
`