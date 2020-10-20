import { put, takeEvery } from "redux-saga/effects";
import { sendAuthenticatedFromSagaToRedux, dataBaseErrorFromSagaToRedux, registerEmailErrorFromSagaToRedux, registerNameErrorFromSagaToRedux, loginNameEmailErrorFromSagaToRedux, loginPasswordErrorFromSagaToRedux, logoutFromSagaToRedux, loadThreadsFromSagaToRedux, loadDebatesFromSagaToRedux } from '../actions';
import { CHECK_REGISTER, CHECK_SIGN_IN, LOADING_CHECK, LOGOUT, LOAD_THREADS, LOAD_DEBATES, CREATE_NEW_THREAD, CREATE_NEW_DEBATE } from '../actionTypes';

// +
function* checkForSignIn(action) {
  const { nameEmail, password } = action.data;
  try {
    const responce = yield fetch('http://localhost:3001/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nameEmail,
        password,
      }),
      mode: 'cors'
    });
    const data = yield responce.json();
    if (data.authenticated) {
      yield put(sendAuthenticatedFromSagaToRedux(data.user));
    } else if (data.err === 'Data base error, plase try again') {
      yield put(dataBaseErrorFromSagaToRedux(data.err));
    } else if (data.err === 'Invalid password') {
      yield put(loginPasswordErrorFromSagaToRedux(data.err));
    } else if (data.err === 'No such user') {
      yield put(loginNameEmailErrorFromSagaToRedux(data.err));
    }
  } catch (error) {
    console.error('Error while Sign In fetch', error);
  }
}

// +
function* checkForRegister(action) {
  const { name, email, password } = action.data
  try {
    const responce = yield fetch('http://localhost:3001/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({
        name,
        email,
        password,
      }),
      mode: 'cors'
    });
    const data = yield responce.json();
    console.log(data)
    if (data.authenticated) {
      yield put(sendAuthenticatedFromSagaToRedux(data.user));
    } else if (data.err === 'Data base error, plase try again') {
      yield put(dataBaseErrorFromSagaToRedux(data.err));
    } else if (data.err === 'This email is already taken') {
      yield put(registerEmailErrorFromSagaToRedux(data.err));
    } else if (data.err === 'This name is already taken') {
      yield put(registerNameErrorFromSagaToRedux(data.err));
    }
  } catch (error) {
    console.error('Error while Sign Up fetch', error);
  }
}

// +
function* loadingCheck() {
  try {
    const responce = yield fetch('http://localhost:3001/loading', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      mode: 'cors',
    });
    const data = yield responce.json()
    if (data.authenticated) {
      yield put(sendAuthenticatedFromSagaToRedux(data.user));
    }
  } catch (error) {
    console.log('Error while Loading fetch', error);
  }
};

// ++
function* logOut() {
  try {
    const responce = yield fetch('http://localhost:3001/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      mode: 'cors',
    });
    const data = yield responce.json()
    if (!data.authenticated) {
      yield put(logoutFromSagaToRedux())
    } else if (data.err) {
      console.log('Server error', data.err);
    }
  } catch (error) {
    console.log('Error while Loggining Out fetch', error);
  }
}

// ++
function* loadThreads() {
  try {
    const responce = yield fetch('/thread/loadall', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      mode: 'cors',
    });
    const data = yield responce.json();
    yield put(loadThreadsFromSagaToRedux(data));
  } catch (error) {
    console.log('Error while Loading threads fetch', error);
  }
}

function* loadDebates() {
  try {
    const responce = yield fetch('/debate/loadall', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      mode: 'cors',
    });
    const data = yield responce.json();
    console.log(data);
    yield put(loadDebatesFromSagaToRedux(data.debates));
  } catch (error) {
    console.log('Error while Loading threads fetch', error);
  }
}

function* createNewThread(action) {
  try {
    const responce = yield fetch('/thread/createnew', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      mode: 'cors',
      body: JSON.stringify(action.data)
    });
  } catch (error) {
    console.log('Error while creating new thread fetch', error);
  }
}

function* createNewDebate() {

}


export default function* watcher() {
  yield takeEvery(CHECK_REGISTER, checkForRegister);
  yield takeEvery(CHECK_SIGN_IN, checkForSignIn);
  yield takeEvery(LOADING_CHECK, loadingCheck)
  yield takeEvery(LOGOUT, logOut);
  yield takeEvery(LOAD_THREADS, loadThreads);
  yield takeEvery(LOAD_DEBATES, loadDebates);
  yield takeEvery(CREATE_NEW_THREAD, createNewThread);
  yield takeEvery(CREATE_NEW_DEBATE, createNewDebate)
}