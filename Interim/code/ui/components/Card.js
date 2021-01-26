import React from "react";
import { View, StyleSheet } from "react-native";

//A stylistic component, can be seen on the title of the login page etc

const Card = props => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 20,
    borderRadius: 10
  }
});

export default Card;
