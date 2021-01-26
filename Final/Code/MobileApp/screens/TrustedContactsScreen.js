import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
  Alert,
} from "react-native";

import bg from "../assets/bg.jpg";
import { commonStyles } from "../constants/commonStyles";
import Colour from "../constants/colours";
import Card from "../components/Card";
import ResetPasscode from "../components/ResetPasscode";

const HEIGHT = Dimensions.get("window").height;
const TrustedContactsScreen = (props) => {
  // allows user to reset trusted contact number
  const [number, setNumber] = useState();
  useEffect(() => {
    retrieveData();
  });

  const retrieveData = async () => {
    console.log("hee i am");
    try {
      const value = await AsyncStorage.getItem("trustedContactNumber");
      if (value !== null) {
        setNumber(value);
      }
    } catch (error) {}
  };

  const storeResetTrusted = async (contact) => {
    try {
      await AsyncStorage.setItem("trustedContactNumber", contact);
      const value = await AsyncStorage.getItem("trustedContactNumber");
      console.log(value);
    } catch (error) {}
  };

  const [isRestTrusted, setIsResetTrusted] = useState(false);

  const closeResetTrusted = () => {
    setIsResetTrusted(false);
  };

  const newTrust = (value) => {
    console.log("hello");
    storeResetTrusted(value);
    closeResetTrusted();

    setTimeout(() => {
      Alert.alert(
        "Success!",
        "You have reset your trusted contact's phone number."
      );
    }, 700);
  };

  return (
    <ImageBackground source={bg} style={commonStyles.backgroundImageContainer}>
      <ResetPasscode
        isVisible={isRestTrusted}
        close={closeResetTrusted}
        newTrusted={newTrust}
        trusted={true}
        resetTrusted={true}
      />
      <View style={styles.screen}>
        <Card>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Your Trusted Contacts</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Text style={styles.text}>Contact 1: {number}</Text>
            <TouchableOpacity
              onPress={() => {
                setIsResetTrusted(true);
              }}
            >
              <Text style={{ color: "red", paddingLeft: "3%" }}> Edit</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Text style={styles.text}>Contact 2: 07728396100</Text>
            <TouchableOpacity>
              <Text style={{ color: "red", paddingLeft: "3%" }}> Edit</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Text style={styles.text}>Contact 3: 07726951607</Text>
            <TouchableOpacity>
              <Text style={{ color: "red", paddingLeft: "3%" }}> Edit</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.textsub}>
            Please note that trusted contacts will be alerted via SMS when
            nominated for this application.
          </Text>
        </Card>
      </View>
    </ImageBackground>
  );
};

TrustedContactsScreen.navigationOptions = {
  title: "Trusted Contacts",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: HEIGHT > 650 ? 10 : 0,
    marginTop: HEIGHT > 650 ? -600 : -450,
  },
  btnContainer: {
    flexDirection: "row",
    width: "38%",
    paddingVertical: 15,
    marginVertical: 10,
  },
  text: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 18,
    padding: 40,
    textAlign: "left",
  },
  textsub: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 11,
    padding: 16,
    textAlign: "right",
    fontStyle: "italic",
  },
  textSupportDetails: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 16,
    padding: 15,
    textAlign: "left",
  },
  label: {
    marginTop: 15,
    fontSize: 24,
    textAlign: "center",
    color: "white",
  },
  buttonSize: {
    width: "30%",
    marginHorizontal: 220,
  },
  btnText: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 16,
    textAlign: "center",
  },
});

export default TrustedContactsScreen;
