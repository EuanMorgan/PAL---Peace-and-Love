import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert
} from "react-native";

import bg from "../assets/bg.jpg";
import Colour from "../constants/colours";
import { Ionicons } from "@expo/vector-icons";
import Card from "../components/Card";
import { commonStyles } from "../constants/commonStyles";
import EnterPasscode from "../components/EnterPasscode";
import firebase from 'firebase';
import { name, email, phone, address, username } from "./HeatMapScreen.js";

//TODO: Fetch and update data from DB

let newName, newEmail, newPhone, newAddress;
// newName = name;
// newEmail = email;
// newPhone = phone;
// newAddress = address;

const MyAccountScreen = (props) => {
  const [isSave, setIsSave] = useState(false);

  let user = firebase.auth().currentUser;

  const updateAccount = () => {
    setIsSave(false);

    let update = firebase
      .database()
      .ref("user-data/" + user.uid)
      .set({
        Address: newAddress,
        Name: newName,
        PhoneNo: newPhone,
        Username: username,
      })
      .catch(function (error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });

    update.then(() => {
      props.navigation.pop();
    });
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
        <ScrollView style={{ paddingTop: 40 }}>
          <SafeAreaView style={styles.screen}>
            <EnterPasscode
              title="update account"
              visible={isSave}
              correct={updateAccount}
              onCancel={() => {
                setIsSave(false);
              }}
            />

            <Card>
              <Text style={styles.label}>Your Account Details</Text>
            </Card>
            <View style={styles.inCont}>
              <Text style={[styles.text, { paddingTop: 10 }]}>Name</Text>
              <TextInput
                defaultValue={name}
                style={[commonStyles.input]}
                placeholderTextColor={"grey"}
                onChangeText={(inName) => { newName = inName }}
              />
            </View>

            <View style={styles.inCont}>
              <Text style={[styles.text]}>{"\n"}Email (not currently changeable)</Text>
              <TextInput
                defaultValue={email}
                editable={false}
                style={[commonStyles.input]}
                placeholderTextColor={"grey"}
                onChangeText={(inEmail) => newEmail = inEmail}
              />
            </View>

            <View style={styles.inCont}>
              <Text style={[styles.text]}>{"\n"}Phone</Text>
              <TextInput
                defaultValue={phone}
                style={[commonStyles.input]}
                placeholderTextColor={"grey"}
                onChangeText={(inPhone) => newPhone = inPhone}
              />
            </View>

            <View style={styles.inCont}>
              <Text style={[styles.text]}>{"\n"}Address</Text>
              <TextInput
                defaultValue={address}
                style={[commonStyles.input]}
                placeholderTextColor={"grey"}
                onChangeText={(inAddress) => newAddress = inAddress}
              />
            </View>
            <Text>{"\n"}</Text>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                style={[commonStyles.btn, { backgroundColor: Colour.greenBtn }]}
                onPress={() => {
                  if (!newAddress) newAddress = address;
                  if (!newName) newName = name;
                  if (!newPhone) newPhone = phone;
                  if (!newEmail) newEmail = email;
                  if (newPhone.length != 11) {
                    Alert.alert(
                      "Invalid phone number",
                      "Please enter a valid 11 digit UK phone number"
                    );
                  } else {
                    setIsSave(true);
                  }
                }}
              >
                <Text style={styles.text}>Update</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </ScrollView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

MyAccountScreen.navigationOptions = {
  title: "My Account",
};

const styles = StyleSheet.create({
  text: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 16,
    textAlign: "center",
    marginTop: "0.5%",
  },
  inCont: {
    marginTop: "0.5%",
  },
  screen: {
    flex: 1,
    padding: 10,
    paddingTop: 40,
  },
  label: {
    fontSize: 24,
    textAlign: "center",
    color: "white",
  },
});

export default MyAccountScreen;
