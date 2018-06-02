const ArticlesReducer = function (state = [], action) {
  switch (action.type) {

    case "FETCH_ARTICLES":
      console.log('received the articles fetching action');
      return action.payload;

    default:
      return state;
  }
};

export default ArticlesReducer;
