import { StyleSheet, Dimensions } from "react-native";
import Colour from "./colours";
const { width: WIDTH } = Dimensions.get("window");
export const commonStyles = StyleSheet.create(
  //Add commonly used styles here
  {
    text: {
      color: "red"
    },
    backgroundImageContainer: {
      flex: 1,
      width: null,
      height: null,
      alignItems: "center",
      justifyContent: "center"
    },
    input: {
      width: WIDTH - 55,
      height: 45,
      borderRadius: 25,
      fontSize: 16,
      paddingLeft: 45,
      backgroundColor: "rgba(0,0,0,0.35)",
      color: "rgba(255,255,255,0.7)",
      marginHorizontal: 25
    },
    inputIcon: {
      position: "absolute",
      top: 8,
      left: 37
    },
    inputContainer: {
      marginTop: 10
    },
    btnEye: {
      position: "absolute",
      top: 8,
      right: 37
    },
    btn: {
      width: WIDTH - 55,
      height: 45,
      borderRadius: 25,
      backgroundColor: Colour.accent,
      justifyContent: "center",
      marginTop: 20
    }
  }
);
