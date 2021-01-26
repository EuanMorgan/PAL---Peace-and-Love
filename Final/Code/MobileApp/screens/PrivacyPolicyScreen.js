import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";

import bg from "../assets/bg.jpg";
import { commonStyles } from "../constants/commonStyles";
import Card from "../components/Card";
const { width: WIDTH } = Dimensions.get("window");

const PrivacyPolicyScreen = (props) => {
  // Purely text screen
  return (
    <ImageBackground source={bg} style={commonStyles.backgroundImageContainer}>
      <View style={styles.screen}>
        <ScrollView>
          <Card>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>PRIVACY POLICY</Text>
            </View>

            <Text style={styles.section}>What data do we collect? </Text>

            <Text style={styles.text}>
              The following data is stored to our server:
              {`\u000a`}
              {"\t"}1. Account details (email, username, name, phone number,
              address)
              {`\u000a`}
            </Text>
            <Text style={styles.text}>
              The following data is stored to your device locally and not our
              server
              {`\u000a`}
              {"\t"}1. Your application passcode
              {`\u000a`}
              {"\t"}2. footage captured when you’re in trouble (while using the
              app)
              {`\u000a`}
              {"\t"}3. Trusted contacts
            </Text>
            <Text style={styles.text}>
              Your location data is processed but never stored
            </Text>

            <Text style={styles.section}>How do we collect your data?</Text>

            <Text style={styles.text}>
              You directly provide us with most of the data we collect. We
              collect and process data when you:
              {`\u000a`}
              {"\t"}1. Sign-up to use our app’s services.
              {`\u000a`}
              {"\t"}2. Input information about your trusted contacts.
              {`\u000a`}
              {"\t"}3. Agree to let the app use your location data and camera
              footage when the accelerometer is activated.
            </Text>

            <Text style={styles.section}>How will we use your data?</Text>

            <Text style={styles.text}>
              We collect your data so that we can:
              {`\u000a`}
              {"\t"}1. Manage your account.
              {`\u000a`}
              {"\t"}2. Allow use of the navigation functionality
              {`\u000a`}
              {"\t"}3. Record video and alert trusted contacts when the app
              detects you may be in trouble
            </Text>

            <Text style={styles.section}>How do we store your data?</Text>

            <Text style={styles.text}>
              Name, address, phone number, and email are stored securely in
              Google Firebase.
            </Text>

            <Text style={styles.section}>The App and cookies</Text>

            <Text style={styles.text}>
              We don’t use cookies for any purposes.
            </Text>

            <Text style={styles.section}>The App and marketing</Text>

            <Text style={styles.text}>
              The App and marketing We will not be contacting you for any
              marketing purposes
            </Text>

            <Text style={styles.section}>Changes to our privacy policy</Text>

            <Text style={styles.text}>
              We keep our privacy policy under regular review and places any
              updates on this page. This policy was last updated on 06th May
              2020.
            </Text>

            <Text style={styles.section}>How to contact us</Text>

            <Text style={styles.text}>
              If you have any questions about our privacy policy, the data we
              hold on you, or you would like to exercise one of your data
              protection rights, please do not hesitate to contact us at:
              {`\u000a`}
              Email: PALsupport@cardiff.ac.uk
              {`\u000a`}
              Call: 01633012912
              {`\u000a`}
              Post: Group 7, Cardiff University, Cardiff, CF24 3AA
            </Text>
          </Card>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

PrivacyPolicyScreen.navigationOptions = {
  title: "Privacy Policy",
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
    padding: 4,
    textAlign: "left",
  },
  textB: {
    color: "rgba(255,255,255,0.9)",
    fontWeight: "bold",
    fontSize: 16,
    padding: 15,
    textAlign: "left",
  },
  textI: {
    color: "rgba(255,255,255,0.9)",
    fontStyle: "italic",
    fontSize: 16,
    padding: 15,
    textAlign: "left",
  },
  label: {
    marginTop: 15,
    fontSize: 24,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  section: {
    marginTop: 15,
    fontSize: 20,
    padding: 16,
    textAlign: "left",
    color: "white",
    fontWeight: "bold",
  },
  buttonSize: {
    width: "100%",
    marginHorizontal: 20,
  },
  underline: {
    textDecorationLine: "underline",
  },
});

export default PrivacyPolicyScreen;
