import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const Wrapper = styled.div`
  position: absolute;
  display: ${props => props.isActiveDropdown ? 'block' : 'none'};
  padding: 0;
  margin-top: 15px;
  min-width: max-content;
  left: 3px;
  background-color: rgba(15,15,15,.925);
  border-radius: 4px;
  box-shadow: 0 1px 8px rgba(0,0,0,.25);

  &:after {
    opacity: 1;
    display: block;
    overflow: visible;
    position: absolute;
    width: 0;
    height: 0;
    top: -5px;
    left: 13px;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-bottom: 6px solid rgba(15,15,15,.925);
    content: '';
  }
`;

const List = styled.ul`
  padding: 4px 0;
`;

const Item = styled.li`
  padding: 6px 14px;
  max-width: 280px;
  font-weight: 400;
  line-height: 1;
  cursor: pointer;

  &:hover {
    background: rgba(255,255,255,.15);
  }
`;

const Line = styled.li`
  margin: 2px 0;
  padding: 0;
  height: 1px;
  background: rgba(255,255,255,.12);
  cursor: default;
`;

const DropdownItem = ({
  label,
  onClick
}) => {
  return (
    <Item
      onClick={onClick}>
      <span>{label}</span>
    </Item>
  );
};

const Dropdown = ({
  data,
  isActiveDropdown,
  innerRef
}) => {
  const dropdownList = data.map((item, i) => 
    <Fragment 
      key={i}>
      <DropdownItem
        key={i}
        label={item.label}
        onClick={item.onClick}
      />
      { (i !== data.length - 1) ? <Line/> : null }
    </Fragment>
  );
  return (
    <Wrapper
      ref={innerRef}
      isActiveDropdown={isActiveDropdown}>
      <List>
        {dropdownList}
      </List>
    </Wrapper>
  );
};

Dropdown.defaultProps = {
  data: [],
  isActiveDropdown: false,
  nippleStyle: ''
};

Dropdown.propTypes = {
  data: PropTypes.array,
  isActiveDropdown: PropTypes.bool,
  nippleStyle: PropTypes.string
};


export default Dropdown;
