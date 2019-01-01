import React from 'react'
import PropTypes from 'prop-types';

const Meridiem = ({ isOnMeridiem, hour12clock, children }) => {
  return (
    <span
      className={"format " + (isOnMeridiem && hour12clock ? "show" : "")}>
      {children}
    </span>
  )
}

Meridiem.propTypes = {
  isOnMeridiem: PropTypes.bool.isRequired,
  hour12clock: PropTypes.bool.isRequired,
  children: PropTypes.string.isRequired
}

export default Meridiem
