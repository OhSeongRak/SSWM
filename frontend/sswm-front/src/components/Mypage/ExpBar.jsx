import React from 'react';
import styled from "styled-components";
import PropTypes from 'prop-types';

const ExpBar = ({ value, maxValue }) => {
  const percentage = Math.min((value / maxValue) * 100, 100);

  return (
    <ExpbarWrap>
      <Expbar style={{ width: `${percentage}%`}}></Expbar>
    </ExpbarWrap>
  );
};

ExpBar.propTypes = {
  value: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
};

const ExpbarWrap = styled.div`
  width: 100%;
  height: 30px;
  border: 1px solid #ccc;
  overflow: hidden;
`
const Expbar = styled.div`
  height: 100%;
  background-color: #4caf50;
`

export default ExpBar;
