import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Widget as DefaultWidget } from 'components/Base';
import { Icon } from 'components/Base/Icon';


const Widget = styled(DefaultWidget)`
  width: 230px;
  vertical-align: top;
`;

const SearchUnderLine = styled.span`
  position: absolute;
  top: 49px;
  left: 9px;
  right: 0;
  border-bottom: 2px solid #fff;
  opacity: ${props => props.isActive ? 1 : 0};
  transition: opacity .15s ease;
  z-index: 1;
`;

const StyledIcon = styled(Icon)`
  position: absolute;
  top: 0;
  font-size: 15px;
  line-height: 57px;
  opacity: ${props => props.isActive || props.isHover ? 1 : .7};
  transition: opacity .15s ease;
  z-index: 1;
  &:hover {
    opacity: .85;
  }
`;

const StyledInput = styled.input`
  position: relative;
  padding: 20px 0 20px 36px;
  border: none;
  box-sizing: border-box;
  height: 60px;
  background: 0 0;
  color: #fff;
  line-height: 20px;
  outline: 0;
  cursor: pointer;
  z-index: 2;
  &:focus {
    cursor: text;
  }
  &::placeholder {
    font-size: 12px;
    color: #fff;
    opacity: .5;
  }
`;

const SearchForm = ({
  wrapperRef,
  inputRef,
  isActive,
  isHover,
  value,
  onClick,
  onChange,
  onHover
}) => {
  return (
    <Widget 
      innerRef={wrapperRef}
      onClick={onClick}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}>
      <form 
        method='get'
        autoComplete='off'
        action={`https://www.google.com/search`}>
        <SearchUnderLine isActive={isActive}/>
        <StyledIcon 
          isActive={isActive}
          isHover={isHover}
          faClassName={'fa fa-search'}/>
        <StyledInput 
          type='text'
          value={value}
          ref={inputRef}
          onChange={onChange}
          name='q'
          placeholder='Search in the Google'/>
      </form>
    </Widget>
  );
};

SearchForm.defaultProps = {
  wrapperRef: null,
  inputRef: null,
  isActive: false,
  isHover: false,
  value: '',
  onClick: () => console.warn('onClick not defined'),
  onChange: () => console.warn('onChange not defined'),
  onHover: () => console.warn('onHover not defined')
};

SearchForm.propTypes = {
  wrapperRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element)
  }),
  inputRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element)
  }),
  isActive: PropTypes.bool,
  isHover: PropTypes.bool,
  value: PropTypes.string,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  onHover: PropTypes.func
};

export default SearchForm;