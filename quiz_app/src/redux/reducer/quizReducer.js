const initialState = {
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    quizStarted: false,
    quizEnded: false,
  };
  
  const quizReducer = (state = initialState, action) => {
    switch (action.type) {
      // Define action types and how they modify the state
      default:
        return state;
    }
  };
  
  export default quizReducer;
  