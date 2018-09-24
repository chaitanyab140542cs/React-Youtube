const initialState = {
  value : 'cr7',
  finalYoutube:[],
  loading : false,
  error : false,
  videoLikesData : [],
  disableButton : false,
  displayComments : []
};

 const searchReducer  = (state=initialState, action) => {
   
    switch (action.type) {
      case "SET_VALUE":
        return {
          ...state,
          value : action.value
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

        case 'DISPLAY_COMMENTS_COMPLETED' :
        console.log(action.value);
        return {
          ...state,
          displayComments : {
            ...state.displayComments,
             
                [action.value.videoId] : action.value.value
             }
          
        };

  
        
      default:
        return state;
    }
  };

  export default searchReducer;