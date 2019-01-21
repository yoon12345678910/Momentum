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

const ListChooserDropdown = ({
  innerRef,
  isVisibleDropdown,
  onToggleDropdownButton,
  children
}) => {
  return (
    <Wrapper
      innerRef={innerRef}
      isVisible={isVisibleDropdown}
      onMouseEnter={() => onToggleDropdownButton(true)}
      onMouseLeave={() => onToggleDropdownButton(false)}>
      {children}
    </Wrapper>
  );
};

ListChooserDropdown.defaultProps = {
  innerRef: null,
  isVisibleDropdown: false,
  onToggleDropdownButton: () => console.warn('onToggleDropdownButton not defined'),
  children: null
};

ListChooserDropdown.propTypes = {
  innerRef: PropTypes.shape({ 
    current: PropTypes.instanceOf(Element) 
  }),
  isVisibleDropdown: PropTypes.bool,
  onToggleDropdownButton: PropTypes.func,
  children: PropTypes.node
};

export default ListChooserDropdown;