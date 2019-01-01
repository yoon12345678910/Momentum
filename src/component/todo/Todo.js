import React from 'react';
import PropTypes from 'prop-types';
import shallowCompare from 'react-addons-shallow-compare';

import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';
import Dashboard from './Dashboard';

import './Todo.css';
import DB from './DB';


export default class Todo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isShownPopup: false,
      isShownFooter: false,
      selectedListChooserId: '',
      listChoosers: {},
      todos: [],
      dropdownHeight: 0,
    }

    this.isInit = false;
    this.popupHeightRefs = [];
    this.headerRef = React.createRef();
    this.footerRef = React.createRef();
    this.handleTogglePopup = this.handleTogglePopup.bind(this);
    this.handleClickListChooser = this.handleClickListChooser.bind(this);
    this.handleSubmitNewTodo = this.handleSubmitNewTodo.bind(this);
    this.handleSubmitTodoTitle = this.handleSubmitTodoTitle.bind(this);
    this.handleChangeTodoDone = this.handleChangeTodoDone.bind(this);
    this.handleDeleteTodo = this.handleDeleteTodo.bind(this);
    this.handleToggleFooter = this.handleToggleFooter.bind(this);
  }

  componentDidMount() {
    this.popupHeightRefs = [...this.props.refs, this.headerRef, this.footerRef];

    const loadedAllData = DB.getAllData();
    this.setState({
      ...loadedAllData,
      isShownFooter: !!loadedAllData.todos.length,
    });
    this.isInit = true;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }
  
  handleTogglePopup = () => {
    this.setState({
      isShownPopup: !this.state.isShownPopup
    });
  }

  handleClickListChooser = (listChooserId) => {
    const loadedTodos = DB.getTodos(listChooserId);
    this.setState({
      selectedListChooserId: listChooserId,
      todos: loadedTodos,
      isShownFooter: !!loadedTodos.length
    });
    DB.saveSelectedListChooser(listChooserId);
  }

  handleSubmitNewTodo = (title) => {
    if (!title.replace(/(^\s*)|(\s*$)/, '').length) return;

    DB.addTodo(this.state.selectedListChooserId, title);

    const loadedAllData = DB.getAllData();
    this.setState({
      ...loadedAllData,
      isShownFooter: !!loadedAllData.todos.length
    });
  }

  handleChangeTodoDone = (id, isChecked) => {
    DB.updateTodoDone(id, isChecked);

    const loadedAllData = DB.getAllData();
    this.setState({
      ...loadedAllData,
      isShownFooter: !!loadedAllData.todos.length
    });
  }

  handleSubmitTodoTitle = (id, value) => {
    DB.updateTodoTitle(id, value);

    const loadedAllData = DB.getAllData();
    this.setState({
      ...loadedAllData
    });
  }

  handleDeleteTodo = (id) => {
    DB.deleteTodo(id);

    const loadedAllData = DB.getAllData();
    this.setState({
      ...loadedAllData,
      isShownFooter: !!loadedAllData.todos.length
    });
  }

  handleToggleFooter = () => {
    this.setState({
      isShownFooter: true
    });
  }

  setDropdownHeight = (height) => {
    this.setState({
      dropdownHeight: height
    });
  }

  render() {
    return (
      <div id="todo" className={"widget-container todo " + (this.state.isShownPopup ? "show" : "")}>
        <div
          ref={node => this.popupWrapperRef = node}
          className={"widget-wrapper nipple-bottom-right " + (this.state.isShownPopup ? "show-fade-in" : "")}>
          <div className="widget-popup">
            <Header
              headerRef={this.headerRef}
              listChoosers={this.state.listChoosers}
              onClickListChooser={this.handleClickListChooser}
              selectedListChooserId={this.state.selectedListChooserId}
              setDropdownHeight={this.setDropdownHeight}
            />
            {this.isInit ? (
              <TodoList
                todos={this.state.todos}
                listChooserEmptyInfo={this.state.listChoosers[this.state.selectedListChooserId].empty}
                onDeleteTodo={this.handleDeleteTodo}
                onChangeTodoDone={this.handleChangeTodoDone}
                onSubmitTodoTitle={this.handleSubmitTodoTitle}
                onClickListChooser={this.handleClickListChooser}
                isShownPopup={this.state.isShownPopup}
                isShownFooter={this.state.isShownFooter}
                onClickToggleFooter={this.handleToggleFooter}
                dropdownHeight={this.state.dropdownHeight}
                popupHeightRefs={this.popupHeightRefs}
              />
            ) : ""}
            <Footer
              footerRef={this.footerRef}
              onSubmit={this.handleSubmitNewTodo}
              isShownFooter={this.state.isShownFooter}
            />
          </div>
        </div>
        <Dashboard
          isShownPopup={this.state.isShownPopup}
          onTogglePopup={this.handleTogglePopup}
          clickVerifier={(el) => { return !!this.popupWrapperRef.contains(el); }}
        />
      </div>
    )
  }
}


Todo.propTypes = {
  refs: PropTypes.arrayOf(
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ),
}
