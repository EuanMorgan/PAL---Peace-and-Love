import React, { useState } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";

import Header from "./components/Header";
import LoginScreen from "./screens/LoginScreen";
import CreateAccountScreen from "./screens/CreateAccountScreen";
import NavScreen from "./screens/NavScreen";
import MenuScreen from "./screens/MenuScreen";
import SetDestinationScreen from "./screens/SetDestinationScreen";

export default function App() {
  let head = <Header title="PAL - Peace and Love" />;

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [create, setCreate] = useState(false); //If the create account screen shows

  const [enterDest, setEnterDest] = useState(false); //If enter dest shows

  const [destScreen, setDestScreen] = useState(false); //If map screen shows

  const [enteredDest, setEnteredDest] = useState(""); //Stores the destination

  const [username, setUsername] = useState("");

  const loginHandler = name => {
    setUsername(name);
    setIsLoggedIn(true);
  };

  const createHandler = () => {
    setCreate(true);
  };

  const cancelHandler = () => {
    setEnterDest(false);
  };

  const createdHandler = () => {
    setCreate(false);
    Alert.alert("Success!", "Account created successfully", [
      {
        text: "OK",
        style: "destructive"
      }
    ]);
  };

  const beginEnterDest = () => {
    setEnterDest(true);
  };

  const addDestinationHandler = destination => {
    setEnterDest(false);
    setDestScreen(true);
    setEnteredDest(destination);
  };

  const backMap = () => {
    setDestScreen(false);
    setEnteredDest("");
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
  };

  let content = (
    <LoginScreen onLogin={loginHandler} onCreateAccount={createHandler} />
  );

  const removeHeader = () => {
    setIsMapFullscreen(!isMapFullscreen);
  };

  const [isMapFullscreen, setIsMapFullscreen] = useState(false);

  if (isLoggedIn) {
    content = (
      <MenuScreen
        onBeginEnterDest={beginEnterDest}
        onLogout={logoutHandler}
        name={username}
      />
    );
  } else if (create) {
    content = (
      <CreateAccountScreen
        onCancel={cancelHandler}
        onCreated={createdHandler}
      />
    );
  }
  if (isLoggedIn && enterDest) {
    content = (
      <SetDestinationScreen
        onAddDestination={addDestinationHandler}
        onCancel={cancelHandler}
      />
    );
  }

  if (isLoggedIn && destScreen) {
    content = (
      <NavScreen
        destination={enteredDest}
        mapBack={backMap}
        onRemoveHeader={removeHeader}
      />
    );
    if (isMapFullscreen) {
      head = [];
    } else {
      head = <Header title="PAL - Peace and Love" />;
    }
  }

  return (
    <View style={styles.screen}>
      {head}
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
