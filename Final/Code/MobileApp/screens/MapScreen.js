import React, { useEffect, useState } from "react";
import {
  AsyncStorage,
  Button,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
  Platform,
} from "react-native";
import { Accelerometer } from "expo-sensors";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import EnterPasscode from "../components/EnterPasscode";

import {
  pauseTracking,
  resumeTracking,
  routeFetched,
} from "../store/actions/route";

import Cam from "../components/Camera";
import Map from "../components/Map";
import { useDispatch, useStore } from "react-redux";
const { width: WIDTH } = Dimensions.get("window");
const { height: HEIGHT } = Dimensions.get("window");
let focusListener;
let i = 0;
export let clearRoute = false;
export let resetClearRoute = function () {
  clearRoute = false;
};
const MapScreen = (props) => {
  const [key, setKey] = useState(0); //used to force rerender of map
  const [isCountdown, setIsCountdown] = useState(false); //If the countdown modal is visible

  const [recOn, setRecOn] = useState(false); //Recording setting is on or off

  const cancelCountdown = () => {
    setIsCountdown(false);
    setIsRec(false);
  };

  const [isRec, setIsRec] = useState(false); //Is currently recording or not

  const [follow, setFollow] = useState(false);

  const store = useStore();
  const dispatch = useDispatch();

  const routeFetchedHandler = (route) => {
    dispatch(routeFetched(route));
  };

  //ACCELEROMETER
  const attackListener = (onShake) => {
    Accelerometer.setUpdateInterval(50);

    const onUpdate = ({ x, y, z }) => {
      //Calculate maginitude of the accleration (how quickly the velocity changes)

      const magnitude = Math.sqrt(x * x + y * y + z * z);
      const sensitivity = 1.8;
      if (magnitude >= sensitivity) {
        onShake(magnitude);
      }
    };

    Accelerometer.addListener(onUpdate);
  };

  //Acceleration magnitude > 4 causes countdown

  const accelerometer = attackListener((magnitude) => {
    if (magnitude > 4 && isCountdown == false) {
      retrieveData();
      setIsCountdown(true);
      setIsRec(true);
    }
  });
  //END OF ACCELEROMETER CODE

  const retrieveData = async () => {
    console.log("fetch settings");
    try {
      const value = await AsyncStorage.getItem("recordingSetting");
      if (value === null) {
        //Set item to default if first time loading
        console.log("hellp");
        await AsyncStorage.setItem("recordingSetting", "true");
        const value = await AsyncStorage.getItem("recordingSetting");
        setRecOn(true);
      } else {
        value == "true" ? setRecOn(true) : setRecOn(false);
      }

      console.log(recOn);
    } catch (error) {
      // Error retrieving data
    }
  };

  const [isTracking, setIsTracking] = useState(true);
  const onPauseButtonClickedHandler = () => {
    if (store.getState().router.isMonitoring) {
      //TODO logic changed see issue #24
      setIsTracking(false);
      dispatch(pauseTracking());
    } else {
      setIsTracking(true);
      console.log("resume tracking");
      dispatch(resumeTracking());
    }
  };

  //This function runs upon page load
  useEffect(() => {
    retrieveData();
    focusListener = props.navigation.addListener("didFocus", () => {
      check();
    });
  }, []);

  useEffect(() => {
    // Clean up listeners
    return () => {
      console.log("Cleaning up");
      focusListener.remove();

      clearRoute = true;

      Accelerometer.removeAllListeners();
    };
  }, []);

  const check = async () => {
    if (i !== 0) {
      let b = await AsyncStorage.getItem("darkTheme");
      setKey(b);
    }
    i++;
  };

  const content = (
    <View
      style={{ justifyContent: "center", alignItems: "center", width: "100%" }}
    >
      <View
        style={{
          position: "relative",
          flexDirection: "row",
          paddingHorizontal: 15,
          justifyContent: "space-between",
          width: "100%",
          backgroundColor: "rgba(0,0,0,0.2)",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            props.navigation.replace("HeatMap");
          }}
        >
          <Text style={styles.topBtnText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onPauseButtonClickedHandler}>
          <Text style={styles.topBtnText}>
            {isTracking ? "PAUSE" : "RESUME"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            clearRoute = true;
            props.navigation.replace("HeatMap");
          }}
        >
          <Text style={styles.topBtnText}>Cancel</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.2)",
          width: "100%",
        }}
      >
        <Text
          style={{
            fontSize: 14,
            textShadowColor: "black",
            textShadowOffset: { width: 2, height: 2 },
            textShadowRadius: 5,
            color: "white",
          }}
        >
          Estimated Time of Arrival ___
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
            textShadowColor: "black",
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 5,
            color: "white",
          }}
        >
          Estimated Crime Risk in 0.1 Mile Radius: ____
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.screen}>
      <EnterPasscode
        visible={isCountdown}
        title=" cancel call to police"
        correct={cancelCountdown}
        police={true}
        recording={recOn}
      />
      <Map
        routeFetchedHandler={routeFetchedHandler}
        follow={follow}
        latitude={props.navigation.state.params.latitude}
        longitude={props.navigation.state.params.longitude}
        customPadding={1}
        key={key}
      />
      <View
        style={{
          position: "absolute",
          flexDirection: "column",
          width: "100%",
        }}
      >
        {Platform.OS === "android" ? <View /> : content}
      </View>

      <View //Bottom View
        style={{
          position: "absolute",
          justifyContent: "center",
          alignItems: "center",
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.2)",
          width: "100%",
        }}
      >
        {/* Render UI differently if android */}
        {Platform.OS === "android" ? content : <View />}
        <TouchableOpacity
          style={styles.btnDeadman}
          onPressOut={() => {
            retrieveData();
            setIsRec(true);
            setIsCountdown(true);
          }}
        >
          <Text style={styles.btnText}>Deadman's Switch</Text>
        </TouchableOpacity>
      </View>
      {recOn ? (
        <Cam
          rec={isRec}
          endVid={() => {
            setIsRec(false);
          }}
          askPerm={recOn}
        />
      ) : (
        <View />
      )}
    </View>
  );
};

//Sets the header title
MapScreen.navigationOptions = (navigationData) => {
  const dst = navigationData.navigation.getParam("address");
  return {
    headerTitle: "Destination: " + dst,
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navigationData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
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

    backgroundColor: "#cf1515",
    justifyContent: "center",
    flex: 1,
  },
  btnText: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 16,
    textAlign: "center",
  },
  topBtnText: {
    padding: 10,
    fontSize: 18,
    color: "white",
    backgroundColor: "#306bc9",
  },
});

export default MapScreen;
