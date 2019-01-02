import React from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components';

const DigitalDisplay = styled.div`
  color: #fff;
  font-size: 1050%;
  letter-spacing: -5px;
  font-weight: 500;
  user-select: none;
  cursor: default;
`;

const CurrentTime = ({
  onDoubleClick, 
  children
}) => {
  return (
    <DigitalDisplay
      onDoubleClick={onDoubleClick}>
      {children}
    </DigitalDisplay>
  )
}

CurrentTime.defaultProps = {
  children: '',
  onDoubleClick: () => console.warn('onDoubleClick not defined')
}

CurrentTime.propTypes = {
  children: PropTypes.string,
  onDoubleClick: PropTypes.func
}

export default CurrentTime;