import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity
} from "react-native";

import bg from "../assets/bg.jpg";
import { commonStyles } from "../constants/commonStyles";
import Colour from "../constants/colours";

const { width: WIDTH } = Dimensions.get("window");

const MenuScreen = props => {
  return (
    <ImageBackground source={bg} style={commonStyles.backgroundImageContainer}>
      <View style={styles.screen}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Hello, {props.name}!</Text>
        </View>

        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={[commonStyles.btn, styles.buttonSize]}
            onPress={props.onBeginEnterDest}
          >
            <Text style={styles.text}>Start a Route</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[commonStyles.btn, styles.buttonSize]}>
            <Text style={styles.text}>Trusted Contacts</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.btnContainer}>
          <TouchableOpacity style={[commonStyles.btn, styles.buttonSize]}>
            <Text style={styles.text}>My Account</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[commonStyles.btn, styles.buttonSize]}>
            <Text style={styles.text}>Settings</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.btnContainer}>
          <TouchableOpacity style={[commonStyles.btn, styles.buttonSize]}>
            <Text style={styles.text}>Report a Problem</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[commonStyles.btn, styles.buttonSize]}>
            <Text style={styles.text}>Help</Text>
          </TouchableOpacity>
        </View>

        <View
          style={[
            styles.btnContainer,
            {
              width: "66%",
              justifyContent: "center",
              flexDirection: "column"
            }
          ]}
        >
          <TouchableOpacity
            style={[
              commonStyles.btn,
              styles.buttonSize,
              {
                backgroundColor: Colour.redBtn
              }
            ]}
            onPress={props.onLogout}
          >
            <Text style={styles.text}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10
  },
  btnContainer: {
    flexDirection: "row",
    width: "33%",
    paddingVertical: 15,
    marginVertical: 10
  },
  text: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 16,
    textAlign: "center"
  },
  label: {
    marginTop: 15,
    fontSize: 24,
    textAlign: "center",
    color: "white"
  },
  buttonSize: {
    width: WIDTH - 275,
    marginHorizontal: 20
  }
});

export default MenuScreen;
