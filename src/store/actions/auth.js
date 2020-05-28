import axios from "axios";
import * as actionTypes from "./actionTypes";

const API_KEY = "AIzaSyCVEdKjiEhuI3Xs833wjXbF4UYpXCt1y-U";

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    payload: {
      path: path,
    },
  };
};

export const inputAuthFormChanged = (event, identifier) => {
  return {
    type: actionTypes.AUTH_FORM_INPUT_CHANGED,
    payload: {
      event: event,
      identifier: identifier,
    },
  };
};

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSucces = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: {
      token: token,
      userId: userId,
    },
  };
};

export const authFail = (error, errorMessage) => {
  return {
    type: actionTypes.AUTH_FAIL,
    payload: { error: error, errorMessage: errorMessage },
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password, isLogin) => {
  return (dispatch) => {
    dispatch(authStart());

    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    let url;
    isLogin
      ? (url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`)
      : (url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`);

    axios
      .post(url, authData)
      .then((response) => {
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );

        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", response.data.localId);

        dispatch(authSucces(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch((error) => {
        dispatch(
          authFail(error.response.data.error, error.response.data.error.message)
        );
      });
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate < new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem("userId");
        dispatch(authSucces(token, userId));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
