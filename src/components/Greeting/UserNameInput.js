import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import ContentEditable from 'react-contenteditable';

const InputWrapper = styled.span`
  position: relative;
  white-space: nowrap;
`;

const StyledInput = styled(ContentEditable)`
  display: inline-block;
  overflow: hidden;
  max-width: 12em;
  padding: 5px 2px 10px;
  margin: -5px -2px -10px;
  border-radius: 3px;
  outline: 0;
  vertical-align: top;
  white-space: nowrap;

  ${props => !props.disabled && css`
    min-width: 1.5em;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    cursor: auto;

    &:after {
      position: absolute;
      height: 3px;
      right: 12px;
      bottom: -5px;
      left: 0;
      background: #fff;
      content: '';
    }
  `}
`;

const UserNameInput = ({
  innerRef,
  isDisabledInput,
  onDoubleClick,
  onChange,
  onSubmit,
  children 
}) => {
  return (
    <InputWrapper>
      <StyledInput
        innerRef={innerRef}
        html={children}
        disabled={isDisabledInput}
        onDoubleClick={onDoubleClick}
        onChange={onChange}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            onSubmit(e);
          }
        }}
        onBlur={onSubmit}
        spellCheck={false}
      />
      <span>.</span>
    </InputWrapper>
  )
}

UserNameInput.defaultProps = {
  isDisabledInput: true,
  onDoubleClick: () => console.warn('onDobuleClick not defined'),
  onChange: () => console.warn('onChange not defined'),
  onSubmit: () => console.warn('onSubmit not defined'),
  children: ''
}

UserNameInput.propTypes = {
  // innerRef: PropTypes.node,
  isDisabledInput: PropTypes.bool,
  onDoubleClick: PropTypes.func,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  children: PropTypes.string
}

export default UserNameInput;