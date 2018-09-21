import React from 'react';
import ReactDOM from 'react-dom';
import  YoutubeRedux  from "./js/youtuberedux";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './store/index';
import {App} from './js/serverexample';

ReactDOM.render(<Provider store={store}><YoutubeRedux/></Provider>, document.getElementById("root"));


//ReactDOM.render(<App />, document.getElementById("root"));









