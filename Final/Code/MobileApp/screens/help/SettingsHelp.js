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

import bg from "../../assets/bg.jpg";
import { commonStyles } from "../../constants/commonStyles";
import Card from "../../components/Card";
const { width: WIDTH } = Dimensions.get("window");

const SettingsHelp = (props) => {
  return (
    // Purely text
    <ImageBackground source={bg} style={commonStyles.backgroundImageContainer}>
      <View style={styles.screen}>
        <ScrollView>
          <Card>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Settings</Text>
            </View>
            <Text style={styles.text}>
              1. Your settings are where you can customize your account
              preferances.
            </Text>

            <Text style={styles.text}>
              2. Slide the 'Police Contact Time' to edit the timer for the
              application to ring the police.
            </Text>

            <Text style={styles.text}>
              3. If you require a diffrent colour scheme, select your chosen
              preference from the 'Colour scheme' section.
            </Text>

            <Text style={styles.text}>
              4. If you wish to stop the application recording your activity
              whilst the Police Contact timer is active, turn this section off
            </Text>

            <Text style={styles.textB}>
              Please see the user manual for further information regarding the
              Police contact, Colour scheme's and Recording confidentiality.
            </Text>
          </Card>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

SettingsHelp.navigationOptions = {
  title: "Help - Settings",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
  },
  btnContainer: {
    flexDirection: "row",
    width: "38%",
    paddingVertical: 15,
    marginVertical: 10,
  },
  text: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 16,
    padding: 16,
    textAlign: "left",
  },
  textB: {
    color: "rgba(255,255,255,0.7)",
    fontWeight: "bold",
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
    width: "100%",
    marginHorizontal: 20,
  },
});

export default SettingsHelp;
