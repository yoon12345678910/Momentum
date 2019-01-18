import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as todoActions from 'redux/modules/todo';
import { ListChooserWrapper, ListChooserDropdown } from 'components/Todo';


class ListChooser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isVisibleDropdown: false,
      isActivedDropdownButton: false
    };

    this.isOnOffDropdown = false;
    this.handleClickDocument = null;
    this.dropdownRef = React.createRef();
    this.handleToggleDropdown = this.handleToggleDropdown.bind(this);
    this.handleToggleDropdownButton = this.handleToggleDropdownButton.bind(this);
    this.handleClickListChooser = this.handleClickListChooser.bind(this);
  }

  componentDidUpdate() {
    if (this.isOnOffDropdown) {
      const dropdownHeight = this.dropdownRef.current.offsetHeight;
      this.props.TodoActions.setDropdownHeight({ dropdownHeight });
      this.isOnOffDropdown = false;
    }
  }

  handleToggleDropdownButton = (isActivedDropdownButton) => {
    this.setState({ isActivedDropdownButton });
  }

  handleToggleDropdown = () => {
    const onToggle = () => {
      this.isOnOffDropdown = true;
      this.setState({
        isVisibleDropdown: !this.state.isVisibleDropdown
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

    onToggle();

    if (this.state.isVisibleDropdown) {
      removeClickListener();
    } else {
      this.handleClickDocument = outsideClickListener.bind(this);
      document.addEventListener('click', this.handleClickDocument);
    }
  }

  handleClickListChooser = (listChooserId) => {
    this.props.TodoActions.changeListChooser({ listChooserId });
  }

  render() {
    const { selectedListChooserId, listChoosers } = this.props;
    const listChoosersJS = listChoosers.toJS();

    if (listChoosers.isEmpty()) {
      return null;
    }
    
    return (
      <ListChooserWrapper
        innerRef={this.props.innerRef}
        isActivedDropdownButton={this.state.isActivedDropdownButton}
        onToggleDropdownButton={this.handleToggleDropdownButton}
        onToggleDropdown={this.handleToggleDropdown}
        selectedListchooserName={listChoosersJS[selectedListChooserId].name}>
        <ListChooserDropdown
          innerRef={this.dropdownRef}
          isVisibleDropdown={this.state.isVisibleDropdown}
          onToggleDropdown={this.handleToggleDropdown}
          onToggleDropdownButton={this.handleToggleDropdownButton}
          onClickListChooser={this.handleClickListChooser}
          listChoosers={listChoosersJS}
          selectedListChooserId={selectedListChooserId}/>
      </ListChooserWrapper>
    );
  }
}

export default connect(
  (state) => ({
    selectedListChooserId: state.todo.get('selectedListChooserId'),
    listChoosers: state.todo.get('listChoosers')
  }),
  (dispatch) => ({
    TodoActions: bindActionCreators(todoActions, dispatch)
  })
)(ListChooser);