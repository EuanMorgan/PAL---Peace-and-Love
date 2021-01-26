export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';

import { AsyncStorage } from "react-native";

const newToken = async (value) => {
  // await AsyncStorage.setItem("token", value);
  try {
    await AsyncStorage.setItem("token", value);
    console.log("Token stored");
  } catch (error) {
    console.log(error);
  }

  // setTimeout(() => {
  //   //props.navigation.replace("Login");
  //   console.log("Timeout on token store.")
  // }, 500);
};

const newID = async (value) => {
  // await AsyncStorage.setItem("uid", value);
  try {
    await AsyncStorage.setItem("uid", value);
    console.log("ID stored");
  } catch (error) {
    console.log(error);
  }

  // setTimeout(() => {
  //   //props.navigation.replace("Login");
  //   console.log("Timeout on id store.")
  // }, 500);
};

export const signup = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDb8lVL8Z6zTKhttM0QCasWCTo1g1lyPFA',
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    );
    
    if (!response.ok) {
      throw new Error('Signin went wrong!');
    }

    const resData = await response.json();
    newToken(resData.idToken);
    newID(resData.localId);
    console.log(resData);

    dispatch({type: SIGNUP});
  };
};

export const login = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDb8lVL8Z6zTKhttM0QCasWCTo1g1lyPFA',
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    );
    if (!response.ok) {
      throw new Error('Login has failed, oops!');
    }

    const resData = await response.json();
    newToken(resData.idToken);
    newID(resData.localId);
    console.log(resData);

    dispatch({type: LOGIN});
  };
};