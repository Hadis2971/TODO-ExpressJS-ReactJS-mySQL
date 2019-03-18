import React, { Component } from "react";

import "./modal.css";

class Modal extends Component {

    constructor(props){
        super(props);
        this.state = {
            newText: ""
        }
        this.changeInputHandler = this.changeInputHandler.bind(this);
    }

    changeInputHandler(evt){
        this.setState({newText: evt.target.value});
    }

    render(){
        return(
            <div id="myModal" className="modal">
              <div className="modal-content">
                <div className="modal-header">
                  <span onClick={() => this.props.showHideModal("", "")} className="close">&times;</span>
                  <h2>Update Todo: {this.props.textOfUpdatingTodo}</h2>
                </div>
                <div className="modal-body">
                  <div style={{width: "80%", margin: "2.1% auto"}}>
                      <input 
                      id="new-text-input"
                      type="text" 
                      name="newText" 
                      value={this.state.newText}
                      onChange={this.changeInputHandler}
                      placeholder="New Text"
                      />
                      <button 
                      type="button" 
                      onClick={() => this.props.updateTodoHandler(this.state.newText)}
                      id="new-text-submit-button">Submit</button>
                  </div>
                </div>
                <div className="modal-footer">
                  <h3>Todo App ExpressJS React mySQL</h3>
                </div>
              </div>
            
            </div>
        );
    }
}

export default Modal;