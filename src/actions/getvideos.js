import { put, takeEvery,call,all } from 'redux-saga/effects'
import {delay } from 'redux-saga';
import firebase from 'firebase';
import {config} from '../firebase/config';

export const likeButton = (value) => {
    return {type : 'LIKE_BUTTON',
    value : value
    }
}

export const displayComments = (value) => {
  return {
    type : 'DISPLAY_COMMENTS',
    value : value
  }
}

const requestedLikeStored = (value) => {
    return {
        type : 'REQUESTED_LIKE_STORED',
        value : value
    }
}

const likesInFirestore = (value) => {
  const db = firebase.firestore();
  db.settings({timestampsInSnapshots : true});
  db.collection('video_likes').add({
      id : value,
      no_of_likes : 1
  })
  return {
    type : 'LIKES_IN_FIRESTORE',
    value : value
  }
}

const retrieveLikedVideos = (data)  => {
   
    return {
      
        type : 'RETRIEVE_LIKED_VIDEOS',
        data : data
    }
} 

export const storeComments = (comment,videoId) => {
  
  return{
      type : 'STORE_COMMENTS',
      comment : comment,
      videoId : videoId
  }
}
    

const requestVideo = () => {
    return { type: 'REQUESTED_VIDEO' }
  };
  
  const requestVideoSuccess = (data) => {
    return { type: 'REQUESTED_VIDEO_SUCCEEDED', data : data }
  };
  
  const requestVideoError = () => {
    return { type: 'REQUESTED_VIDEO_FAILED' }
  };


export const getVideos = (value) => {
    
    return { type: 'GET_VIDEOS',
    value : value
 }
};

export const submitLoginForm = (value) => {
  return {
    type : 'SUBMIT_LOGIN_FORM',
    value : value
  }
}

export const displayCommentsCompleted = (data,databaseComments,videoId) => {
  
  return{
    type : 'DISPLAY_COMMENTS_COMPLETED',
    value : {
      videoId : videoId,
      value : data,
      databaseComments : databaseComments
    }
    


  }
}

export const jwtSignout = () => {
  localStorage.removeItem('id_token');
  console.log(localStorage);
  return {
    type : 'JWT_SIGNOUT',
  }
}


export const requestLoginFailed = (data) => {
  return{
    type : 'REQUEST_LOGIN_FAILED',
    value : data.success
  }
}

export const requestLoginSuccess = (data) => {
  console.log(data);
  return{
    type : 'REQUEST_LOGIN_SUCCESS',
    value : data.success
  }
}
  

  export default function* watchgetVideos() {
      
    yield all([takeEvery('GET_VIDEOS',getVideoAsync),
    takeEvery('LIKE_BUTTON',postLikeAsync),
    takeEvery('DISPLAY_COMMENTS',getCommentsAsync),
    takeEvery('SUBMIT_LOGIN_FORM',submitLoginFormAsync),
    takeEvery('STORE_COMMENTS',postCommentsAsync)]);
  }


  function* submitLoginFormAsync(value){
    
     
       const data = yield call(() => {
       return fetch('http://localhost:3000/authenticate', {
       
          method: 'post',
          headers : {
              'Accept' : 'application/json',
              'Content-Type' : 'application/json' 
          },
          body:JSON.stringify( {
            user : value.value.username.value,
            password : value.value.password.value
          })
      }).then((response) => response.json())
      .then((responseJSON) => {
        console.log(responseJSON);
        return responseJSON;
      })
           
      });
      if(data.success){
        console.log(data.token);
        localStorage.setItem('id_token',data.token);
        console.log(localStorage);
          yield put(requestLoginSuccess(data));
      }
     else 
         yield put(requestLoginFailed(data));
    
  }
      

  function* getVideoAsync(value) {
  
    try {
      yield put(requestVideo());
       const data = yield call(() => {
        return fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${value.value}&key=AIzaSyCkYcigfb2fx-6bfH-LTJyB3oaMeh8LBSQ`)
           .then((response) => response.json())
           .then((result) => {return result.items}) 
       }
         ); 
      yield put(requestVideoSuccess(data));
    } catch (error) {
      yield put(requestVideoError());
    }
    
    const data = yield call(() => {
      console.log(localStorage.getItem('id_token'));
        return  fetch(`http://localhost:3000/users`,{
          
          headers : {
            'x-access-token' : localStorage.getItem('id_token')
          }
        })      
        .then(res => {
            
            return res.json();
         })
    });
    

    yield put(retrieveLikedVideos(data));
  }


  function* postLikeAsync(value){
     
      yield call(() => {
        fetch('http://localhost:3000/postlikes', {
       
            method: 'post',
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json' 
            },
            body:JSON.stringify( {
              id : value.value,
              token :  localStorage.getItem('id_token')
            })
        }).then(function(response) {
        }).catch(function(error) {
          console.log('Request failed', error)
        });   
      });
      yield put(requestedLikeStored(value.value));
      yield put(likesInFirestore(value.value));
  }

  function* getCommentsAsync(value){ 
    const data = yield call(() => {
      return fetch(`https://www.googleapis.com/youtube/v3/commentThreads?key=AIzaSyCkYcigfb2fx-6bfH-LTJyB3oaMeh8LBSQ&maxResults=5&textFormat=plainText&part=snippet&videoId=${value.value}`)
      .then((response) => response.json())
      .then((result) => {return result.items}) 
  }
); 
const databaseComments = yield call(() => {
  return  fetch(`http://localhost:3000/comments?id=${value.value}`,{
    headers : {
          'x-access-token' :  localStorage.getItem('id_token')
    }
  })
  .then(res => {
      return res.json();
   })
});


    
   yield put(displayCommentsCompleted(data,databaseComments,value.value));
}


function* postCommentsAsync(data){
  
  yield call(() => {
    fetch('http://localhost:3000/comments', {
   
        method: 'post',
        headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json' 
        },
        body:JSON.stringify( {
          comment : data.comment,
          videoId : data.videoId,
          token :  localStorage.getItem('id_token')
        })
    }).then(function(response) {
    }).catch(function(error) {
      console.log('Request failed', error)
    });   
  });
 

}




  
  