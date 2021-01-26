import React, { Component, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

const Password = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [value, onChangeText] = React.useState("");
  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={props.isVisible}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                {props.init === true
                  ? "Set a 5 digit Passcode"
                  : props.trusted === true
                  ? "Set a trusted contact's phone number"
                  : "Enter a new 5 digit Passcode"}
              </Text>
              <TextInput
                style={{
                  height: 40,
                  borderColor: "gray",
                  borderWidth: 1,
                  padding: 10,
                  marginBottom: 10,
                }}
                onChangeText={(text) => onChangeText(text)}
                value={value}
                placeholder={
                  props.trusted === true
                    ? "enter phone number"
                    : "enter passcode"
                }
                keyboardType="number-pad"
                maxLength={props.trusted === true ? 11 : 5}
              />
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={() => {
                  if (
                    (props.trusted !== true && value.length !== 5) ||
                    (props.trusted == true && value.length !== 11)
                  ) {
                  } else {
                    if (props.trusted === true) {
                      props.newTrusted(value);
                    } else {
                      props.newPasscode(value);
                    }
                  }
                }}
              >
                <Text style={styles.textStyle}>
                  {props.update === true
                    ? "Update"
                    : props.trusted === true
                    ? "Set Contact"
                    : "Set Passcode"}
                </Text>
              </TouchableHighlight>
              {props.init === true ||
              (props.trusted === true && props.resetTrusted != true) ? (
                <View />
              ) : (
                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: "red" }}
                  onPress={() => {
                    props.close();
                  }}
                >
                  <Text style={styles.textStyle}>Cancel</Text>
                </TouchableHighlight>
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default Password;
