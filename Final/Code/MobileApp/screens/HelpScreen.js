import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import bg from "../assets/bg.jpg";
import { commonStyles } from "../constants/commonStyles";

import { Ionicons } from "@expo/vector-icons";
const { width: WIDTH } = Dimensions.get("window");

const HelpScreen = (props) => {
  return (
    <ImageBackground source={bg} style={commonStyles.backgroundImageContainer}>
      <ScrollView>
        <View style={styles.screen}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>
              Please select the area you wish to receive help with
            </Text>
          </View>

          <Ionicons.Button
            name="md-walk"
            backgroundColor="transparent"
            style={[commonStyles.menuBtn, styles.buttonSize]}
            iconStyle={{ color: "black", paddingLeft: 10 }}
            size={30}
            borderRadius={0}
            underlayColor="transparent"
            activeOpacity={0.5}
            onPress={() => {
              props.navigation.navigate("HelpMapp");
            }}
          >
            <Text style={styles.text}>Start a Journey</Text>
          </Ionicons.Button>

          <Ionicons.Button
            name="md-contacts"
            backgroundColor="transparent"
            style={[commonStyles.menuBtn, styles.buttonSize]}
            iconStyle={{ color: "black" }}
            size={30}
            borderRadius={0}
            underlayColor="transparent"
            activeOpacity={0.5}
            onPress={() => {
              props.navigation.navigate("TrustedHelpp");
            }}
          >
            <Text style={styles.text}>Trusted Contacts</Text>
          </Ionicons.Button>

          <Ionicons.Button
            name="md-contact"
            backgroundColor="transparent"
            style={[commonStyles.menuBtn, styles.buttonSize]}
            iconStyle={{ color: "black" }}
            size={30}
            borderRadius={0}
            underlayColor="transparent"
            activeOpacity={0.5}
            onPress={() => {
              props.navigation.navigate("AccountHelpp");
            }}
          >
            <Text style={styles.text}>My Account</Text>
          </Ionicons.Button>

          <Ionicons.Button
            name="md-settings"
            backgroundColor="transparent"
            style={[commonStyles.menuBtn, styles.buttonSize]}
            iconStyle={{ color: "black" }}
            size={30}
            borderRadius={0}
            underlayColor="transparent"
            activeOpacity={0.5}
            onPress={() => {
              props.navigation.navigate("SettingsHelpp");
            }}
          >
            <Text style={styles.text}>Settings</Text>
          </Ionicons.Button>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    paddingVertical: "10%",
  },
  btnContainer: {
    flexDirection: "row",
    width: "38%",
    paddingVertical: 15,
    marginVertical: 10,
  },
  text: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 20,
    textAlign: "center",
  },
  label: {
    marginTop: 15,
    fontSize: 24,
    textAlign: "center",
    color: "white",
  },
  buttonSize: {
    width: "100%",
    marginBottom: 20,
  },
});

export default HelpScreen;
