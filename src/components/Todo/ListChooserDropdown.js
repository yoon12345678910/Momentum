import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as Dropdown from 'components/Base/Dropdown';
import { nipple } from 'lib/styleUtils';


const Wrapper = styled(Dropdown.Wrapper)`
  top: 47px;
  padding: 4px 0;
  margin-left: -4px;
  ${nipple`
    top: -6px;
    left: 28px;
    border-bottom: 6px solid rgba(15,15,15,.925);
    border-top-color: #333;
    border-bottom-color: #333;
  `};
`;

const Name = styled.span`
  opacity: ${props => props.isSelected ? 1 : .7};
`;

const TodoCount = styled.span`
  margin-left: 6px;
  opacity: .45;
`;

const ListChooserDropdown = ({
  innerRef,
  isVisibleDropdown,
  onToggleDropdown,
  onToggleDropdownButton,
  onClickListChooser,
  listChoosers,
  selectedListChooserId
}) => {
  const dropdownList = Object.keys(listChoosers)
    .map((key) => {
      const { name, todoCnt } = listChoosers[key];
      return (
        <Dropdown.Item
          key={key}
          onClick={() => {
            onToggleDropdown();
            onClickListChooser(key);}}>
          <Name isSelected={key === selectedListChooserId}>
            {name}
          </Name>
          <TodoCount>{todoCnt}</TodoCount>
        </Dropdown.Item>
      );
    });
  return (
    <Wrapper
      innerRef={innerRef}
      isVisible={isVisibleDropdown}
      onMouseEnter={() => onToggleDropdownButton(true)}
      onMouseLeave={() => onToggleDropdownButton(false)}>
      {dropdownList}
    </Wrapper>
  );
};

ListChooserDropdown.defaultProps = {
  // innerRef: null,
  isVisibleDropdown: false,
  onToggleDropdown: () => console.warn('onToggleDropdown not defined'),
  onToggleDropdownButton: () => console.warn('onToggleDropdownButton not defined'),
  onClickListChooser: () => console.warn('onClickListChooser not defined'),
  listChoosers: {
    name: '',
    todoCnt: 0
  },
  selectedListChooserId: ''
};

ListChooserDropdown.propTypes = {
  // innerRef: PropTypes.element,
  isVisibleDropdown: PropTypes.bool,
  onToggleDropdown: PropTypes.func,
  onToggleDropdownButton: PropTypes.func,
  onClickListChooser: PropTypes.func,
  listChoosers: PropTypes.objectOf(
    PropTypes.shape({
      name: PropTypes.string,
      todoCnt: PropTypes.number
    })
  ),
  selectedListChooserId: PropTypes.string
};

export default ListChooserDropdown;