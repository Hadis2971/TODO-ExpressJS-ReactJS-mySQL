import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'

import "./todo-item.css";

function TodoItem(props){
    return(
        <li className="todo-item">
        <FontAwesomeIcon 
        className="delete" 
        icon={faTrash} 
        onClick={() => props.deleteTodoHandler(props.id)}/>

        <FontAwesomeIcon 
        onClick={() => props.showHideModal(props.id, props.item)} 
        className="update" icon={faPencilAlt} />

        <span className="item">{props.item}</span>
        <span className="timestamp">{props.time}</span>
        </li>
    );
}

export default TodoItem;