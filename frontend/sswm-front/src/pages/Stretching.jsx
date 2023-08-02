import React from "react";
import styled from "styled-components";
// import { Link } from 'react-router-dom';

import Gnb from "../components/Gnb";


const Streching = () => {
  return (
    <div>
      <Gnb />
      <ContainerWrap>
        스트레칭
      </ContainerWrap>
    </div>
  );
};

const ContainerWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80vh;
`

export default Streching;