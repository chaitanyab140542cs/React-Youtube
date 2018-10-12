import React from 'react';
import ReactDOM from 'react-dom'; 
export const LoginForm = (props) => {
   
    return(
       <div> 
        <form id='myform' onSubmit={props.handleSubmit}>
        <label>
          Name:
          <input  id="text "type="text" name='username'  />
        </label>
        <label>
          Name:
          <input id="password" type="password" name='password' />
        </label>
        <input type="submit" value="Submit" />
      </form>
      </div>
      
    );
}