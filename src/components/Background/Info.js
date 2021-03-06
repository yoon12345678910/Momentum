import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Widget as DefaultWidget } from 'components/Base';


const Widget = styled(DefaultWidget)`
  position: absolute;
  bottom: 0;
  left: 52px;
`;

const Text = styled.span`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1;
  transition: all .3s ease;
  white-space: nowrap;
`;

const Title = styled(Text)`
  font-size: .8125rem;
  line-height: 60px;
  text-transform: capitalize;
  opacity: .8;
  cursor: default;
`;

const Source = styled(Text)`
  padding-bottom: 18px;
  font-size: .6875rem;
  opacity: 0;
`;

const Link = styled.a`
  margin-left: -3px;
  padding: 3px;
  opacity: .7;
  cursor: pointer;
  transition: all .2s ease;
  text-decoration: none;

  &:hover {
    opacity: .9;
  }

  &:link {
    color: #fff;
  }
  
  &:visited {
    color: #fff;
  }
`;

const InfoWrapper = styled.div`
  display: inline-block;
  position: absolute;
  height: 60px;
  width: 240px;
  bottom: 0;
  font-weight: 300;
  transition: all 0s ease, opacity 1s ease, transform 1s ease;
  vertical-align: bottom;
  user-select: none;

  &:hover ${Title} {
    transform: translateZ(0) translateY(-14%);
  }

  &:hover ${Source} {
    transform: translateZ(0) translateY(14%);
    opacity: 1;
  }

  &:hover ${Link} {
    opacity: .9;
  }
`;

const Info = ({
  innerRef,
  title,
  userName,
  link,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <Widget innerRef={innerRef}>
      <InfoWrapper
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}>
        <Title>{title}</Title>
        <Source>
          <Link
            href={link}>
            {`Photo by ${userName}`}
          </Link>
        </Source>
      </InfoWrapper>
    </Widget>
  );
};

Info.defaultProps = { 
  innerRef: null,
  title: '',
  userName: '',
  link: '',
  onMouseEnter: () => console.warn('onMouseEnter not defined'),
  onMouseLeave: () => console.warn('onMouseLeave not defined')
};

Info.propTypes = {
  innerRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element)
  }),
  title: PropTypes.string,
  userName: PropTypes.string,
  link: PropTypes.string,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func
};

export default Info;