import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity
} from "react-native";

import bg from "../assets/bg.jpg";
import Colour from "../constants/colours";
import { Ionicons } from "@expo/vector-icons";
import Card from "../components/Card";
import { commonStyles } from "../constants/commonStyles";

const LoginScreen = props => {
  const [showPass, setShowPass] = useState(true);

  const hidePass = () => {
    setShowPass(!showPass); //Toggles showing/hiding password character
  };

  const [username, setUsername] = useState("");

  const usernameInputHandler = enteredText => {
    setUsername(enteredText); //Stores username
  };

  const loginHandler = () => {
    props.onLogin(username); //Calls login function in app.js
  };

  return (
    <TouchableWithoutFeedback //Used to dismiss the keyboard when user clicks elsewhere on screen
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <ImageBackground
        source={bg}
        style={commonStyles.backgroundImageContainer}
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
            placeholder={"Username"}
            style={commonStyles.input}
            placeholderTextColor={"grey"}
            onChangeText={usernameInputHandler}
            value={username}
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
            placeholder={"Password"}
            style={commonStyles.input}
            secureTextEntry={showPass}
            placeholderTextColor={"grey"}
          />

          <TouchableOpacity style={commonStyles.btnEye} onPress={hidePass}>
            <Ionicons
              name="ios-eye"
              size={26}
              color={"rgba(255,255,255,0.7)"}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={commonStyles.btn} onPress={loginHandler}>
          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[commonStyles.btn, { backgroundColor: Colour.blueBtn }]}
          onPress={() => props.onCreateAccount()}
        >
          <Text style={styles.text}>Create Account</Text>
        </TouchableOpacity>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 16,
    textAlign: "center"
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});

export default LoginScreen;
