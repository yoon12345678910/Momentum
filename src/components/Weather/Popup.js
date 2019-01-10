import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { PopupWrapper as DefaultPopupWrapper
  , Popup as DefaultPopup } from 'components/Base';
import { nipple } from 'lib/styleUtils';


const StyledPopupWrapper = styled(DefaultPopupWrapper)`
  transform: ${props => props.isVisible ? 'none' : 'translateY(-5px)'};
  ${nipple`
    top: -6px;
    right: 33px;
    border-bottom: 6px solid rgba(15,15,15,.925);
  `};
`;

const StyledPopup = styled(DefaultPopup)`
  padding: 16px 19px 16px 19px;
  width: 400px;
  right: 7px;
`;

const Popup = ({
  innerRef,
  isVisible,
  children
}) => {
  return (
    <StyledPopupWrapper 
      innerRef={innerRef}
      isVisible={isVisible}>
      <StyledPopup
        isVisible={isVisible}>
        {children}
      </StyledPopup>
    </StyledPopupWrapper>
  );
};

Popup.defaultProps = {
  isVisible: false,
  children: null
};

Popup.propTypes = {
  isVisible: PropTypes.bool,
  children: PropTypes.node
};

export default Popup;