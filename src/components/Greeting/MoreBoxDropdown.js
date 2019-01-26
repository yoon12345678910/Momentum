import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as Dropdown from 'components/Base/Dropdown';
import { nipple } from 'lib/styleUtils';


const Wrapper = styled(Dropdown.Wrapper)`
  padding: 0;
  margin-top: 15px;
  min-width: max-content;
  left: 3px;
  background-color: rgba(15,15,15,.925);
  ${nipple`
    border-bottom: 6px solid rgba(15,15,15,.925);
    top: -5px;
    left: 13px;
  `};
`;

const List = styled.div`
  padding: 4px 0;
`;

const Item = styled(Dropdown.Item)`
  padding: 6px 14px;
  max-width: 280px;
  min-width: 100px;
  font-size: .875rem;
  font-weight: 400;
  line-height: 1;
`;

const MoreBoxDropdown = ({
  data,
  isActive,
  innerRef
}) => {
  const dropdownList = data.map((item, i) => {
    return (
      <Fragment key={i}>
        <Item
          key={i}
          onClick={item.onClick}>
          <span>{item.label}</span>
        </Item>
        { (i !== data.length - 1) ? <Dropdown.Line/> : null }
      </Fragment>
    );
  });
  return (
    <Wrapper
      ref={innerRef}
      isVisible={isActive}>
      <List>
        {dropdownList}
      </List>
    </Wrapper>
  );
};

MoreBoxDropdown.defaultProps = {
  data: [],
  isActive: false,
  nippleStyle: ''
};

MoreBoxDropdown.propTypes = {
  data: PropTypes.array,
  isActive: PropTypes.bool,
  nippleStyle: PropTypes.string
};

export default MoreBoxDropdown;