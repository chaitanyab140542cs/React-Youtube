const initialState = {
  value : 'cr7',
  finalYoutube:[],
  loading : false,
  error : false,
  videoLikesData : []
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
        console.log(action.data);
        return {
          ...state,
          videoLikesData : action.data
        };
        
      default:
        return state;
    }
  };

  export default searchReducer;