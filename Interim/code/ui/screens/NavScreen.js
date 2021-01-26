import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Button,
  Alert
} from "react-native";

import MapView from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

import { Ionicons } from "@expo/vector-icons";

const { width: WIDTH } = Dimensions.get("window");
const { height: HEIGHT } = Dimensions.get("window");
let destLng;
let destLat;
let destMarker;

let myApiKey = "AIzaSyBWmnb3cEebzTx1bOtxmUR1igP9kiKulrg";

const NavScreen = props => {
  const [mapSize, setMapSize] = useState({
    //Used when toggling map full screen
    width: 350,
    height: 300,
    zIndex: 0,
    ionicon: <Ionicons name="md-expand" size={28} style={styles.iconStyle} />
  });

  icon = mapSize.ionicon;

  const [userCoords, setUserCoords] = useState({
    //Used when setting user's current coords, default coordinates required in case of error
    latitude: 51.4821469,
    longitude: -3.1773887
  });

  const [loadedLocation, setLoadedLocation] = useState(false);

  const [destinationCoords, setDestinationCoords] = useState({
    //Used when setting destination coords, default coords again in case of error
    latitude: 51.4821469,
    longitude: -3.1773887
  });

  const [focusedLocation, setFocusedLocation] = useState({
    //Used when change currently visible section of map
    latitude: 51.4821469,
    longitude: -3.1773887,
    latitudeDelta: 0.0122,
    longitudeDelta:
      (Dimensions.get("window").width / Dimensions.get("window").height) *
      0.0122
  });
  let daddr = encodeURIComponent(
    //Concatenates entered destination
    `${props.destination[0]}, ${props.destination[1]}, ${props.destination[2]}`
  );
  const getSearchLocation = () => {
    //Queries google maps API, retrieves json data of address
    fetch(
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        daddr +
        "&key=" +
        myApiKey
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log(JSON.stringify(responseJson));
        setDestCoords(responseJson);
      });
  };

  setDestCoords = responseJson => {
    //Extracts long and lat from json response and sets destination coords/marker
    loc = responseJson.results[0].geometry.location;
    destLat = loc.lat;
    destLng = loc.lng;
    setDestinationCoords({ latitude: destLat, longitude: destLng });
    destMarker = (
      <MapView.Marker coordinate={{ latitude: destLat, longitude: destLng }} />
    );
  };

  getLocationHandler = () => {
    //Retrieves current user position
    navigator.geolocation.getCurrentPosition(
      pos => {
        setFocusedLocation({
          ...focusedLocation,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        });
        setUserCoords({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        });
      },
      err => {
        console.log(err);
        alert("Fetching position failed");
      }
    );
  };

  const locateDest = () => {
    //Focuses map on destination
    setFocusedLocation({ ...focusedLocation, ...destinationCoords });
  };

  if (!loadedLocation) {
    //Initialisation
    getLocationHandler();
    getSearchLocation();
    setLoadedLocation(true);
  }

  const [fullscreen, setFullscreen] = useState(false);

  const resizeHandler = () => {
    //Toggle fullscreen
    setFullscreen(!fullscreen);

    if (!fullscreen) {
      setMapSize({
        width: WIDTH,
        height: HEIGHT,
        zIndex: 100,
        ionicon: (
          <Ionicons
            name="md-contract"
            size={28}
            style={{ marginHorizontal: 10.5 }}
          />
        )
      });
    } else {
      setMapSize({
        width: 350,
        height: 300,
        zIndex: 0,
        ionicon: (
          <Ionicons name="md-expand" size={28} style={styles.iconStyle} />
        )
      });
    }

    props.onRemoveHeader();
  };

  let marker = <MapView.Marker coordinate={focusedLocation} />;

  return (
    <View style={styles.screen}>
      <View style={styles.btnContainer}>
        <Button style={styles.btn} title="Back" onPress={props.mapBack} />
        <Button style={styles.btn} title="Pause" />
        <Button style={styles.btn} title="Cancel" />
      </View>
      <View>
        <Text style={styles.text}>Destination: {props.destination[0]}</Text>
      </View>
      <View
        style={{
          borderColor: "black",
          borderWidth: 1,
          borderRadius: 6,
          zIndex: mapSize.zIndex
        }}
      >
        <MapView
          style={{
            width: mapSize.width,
            height: mapSize.height,
            zIndex: mapSize.zIndex + 1
          }}
          region={focusedLocation}
          initialRegion={focusedLocation}
        >
          <TouchableOpacity onPress={resizeHandler}>{icon}</TouchableOpacity>
          {marker}
          {destMarker}
          <MapViewDirections
            origin={userCoords}
            destination={destinationCoords}
            apikey={myApiKey}
            strokeWidth={3}
            strokeColor="hotpink"
          />
        </MapView>
      </View>
      <View>
        <Text style={{ marginLeft: 200, fontSize: 14 }}>
          Estimated Time of Arrival: __
        </Text>
        <Text style={styles.text}>Crime risk in 0.1 mile radius: ____</Text>
      </View>
      <View style={styles.btnContainer}>
        <Button
          style={styles.btn}
          title="Locate Me"
          onPress={getLocationHandler}
        />
        <Button
          style={styles.btn}
          title="Show Destination"
          onPress={locateDest}
        />
      </View>
      <View>
        <TouchableOpacity
          style={styles.btnDeadman}
          onPressOut={() => {
            Alert.alert("CALING POLICE", "CALLING POLICE IN 10 SECONDS", [
              { title: "Cancel", style: "warning" }
            ]);
          }}
        >
          <Text style={styles.btnText}>Deadman's Switch</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center"
  },
  btnContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginTop: 10
  },
  btn: {
    width: 100
  },
  text: {
    marginTop: 10,
    color: "black",
    fontWeight: "bold",
    fontSize: 20
  },
  btnDeadman: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    backgroundColor: "#cf1515",
    justifyContent: "center",
    marginTop: 20
  },
  btnText: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 16,
    textAlign: "center"
  },
  iconStyle: {
    marginHorizontal: 10
  }
});

export default NavScreen;
