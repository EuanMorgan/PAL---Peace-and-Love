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

const HelpMap = (props) => {
  return (
    // Purely text
    <ImageBackground source={bg} style={commonStyles.backgroundImageContainer}>
      <View style={styles.screen}>
        <ScrollView>
          <Card>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Your journey</Text>
            </View>
            <Text style={styles.text}>
              1. Upon clicking 'Start a route' enter in the first line of
              address, postcode and city (or town) of your destination
            </Text>

            <Text style={styles.text}>
              2. Click start to begin your journey.
            </Text>

            <Text style={styles.text}>
              3. Allow the application to access your location services,
              microphone and camera acces for automoatic recording and GPS
              monitoring
            </Text>

            <Text style={styles.text}>
              4. The journey should begin automatically using the information
              you provided in step 3
            </Text>

            <Text style={styles.text}>
              5. The 2 buttons at the top 'Pause' and 'Cancel' will halt or stop
              your journey respectively.
            </Text>

            <Text style={styles.text}>
              6. The 2 buttons above the Deadman's switch located at the bottom
              of the screen 'Locate me' and 'Show destiantion' will focus and
              zoom to the pointer on the map of each location respectively.
            </Text>

            <Text style={styles.text}>
              7. Hold the Deadmans switch button at the bottom of the screen if
              you feel in danger, once you release the Deadman's switch, the
              countdown timer will begin to contact the police
            </Text>

            <Text style={styles.textB}>
              Please see the user manual for further information regarding the
              Deadmans switch and Police contact functionality
            </Text>
          </Card>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

HelpMap.navigationOptions = {
  title: "Help - Map",
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

export default HelpMap;
