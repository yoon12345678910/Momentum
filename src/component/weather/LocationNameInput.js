import React from 'react';
import PropTypes from 'prop-types';
import ContentEditable from 'react-contenteditable';

export default class LocationNameInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      disabledInput: true
    };
    this.isEditing = false;
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  componentDidUpdate() {
    if (this.isEditing) {
      const el = document.querySelector('.weather .weather-location .location-name');
      if (!this.state.disabledInput) {
        el.setEndOfContenteditable();
      }
      el.animateCss('pulse');
      this.isEditing = false;
    }
  }

  validate = () => {
    const { locationName, foundLocationName, onSubmit } = this.props;
    const trim = locationName.replace(/\s/gi, '');

    if (trim.length && trim !== foundLocationName) {
      onSubmit(true);
    } else {
      onSubmit(false);
    }
    this.setState({
      disabledInput: true
    });
  }

  handleDoubleClick = () => {
    if (this.state.disabledInput) {
      this.isEditing = true;
    }
    this.setState({
      disabledInput: false
    });
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      this.isEditing = true;
      this.validate();
    }
  }

  handleBlur = () => {
    this.isEditing = true;
    this.validate();
  }

  render() {
    return (
      <ContentEditable
        html={this.props.locationName}
        disabled={this.state.disabledInput}
        onChange={this.props.onChange}
        onDoubleClick={this.handleDoubleClick}
        onKeyPress={this.handleKeyPress}
        onBlur={this.handleBlur}
        spellCheck={false}
        className={"location-name " + (this.state.disabledInput ? "" : "editing")}
      />
    )
  }
}

LocationNameInput.propTypes = {
  locationName: PropTypes.string.isRequired,
  foundLocationName: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}
