import React, {Component} from  'react';
import ReactDOM from 'react-dom';
import '../css/youtube.css';
import { ThumbNail } from './thumbnail';
import { setValue } from '../actions/searchaction';
import { connect } from 'react-redux';
 import { getVideos } from '../actions/getvideos'
import {likeButton} from '../actions/getvideos'
const key ='AIzaSyCkYcigfb2fx-6bfH-LTJyB3oaMeh8LBSQ';

 class YoutubeRedux extends Component {
    constructor(props)
    {
       super(props);
       console.log(this.props);
    }
      
    render() {   
        
          

        return (
            <div>
                <div className = "main">
                    <div className="input-group">
                        <input type="text" onChange={(e)=>this.props.handleYoutubeSearch(e)}  className="form-control" placeholder = "Search this blog" />
                        <div class="input-group-append">
                             <button name="search" class="btn btn-secondary" type="button" onClick={() => this.props.retrieveVideos(this.props.search.value)} >
                                 <i class="fa fa-search"></i>
                             </button>
                        </div>
                    </div>
                </div>  
                <h1>{this.props.search.value}</h1>
                <div>{this.props.search.loading? <h1>...Loading</h1> : (this.props.search.finalYoutube != null) && this.props.search.finalYoutube.map((obj)=>{
            
                     return (<div className="container-fluid">
                     <div className="row">
                       <div className="col-sm-6">
                      
                         <h5>{obj.snippet.title}</h5>
                            <div className="embed-responsive embed-responsive-16by9">
                                 <iframe className="embed-responsive-item" src={ "https://www.youtube.com/embed/"+obj.id.videoId}></iframe>
                            </div>
                         </div>
                             <div className="col-sm-6">
                                <button type="button" disabled={this.props.search.videoLikesData.map((obj) => {
                                        return obj.id;
                                }).includes(obj.id.videoId)} class="btn btn-light" onClick = {() => this.props.likeButton(obj.id.videoId)}>Like</button>
                                <h2>{}</h2>
                            </div>
                     </div>
                   </div>);
            })}</div>
                
        </div>
              
          );
          
    }
}





const mapDispatchToProps = (dispatch) => {
    return {
        handleYoutubeSearch:(e)=>{

            dispatch(setValue(e.target.value));
                 },
         retrieveVideos : (value) => {
                     dispatch(getVideos(value));
                 },
        likeButton : (value) => {
                    dispatch(likeButton(value));
                }
        };
        
};


const mapStateToProps = (state) => {
        console.log(state);
    return({
        search : state.search
    });
}


export default connect(mapStateToProps,mapDispatchToProps)(YoutubeRedux);
 
