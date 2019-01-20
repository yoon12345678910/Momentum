import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from 'components/Base/Icon';


const StyledIcon = styled(Icon)`
  margin-left: 6px;
`;

const MessageBox = styled.div`
  margin-bottom: 16px;
  font-size: 87.5%;
  opacity: .45;
  transition: opacity .3s ease;
  cursor: pointer;
  &:hover {
    opacity: .8;
  }
`;

const TodoEmptyLinkMessage = ({
  onClickListChooser,
  targetLink,
  message
}) => {
  return (
    <MessageBox
      onClick={(e) => {
        e.nativeEvent.stopImmediatePropagation();
        onClickListChooser(targetLink);}}>
      {message}
      <StyledIcon
        faClassName={'fa fa-angle-right'}/>
    </MessageBox>
    
  );
};

TodoEmptyLinkMessage.defaultProps = {
  onClickListChooser: () => console.warn('onClickListChooser not defined'),
  targetLink: '',
  message: ''
};

TodoEmptyLinkMessage.propTypes = {
  onClick: PropTypes.func,
  targetLink: PropTypes.string,
  message: PropTypes.string
};

export default TodoEmptyLinkMessage;