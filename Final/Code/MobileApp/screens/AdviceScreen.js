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
// Nothing to be commented about this screen, purely text
const AdviceScreen = (props) => {
  return (
    <ImageBackground source={bg} style={commonStyles.backgroundImageContainer}>
      <View style={styles.screen}>
        <ScrollView>
          <Card>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Advice</Text>
            </View>

            <Text style={styles.text}>
              Our app uses local crime data in order to recommend the routes we
              believe are the safest for our uses to take to reach their
              destination. As well as this, we have several features in place
              such as the “Deadman’s Switch” in order to help reinforce that our
              users are safe. However, as much as we would like to ensure your
              safety - we cannot guarantee that you will be. We have decided it
              is appropriate to provide you with further information and
              resources to increase your safety:
            </Text>

            <Text style={styles.text}>
              1.{" "}
              <Text style={styles.underline}>
                Inform someone of your whereabouts prior to leaving.
              </Text>
              {`\u000a`}
              <Text>
                {`\u000a`}- Ensure that a couple of trusted friends or family
                members are aware of your plans for the night before you leave.
                Try to give them specifics, like clubs/restaurants you plan to
                visit, and the name(s) of the person(s) you’re going with.
              </Text>
            </Text>

            <Text style={styles.text}>
              2.{" "}
              <Text style={styles.underline}>
                Check in with someone frequently.
              </Text>
              {`\u000a`}
              <Text>
                {`\u000a`}- While outside, try to check in with a trusted
                contact frequently. This could be via hourly texts, or texts
                every time you change venues. Try to keep them in the loop
                regarding when you plan to return home and how.
              </Text>
            </Text>

            <Text style={styles.text}>
              3.{" "}
              <Text style={styles.underline}>
                Safety in numbers: avoid walking alone.
              </Text>
              {`\u000a`}
              <Text>
                {`\u000a`}- Try not to go out alone; things are much safer, and
                more fun, with a buddy. If you began the night with a group of
                friends, try to stay with the group as far as possible. If you
                get separated or find yourself in a situation where you have to
                walk/take a cab alone, call someone and keep talking to them
                till you reach your destination.
              </Text>
            </Text>

            <Text style={styles.text}>
              4.{" "}
              <Text style={styles.underline}>
                Carry a personal safety alarm
              </Text>
              {`\u000a`}
              <Text>
                {`\u000a`}- Invest in a personal safety alarm. They’re
                inexpensive and make a loud noise; often, the threat of being
                caught is enough to scare away potential threats.
              </Text>
            </Text>

            <Text style={styles.text}>
              5.{" "}
              <Text style={styles.underline}>
                If possible, carry pepper spray.
              </Text>
              {`\u000a`}
              <Text>
                {`\u000a`}- Should push come to shove, it’s handy to have pepper
                spray. However, ensure it works before trusting it on a night
                out. Practice using it and remember: spray, move to the side,
                run.
              </Text>
            </Text>

            <Text style={styles.text}>
              6.{" "}
              <Text style={styles.underline}>
                Be alert and trust your instincts.
              </Text>
              {`\u000a`}
              <Text>
                {`\u000a`}- The tips above are inarguably handy; nevertheless,
                it is absolutely crucial that you trust your instincts.
                Nighttime is not the time to be lavishing people with the
                benefit of the doubt. Dismiss your inhibitions regarding
                paranoia: if you feel like something is suspect, act
                accordingly. Ask questions later.
              </Text>
            </Text>

            <Text style={styles.text}>Useful resources: </Text>
            <Text
              style={[styles.text, { color: "blue" }]}
              onPress={() =>
                Linking.openURL(
                  "https://www.met.police.uk/cp/crime-prevention/violence/stay-safe/"
                )
              }
            >
              https://www.met.police.uk/cp/crime-prevention/violence/stay-safe/
            </Text>
            <Text
              style={[styles.text, { color: "blue" }]}
              onPress={() =>
                Linking.openURL("https://www.wikihow.com/Stay-Safe-at-Night")
              }
            >
              https://www.wikihow.com/Stay-Safe-at-Night
            </Text>
          </Card>
        </ScrollView>
      </View>
    </ImageBackground>
  );
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
  underline: {
    textDecorationLine: "underline",
  },
});

export default AdviceScreen;
