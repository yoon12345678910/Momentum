import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as todoActions from 'redux/modules/todo';
import { ListChooserToggle, ListChooserDropdown, ListChooserDropdownItem } from 'components/Todo';


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
    
    if (listChoosers.isEmpty()) {
      return null;
    }
    
    const listChoosersJS = listChoosers.toJS();
    const selectedListchooserName = listChoosersJS[selectedListChooserId].name;
    const listChooserDropdownItems = Object.keys(listChoosersJS)
      .map((key) => {
        const { name, todoCnt } = listChoosersJS[key];
        return (
          <ListChooserDropdownItem
            key={key}
            onClick={() => {
              this.handleToggleDropdown();
              this.handleClickListChooser(key); }}
            name={name}
            isSelected={key === selectedListChooserId}
            todoCnt={todoCnt}/>
        );
      });

    return (
      <ListChooserToggle
        isActivedDropdownButton={this.state.isActivedDropdownButton}
        onToggleDropdownButton={this.handleToggleDropdownButton}
        onToggleDropdown={this.handleToggleDropdown}
        selectedListchooserName={selectedListchooserName}>
        <ListChooserDropdown
          innerRef={this.dropdownRef}
          isVisibleDropdown={this.state.isVisibleDropdown}
          onToggleDropdownButton={this.handleToggleDropdownButton}>
          {listChooserDropdownItems}
        </ListChooserDropdown>
      </ListChooserToggle>
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