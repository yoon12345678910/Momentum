import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from 'components/Base';


const StatusIcon = styled(Icon)`
  font-size: 12px;
  vertical-align: 15%;
  cursor: pointer;
  opacity: 0;
`;

const Wrapper = styled.div`
  flex: 1 0 auto;

  &:hover ${StatusIcon} {
    opacity: .5;
  }

  ${StatusIcon} {
    opacity: ${props => props.isFocused ? .5 : 0};
    &:hover {
      opacity: 1;
    }
  }
`;

const LocationWrapper = ({
  isFocused,
  title,
  onDoubleClick,
  children
}) => {
  return (
    <Wrapper
      isFocused={isFocused}
      onDoubleClick={onDoubleClick}
      title={title}>
      {children}
      <StatusIcon 
        faClassName={isFocused ? 'fa fa-location-arrow' : 'fa fa-pencil'}/>
    </Wrapper>
  )
}

LocationWrapper.defaultProps = {
  isFocused: false,
  title: '',
  onDoubleClick: () => console.warn('onDobuleClick not defined'),
}

LocationWrapper.propTypes = {
  isFocused: PropTypes.bool,
  title: PropTypes.string,
  onDoubleClick: PropTypes.func,
}

export default LocationWrapper;