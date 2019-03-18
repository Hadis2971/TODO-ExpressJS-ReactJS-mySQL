import React, { Component } from "react";
import TodoItem from "../todo-item";
import Modal from "../modal";
import Spinner from "../spinner";

import axios from "axios";

import "./todo.css";

class Todo extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            todos: [],
            text: "",
            newText: "",
            showModal: false,
            idForUpdate: "",
            textOfUpdatingTodo: "",
            loading: true
        };
        this.changeInputHandler = this.changeInputHandler.bind(this);
        this.addNewTodoHandler  = this.addNewTodoHandler.bind(this);
        this.deleteTodoHandler  = this.deleteTodoHandler.bind(this);
        this.updateTodoHandler  = this.updateTodoHandler.bind(this);
        this.showHideModal      = this.showHideModal.bind(this);
    }
    
    componentDidMount(){
        axios.get("http://localhost:3000/todo/retive_todos")
        .then(response => {
            this.setState({todos: response.data, loading: false});
        })
        .catch(error => {
            console.log(error);
        });
    }

    addNewTodoHandler(evt){
        evt.preventDefault();
        
        if(!this.state.text){
            return;
        }else {
            axios.post("http://localhost:3000/todo/add_todo", {todo: this.state.text})
            .then(response => {
                //console.log(response);
                this.setState({todos: response.data, text: ""});
            })
            .catch(error => console.log(`Add Todo Error => ${error}`));
        }  
    }

    deleteTodoHandler(id){
        axios.delete(`http://localhost:3000/todo/delete_todo/${id}`)
        .then(response => {
            //console.log(response);
            this.setState({todos: response.data});
        })
        .catch(error => console.log(`Delete Error => ${error}`));
    }

    updateTodoHandler(newText){
        if(!newText){
            return;
        }else {
            axios({
                method: "put",
                url: `http://localhost:3000/todo/update_todo/${this.state.idForUpdate}`,
                data: {
                    newText: newText
                }
              })
              .then(result => {
                  this.setState({todos: result.data, showModal: false})
              })
              .catch(error => console.log(`Update Todo Error => ${error}`));
        };
    }

    showHideModal(id, todo){
        this.setState((prevState) => ({
            showModal: (!prevState.showModal),
            idForUpdate: id,
            textOfUpdatingTodo: todo
        }));
    }

    changeInputHandler(evt){
        this.setState({text: evt.target.value});
    }
    
    render(){

        let allTodos = this.state.todos.map(todo => {
            return <TodoItem 
                    item={todo.todo} 
                    time={todo.time} 
                    key={todo._id}
                    id={todo._id}
                    showHideModal={this.showHideModal}
                    deleteTodoHandler={this.deleteTodoHandler}
                    />
        });
        
        let spinner = <Spinner />;
        if(!this.state.loading){
            spinner = null;
        }

        let modal = null;
        if(this.state.showModal){
            modal = <Modal
                    textOfUpdatingTodo={this.state.textOfUpdatingTodo} 
                    showHideModal={this.showHideModal}
                    updateTodoHandler={this.updateTodoHandler}
                    />
        }

        return(
            <div style={{width: "100%", height: "100%"}}>
            {modal}
            {spinner}
                <div id="todo-box">
                    <form onSubmit={this.addNewTodoHandler} 
                        style={{width: "100%", margin: "auto"}}>
                        <input 
                        type="text" 
                        name="text"
                        value={this.state.text}
                        placeholder="New Todo..." 
                        id="text-input"
                        onChange={this.changeInputHandler}/>
                        <button id="submit-button" type="submit">Add</button>
                    </form>
                    <ul style={{listStyleType: "none", width: "100%", padding: "0em"}}>{allTodos}</ul>
                </div>
            </div>
            
        );
    }
}

export default Todo;
