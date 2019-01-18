import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const Wrapper = styled.div`
  overflow: hidden;
  transition: max-height .3s ease, min-height .3s ease;
`;

const List = styled.ol`
  overflow-x: hidden;
  overflow-y: auto;
`;

const TodoList = ({
  wrapperRef,
  listRef,
  children
}) => {
  return (
    <Wrapper ref={wrapperRef}>
      <List ref={listRef}>
        {children}
      </List>
    </Wrapper>
  );
};

TodoList.defaultProps = {
  wrapperRef: {},
  listRef: {},
  children: null
};

TodoList.propTypes = {
  wrapperRef: PropTypes.shape({ 
    current: PropTypes.instanceOf(Element) 
  }),
  listRef: PropTypes.shape({ 
    current: PropTypes.instanceOf(Element) 
  }),
  // children: PropTypes.arrayOf(PropTypes.number)
};

export default TodoList;