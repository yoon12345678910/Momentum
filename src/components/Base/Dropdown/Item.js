import React from 'react';
import styled from 'styled-components';


const StyledItem = styled.li`
  min-width: 240px;
  padding: 7px 16px;
  box-sizing: border-box;
  font-size: 94%;
  line-height: normal;
  white-space: nowrap;
  cursor: pointer;
  &:hover {
    background: rgba(255,255,255,.15);
  }
`;

const Item = ({
  children,
  className,
  ...rest
}) => {
  return (
    <StyledItem {...rest} className={className}>
      {children}
    </StyledItem>
  );
};

export default Item;
