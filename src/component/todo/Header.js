import React from 'react';
import PropTypes from 'prop-types';
import shallowCompare from 'react-addons-shallow-compare';

import ListChooser from './ListChooser';


export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isShownDropdown: false,
      isShownDropdownHover: false,
    };

    this.isOnOffDropdown = false;
    this.handleClickDocument = null;
    this.dropdownRef = React.createRef();
    this.handleClickDropdown = this.handleClickDropdown.bind(this);
    this.handleMouseDropdown = this.handleMouseDropdown.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  componentDidUpdate() {
    if (this.isOnOffDropdown) {
      this.props.setDropdownHeight(this.dropdownRef.current.offsetHeight);
      this.isOnOffDropdown = false;
    }
  }

  handleMouseDropdown = () => {
    this.setState({
      isShownDropdownHover: !this.state.isShownDropdownHover
    });
  }

  handleClickDropdown = () => {
    const onToggle = () => {
      this.isOnOffDropdown = true;
      this.setState({
        isShownDropdown: !this.state.isShownDropdown
      });
    };
    const outsideClickListener = (e) => {
      if (!this.dropdownRef.current.contains(e.target)) {
        onToggle();
        removeClickListener();
      }
    };
    const removeClickListener = () => {
      document.removeEventListener('click', this.handleClickDocument);
    };

    if (this.state.isShownDropdown) {
      removeClickListener();
    } else {
      this.handleClickDocument = outsideClickListener.bind(this);
      document.addEventListener('click', this.handleClickDocument);
    }

    onToggle();
  }

  render() {
    const { 
      listChoosers, 
      selectedListChooserId, 
      onClickListChooser 
    } = this.props;

    const selectedListChooserName = Object.keys(listChoosers).length ? 
      listChoosers[selectedListChooserId].name : "";
    const listChooserElements = Object.keys(listChoosers)
      .map((key) => {
        const { name, todoCnt } = listChoosers[key]
        return (
          <ListChooser
            key={key}
            id={key}
            name={name}
            todoCnt={todoCnt}
            onClickListChooser={onClickListChooser}
            onClickDropdown={this.handleClickDropdown}
            isSelected={!!(key === selectedListChooserId)}
          />
        )
      });

    return (
      <div
        ref={this.props.headerRef}
        className="todo-header">
        <div className="list-row">
          <div className="active-list-container">
            <div 
              onClick={this.handleClickDropdown}
              className={"list-chooser-toggle has-icon-wrapper "
                + (this.state.isShownDropdownHover ? "hover" : "")}>
              <span className="active-list-name">
                {selectedListChooserName}
              </span>
              <div className="icon-wrapper">
                <i 
                  className="fa fa-angle-down"
                  aria-hidden="true">
                </i>
              </div>
            </div>
            <ul
              ref={this.dropdownRef}
              onMouseEnter={this.handleMouseDropdown}
              onMouseLeave={this.handleMouseDropdown}
              className={"dropdown list-chooser nipple-top-left nipple--u-bg " 
                + (this.state.isShownDropdown ? "show" : "")}>
              {listChooserElements}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}


Header.propTypes = {
  listChoosers: PropTypes.objectOf(
    PropTypes.shape({
      name:                 PropTypes.string.isRequired,
      todoCnt:              PropTypes.number.isRequired
    })
   ).isRequired,
  selectedListChooserId:    PropTypes.string.isRequired,
  onClickListChooser:       PropTypes.func.isRequired,
  headerRef:                PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  setDropdownHeight:        PropTypes.func.isRequired
}
