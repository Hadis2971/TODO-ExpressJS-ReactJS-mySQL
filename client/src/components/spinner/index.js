import React from "react";

import "./spinner.css";

function Spinner(props){
    return(
        <div id="spinner-box"><div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div><h3 style={{color: "#419bbb"}}>Loading...</h3></div>
        
    );
}

export default Spinner;