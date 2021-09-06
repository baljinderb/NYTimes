const reducer = (state = {}, action) => {
   console.log(action.type, action.json)
   switch (action.type) {
     case 'USER_FETCH_REQUESTED':
          return { ...state, loading: true };
     case 'NEWS_RECEIVED': 
          return { ...state, news: action.json, loading: false, message: action.message }
     case 'NEWS_FAILED':
            return { ...state, loading: false, message: action.message }
     default: 
          return state;
   }
  };
  export default reducer;