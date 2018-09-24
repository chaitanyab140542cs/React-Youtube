import React, {Component} from  'react';
import ReactDOM from 'react-dom';
import '../css/youtube.css';
import { ThumbNail } from './thumbnail';
import { setValue } from '../actions/searchaction';
import { connect } from 'react-redux';
 import { getVideos } from '../actions/getvideos'
import {likeButton} from '../actions/getvideos'
import {displayComments} from '../actions/getvideos'
const key ='AIzaSyCkYcigfb2fx-6bfH-LTJyB3oaMeh8LBSQ';

 class YoutubeRedux extends Component {
    constructor(props)
    {
       super(props);
       console.log(this.props);
       this.state = {enableCommentBox : false};
    }

     displayCommentBox (e)  {
         console.log('hi');
            this.setState({
                enableCommentBox : true
            });
     }
      
    render() {   
        
          

        return (
            <div>
                <div className = "main">
                    <div className="input-group">
                        <input type="text" onChange={(e)=>this.props.handleYoutubeSearch(e)}  className="form-control" placeholder = "Search this blog" />
                        <div className="input-group-append">
                             <button name="search" className="btn btn-secondary" type="button" onClick={() => this.props.retrieveVideos(this.props.search.value)} >
                                 <i className="fa fa-search"></i>
                             </button>
                        </div>
                    </div>
                </div>  
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
                                <div className="col-sm-2">
                                     <button type="button" disabled={this.props.search.videoLikesData.map((obj) => {
                                        return obj.id;
                                }).includes(obj.id.videoId)  } className="btn btn-light" id="likeButton" onClick = {(e) => this.props.likeButton(e,obj.id.videoId)}>Like</button>
                                </div>
                                <div className="col-sm-10">
                                    <button type="button"  className="btn btn-light " onClick = {(e) => this.props.displayComments(e,obj.id.videoId)} >Display Comments
                                    </button>
                                    <button type="button"  className="btn btn-light " onClick = {this.displayCommentBox.bind(this)} >Add Comments
                                    </button>
                                        <div>
                                            { this.props.search.displayComments[obj.id.videoId] && this.props.search.displayComments[obj.id.videoId].map((val) => {
                        
                                                return (<div className='col-sm-12 divStyles'><p className='commentStyles'>{val.snippet.topLevelComment.snippet.textDisplay}</p></div>);
                                            })}
                                        </div>
                                    
                                 {/* <div>{this.state.enableCommentBox && <div class="form-group shadow-textarea">
                                                                         <label for="exampleFormControlTextarea6">Add a New Comment</label>
                                                                                         <textarea class="form-control z-depth-1" id="exampleFormControlTextarea6" rows="3" placeholder="Write something here..."></textarea>
                                                                                        </div>}
                                         </div> */}
                                </div>
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
        likeButton : (e,value) => {
                    console.log(value);
                    dispatch(likeButton(value));
                    console.log(e.target.disabled=true);
                },
                displayComments : (e,value) => {
                    dispatch(displayComments(value));
            } 
        }
              
};


const mapStateToProps = (state) => {
        console.log(state);
    return({
        search : state.search
    });
}


export default connect(mapStateToProps,mapDispatchToProps)(YoutubeRedux);
 
