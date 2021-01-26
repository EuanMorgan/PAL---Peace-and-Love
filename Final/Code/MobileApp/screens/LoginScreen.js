import React, { useState, useReducer, useCallback, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Dimensions,
  AsyncStorage,
  Alert,
  Platform,
} from "react-native";

import ResetPasscode from "../components/ResetPasscode";
import { useDispatch } from "react-redux";

import Colour from "../constants/colours";
import { Ionicons } from "@expo/vector-icons";
import Card from "../components/Card";
import { commonStyles } from "../constants/commonStyles";
import bg from "../assets/bg.jpg";
import Colours from "../constants/colours";
import * as authActions from "../store/actions/auth";
// import db from "../config.js";
import firebase from "firebase";
import config from "../fb_config.js";
let r = 0; //r is used to count the reloads of the page so we only show the coronavirus alert once.

const HEIGHT = Dimensions.get("window").height;

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const LoginScreen = (props) => {
  if (r == 0) {
    Alert.alert(
      "Coronavirus Alert",
      "Due to recent Government advice following the Covid-19 situation, please don't go out if you can avoid it. \n\n - Only go outside for food, health reasons or work (but only if you cannot work from home) \n\n - If you go out, stay 2 metres (6ft) away from other people at all times \n\n - Wash your hands as soon as you get home"
    );
    r++;
  }

  useEffect(() => {
    if (props.navigation.state.params != undefined) {
      console.log(props.navigation.state.params.username);
      console.log(props.navigation.state.params.password);
      formState.inputValues.email = props.navigation.state.params.username;
      formState.inputValues.password = props.navigation.state.params.password;
      loginHandler();
    }
  });

  const [username, setUsername] = useState("");

  const [showPass, setShowPass] = useState(true);
  const hidePass = () => {
    console.log(Dimensions.get("window").width);
    setShowPass(!showPass); //Toggles showing/hiding password character
  };

  const dispatch = useDispatch();

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  const emailChangeHandler = useCallback(
    (inputValue) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: true,
        input: "email",
      });
    },
    [dispatchFormState]
  );

  const passwordChangeHandler = useCallback(
    (inputValue) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: true,
        input: "password",
      });
    },
    [dispatchFormState]
  );

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  const checkSetPasscode = async () => {
    //Force user to set a passcode if they haven't already
    try {
      const value = await AsyncStorage.getItem("passcodeSetting");
      if (value === null) {
        setIsEnterPasscode(true);
      } else {
        // Wait here for the name to be fetched
        // props.navigation.replace("HeatMap");
        checkSetTrustedContact();
      }
    } catch (error) {}
  };

  const checkSetTrustedContact = async () => {
    try {
      const value = await AsyncStorage.getItem("trustedContactNumber");
      if (value === null) {
        setIsEnterTrustedContact(true);
      } else {
        // Wait here for the name to be fetched
        props.navigation.replace("HeatMap");
      }
    } catch (error) {}
  };

  const setUsernameAsync = async (usernameArg) => {
    try {
      await AsyncStorage.setItem("username", usernameArg);
    } catch (error) {}
  };

  const loginHandler = () => {
    console.log("Starting login");
    // Login with the provided email and password
    let valid = true;
    let signIn = firebase
      .auth()
      .signInWithEmailAndPassword(
        formState.inputValues.email,
        formState.inputValues.password
      )
      .catch(function (error) {
        Alert.alert(
          "Invalid login",
          "Please use a valid email/password, or make a new account"
        );
        console.log("OOPSIES");
        // Handle Errors here.
        valid = false;
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });

    signIn.then(() => {
      if (valid) {
        console.log("Alreet here we go");
        // This should only be run if an error is not returned above
        // let user = firebase.auth().currentUser;
        // let uidServ, usernameServ;
        // if (user != null) {
        //   uidServ = user.uid;
        //   firebase.database().ref('/user-data/' + uidServ).once('value').then(function (snapshot) {
        //     usernameServ = snapshot.val().username;
        //   });
        // } else {
        //   usernameServ = "Craig(?)";
        // }
        // setUsernameAsync(usernameServ);
        checkSetPasscode();
      }
    });

    // This should only be run if an error is not returned above
    // let user = firebase.auth().currentUser;
    // let uidServ, usernameServ;
    // if (user != null) {
    //   uidServ = user.uid;
    //   firebase
    //     .database()
    //     .ref("/user-data/" + uidServ)
    //     .once("value")
    //     .then(function (snapshot) {
    //       usernameServ = snapshot.val().username; //(snapshot.val() && snapshot.val().username) || 'Anonymous';
    //     });
    // } else {
    //   usernameServ = "Craig(?)";
    // }
    // setUsernameAsync(usernameServ);
    // checkSetPasscode();

    // props.navigation.replace({
    //   routeName: "Menu",
    //   params: {
    //     name: formState.inputValues.email
    //   }
    // })
  };

  //state for if the enter passcode modal is visible
  const [isEnterPasscode, setIsEnterPasscode] = useState(false);
  const closeEnterPasscode = () => {
    setIsEnterPasscode(false);
  };

  const newPass = async (value) => {
    //Stores the new passcode
    try {
      await AsyncStorage.setItem("passcodeSetting", value);
      console.log("SET FROM LOGIN");
    } catch (error) {
      // Error saving data
    }
    closeEnterPasscode();

    checkSetTrustedContact();
  };

  const [isEnterTrustedContact, setIsEnterTrustedContact] = useState(false);
  const closeEnterTrustedContact = () => {
    setIsEnterTrustedContact(false);
  };

  const newTrusted = async (value) => {
    //Stores the new trusted contact
    try {
      await AsyncStorage.setItem("trustedContactNumber", value);
      console.log("SET FROM LOGIN");
    } catch (error) {}
    closeEnterTrustedContact();

    setTimeout(() => {
      props.navigation.replace("HeatMap");
    }, 500);
  };

  return (
    <ImageBackground source={bg} style={commonStyles.backgroundImageContainer}>
      <TouchableWithoutFeedback //Used to dismiss the keyboard when user clicks elsewhere on screen
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        {/* Margin top -500 is a dreadful solution to the modals taking up space when invisible, but it works */}
        <View>
          {/* reuse reset passcode component, modify it by checking for the init and trusted variables */}
          <ResetPasscode
            isVisible={isEnterPasscode}
            close={closeEnterPasscode}
            newPasscode={newPass}
            init={true}
          />
          <ResetPasscode
            isVisible={isEnterTrustedContact}
            close={closeEnterTrustedContact}
            newTrusted={newTrusted}
            trusted={true}
          />
          <KeyboardAvoidingView //keyboard avoiding view shifts everything out of the way of keyboard
            behavior="padding"
            keyboardVerticalOffset={35}
            style={styles.screen}
            enabled={Platform.OS === "android" ? false : true}
          >
            <View style={commonStyles.textContainer}>
              <Card>
                <Text style={styles.title}>Welcome!</Text>
              </Card>
            </View>
            <View style={commonStyles.inputContainer}>
              <Ionicons
                name="ios-person"
                size={28}
                color={"rgba(255,255,255,0.7)"}
                style={commonStyles.inputIcon}
              />
              <TextInput
                id="email"
                keyboardType="email-address"
                required
                email
                autoCapitalize="none"
                errorMessage="Please enter a valid email address."
                initialValue=""
                placeholder={"Email"}
                style={commonStyles.input}
                placeholderTextColor={"grey"}
                onChangeText={emailChangeHandler}
              />
            </View>
            <View style={commonStyles.inputContainer}>
              <Ionicons
                name="ios-lock"
                size={28}
                color={"rgba(255,255,255,0.7)"}
                style={commonStyles.inputIcon}
              />
              <TextInput
                id="password"
                keyboardType="default"
                required
                // password
                autoCapitalize="none"
                errorMessage="Please enter a valid password."
                placeholder={"Password"}
                style={commonStyles.input}
                secureTextEntry={showPass}
                placeholderTextColor={"grey"}
                onChangeText={passwordChangeHandler}
              />

              <TouchableOpacity style={commonStyles.btnEye} onPress={hidePass}>
                {/* toggle the eye icon when pressed */}
                {showPass == true ? (
                  <Ionicons
                    name="ios-eye"
                    size={26}
                    color={"rgba(255,255,255,0.7)"}
                  />
                ) : (
                  <Ionicons
                    name="ios-eye-off"
                    size={26}
                    color={"rgba(255,255,255,0.7)"}
                  />
                )}
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={commonStyles.btn} onPress={loginHandler}>
              <Text style={styles.text}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[commonStyles.btn, { backgroundColor: Colour.blueBtn }]}
              onPress={() => {
                props.navigation.replace("CreateAccount");
              }}
              //onPress={signupHandler}
            >
              <Text style={styles.text}>Create Account</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

LoginScreen.navigationOptions = {
  headerLeft: () => null,
};

const styles = StyleSheet.create({
  text: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 16,
    textAlign: "center",
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: HEIGHT > 650 ? -1000 : -800,
  },
});

export default LoginScreen;
