import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const Prompt = styled.div`
  padding-bottom: 12px;
`;

const Title = styled.h3`
  font-size: 2.1875rem;
  font-weight: 300;
`;

const StyledInput = styled.input`
  display: block;
  margin: 0 auto;
  padding-top: 15px;
  width: 13.7em;
  border: 0;
  border-bottom: 2px solid #fff;
  font-size: 120%;
  line-height: 120%;
  background: 0;
  color: #fff;
  font-weight: 500;
  outline: 0;
  text-align: center;
  transition: border-color .2s ease;
`;

const MainFocusPrompt = ({
  wrapperRef,
  inputRef,
  value,
  onClick,
  onChange,
  onKeyPress
}) => {
  return (
    <Prompt 
      ref={wrapperRef}
      onClick={onClick}>
      <Title>What is your main focus for today?</Title>
      <StyledInput
        ref={inputRef}
        value={value} 
        onChange={onChange}
        onKeyPress={onKeyPress}
        type="text"/>
    </Prompt>
  );
};

MainFocusPrompt.defaultProps = {
  wrapperRef: null,
  inputRef: null,
  value: '',
  onClick: () => console.warn('onClick not defined'),
  onChange: () => console.warn('onChange not defined'),
  onKeyPress: () => console.warn('onKeyPress not defined'),
};

MainFocusPrompt.propTypes = {
  wrapperRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element)
  }),
  innerRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element)
  }),
  value: PropTypes.string,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  onKeyPress: PropTypes.func
};

export default MainFocusPrompt;