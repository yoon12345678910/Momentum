import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const StyledDashboard = styled.div`
  padding: 10px;
  cursor: pointer;
`;

const Dashboard = ({
  onClick,
  children,
  ...rest
}) => {
  return (
    <StyledDashboard
      {...rest}
      onClick={onClick}>
      {children}
    </StyledDashboard>
  );
};

Dashboard.defaultProps = {
  onClick: () => console.warn('onClick not defined'),
  children: null
};

Dashboard.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ])
};

export default Dashboard;