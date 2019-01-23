import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ContentEditable from 'react-contenteditable';
import { Icon, RoundIcon2 } from 'components/Base/Icon';


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

const Exclamation = styled(Icon)`
  position: absolute;
  top: 7px;
  left: -4px;
  font-size: 1px;
  opacity: ${props => props.isDone ? .5 : .7};
`;

const Label = styled.label`
  position: relative;
  top: -2px;
  left: 3px;
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
  opacity: ${props => props.opacity};
  text-decoration: ${props => props.decoration};
`;

const TodoItem = ({
  innerRef,
  title,
  isDone,
  isMainFocus,
  disabled,
  onChange,
  onDoubleClick,
  onChangeTitle,
  onChangeCheckbox,
  onDelete,
  isHoverDeleteButton,
  onHoverDeleteButton
}) => {
  const textOpacity = (() => {
    let opacity;
    if (isDone) {
      opacity = .5;
    } else if (!disabled) {
      opacity = .7;
    } else {
      opacity = .9;
    }
    return opacity;
  })();
  const textDecoration = isDone ? 'line-through' : '';
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
      { isMainFocus 
        ? <Exclamation isDone={isDone} faClassName={'fa fa-star'}/> : null}
      <Label>
        <Checkbox
          type="checkbox"
          checked={isDone}
          onChange={onChangeCheckbox}/>
      </Label>
      <StyledContentEditable
        innerRef={innerRef}
        html={title}
        tagName="pre"
        disabled={disabled}
        onChange={onChange}
        onDoubleClick={onDoubleClick}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            onChangeTitle();
          }
        }}
        onBlur={onChangeTitle}
        opacity={textOpacity}
        decoration={textDecoration}
        spellCheck={false}/>
    </Wrapper>
  );
};

TodoItem.defaultProps = {
  innerRef: null,
  title: '',
  isDone: false,
  isMainFocus: false,
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
  title: PropTypes.string,
  isDone: PropTypes.bool,
  isMainFocus: PropTypes.bool,
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