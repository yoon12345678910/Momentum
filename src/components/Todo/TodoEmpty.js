import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const Wrapper = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 150px;
  box-sizing: border-box;
  padding: 19px;
  text-align: center;
`;

const Title = styled.p`
  margin-top: -3px;
  margin-bottom: 6px;
  opacity: .7;
`;

const AddTodoButton = styled.button`
  padding: 8px 28px 9px 28px;
  border-radius: 50px;
  border: none;
  outline: 0;
  font-size: .875rem;
  background: rgba(255,255,255,.3);
  color: #fff;
  text-shadow: none;
  transition: opacity .3s ease;
  opacity: ${props => props.isVisible ? 1 : 0};
  cursor: ${props => props.isVisible ? 'pointer' : 'default'};
`;

const TodoEmpty = ({
  isVisibleAddTodo,
  title,
  onToggleAddTodo,
  children
}) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      {children}
      <AddTodoButton
        isVisible={!isVisibleAddTodo}
        onClick={onToggleAddTodo}>
        New Todo
      </AddTodoButton>
    </Wrapper>
  );
};

TodoEmpty.defaultProps = {
  isVisibleAddTodo: false,
  title: '',
  onToggleAddTodo: () => console.warn('onToggleAddTodo not defined'),
  children: null
};

TodoEmpty.propTypes = {
  isVisibleAddTodo: PropTypes.bool,
  title: PropTypes.string,
  onToggleAddTodo: PropTypes.func,
  children: PropTypes.element
};

export default TodoEmpty;