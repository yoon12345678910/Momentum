import React from 'react';
import PropTypes from 'prop-types';
import shallowCompare from 'react-addons-shallow-compare';

import ContentEditable from 'react-contenteditable';


export default class TodoItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.title,
            enteredValue: this.props.title,
            disabledInput: true,
            isChecked: this.props.isDone
        };

        this.animating = false;
        this.contentEditable = React.createRef();
        this.handleDoubleClick = this.handleDoubleClick.bind(this);
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleClickDelete = this.handleClickDelete.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
      }

    componentDidUpdate() {
        if (this.animating) {
            const el = this.contentEditable.current;
            // el.setEndOfContenteditable();
            // el.animateCss('pulse');
            this.animating = false;
        }
    }

    validate = () => {
        const trim = this.state.value.replace(/\s/gi, '');

        if (trim.length && trim !== this.state.enteredValue) {
            this.props.onSubmitTitle(this.props.id, this.state.value);
            this.setState({
                enteredValue: this.state.value,
                disabledInput: true
            });
        } else {
            this.setState({
                value: this.state.enteredValue,
                disabledInput: true
            });
        }
    }

    handleDoubleClick = () => {
        if (this.state.disabledInput) {
            this.animating = true;
        }
        this.setState({
            disabledInput: false
        });
    }

    handleChangeInput = (e) => {
        this.setState({
            value: e.target.value
        });
    }

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            this.animating = true;
            this.validate();
        }
    }

    handleBlur = () => {
        this.animating = true;
        this.validate();
    }

    handleChangeCheckbox = (e) => {
        e.nativeEvent.stopImmediatePropagation();

        const isChecked = !this.state.isChecked;
        this.props.onChangeDone(this.props.id, isChecked);
        this.setState({
            isChecked
        });
    }

    handleClickDelete = (e) => {
        e.nativeEvent.stopImmediatePropagation();
        this.props.onDelete(this.props.id);
    }

    render() {
        return (
            <li
                className="todo-item">
                <div className="todo-item-action">
                    {/* <div className="todo-move-list-toggle icon-wrapper">
                        <i className="fa fa-folder" aria-hidden="true"></i>
                    </div> */}
                    <div
                        onClick={this.handleClickDelete}
                        className="todo-delete-list-toggle icon-wrapper">
                        <i className="fa fa-times" aria-hidden="true"></i>
                    </div>
                </div>
                <label>
                    <input
                        type="checkbox"
                        className="todo-item-checkbox"
                        onChange={this.handleChangeCheckbox}
                        defaultChecked={this.state.isChecked}
                    />
                </label>
                <ContentEditable
                    innerRef={this.contentEditable}
                    html={this.state.value}
                    disabled={this.state.disabledInput}
                    onChange={this.handleChangeInput}
                    onDoubleClick={this.handleDoubleClick}
                    onKeyPress={this.handleKeyPress}
                    onBlur={this.handleBlur}
                    spellCheck={false}
                    className={"todo-item-title " + (this.state.disabledInput ? "" : "editing")}
                />
            </li>
        )
    }
}


TodoItem.propTypes = {
    id:                     PropTypes.string.isRequired,
    title:                  PropTypes.string.isRequired,
    isDone:                 PropTypes.bool.isRequired,
    listChooserId:          PropTypes.string.isRequired,
    onSubmitTitle:          PropTypes.func.isRequired,
    onChangeDone:           PropTypes.func.isRequired,
    onDelete:               PropTypes.func.isRequired
}
