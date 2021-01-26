import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Button,
  Slider,
  Switch,
  Platform,
  AsyncStorage,
  Alert,
} from "react-native";

import { _ } from "lodash";

import RNPickerSelect from "react-native-picker-select";
import bg from "../assets/bg.jpg";
import { commonStyles } from "../constants/commonStyles";

import { Ionicons } from "@expo/vector-icons";

import Colour from "../constants/colours";
import EnterPasscode from "../components/EnterPasscode";
import { TextInput } from "react-native-gesture-handler";
import ResetPasscode from "../components/ResetPasscode";

//NOTE: For some reason, storing anything but strings using Async Storage causes a crash?
//Therefore, we store a string representation of the recording boolean and convert it when we need it, not ideal but it works.

const SettingsScreen = (props) => {
  const [isSave, setIsSave] = useState(false);
  console.log(Dimensions.get("window").width);
  const [timer, setTimer] = useState("temp");
  const [colourScheme, setColourScheme] = useState("default");
  const [recording, setRecording] = useState(true);
  const [recordingStr, setRecordingStr] = useState("true");
  const [darkBool, setDarkBool] = useState(true);
  const [darkStr, setDarkStr] = useState("true");

  const saveSettings = () => {
    // Overwrite the settings with updated values
    setIsSave(false);
    AsyncStorage.multiRemove(["timerSetting", "recordingSetting", "darkTheme"]);

    storeData();

    props.navigation.replace(props.navigation.pop().toString());
  };

  const storeData = async () => {
    // Store all data
    try {
      await AsyncStorage.setItem("timerSetting", timer);
    } catch (error) {
      // Error saving data
    }
    try {
      await AsyncStorage.setItem("recordingSetting", recordingStr);
    } catch (error) {}

    try {
      await AsyncStorage.setItem("darkTheme", darkStr);
    } catch (error) {}
  };

  const cancel = () => {
    setIsSave(false);
  };

  const retrieveData = async () => {
    // Retrieve all data
    try {
      const value = await AsyncStorage.getItem("timerSetting");
      if (value !== null) {
        // We have data!!
        setTimer(value);
      }
    } catch (error) {}
    try {
      const value = await AsyncStorage.getItem("recordingSetting");
      if (value !== null) {
        value == "true" ? setRecording(true) : setRecording(false);
        value == "true" ? setRecordingStr("true") : setRecordingStr("false");
      }
    } catch (error) {}
    try {
      const value = await AsyncStorage.getItem("passcodeSetting");
      if (value !== null) {
        p = value;
      }
      console.log(p);
    } catch (error) {}

    try {
      const value = await AsyncStorage.getItem("darkTheme");
      if (value !== null) {
        value == "true" ? setDarkBool(true) : setDarkBool(false);
        value == "true" ? setDarkStr("true") : setDarkStr("false");
      }
    } catch (error) {}
  };

  if (timer == "temp") {
    // IF NO TIMER SET
    setTimer("15");
    retrieveData();
  }

  // RESET PASSCODE RELATED CODE
  const storeResetPass = async (pass) => {
    try {
      await AsyncStorage.setItem("passcodeSetting", pass);
      const value = await AsyncStorage.getItem("passcodeSetting");
      console.log(value);
    } catch (error) {}
  };

  const [isReset, setIsReset] = useState(false);

  const closeReset = () => {
    setIsReset(false);
  };

  const newPass = (value) => {
    storeResetPass(value);

    closeReset();
    setTimeout(() => {
      Alert.alert("Success!", "You have reset your passcode.");
    }, 700);
  };

  return (
    <ImageBackground source={bg} style={commonStyles.backgroundImageContainer}>
      <View>
        <View style={styles.screen}>
          <ResetPasscode
            isVisible={isReset}
            close={closeReset}
            newPasscode={newPass}
          />

          <EnterPasscode
            visible={isSave}
            title="update settings"
            correct={saveSettings}
            onCancel={cancel}
            police={false}
          />
          <ScrollView>
            <View
              style={{
                ...styles.optionContainer,
                ...{ justifyContent: "center" },
              }}
            >
              <Text style={styles.text}>Police Contact Timer: {timer}s</Text>
              <Slider
                maximumValue={15}
                minimumValue={5}
                step={1}
                value={parseInt(timer)}
                onValueChange={_.debounce((timer) => {
                  setTimer(timer.toString());
                }, 10)}
                style={{ paddingBottom: 20 }}
              />
            </View>

            <View
              style={{
                ...styles.optionContainer,
                ...{ justifyContent: "center" },
              }}
            >
              <Text style={styles.text}>Colour Scheme: {colourScheme}</Text>
              <RNPickerSelect
                onValueChange={(itemValue) => setColourScheme(itemValue)}
                items={[
                  { label: "Default", value: "default", color: "blue" },
                  { label: "Scheme 2", value: "scheme2", color: "blue" },
                  { label: "Scheme 3", value: "scheme3", color: "blue" },
                ]}
                Icon={() => {
                  return (
                    <Ionicons name="md-arrow-down" size={24} color="gray" />
                  );
                }}
                style={{
                  iconContainer: {
                    top: Platform.OS === "android" ? 15 : 0,
                    right: "10%",
                  },
                  color: "white",
                }}
              />
            </View>

            <View
              style={{
                ...styles.optionContainer,
                ...{ flexDirection: "row", alignItems: "center" },
              }}
            >
              <Text style={styles.text}>Record Video: </Text>
              <Switch
                ios_backgroundColor={"rgba(0,0,0,0.4)"}
                value={recording}
                onValueChange={(value) => {
                  setRecording(value);
                  value == true
                    ? setRecordingStr("true")
                    : setRecordingStr("false");
                }}
                style={{ top: 2.5, left: "20%" }}
              />
            </View>

            <View
              style={{
                ...styles.optionContainer,
                ...{ flexDirection: "row", alignItems: "center" },
              }}
            >
              <Text style={styles.text}>Dark Theme:</Text>
              <Switch
                ios_backgroundColor={"rgba(0,0,0,0.4)"}
                value={darkBool}
                onValueChange={(value) => {
                  setDarkBool(value);
                  value == true ? setDarkStr("true") : setDarkStr("false");
                }}
                style={{ top: 2.5, left: "70%" }}
              />
            </View>

            <View
              style={{
                ...styles.optionContainer,
                ...{ flexDirection: "row", alignItems: "center" },
              }}
            >
              <Text
                style={[
                  styles.text,
                  {
                    paddingTop: 2.5,
                    paddingRight:
                      Dimensions.get("window").width > 370 ? 70 : 55,
                  },
                ]}
              >
                Passcode:
              </Text>
              {/* <TextInput
                style={[
                  commonStyles.input,
                  { width: "40%", marginTop: 5, color: "white" },
                ]}
              /> */}
              <Button
                title="RESET PASSCODE"
                onPress={() => {
                  setIsReset(true);
                }}
              />
            </View>

            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={[
                  commonStyles.btn,
                  styles.buttonSize,
                  { backgroundColor: Colour.greenBtn },
                ]}
                onPress={() => {
                  setIsSave(true);
                }}
              >
                <Text style={styles.btnText}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  commonStyles.btn,
                  styles.buttonSize,
                  { backgroundColor: Colour.redBtn },
                ]}
                onPress={() => {
                  props.navigation.pop();
                }}
              >
                <Text style={styles.btnText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    paddingTop: 40,
    marginTop: -50,
  },
  text: {
    color: "white",
    fontSize: Dimensions.get("window").width > 370 ? 24 : 18,
    textAlign: "left",
    padding: "2%",
  },
  optionContainer: {
    flexDirection: "column",
    flex: 1,
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 10,
    padding: 10,
    marginBottom: 1,
  },
  btnContainer: {
    flexDirection: "row",
    width: "38%",
    paddingVertical: 15,
    marginVertical: 10,
  },
  buttonSize: {
    width: "100%",
    marginHorizontal: 20,
  },
  btnText: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 16,
    textAlign: "center",
  },
});

export default SettingsScreen;
