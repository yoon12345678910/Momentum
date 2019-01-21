import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ContentEditable from 'react-contenteditable';
import { RoundIcon2 } from 'components/Base/Icon';


const Wrapper = styled.li`
  display: inline-block;
  position: relative;
  width: 100%;
  padding: 3px 0;
  font-size: 94%;
  line-height: 1.25;
`;

const ActionsBox = styled.div`
  position: relative;
  top: 1px;
  float: right;
  padding-right: 15px;
`;

const Label = styled.label`
  position: relative;
  top: -1px;
  left: 0;
  float: left;
  padding-left: 19px;
  padding-right: 5px;
  cursor: pointer;
`;

const StyledRoundIcon = styled(RoundIcon2)`
  font-size: 21px;
  &:after {
    background: ${props => props.isActive ? 'rgba(255,255,255,.0)' : ''};
  }
  cursor: pointer;
`;

const Checkbox = styled.input`
  vertical-align: middle;
  cursor: pointer;
`;

const StyledContentEditable = styled(ContentEditable)`
  display: block;
  margin-left: 40px;
  margin-right: 70px;
  outline: 0;
  word-wrap: break-word;
  opacity: ${props => props.done ? .5 : .9};
  text-decoration: ${props => props.done ? 'line-through' : ''};
`;

const TodoItem = ({
  innerRef,
  value,
  isDone,
  disabled,
  onChange,
  onDoubleClick,
  onChangeTitle,
  onChangeCheckbox,
  onDelete,
  isHoverDeleteButton,
  onHoverDeleteButton
}) => {
  return (
    <Wrapper
      onMouseEnter={() => onHoverDeleteButton(true)}
      onMouseLeave={() => onHoverDeleteButton(false)}>
      <ActionsBox>
        <div onClick={onDelete}>
          <StyledRoundIcon
            isActive={isHoverDeleteButton}
            faClassName={'fa fa-times'}/>
        </div>
      </ActionsBox>
      <Label>
        <Checkbox
          type="checkbox"
          defaultChecked={isDone}
          onChange={onChangeCheckbox}/>
      </Label>
      <StyledContentEditable
        innerRef={innerRef}
        html={value}
        disabled={disabled}
        onChange={onChange}
        onDoubleClick={onDoubleClick}
        onKeyPress={() => onChangeTitle()}
        onBlur={onChangeTitle}
        done={isDone ? 1 : 0}
        spellCheck={false}/>
    </Wrapper>
  );
};

TodoItem.defaultProps = {
  innerRef: null,
  value: '',
  isDone: false,
  disabled: true,
  onChange: () => console.warn('onChange not defined'),
  onDoubleClick: () => console.warn('onDoubleClick not defined'),
  onChangeTitle: () => console.warn('onChangeTitle not defined'),
  onChangeCheckbox: () => console.warn('onChangeCheckbox not defined'),
  onDelete: () => console.warn('onDelete not defined'),
  isHoverDeleteButton: false,
  onHoverDeleteButton: () => console.warn('isHoverDeleteButton not defined')
};

TodoItem.propTypes = {
  innerRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element)
  }),
  value: PropTypes.string,
  isDone: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onDoubleClick: PropTypes.func,
  onChangeTitle: PropTypes.func,
  onChangeCheckbox: PropTypes.func,
  onDelete: PropTypes.func,
  isHoverDeleteButton: PropTypes.bool,
  onHoverDeleteButton: PropTypes.func
};

export default TodoItem;