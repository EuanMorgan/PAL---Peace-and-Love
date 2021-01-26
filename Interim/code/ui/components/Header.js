import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Colours from "../constants/colours";

/*Main function of the component, currently it returns
the title which is passed to it as an argument and 
contains the styling rules specified in the 
stylesheet*/
const Header = props => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 90,
    paddingTop: 36,
    backgroundColor: Colours.primary,
    alignItems: "center",
    justifyContent: "center"
  },
  headerTitle: {
    color: "black",
    fontSize: 18
  }
});

//Exports the Rendered component
export default Header;
