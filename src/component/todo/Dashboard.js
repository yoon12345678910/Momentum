import React from 'react';
import PropTypes from 'prop-types';
import shallowCompare from 'react-addons-shallow-compare';


export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleClickDocument = null;
    this.handleClick = this.handleClick.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  handleClick = () => {
    const { isShownPopup, clickVerifier, onTogglePopup } = this.props;

    const outsideClickListener = (e) => {
      if (!clickVerifier(e.target)) {
        onTogglePopup();
        removeClickListener();
      }
    };
    const removeClickListener = () => {
      document.removeEventListener('click', this.handleClickDocument);
    };

    if (!isShownPopup) {
      this.handleClickDocument = outsideClickListener.bind(this);
      document.addEventListener('click', this.handleClickDocument);
    } else {
      removeClickListener();
    }

    onTogglePopup();
  }

  render() {
    return (
      <span
        onClick={this.handleClick}
        className="widget-dash toggle">
        Todo
      </span>
    )
  }
}


Dashboard.propTypes = {
  isShownPopup: PropTypes.bool.isRequired,
  clickVerifier: PropTypes.func.isRequired,
  onTogglePopup: PropTypes.func.isRequired,
}
