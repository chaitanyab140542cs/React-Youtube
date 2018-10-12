import React, {Component} from  'react';
import ReactDOM from 'react-dom';
import '../css/youtube.css';
import { ThumbNail } from './thumbnail';
import { setValue } from '../actions/searchaction';
import { connect } from 'react-redux';
 import { getVideos } from '../actions/getvideos';
import {likeButton} from '../actions/getvideos';
import {displayComments} from '../actions/getvideos';
import {storeComments}  from '../actions/getvideos';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import {LoginForm}  from './login';
import {submitLoginForm} from '../actions/getvideos';
import {jwtSignout} from '../actions/getvideos';
const key ='AIzaSyCkYcigfb2fx-6bfH-LTJyB3oaMeh8LBSQ';


firebase.initializeApp({
    apiKey : "AIzaSyAsjCpvFXSqOI_fCXjpUap1df8kNYfAZv4",
    authDomain : "react--216210.firebaseapp.com"
})

 class YoutubeRedux extends Component {
    constructor(props)
    {
       super(props);
       console.log(this.props);
        this.state = { 
            isSignedIn : false,
            textarea : ''
        };
    }

    uiConfig = {
        signInFlow : 'popup',
        signInOptions : [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID
        ],
        callbacks : {
            signInSuccessWithAuthResult : () => false
        }
    }

    handleChange = (e) => {
        this.setState({
           textarea : e.target.value
        })
        console.log(this.state.textarea);
    }

   

    componentDidMount = () => {
        

        firebase.auth().onAuthStateChanged((user) => {
            this.setState({isSignedIn : !!user})
        })
    }
    
      
    render() {   
        
          

    return (
        <div>

        {this.state.isSignedIn || this.props.search.isAuthenticated ?

           ( <div>
                <div className = "main">
                    <div className="input-group">
                        <input type="text" onChange={(e)=>this.props.handleYoutubeSearch(e)}  className="form-control" placeholder = "Search this blog" />
                        <div className="input-group-append">
                             <button name="search" className="btn btn-secondary" type="button" onClick={() => this.props.retrieveVideos(this.props.search.value)} >
                                 <i className="fa fa-search"></i>
                             </button>
                        </div>
                        <button type="button" className="btn btn-info" onClick={() => this.props.handleSignout(this.state.isSignedIn,this.props.search.isAuthenticated)}>SignOut</button>
                    </div>
                </div>  
                <div>{this.props.search.loading? <h1>...Loading</h1> : (this.props.search.finalYoutube != null) && this.props.search.finalYoutube.map((obj)=>{
            
                     return (<div className="container-fluid videoDiv">
                     <div className="row">
                       <div className="col-sm-12 col-md-12 col-lg-6">
                      
                         <h5>{obj.snippet.title}</h5>
                            <div className="embed-responsive embed-responsive-16by9">
                                 <iframe className="embed-responsive-item" src={ "https://www.youtube.com/embed/"+obj.id.videoId}></iframe>
                            </div>
                         </div>
                             <div className="col-sm-12 col-md-12 col-lg-6">
                                <div className="col-sm-4 ">
                                     <button type="button" className="likeDiv" disabled={this.props.search.videoLikesData.map((obj) => {
                                        return obj.id;
                                }).includes(obj.id.videoId)  } className="btn btn-light" id="likeButton" onClick = {(e) => this.props.likeButton(e,obj.id.videoId)}>Like</button>
                                </div>
                                <div className="col-sm-8">
                                    <button type="button"  className="btn btn-light " onClick = {(e) => this.props.displayComments(e,obj.id.videoId)} >Display Comments
                                    </button>
                                         <form onSubmit={(e) => this.props.storeComments(e,obj.id.videoId)}>
                                            <div className="form-group">
                                                 <label htmlFor="exampleFormControlTextarea1"></label>
                                                      <textarea className="form-control" id="exampleFormControlTextarea1" name="textareaComment" rows="3"></textarea>
                                            </div>
                                            <button type="submit" className="btn btn-primary">Add Comment</button>
                                         </form>
                                        <div>
                                            { this.props.search.displayComments[obj.id.videoId] && this.props.search.displayComments[obj.id.videoId].map((val) => {
                        
                                                return (<div className='col-sm-12 divStyles'><p className='commentStyles'>{val.snippet.topLevelComment.snippet.textDisplay}</p></div>);
                                            })}
                                        </div>
                                        <div>
                                            { this.props.search.databaseComments[obj.id.videoId] && this.props.search.databaseComments[obj.id.videoId].map((val) => {
                        
                                                return (<div className='col-sm-12 divStyles'><p className='commentStyles'>{val.comment}</p></div>);
                                            })}
                                        </div>
                                    
                                      <div>
                                </div> 
                                </div>
                            </div>
                     </div>
                   </div>);
            })}</div>
                
        </div>) : (
        <div>
            <LoginForm handleSubmit = { (e) => this.props.handleSubmitLoginForm(e)}/>
        
            <StyledFirebaseAuth 
            uiConfig = {this.uiConfig}
            firebaseAuth = {firebase.auth()}
            />
        </div>
        )}
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
                    dispatch(likeButton(value));
                    console.log(e.target.disabled=true);
                },
        displayComments : (e,value) => {
                    dispatch(displayComments(value));
            },
        storeComments : (e,value) => {
                    e.preventDefault();
                    var comment = e.target.textareaComment.value;
                    e.target.textareaComment.value = '';
                    dispatch(storeComments(comment,value));
        } ,
        handleSubmitLoginForm : (e) => {
            e.preventDefault();
            dispatch(submitLoginForm(e.target));
        } ,
        handleSignout : (isSignedIn,isAuthenticated) => {
            if(isSignedIn)
            firebase.auth().signOut();
            if(isAuthenticated == true)
            dispatch(jwtSignout());
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
 
