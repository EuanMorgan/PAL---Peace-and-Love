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
import Colour from "../constants/colours";
import Card from "../components/Card";
const { width: WIDTH } = Dimensions.get("window");

const ReportAProblemScreen = (props) => {
  // Purely text screen
  return (
    <ImageBackground source={bg} style={commonStyles.backgroundImageContainer}>
      <View style={styles.screen}>
        <Card>
          <Text style={styles.text}>
            To report an issue with our application, please use the contact
            details provided below {"\n"}
          </Text>

          <Text style={styles.textSupportDetails}>
            Email: PALsupport@cardiff.ac.uk
          </Text>

          <Text style={styles.textSupportDetails}>Landline: 01633 012912</Text>
          <Text style={styles.info}>
            {"\n"}
            {"\n"}Landline opening time: Monday to Friday: 9:00 - 17:00 {"\n"}
            Saturday and Sunday: Closed
          </Text>
        </Card>
      </View>
    </ImageBackground>
  );
};

ReportAProblemScreen.navigationOptions = {
  title: "Report A Problem",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    paddingTop: 40,
  },
  btnContainer: {
    flexDirection: "row",
    width: "38%",
    paddingVertical: 15,
    marginVertical: 10,
  },
  text: {
    color: "white",
    fontSize: 18,
    padding: 16,
    textAlign: "center",
  },
  textSupportDetails: {
    color: "white",
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
  info: {
    color: "white",
    fontSize: 11,
    padding: 16,
    textAlign: "right",
    fontStyle: "italic",
  },
});

export default ReportAProblemScreen;
