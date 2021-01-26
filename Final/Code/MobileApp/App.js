import React, { useState } from "react";
import AppNavigator from "./navigation/AppNavigator";
import * as Battery from "expo-battery";
import { Alert } from "react-native";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { Provider } from "react-redux";

import ReduxThunk from "redux-thunk";

import authReducer from "./store/reducers/auth";
import routeReducer from "./store/reducers/route";
import { init } from "./helper/db";

if (__DEV__) {
  import("./ReactotronConfig").then(() => console.log("Reactotron Configured"));
}

const rootReducer = combineReducers({
  auth: authReducer,
  router: routeReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

init()
  .then(() => {
    console.log("Database Initialized");
  })
  .catch((err) => {
    console.log("Initializing db failed");
    console.log(err);
  });

let batteryAlertSent = false;
let reloads = 0;
let b; //battery level temporary variable
export default function App() {
  const [batLevel, setBatLevel] = useState();
  console.disableYellowBox = true; //Disable warnings from appearing on expo on the phone

  const getBat = async () => {
    //retrieve current battery level
    b = await Battery.getBatteryLevelAsync();
    setBatLevel(b);
  };

  //begin listening for changes in the battery level
  Battery.addBatteryLevelListener(({ batteryLevel }) => {
    //Every time the battery changes, check if it's lower than 25%
    b = batteryLevel.batteryLevel;
    setBatLevel({ b });
    evaluateBat();
  });

  const evaluateBat = () => {
    //alert if lower than 25%
    if (
      (batLevel == null && b * 100 <= 25) ||
      (batLevel * 100 <= 25 && batteryAlertSent == false)
    ) {
      Alert.alert(
        "Battery Low",
        "Your battery is low, be aware that your phone may die before reaching your destination!"
      );
      batteryAlertSent = true;
    }
  };

  if (reloads == 0) {
    //Check battery on first load and begin listenig for changes in battery %
    getBat();
    setTimeout(() => {
      evaluateBat();
    }, 1500);
    reloads++;
  }

  //return the app navigator, this contains:

  //The stack navigator  - this begins on the login screen and we pop/push screens on to and off of the stack to navigate
  //The drawer navigator - resides within the stack navigator and is used for the main menu
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
