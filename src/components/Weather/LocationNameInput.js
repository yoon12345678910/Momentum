import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ContentEditable from 'react-contenteditable';


const StyledLocationNameInput = styled(ContentEditable)`
  display: inline-block;
  min-width: 32px;
  min-height: 24px;
  font-size: 118.75%;
  outline: 0;
  cursor: pointer;
`;

const LocationNameInput = ({
  innerRef,
  html,
  disabled,
  onChange,
  onSubmit
}) => {
  return (
    <StyledLocationNameInput
      innerRef={innerRef}
      html={html}
      tagName="pre"
      disabled={disabled}
      onChange={onChange}
      onKeyPress={(e) => {
        if (e.key === 'Enter') {
          onSubmit(e);
        }
      }}
      onBlur={onSubmit}
      spellCheck={false}/>
  )
}

LocationNameInput.defaultProps = {
  // innerRef: null,
  html: '',
  disabled: true,
  onChange: () => console.warn('onChange not defined'),
  onSubmit: () => console.warn('onSubmit not defined')
}

LocationNameInput.propTypes = {
  // innerRef: PropTypes.node,
  html: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func
}

export default LocationNameInput;