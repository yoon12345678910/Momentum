import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as Dropdown from 'components/Base/Dropdown';


const Name = styled.span`
  opacity: ${props => props.isSelected ? 1 : .7};
`;

const TodoCount = styled.span`
  margin-left: 6px;
  opacity: .45;
`;

const ListChooserDropdownItem = ({
  name,
  isSelected,
  todoCnt,
  onClick
}) => {
  return (
    <Dropdown.Item
      onClick={onClick}>
      <Name isSelected={isSelected}>
        {name}
      </Name>
      <TodoCount>{todoCnt}</TodoCount>
    </Dropdown.Item>
  );
};

ListChooserDropdownItem.defaultProps = {
  name: '',
  isSelected: false,
  todoCnt: 0,
  onClick: () => console.warn('onClick not defined')
};

ListChooserDropdownItem.propTypes = {
  name: PropTypes.string,
  isSelected: PropTypes.bool,
  todoCnt: PropTypes.number,
  onClick: PropTypes.func
};

export default ListChooserDropdownItem;