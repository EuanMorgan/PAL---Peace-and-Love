import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  ScrollView,
} from "react-native";

import bg from "../../assets/bg.jpg";
import { commonStyles } from "../../constants/commonStyles";

const { width: WIDTH } = Dimensions.get("window");
import Card from "../../components/Card";
const TrustedHelp = (props) => {
  return (
    // Purely text
    <ImageBackground source={bg} style={commonStyles.backgroundImageContainer}>
      <View style={styles.screen}>
        <ScrollView>
          <Card>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Trusted contacts</Text>
            </View>
            <Text style={styles.text}>
              1. Your trusted contacts are contacts you set when setting up your
              account.
            </Text>

            <Text style={styles.text}>
              2. If you wish to edit a trusted contact, click the edit button
              next to the contact you wish to edit.
            </Text>

            <Text style={styles.text}>
              3. Fill in the required fields and click the 'Update' button.
            </Text>

            <Text style={styles.text}>
              4. Enter your passcode to confirm the changes.
            </Text>

            <Text style={styles.textB}>
              Please see the user manual for further information regarding
              contact information confidentiality.
            </Text>
          </Card>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

TrustedHelp.navigationOptions = {
  title: "Help - Trusted Contacts",
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

export default TrustedHelp;
