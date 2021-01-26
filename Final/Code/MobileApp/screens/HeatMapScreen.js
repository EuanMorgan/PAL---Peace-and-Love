import React, { useState, useEffect } from "react";
import { Dimensions, StyleSheet, View, AsyncStorage } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import Map from "../components/Map";
import PlaceAutoComplete from "../components/PlaceAutoComplete";
import firebase from "firebase";
import "firebase/auth";
import { getProvidesAudioData } from "expo/build/AR";

const { width: WIDTH } = Dimensions.get("window");
const { height: HEIGHT } = Dimensions.get("window");

let name;
let email;
let phone;
let address;
let username;


const loadData = () => {
  let user = firebase.auth().currentUser;
  let uidServ;
  name = "Johnny(?)";
  console.log("hello");
  if (user != null) {
    console.log("Trying to fetch user's name")
    uidServ = user.uid;
    firebase.database().ref('/user-data/' + uidServ).once('value').then(function (snapshot) {
      let valueDB = snapshot.val();
      name = valueDB.Name;
      email = user.email;
      phone = valueDB.PhoneNo;
      address = valueDB.Address;
      username = valueDB.Username;
    });
  } else {
    name = "Craig(?)";
  }
};

const HeatMapScreen = (props) => {
  const [key, setKey] = useState(0);

  const check = async () => {
    let b = await AsyncStorage.getItem("darkTheme");
    setKey(b); //Key is used to force a refresh of the map if the dark theme setting changes
  };

  useEffect(() => {
    //Set a listener for when this page comes back into focus, (i.e. switch from settings back to here)
    //Get a new value of dark theme each time and pass it to map
    props.navigation.addListener("didFocus", () => {
      check();
    });
  }
  );

  return (
    <View style={styles.screen}>
      <View flex={1}>
        <View style={{ position: "relative", height: 50 }}>
          <PlaceAutoComplete navigation={props.navigation} />
        </View>
        <View style={{ flex: 1, zIndex: -1 }}>
          <Map customPadding={0} key={key} />
        </View>
      </View>
    </View>
  );
};

//Sets the header title and menu button
HeatMapScreen.navigationOptions = (navigationData) => {
  return {
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            loadData();
            navigationData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  screen: {
    flex: 1,
    width: WIDTH,
    height: HEIGHT,
  },
  btnDeadman: {
    height: 45,
    width: "100%",

    backgroundColor: "blue",
    justifyContent: "center",
    flex: 1,
  },
  btnText: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 16,
    textAlign: "center",
  },
});

export default HeatMapScreen;

export { name, email, phone, address, username };