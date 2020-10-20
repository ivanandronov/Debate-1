import { CHECK_SIGN_IN, SEND_AUTHENTICATED_FROM_SAGA_TO_REDUX, CHECK_REGISTER, DATABASE_ERROR_FROM_SAGA_TO_REDUX, REGISTER_EMAIL_ERROR_FROM_SAGA_TO_REDUX, REGISTER_NAME_ERROR_FROM_SAGA_TO_REDUX, LOGIN_PASSWORD_ERROR_FROM_SAGA_TO_REDUX, LOGIN_NAME_EMAIL_ERROR_FROM_SAGA_TO_REDUX, LOADING_CHECK, LOGOUT, LOGOUT_FROM_SAGA_TO_REDUX, LOAD_THREADS, LOAD_THREADS_FROM_SAGA_TO_REDUX, LOAD_DEBATES, LOAD_DEBATES_FROM_SAGA_TO_REDUX, CREATE_NEW_THREAD, CREATE_NEW_DEBATE } from './actionTypes';

// Проверка на активную сессию при загрузке страницы ++
const loadingSessionCheck = () => ({ type: LOADING_CHECK });

// Проверка на успешность входа и регистрации ++
const checkSignIn = (data) => ({ type: CHECK_SIGN_IN, data });
const checkRegister = (data) => ({ type: CHECK_REGISTER, data });
const sendAuthenticatedFromSagaToRedux = (user) => ({ type: SEND_AUTHENTICATED_FROM_SAGA_TO_REDUX, user});

// Выход ++
const logout = () => ({ type: LOGOUT });
const logoutFromSagaToRedux = () => ({ type: LOGOUT_FROM_SAGA_TO_REDUX });

// Ошибки сервера ++
const dataBaseErrorFromSagaToRedux = (error) => ({ type: DATABASE_ERROR_FROM_SAGA_TO_REDUX, error });

// Ошибки при регистрации
const registerEmailErrorFromSagaToRedux = (error) => ({ type: REGISTER_EMAIL_ERROR_FROM_SAGA_TO_REDUX, error });
const registerNameErrorFromSagaToRedux = (error) => ({ type: REGISTER_NAME_ERROR_FROM_SAGA_TO_REDUX, error});

// Ошибки при аутентификации
const loginNameEmailErrorFromSagaToRedux = (error) => ({ type: LOGIN_NAME_EMAIL_ERROR_FROM_SAGA_TO_REDUX, error });
const loginPasswordErrorFromSagaToRedux = (error) => ({ type: LOGIN_PASSWORD_ERROR_FROM_SAGA_TO_REDUX, error });

// Загрузка глобальных тредов ++
const loadThreads = () => ({ type: LOAD_THREADS })
const loadThreadsFromSagaToRedux = (data) => ({ type: LOAD_THREADS_FROM_SAGA_TO_REDUX, data });

// Загрузка дебатов ++
const loadDebates = () => ({ type: LOAD_DEBATES });
const loadDebatesFromSagaToRedux = (data) => ({ type: LOAD_DEBATES_FROM_SAGA_TO_REDUX, data });

// Создание нового треда ++
const createNewThread = (data) => ({ type: CREATE_NEW_THREAD, data });

// Создание нового дебата ++
const createNewDebate = (data) => ({ type: CREATE_NEW_DEBATE });

export {
  checkSignIn,
  sendAuthenticatedFromSagaToRedux,
  checkRegister,
  dataBaseErrorFromSagaToRedux,
  registerEmailErrorFromSagaToRedux,
  registerNameErrorFromSagaToRedux,
  loginNameEmailErrorFromSagaToRedux,
  loginPasswordErrorFromSagaToRedux,
  loadingSessionCheck,
  logout,
  logoutFromSagaToRedux,
  loadThreads,
  loadThreadsFromSagaToRedux,
  loadDebates,
  loadDebatesFromSagaToRedux,
  createNewThread,
  createNewDebate,
}