import React from 'react'
import PropTypes from 'prop-types';

const CurrentTime = ({ onDoubleClick, children }) => {
  return (
    <div
      onDoubleClick={onDoubleClick}
      className="time bold">
      {children}
    </div>
  )
}

CurrentTime.propTypes = {
  onDoubleClick: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired
}

export default CurrentTime
