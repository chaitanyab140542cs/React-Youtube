import { put, takeEvery,call,all } from 'redux-saga/effects'

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

const retrieveLikedVideos = (data)  => {
   
    return {
      
        type : 'RETRIEVE_LIKED_VIDEOS',
        data : data
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

export const displayCommentsCompleted = (data,videoId) => {
  return{
    type : 'DISPLAY_COMMENTS_COMPLETED',
    value : {
      videoId : videoId,
      value : data
    }
    


  }
}
  

  export default function* watchgetVideos() {
      
    yield all([takeEvery('GET_VIDEOS', getVideoAsync),
    takeEvery('LIKE_BUTTON',postLikeAsync),
    takeEvery('DISPLAY_COMMENTS',getCommentsAsync)]);
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
        return  fetch(`http://localhost:3000/users`)
        .then(res => {
            return res.json();
         })
    });
    

    yield put(retrieveLikedVideos(data));
  }


  function* postLikeAsync(value){
     
      yield call(() => {
        fetch('http://localhost:3000/postdata', {
       
            method: 'post',
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json' 
            },
            body:JSON.stringify( {
              id : value.value,
            })
        }).then(function(response) {
        }).catch(function(error) {
          console.log('Request failed', error)
        });   
      });
      yield put(requestedLikeStored(value.value));
  }

  function* getCommentsAsync(value){
     
    const data = yield call(() => {
      return fetch(`https://www.googleapis.com/youtube/v3/commentThreads?key=AIzaSyCkYcigfb2fx-6bfH-LTJyB3oaMeh8LBSQ&maxResults=5&textFormat=plainText&part=snippet&videoId=${value.value}`)
      .then((response) => response.json())
      .then((result) => {return result.items}) 
  }
); 
    
   yield put(displayCommentsCompleted(data,value.value));
}

  
  