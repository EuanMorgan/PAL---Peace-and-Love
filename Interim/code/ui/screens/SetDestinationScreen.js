import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Modal,
  ImageBackground,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import Colour from "../constants/colours";
import bg from "../assets/bg.jpg";
import Header from "../components/Header";
import { commonStyles } from "../constants/commonStyles";
const SetDestinationScreen = props => {
  const [enteredAddress, setEnteredAddress] = useState("");
  const [enteredPostcode, setEnteredPostcode] = useState("");
  const [enteredCity, setEnteredCity] = useState("");

  //Render set destination page, store entered text to pass to nav screen

  const addressInputHandler = enteredText => {
    setEnteredAddress(enteredText);
  };

  const postcodeInputHandler = enteredText => {
    setEnteredPostcode(enteredText);
  };

  const cityInputHandler = enteredText => {
    setEnteredCity(enteredText);
  };

  const addDestinationHandler = () => {
    props.onAddDestination([enteredAddress, enteredPostcode, enteredCity]);
  };

  return (
    <Modal visible={props.visible} animationType="slide">
      <Header title="PAL - Peace and Love" />
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <ImageBackground
          source={bg}
          style={commonStyles.backgroundImageContainer}
        >
          <Text style={styles.label}>Enter Destination</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Address"
              style={commonStyles.input}
              onChangeText={addressInputHandler}
              value={enteredAddress}
              placeholderTextColor={"white"}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Postcode"
              style={commonStyles.input}
              onChangeText={postcodeInputHandler}
              value={enteredPostcode}
              placeholderTextColor={"white"}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="City"
              style={commonStyles.input}
              onChangeText={cityInputHandler}
              value={enteredCity}
              placeholderTextColor={"white"}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                commonStyles.btn,
                styles.buttonSize,
                { backgroundColor: Colour.redBtn }
              ]}
              onPress={props.onCancel}
            >
              <Text style={styles.text}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[commonStyles.btn, styles.buttonSize]}
              onPress={addDestinationHandler}
            >
              <Text style={styles.text}>Add</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 10
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "60%",
    marginTop: 20
  },
  label: {
    marginTop: 15,
    fontSize: 24,
    textAlign: "center",
    color: "white",
    marginBottom: 30
  },
  text: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 16,
    textAlign: "center"
  },
  buttonSize: {
    width: "40%"
  }
});

export default SetDestinationScreen;
