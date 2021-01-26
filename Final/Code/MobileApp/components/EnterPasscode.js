import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Modal,
  Text,
  StyleSheet,
  Button,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Alert,
  AsyncStorage,
  SafeAreaView,
  ColorPropType,
} from "react-native";

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

import Communications from "react-native-communications";

import CountDown from "react-native-countdown-component";

import Colour from "../constants/colours";
import { phonecall } from "react-native-communications";

const CELL_COUNT = 5;

const EnterPasscode = (props) => {
  const [userPass, setUserPass] = useState("");
  const [userContact, setUserContact] = useState("");
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [cell, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [timerLength, setTimerLength] = useState(15);
  const [isRunning, setIsRunning] = useState(true);

  const confirm = () => {
    // Validate entered passcode
    if (value.toString() == userPass) {
      setValue();
      props.correct();
    } else {
      Alert.alert("Incorrect Passcode!", "Please try again", [{ text: "Ok" }]);
    }
  };

  const cancel = () => {
    props.onCancel();
  };

  const retrieveData = async () => {
    // Get relevant settings from storage
    try {
      const value = await AsyncStorage.getItem("timerSetting");
      if (value !== null) {
        // We have data!!
        setTimerLength(parseInt(value));
      }
    } catch (error) {
      // Error retrieving data
    }

    try {
      const value = await AsyncStorage.getItem("passcodeSetting");
      if (value !== null) {
        setUserPass(value);
      }
    } catch (error) {
      // Error retrieving data
    }

    try {
      const value = await AsyncStorage.getItem("trustedContactNumber");
      if (value !== null) {
        setUserContact(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  if (props.visible) {
    // Retrieve data upon load
    retrieveData();
  }
  useEffect(() => {
    retrieveData();
  });

  return (
    <Modal visible={props.visible} animationType="slide">
      <SafeAreaView style={styles.screen}>
        {/* Display different text based off the props provided to this component */}
        {props.police == true ? (
          <View>
            <Text style={{ color: "red", fontSize: 30, textAlign: "center" }}>
              CALLING POLICE
            </Text>
            {props.recording == true ? (
              <Text style={{ color: "red", fontSize: 16, textAlign: "center" }}>
                RECORDING AUDIO AND VIDEO
              </Text>
            ) : (
              <View />
            )}
          </View>
        ) : (
          <View />
        )}
        <Text style={styles.text}>Enter your passcode to {props.title}</Text>
        {props.police == true ? (
          <CountDown
            until={timerLength}
            size={30}
            onFinish={() => {
              Communications.phonecall(userContact, false);
            }}
            digitStyle={{ backgroundColor: "#FFF" }}
            digitTxtStyle={{ color: "#1CC625" }}
            timeToShow={["M", "S"]}
            timeLabels={{ m: "MM", s: "SS" }}
            style={{ color: "red" }}
            running={isRunning}
          />
        ) : (
          <View />
        )}

        <CodeField
          ref={ref}
          {...cell}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFiledRoot}
          keyboardType="number-pad"
          renderCell={({ index, symbol, isFocused }) => (
            <Text
              key={index}
              style={[
                styles.cell,
                isFocused && styles.focusCell,
                { color: "white" },
              ]}
              onLayout={getCellOnLayoutHandler(index)}
            >
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
        <View
          style={{
            flexDirection: props.police == false ? "row" : "column",
            justifyContent: "space-between",
            paddingHorizontal: 70,
            marginTop: 20,
          }}
        >
          <Button title="Confirm" onPress={confirm} color={Colour.greenBtn} />
          {props.police == false ? (
            <Button title="Cancel" onPress={cancel} color={Colour.redBtn} />
          ) : (
            <View />
          )}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 22,
    textAlign: "center",
    paddingVertical: "15%",
  },
  screen: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "black",
  },
  title: { textAlign: "center", fontSize: 30 },
  codeFiledRoot: { marginTop: 20, marginBottom: 15 },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: "red",
    textAlign: "center",
    marginHorizontal: "1%",
  },
  focusCell: {
    borderColor: "green",
  },
});

export default EnterPasscode;
