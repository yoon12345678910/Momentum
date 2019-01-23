import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { PopupWrapper as DefaultPopupWrapper
  , Popup as DefaultPopup } from 'components/Base';
import { nipple } from 'lib/styleUtils';


const StyledPopupWrapper = styled(DefaultPopupWrapper)`
  transform: ${props => props.isVisible ? 'none' : 'translateY(5px)'};
  ${nipple`
    bottom: -6px;
    right: 33px;
    border-top: 6px solid rgba(15,15,15,.925);
  `};
`;

const StyledPopup = styled(DefaultPopup)`
  overflow-y: hidden;
  width: 320px;
  right: 7px;
  bottom: 0;
`;

const Popup = ({
  isVisible,
  children,
  ...rest
}) => {
  return (
    <StyledPopupWrapper isVisible={isVisible}
      {...rest}>
      <StyledPopup>
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