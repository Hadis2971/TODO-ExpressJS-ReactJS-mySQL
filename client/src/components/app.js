import React, { Component } from "react";
import Todo from "./todo";


class App extends Component {
    render(){
        return(
            <div>
                <h1 style={{textAlign: "center", color: "#737373"}}>Express React mySQL Todo App</h1>
                <Todo />
            </div>
        );
    }
}

export default App;