import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Widget as DefaultWidget } from 'components/Base';
import overlay from 'static/images/overlay-focus.png';


const Wrapper = styled(DefaultWidget)`
  width: 100%;
  font-size: 187.5%;
  &:before {
    position: absolute;
    top: -92px;
    left: 0;
    height: 335px;
    width: 100%;
    background: url(${overlay}) 50% 0 no-repeat;
    background-size: contain;
    z-index: -1;
    content: " ";
  }
`;

const FocusWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Widget = ({
  children
}) => {
  return (
    <Wrapper>
      <FocusWrapper>
      {children}
      </FocusWrapper>
    </Wrapper>
  );
};

Widget.defaultProps = {
  children: null
};

Widget.propTypes = {
  children: PropTypes.node
};

export default Widget;