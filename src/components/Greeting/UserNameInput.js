import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
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
`;

const UserNameInput = ({
  innerRef,
  isDisabled,
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
        tagName="pre"
        disabled={isDisabled}
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
  isDisabled: true,
  onDoubleClick: () => console.warn('onDobuleClick not defined'),
  onChange: () => console.warn('onChange not defined'),
  onSubmit: () => console.warn('onSubmit not defined'),
  children: ''
}

UserNameInput.propTypes = {
  // innerRef: PropTypes.node,
  isDisabled: PropTypes.bool,
  onDoubleClick: PropTypes.func,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  children: PropTypes.string
}

export default UserNameInput;