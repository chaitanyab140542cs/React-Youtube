import React from 'react';
import ReactDOM from 'react-dom';
import  YoutubeRedux  from "./js/youtuberedux";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './store/index';
import {App} from './js/serverexample';
import { Youtube }from './js/youtube';
import {BrowserRouter as Router , Route } from 'react-router-dom';
import { Switch } from 'react-router';

ReactDOM.render(
    
<Provider store={store}>
    <Router>
       <div> 
        <Route exact path='/' component={YoutubeRedux}/>
        <Route path= '/youtube' component ={Youtube}/>
       </div> 
    </Router>
</Provider>, document.getElementById("root")

);


// ReactDOM.render(<App />, document.getElementById("root"));









