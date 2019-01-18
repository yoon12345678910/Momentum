import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { RoundIcon1 } from 'components/Base/Icon';


const Wrapper = styled.div`
  position: relative;
  height: 47px;
`;

const ListRow = styled.div`
  display: flex;
  position: relative;
  height: 47px;
`;

const ActiveList = styled.div`
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

const ListChooserWrapper = ({
  innerRef,
  isActivedDropdownButton,
  onToggleDropdown,
  onToggleDropdownButton,
  selectedListchooserName,
  children
}) => {
  return (
    <Wrapper ref={innerRef}>
      <ListRow>
        <ActiveList>
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
        </ActiveList>
      </ListRow>
    </Wrapper>
  );
};

ListChooserWrapper.defaultProps = {
  // innerRef: null,
  isActivedDropdownButton: false,
  onToggleDropdown: () => console.warn('onToggleDropdown not defined'),
  onToggleDropdownButton: () => console.warn('onToggleDropdownButton not defined'),
  selectedListchooserName: '',
  // children: null
};

ListChooserWrapper.propTypes = {
  // innerRef: PropTypes.node,
  isActivedDropdownButton: PropTypes.bool,
  onToggleDropdown: PropTypes.func,
  onToggleDropdownButton: PropTypes.func,
  selectedListchooserName: PropTypes.string,
  // children: PropTypes.element
};

export default ListChooserWrapper;