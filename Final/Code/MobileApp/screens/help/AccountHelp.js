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
import Card from "../../components/Card";
const { width: WIDTH } = Dimensions.get("window");

const AccountHelp = (props) => {
  return (
    <ImageBackground source={bg} style={commonStyles.backgroundImageContainer}>
      <View style={styles.screen}>
        <ScrollView>
          <Card>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>My account</Text>
            </View>
            <Text style={styles.text}>
              1. This section can be used to update the details associated with
              your account.
            </Text>

            <Text style={styles.text}>
              2. Enter the new details into the required fields.
            </Text>

            <Text style={styles.text}>
              3. Click update and enter your passcode to confirm the changes
              made to your account.
            </Text>

            <Text style={styles.textB}>
              Please see the privacy policy for further information regarding
              Account information confidentiality.
            </Text>
          </Card>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

AccountHelp.navigationOptions = {
  title: "Help - My Account",
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

export default AccountHelp;
