import React from 'react';
import PropTypes from 'prop-types';


const EmptyTodoList = ({ listChooserEmptyInfo, onClickListChooser, isShownFooter, onClickToggleFooter }) => { 
    const link = () => {
      return (
        <div
          onClick={(e) => {
            e.nativeEvent.stopImmediatePropagation();
            onClickListChooser(listChooserEmptyInfo.targetLink);
          }}
          className="empty-link">
          {listChooserEmptyInfo.message}
          <i
            aria-hidden="true"
            className="fa fa-angle-right">
          </i>
        </div>
      )
    };
    
    const description = () => {
      return (
        <div className="empty-description"> 
          {listChooserEmptyInfo.message}
        </div>
      )
    };

    return (
      <li className="empty">
        <p className="empty-title">
          {listChooserEmptyInfo.title}
        </p>
        { listChooserEmptyInfo.targetLink ? link() : description() }
        <button
          onClick={onClickToggleFooter}
          className={"button new-todo-button " + (isShownFooter ? "hidden" : "")}>
          New Todo
        </button>
      </li>
    )
  }
  

  EmptyTodoList.propTypes = {
    listChooserEmptyInfo:       PropTypes.shape({
      title:                    PropTypes.string.isRequired,
      message:                  PropTypes.string.isRequired,
      targetLink:               PropTypes.string
    }),
    onClickListChooser:         PropTypes.func.isRequired,
    isShownFooter:              PropTypes.bool.isRequired,
    onClickToggleFooter:        PropTypes.func.isRequired
  }


  export default EmptyTodoList;