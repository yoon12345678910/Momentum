import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const Wrapper = styled.div`
  visibility: ${props => props.isVisible ? 'visible' : 'hidden'};
`;

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
  isVisible,
  value,
  onChange,
  onKeyPress
}) => {
  return (
    <Wrapper 
      isVisible={isVisible}>
      <StyledInput 
        ref={innerRef}
        value={value} 
        onChange={onChange}
        onKeyPress={onKeyPress}
        type="text"
        placeholder="New Todo"
      />
    </Wrapper>
  );
};

AddTodoForm.defaultProps = {
  innerRef: null,
  isVisible: false,
  value: '',
  onChange: () => console.warn('onChange not defined'),
  onKeyPress: () => console.warn('onKeyPress not defined')
};

AddTodoForm.propTypes = {
  innerRef: PropTypes.shape({ 
    current: PropTypes.instanceOf(Element) 
  }),
  isVisible: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onKeyPress: PropTypes.func
};

export default AddTodoForm;