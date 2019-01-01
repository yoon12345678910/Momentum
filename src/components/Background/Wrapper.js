import React from 'react';
import './Background.css';


const Wrapper = ({
  children
}) => {
  return (
    <ul
      className="background">
      {children}
    </ul>
  );
}

export default Wrapper;