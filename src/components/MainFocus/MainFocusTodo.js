import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from 'components/Base/Icon';


const Todo = styled.div`
  display: inline-block;
  overflow: visible;
  width: 100%;
`;

const Title = styled.h3`
  margin: 17px 0 3px;
  font-size: 70%;
  line-height: 120%;
  text-transform: uppercase;
`;

const ActionWrapper = styled.span`
  display: inline-block;
  position: relative;
  padding: 6px 0;
  margin: 0 8px;
  top: -8px;
  text-shadow: 0 0 15px rgba(0,0,0,.3);
  cursor: pointer;
  user-select: none;
  opacity: ${props => props.isDone || props.isHover ? .8 : 0};
  &:hover {
    opacity: 1;
  };
`;

const StyledIcon = styled(Icon)`
  margin-left: 4px;
  font-size: 20px;  
  opacity: .85;
`;

const TodoTitle = styled.span`
  overflow: hidden;
  display: inline-block;
  padding: 5px 0;
  max-width: 87%;
  text-overflow: ellipsis;
  white-space: nowrap;
  opacity: ${props => props.isDone ? .85 : 1};
  text-decoration: ${props => props.isDone ? 'line-through' : 'none'};
`;

const TodoBox = styled.div`
  position: relative;
  top: 5px;
`;

const MainFocusTodo = ({
  wrapperRef,
  title,
  isDone,
  isHover,
  onChangeCheckbox,
  onDelete,
  onToggleHover,
  changePromptMode
}) => {
  return (
    <Todo ref={wrapperRef}>
      <Title>Today</Title>
      <TodoBox 
        onMouseEnter={() => onToggleHover(true)}
        onMouseLeave={() => onToggleHover(false)}>
        <ActionWrapper 
          isHover={isHover} 
          isDone={isDone}
          onClick={onChangeCheckbox}>
          <StyledIcon 
            faClassName={isDone ? 'fa fa-check-circle': 'fa fa-circle'}/> 
        </ActionWrapper>  
        <TodoTitle 
          isDone={isDone}>
          {title}
        </TodoTitle>
        <ActionWrapper 
          isHover={isHover} 
          isDone={isDone}>
          { isDone 
            ? <StyledIcon faClassName={'fa fa-plus-circle'} onClick={changePromptMode}/> 
              : <StyledIcon faClassName={'fa fa-times-circle'} onClick={onDelete}/>}
        </ActionWrapper>  
      </TodoBox>
    </Todo>
  );
};

MainFocusTodo.defaultProps = {
  wrapperRef: null,
  title: '',
  isDone: false,
  isHover: false,
  onChangeCheckbox: () => console.warn('onChangeCheck not defined'),
  onDelete: () => console.warn('onDelete not defined'),
  onToggleHover: () => console.warn('onToggleHover not defined'),
};

MainFocusTodo.propTypes = {
  wrapperRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element)
  }),
  title: PropTypes.string,
  isDone: PropTypes.bool,
  isHover: PropTypes.bool,
  onChangeCheckbox: PropTypes.func,
  onDelete: PropTypes.func,
  onToggleHover: PropTypes.func
};

export default MainFocusTodo;