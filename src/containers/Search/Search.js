import React, { Component } from 'react';
import { SearchForm } from 'components/Search';


class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      isActive: false,
      isHover: false
    };

    this.wrapperRef = React.createRef();
    this.inputRef = React.createRef();
    this.handleClickDocument = null;
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleHover = this.handleHover.bind(this);
  }

  handleClick = () => {
    const onToggle = () => {
      this.setState({
        isActive: !this.state.isActive
      });
    };
    const outsideClickListener = (e) => {
      if (!this.wrapperRef.current.contains(e.target)) {
        this.setState({
          isActive: false
        });
        removeClickListener();
      }
    };
    const removeClickListener = () => {
      document.removeEventListener('click', this.handleClickDocument);
    };
    
    if (!this.state.isActive) {
      onToggle();
      this.handleClickDocument = outsideClickListener.bind(this);
      document.addEventListener('click', this.handleClickDocument);
    }
  }

  handleChange = (e) => {
    this.setState({
      value: e.target.value
    });
  }

  handleHover = (isHover) => {
    this.setState({
      isHover
    });
  }

  render() {
    return (
      <SearchForm
        wrapperRef={this.wrapperRef}
        inputRef={this.inputRef}
        value={this.state.value}
        isActive={this.state.isActive}
        isHover={this.state.isHover}
        onClick={this.handleClick}
        onChange={this.handleChange}
        onHover={this.handleHover}/>
    );
  }
}

export default Search;