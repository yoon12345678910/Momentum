import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Dashboard as DefaultDashboard } from 'components/Base';


const StyledDashboard = styled(DefaultDashboard)`
  display: inline-block;
  padding: 10px 20px 14px 15px;
  font-size: 106.25%;
  color: ${props => props.isVisiblePopup ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,.7)'};
  line-height: 40px;
  transition: color .15s ease, text-shadow .15s ease;
  &:hover {
    color: rgba(255,255,255,1);
  }
`;

const Dashboard = ({
  isVisiblePopup,
  onClick
}) => {
  return (
    <StyledDashboard
      isVisiblePopup={isVisiblePopup}
      onClick={onClick}>
      Todo
    </StyledDashboard>
  );
};

Dashboard.defaultProps = {
  isVisiblePopup: false,
  onClick: () => console.warn('onClick not defined')
};

Dashboard.propTypes = {
  isVisiblePopup: PropTypes.bool,
  onClick: PropTypes.func
};

export default Dashboard;