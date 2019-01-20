import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const StyledInput = styled.input`
  display: block;
  overflow: hidden;
  width: 100%;
  padding: 8px 19px 16px 19px;
  font-size: 15px;
  font-weight: 600;
  opacity: .75;
`;

const AddTodoForm = ({
  innerRef,
  value,
  onChange,
  onKeyPress
}) => {
  return (
    <StyledInput 
      ref={innerRef}
      value={value} 
      onChange={onChange}
      onKeyPress={onKeyPress}
      type="text"
      placeholder="New Todo"
    />
  );
};

AddTodoForm.defaultProps = {
  innerRef: null,
  value: '',
  onChange: () => console.warn('onChange not defined'),
  onKeyPress: () => console.warn('onKeyPress not defined')
};

AddTodoForm.propTypes = {
  innerRef: PropTypes.shape({ 
    current: PropTypes.instanceOf(Element) 
  }),
  value: PropTypes.string,
  onChange: PropTypes.func,
  onKeyPress: PropTypes.func
};

export default AddTodoForm;