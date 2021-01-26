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

//Renders the create account screen, currently just a skeleton UI with little functionality

const CreateAccountScreen = props => {
  //Toggles hiding/Showing password characters
  const [showPass, setShowPass] = useState(true);
  const hidePass = () => {
    setShowPass(!showPass);
  };
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <ImageBackground
        source={bg}
        style={commonStyles.backgroundImageContainer}
      >
        <View>
          <Card>
            <Text style={styles.title}>Create Account</Text>
          </Card>
        </View>

        <View style={commonStyles.inputContainer}>
          <TextInput
            placeholder={"Name"}
            style={commonStyles.input}
            placeholderTextColor={"grey"}
          />
        </View>

        <View style={commonStyles.inputContainer}>
          <TextInput
            placeholder={"Email"}
            style={commonStyles.input}
            placeholderTextColor={"grey"}
          />
        </View>

        <View style={commonStyles.inputContainer}>
          <TextInput
            placeholder={"Phone Number"}
            style={commonStyles.input}
            placeholderTextColor={"grey"}
          />
        </View>

        <View style={commonStyles.inputContainer}>
          <TextInput
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
            placeholder={"Username"}
            style={commonStyles.input}
            placeholderTextColor={"grey"}
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

        <TouchableOpacity
          style={[commonStyles.btn, { backgroundColor: Colour.greenBtn }]}
          onPress={() => props.onCreated()}
        >
          <Text style={styles.text}>Create</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[commonStyles.btn, { backgroundColor: Colour.redBtn }]}
          onPress={() => props.onCancel()}
        >
          <Text style={styles.text}>Cancel</Text>
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

export default CreateAccountScreen;
