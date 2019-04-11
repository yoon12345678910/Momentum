import React from 'react';
import PropTypes from 'prop-types';


const ListChooser = ({ id, name, todoCnt, isSelected, onClickListChooser, onClickDropdown }) => {
    return (
        <li
            onClick={() => {
                onClickDropdown();
                if (!isSelected) onClickListChooser(id);
            }}
            className={"list-chooser-item " + (isSelected ? "active" : "")}>
            <span className="list-name">{name}</span>
            <span className="todo-count">{todoCnt}</span>
        </li>
    )
}


ListChooser.propTypes = {
    id:                     PropTypes.string.isRequired,
    name:                   PropTypes.string.isRequired,
    todoCnt:                PropTypes.number.isRequired,
    isSelected:             PropTypes.bool.isRequired,
    onClickListChooser:     PropTypes.func.isRequired,
    onClickDropdown:        PropTypes.func.isRequired
}

export default ListChooser;
