import { css } from 'styled-components';

export const nipple = (...args) => css`
  &:after {
    display: block;
    overflow: visible;
    position: absolute;
    width: 0;
    height: 0;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    content: '';
    ${css(...args)};
  }
`;