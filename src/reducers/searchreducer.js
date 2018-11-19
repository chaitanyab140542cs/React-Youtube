const initialState = {
  value : '',
  finalYoutube:[],
  loading : false,
  error : false,
  videoLikesData : [],
  disableButton : false,
  displayComments : [],
  databaseComments : [],
  isAuthenticated : null,
};

 const searchReducer  = (state=initialState, action) => {
   
    switch (action.type) {
      case "SET_VALUE":
        return {
          ...state,
          value : action.value
        };
        case 'REQUEST_LOGIN_SUCCESS':
        
        return {
          ...state,
         isAuthenticated : action.value
        };
        case 'JWT_SIGNOUT':
        
        return {
          ...state,
         isAuthenticated :  false
        };


        case 'REQUEST_LOGIN_FAILURE':
        return {
          ...state,
         isAuthenticated : action.value
        };

        case 'REQUESTED_VIDEO':
        return {
          ...state,
          finalYoutube: [],
          loading: true,
          error: false
        };
      case 'REQUESTED_VIDEO_SUCCEEDED':
        return {
          ...state,
          finalYoutube: action.data,
          loading: false,
          error: false
        };
      case 'REQUESTED_VIDEO_FAILED':
        return {
          ...state,
          finalYoutube: [],
          loading: false,
          error: true
        };
        case 'RETRIEVE_LIKED_VIDEOS':
       
        return {
          ...state,
          videoLikesData : action.data
        };

        case 'REQUESTED_LIKE_STORED':
       
        return {
          ...state,
          disableButton : true
        };

        case 'LIKES_IN_FIRESTORE':

        return {
          ...state
        }

        case 'DISPLAY_COMMENTS_COMPLETED' :
        console.log(action.value.databaseComments);
        return {
          ...state,
          displayComments : {
            ...state.displayComments,
             
                [action.value.videoId] : action.value.value
             },
           databaseComments : {
             ...state.databaseComments,
            [action.value.videoId] : action.value.databaseComments
           }  
          
        };

       
  
        
      default:
        return state;
    }
  };

  export default searchReducer;