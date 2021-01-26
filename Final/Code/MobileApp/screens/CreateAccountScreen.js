import React, { useState, useReducer, useCallback, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Alert,
  AsyncStorage,
} from "react-native";
import DatePicker from "react-native-datepicker";
import { useDispatch } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import bg from "../assets/bg.jpg";
import Colour from "../constants/colours";
import { Ionicons } from "@expo/vector-icons";
import Card from "../components/Card";
import { commonStyles } from "../constants/commonStyles";
import * as authActions from "../store/actions/auth";
import firebase from "firebase";
import "firebase/auth";
import "firebase/database";
//import database from '@react-native-firebase/database';
//import db from '../config.js';
import config from "../fb_config.js";

//const reference = database().ref('/users/123');
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

const CreateAccountScreen = (props) => {
  const dispatch = useDispatch();

  const signupHandler = () => {
    //check all entered details are valid
    //if so create the account
    if (!isValidPass) {
      Alert.alert(
        "Invalid password!",
        "You have entered an invalid password, please try again"
      );
    } else if (!passMatch) {
      Alert.alert(
        "Invalid password!",
        "Your passwords do not match or are invalid, please try again"
      );
    } else if (!isValidNum) {
      Alert.alert(
        "Invalid phone number",
        "Please enter a valid 11 digit UK phone number"
      );
    } else if (!isValidAge) {
      Alert.alert(
        "Too young",
        "You must be at least 18 years of age to use this application"
      );
    } else if (!formState.inputValues.email.includes("@")) {
      Alert.alert(
        "Invalid email!",
        "Please format email properly, e.g. 'test@email.com'"
      );
    } else {
      // Create account with the provided email and password
      let signup = firebase
        .auth()
        .createUserWithEmailAndPassword(
          formState.inputValues.email,
          formState.inputValues.password
        )
        .catch(function (error) {
          // Handle Errors here.
          let errorCode = error.code;
          let errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });

      signup.then(() => {
        let user = firebase.auth().currentUser;
        let name, email, photoUrl, uid, emailVerified;

        // if (user != null) {
        name = user.displayName;
        email = user.email;
        photoUrl = user.photoURL;
        emailVerified = user.emailVerified;
        uid = user.uid; // The user's ID, unique to the Firebase project. Do NOT use
        // this value to authenticate with your backend server, if
        // you have one. Use User.getToken() instead.

        firebase
          .database()
          .ref("user-data/" + uid)
          .set({
            Address: formState.inputValues.address,
            Name: formState.inputValues.name,
            PhoneNo: formState.inputValues.phone,
            Username: formState.inputValues.usern,
          });
        Alert.alert("Success!", "Account created successfully, logging you in");
        props.navigation.replace({
          routeName: "Login",
          params: {
            username: formState.inputValues.email,
            password: formState.inputValues.password,
          },
        });
      });
    }
  };

  const changeHandler = useCallback(
    (inputValue, inputName, inputValidity, inputIdentifier) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputName,
      });
    },
    [dispatchFormState]
  );

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      usern: "",
      password: "",
    },
    inputValidities: {
      name: false,
      email: false,
      phone: false,
      address: false,
      usern: false,
      password: false,
    },
    formIsValid: false,
  });

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

  const nameChangeHandler = useCallback((inputValue) => {
    changeHandler(inputValue, "name");
  });
  const phoneChangeHandler = useCallback((inputValue) => {
    if (inputValue.length == 11) {
      setIsValidNum(true);
    } else {
      setIsValidNum(false);
    }
    changeHandler(inputValue, "phone");
  });
  const addressChangeHandler = useCallback((inputValue) => {
    changeHandler(inputValue, "address");
  });
  const usernChangeHandler = useCallback((inputValue) => {
    changeHandler(inputValue, "usern");
  });

  const passwordChangeHandler = useCallback(
    (inputValue) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: true,
        input: "password",
      });
      //Check if password is more than 8 characters.
      //More advanced validation is possible but not implemented due to time constraints
      if (inputValue.length >= 8) {
        setPass1(inputValue);
        setIsValidPass(true);
      } else {
        setIsValidPass(false);
      }
    },
    [dispatchFormState]
  );

  const [isValidNum, setIsValidNum] = useState(false);

  //check for valid phone number

  const [isValidPass, setIsValidPass] = useState(false);
  const [pass1, setPass1] = useState("");

  const [passMatch, setPassMatch] = useState(false);
  const [pass2, setPass2] = useState("");
  const validateMatchPassword = (pass) => {
    //Check that the first password passes the validation
    //and that they both match
    setPass2(pass);
    if (isValidPass && pass1 == pass) {
      console.log("hello");
      setPassMatch(true);
    } else {
      setPassMatch(false);
    }
  };

  useEffect(() => {
    validateMatchPassword(pass2);
  });

  //Toggles hiding/Showing password characters
  const [showPass, setShowPass] = useState(true);
  const hidePass = () => {
    setShowPass(!showPass);
  };

  const [showPass2, setShowPass2] = useState(true);
  const hidePass2 = () => {
    setShowPass2(!showPass2);
  };

  const [date, setDate] = useState(new Date("2016-05-15"));
  const calculateAge = (dob) => {
    //calculate age from DOB formatted as "YYYY-MM-DD"
    //code from https://www.w3resource.com/javascript-exercises/javascript-date-exercise-18.php
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
  };

  const [isValidAge, setIsValidAge] = useState(false);

  return (
    <ImageBackground source={bg} style={commonStyles.backgroundImageContainer}>
      <KeyboardAwareScrollView>
        <View style={styles.screen}>
          <View>
            <Card style={{ padding: 5 }}>
              <Text style={styles.title}>Create Account</Text>
            </Card>
            <Text style={styles.text2}>
              By clicking 'Create' you are agreeing to our{" "}
              <Text
                style={{ color: "blue" }}
                onPress={() => {
                  props.navigation.navigate("Terms");
                }}
              >
                terms and conditions
              </Text>{" "}
              and{" "}
              <Text
                style={{ color: "blue" }}
                onPress={() => {
                  props.navigation.navigate("Privacy");
                }}
              >
                privacy policy
              </Text>
            </Text>
          </View>

          <View style={commonStyles.inputContainer}>
            <TextInput
              id="name"
              onChangeText={nameChangeHandler}
              placeholder={"Name"}
              style={commonStyles.input}
              placeholderTextColor={"grey"}
            />
          </View>

          <View style={commonStyles.inputContainer}>
            <TextInput
              id="email"
              autoCapitalize="none"
              onChangeText={emailChangeHandler}
              placeholder={"Email"}
              style={commonStyles.input}
              placeholderTextColor={"grey"}
              keyboardType="email-address"
            />
          </View>

          <View style={commonStyles.inputContainer}>
            {/* display checkmark if valid data entered */}
            {isValidNum ? (
              <Ionicons
                name="ios-checkmark-circle"
                size={28}
                color={"rgba(255,255,255,0.7)"}
                style={commonStyles.inputIcon}
              />
            ) : null}

            <TextInput
              id="phone"
              onChangeText={phoneChangeHandler}
              placeholder={"Phone Number"}
              style={commonStyles.input}
              placeholderTextColor={"grey"}
              keyboardType="number-pad"
            />
          </View>

          <View style={commonStyles.inputContainer}>
            <TextInput
              id="address"
              onChangeText={addressChangeHandler}
              placeholder={"Address"}
              style={commonStyles.input}
              placeholderTextColor={"grey"}
            />
          </View>

          <View style={commonStyles.inputContainer}>
            <Ionicons
              name="ios-person"
              size={28}
              color={"rgba(255,255,255,0.7)"}
              style={commonStyles.inputIcon}
            />
            <TextInput
              id="usern"
              onChangeText={usernChangeHandler}
              placeholder={"Username"}
              style={commonStyles.input}
              placeholderTextColor={"grey"}
            />
          </View>

          <View style={[commonStyles.inputContainer, { flexDirection: "row" }]}>
            {isValidAge ? (
              <Ionicons
                name="ios-checkmark-circle"
                size={28}
                color={"rgba(255,255,255,0.7)"}
                style={[commonStyles.inputIcon, { marginLeft: -80 }]}
              />
            ) : null}
            <Text style={[styles.text, { paddingTop: 10 }]}>
              Date of Birth:
            </Text>
            <DatePicker
              style={{ width: 200 }}
              date={date}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: "absolute",
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  marginLeft: 36,
                },

                dateText: {
                  color: "white",
                },
              }}
              style={{ marginLeft: 10 }}
              onDateChange={(date) => {
                setDate(date);
                if (calculateAge(new Date(date)) >= 18) {
                  setIsValidAge(true);
                } else {
                  setIsValidAge(false);
                }
              }}
            />
          </View>

          <View style={commonStyles.inputContainer}>
            {isValidPass ? (
              <Ionicons
                name="ios-checkmark-circle"
                size={28}
                color={"rgba(255,255,255,0.7)"}
                style={commonStyles.inputIcon}
              />
            ) : (
              <Ionicons
                name="ios-lock"
                size={28}
                color={"rgba(255,255,255,0.7)"}
                style={commonStyles.inputIcon}
              />
            )}
            <TextInput
              id="password"
              onChangeText={passwordChangeHandler}
              placeholder={"Password"}
              style={commonStyles.input}
              secureTextEntry={showPass}
              placeholderTextColor={"grey"}
            />

            <TouchableOpacity style={commonStyles.btnEye} onPress={hidePass}>
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

          <View style={commonStyles.inputContainer}>
            {passMatch ? (
              <Ionicons
                name="ios-checkmark-circle"
                size={28}
                color={"rgba(255,255,255,0.7)"}
                style={commonStyles.inputIcon}
              />
            ) : (
              <Ionicons
                name="ios-lock"
                size={28}
                color={"rgba(255,255,255,0.7)"}
                style={commonStyles.inputIcon}
              />
            )}

            <TextInput
              id="password"
              onChangeText={passwordChangeHandler}
              placeholder={"Re-enter Password"}
              style={commonStyles.input}
              secureTextEntry={showPass2}
              placeholderTextColor={"grey"}
              onChangeText={validateMatchPassword}
            />

            <TouchableOpacity style={commonStyles.btnEye} onPress={hidePass2}>
              {showPass2 ? (
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
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={[
                commonStyles.btn,
                { backgroundColor: Colour.greenBtn, flex: 1 },
              ]}
              onPress={signupHandler}
            >
              <Text style={styles.text}>Create</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                commonStyles.btn,
                { backgroundColor: Colour.redBtn, flex: 1 },
              ]}
              onPress={() => props.navigation.replace("Login")}
            >
              <Text style={styles.text}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
};
CreateAccountScreen.navigationOptions = {
  title: "Create Account",
};
const styles = StyleSheet.create({
  text: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 16,
    textAlign: "center",
  },
  text2: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 8,
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
    marginTop: "10%",
  },
});

export default CreateAccountScreen;
