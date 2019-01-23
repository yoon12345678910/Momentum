import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { RoundIcon1 } from 'components/Base/Icon';


const Wrapper = styled.div`
  display: inline-flex;
  flex: 1 1 auto;
  padding-left: 19px;
  align-items: center;
`;

const DropdownToggle = styled.div`
  height: 100%;
  cursor: pointer;
`;

const ListChooserName = styled.span`
  overflow: hidden;
  font-size: 19px;
  text-overflow: ellipsis;
  text-transform: capitalize;
  white-space: nowrap;
`;

const StyledRoundIcon = styled(RoundIcon1)`
  margin: 0 3px;
`;

const ListChooserToggle = ({
  isActivedDropdownButton,
  onToggleDropdown,
  onToggleDropdownButton,
  selectedListchooserName,
  children
}) => {
  return (
    <Wrapper>
      <DropdownToggle
        onMouseEnter={() => onToggleDropdownButton(true)}
        onMouseLeave={() => onToggleDropdownButton(false)}
        onClick={onToggleDropdown}>
        <ListChooserName>
          {selectedListchooserName}
        </ListChooserName>
        <StyledRoundIcon
          isActive={isActivedDropdownButton}
          faClassName={'fa fa-angle-down'}/>
      </DropdownToggle>
      {children}
    </Wrapper>
  );
};

ListChooserToggle.defaultProps = {
  isActivedDropdownButton: false,
  onToggleDropdown: () => console.warn('onToggleDropdown not defined'),
  onToggleDropdownButton: () => console.warn('onToggleDropdownButton not defined'),
  selectedListchooserName: '',
  children: null
};

ListChooserToggle.propTypes = {
  isActivedDropdownButton: PropTypes.bool,
  onToggleDropdown: PropTypes.func,
  onToggleDropdownButton: PropTypes.func,
  selectedListchooserName: PropTypes.string,
  children: PropTypes.element
};

export default ListChooserToggle;