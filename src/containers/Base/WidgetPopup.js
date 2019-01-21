import React, { Component } from 'react';
import { Widget } from 'components/Base';


const WidgetPopup = (WrappedComponent) => {
  return class _WidgetPopup extends Component {
    constructor(props) {
      super(props);
    
      this.state = {
        isDisplayedPopup: this.props.isVisiblePopup
      };
      this.timeoutID = null;
    }

    componentDidUpdate() {
      clearTimeout(this.timeoutID);

      if (this.props.isVisiblePopup === this.state.isDisplayedPopup) return;
      if (this.props.isVisiblePopup) {
        this.setState({
          isDisplayedPopup: true
        });
      } else {
        this.timeoutID = setTimeout(() => {
          clearTimeout(this.timeoutID);
          this.setState({
            isDisplayedPopup: false
          });
        }, 150);
      }
    }

    componentWillUnmount() {
      clearTimeout(this.timeoutID);
    }

    render() {
      const isDisplayedPopup = !this.props.isVisiblePopup && !this.state.isDisplayedPopup ? false : true;
      return (
       <Widget>
         <WrappedComponent isVisiblePopup={true} isDisplayedPopup={isDisplayedPopup} {...this.props}/>
       </Widget> 
      );
    }
  }
}

export default WidgetPopup;