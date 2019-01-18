import React from 'react';
import styled from 'styled-components';


const StyledLine = styled.li`
  margin: 2px 0;
  padding: 0;
  height: 1px;
  background: rgba(255,255,255,.12);
  cursor: default;
`;

const Line = ({
  className
}) => {
  return (
    <StyledLine className={className}/>
  );
};

export default Line;
