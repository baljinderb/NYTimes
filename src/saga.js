import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchUser(popularData) {
  try {
    const res = yield fetch(`https://api.nytimes.com/svc/mostpopular/v2/viewed/${popularData.payload}.json?api-key=FMmgiACOnSD3prT3oP8bnjD95yD5ESsi`)
    .then(response => response.json()); 
    yield put({ type: "NEWS_RECEIVED", json: res.results, message: 'Requested news fetched successfully.'  });
  } catch (e) {
    console.log(e)
    yield put({ type: "NEWS_FAILED", message: 'Invalid key pass to fetch news.' });
  }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* mySaga() {
  yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
}

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
// function* mySaga() {
//   yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
// }

export default mySaga;