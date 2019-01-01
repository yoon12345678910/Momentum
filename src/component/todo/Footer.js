import React from 'react';
import PropTypes from 'prop-types';
import shallowCompare from 'react-addons-shallow-compare';


export default class Footer extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        value: ''
      }

      this.isChanged = false;
      this.inputRef = React.createRef();
      this.handleChange = this.handleChange.bind(this);
      this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    componentDidUpdate() {
      if (this.props.isShownFooter && !this.isChanged) {
        this.inputRef.current.focus();
      }
      this.isChanged = this.props.isShownFooter;
    }

    shouldComponentUpdate(nextProps, nextState) {
      return shallowCompare(this, nextProps, nextState);
    }

    handleChange = (e) => {
      this.setState({
        value: e.target.value
      });
    }

    handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        this.props.onSubmit(e.target.value);
        this.setState({
          value: ''
        });
      }
    }

    render() {
      return (
        <div
          ref={this.props.footerRef} 
          className={"todo-footer " + (this.props.isShownFooter ? "active" : "")}>
          <input 
            ref={this.inputRef}
            value={this.state.value} 
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
            type="text"
            className="todo-new" 
            placeholder="New Todo"
          />
        </div>
      )
    }
  }


  Footer.propTypes = {
    footerRef:            PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    onSubmit:             PropTypes.func.isRequired,
    isShownFooter:        PropTypes.bool.isRequired
  }
