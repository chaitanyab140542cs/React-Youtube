import React, { Component } from 'react';

import ReactDOM from 'react-dom';


//import logo from './logo.svg';

export class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            buttonClicks : 0
        }

    }
    handleClick(){
        this.setState({
            buttonClicks : this.state.buttonClicks + 1
        })
    
    }

    shouldComponentUpdate(){
        let shouldUpdate = false;
        return
    }

    render()
    {
        return(
       <div>
           <button onClick = {this.handleClick.bind(this)}>Check</button>
           <h1>{this.state.buttonClicks}</h1>
           <h1>{console.log(this.state.buttonClicks)}</h1>
       </div>);

    }
}
