import React, { Component } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';


//import logo from './logo.svg';

export class App extends Component {
   constructor(){
       super();
       this.state ={users: []};
   }

   onClick()
   {
    fetch('http://localhost:3000/postdata', {
       
        method: 'post',
        headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json' 
        },
        body:JSON.stringify( {
          id : 345,
          title : 'varma'
        })
    }).then(function(response) {
      console.log(response);
    }).catch(function(error) {
      console.log('Request failed', error)
    });    
  }

   
   componentDidMount() {
          fetch(`http://localhost:3000/users`)
            .then(res => {
                return res.json();
                console.log(res);
             })
            
         }
   render() {
        return (
            <div className="App">
                <h1>Users</h1>
                <button onClick={this.onClick.bind(this)}></button>
            </div>
        );
    }
}
