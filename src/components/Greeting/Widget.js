import React from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components';
import { Widget as DefaultWidget } from 'components/Base';


const StyledWidget = styled(DefaultWidget)`
  display: flex;
`;

const Widget = ({
  children
}) => {
  return (
    <StyledWidget>
      {children}
    </StyledWidget>
  );
};

Widget.propTypes = {
  children: PropTypes.node.isRequired
};

export default Widget;