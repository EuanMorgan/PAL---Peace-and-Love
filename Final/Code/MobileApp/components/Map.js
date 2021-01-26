import React, { Component } from "react";
import {
  Alert,
  StyleSheet,
  ToastAndroid,
  View,
  AsyncStorage,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { connect } from "react-redux";
import { clearRoute, resetClearRoute } from "./../screens/MapScreen.js";

const destination_copy = { latitude: 0, longitude: 0 };
const origin = { latitude: 0, longitude: 0 };
var stop_rendering_everything = false;

//Every time destination changes, we want to call & update our route finding algorithm
var GeographicLib = require("geographiclib");
let geographicUtil = GeographicLib.Geodesic.WGS84;
let ll = { latitude: 0, longitude: 0 };
let coordss = [[ll], [ll], [ll]];
let currently_active = -1;
let render_route = [false, false, false]; //used for drawing the routes
let i = 0;

const abortController = new AbortController();

// mapStyle is the style rules for the dark theme
let mapStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#242f3e",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#746855",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#242f3e",
      },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#d59563",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#d59563",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#263c3f",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#6b9a76",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#38414e",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#212a37",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9ca5b3",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#746855",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#1f2835",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#f3d19c",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [
      {
        color: "#2f3948",
      },
    ],
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#d59563",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#17263c",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#515c6d",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#17263c",
      },
    ],
  },
];
//end mapStyle

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: null,
      error: "",
      follow: true,
      key: 0,
      update: false,
      dark: null,
      //{latitude:51.483591,longitude:-3.1694},{latitude:51.489,longitude:-3.18}
      statusBarContainer: 1,
      loading: false,
    };
  }
  _getLocationAsync = async () => {
    // watchPositionAsync Return Lat & Long on Position Change
    this.location = await Location.watchPositionAsync(
      {
        enableHighAccuracy: true,
        distanceInterval: 1, //receives update only when move >1 meter
        timeInterval: 10000, //wait 10 seconds between each update
      },
      (newLocation) => {
        let { coords } = newLocation;

        let region = {
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.045,
          longitudeDelta: 0.045,
        };
        if (origin.latitude === 0) {
          //if origin is null
          origin.latitude = region.latitude;
          origin.longitude = region.longitude;
        }
        this.setState({ region: region });
        if (this.state.follow) {
          this.map.animateCamera({ center: this.state.region, zoom: 18 });
        }

        if (this.deviationDetection(region.latitude, region.longitude)) {
          //TODO the toast is for debug only, jump to password screen if ok.
          ToastAndroid.show(
            "You are deviated from the path!",
            ToastAndroid.SHORT
          );
        }
      },
      (error) => console.log(error)
    );
    return this.location;
  };

  /**
   * Judge whether the current position is deviated from the route.
   *
   * @param latitude latitude of current position
   * @param longitude longitude of current position
   */
  deviationDetection(latitude, longitude) {
    let route = null;

    if (currently_active != -1) {
      route = coordss[currently_active]; //this.props.route;
    } else {
      return false;
    }

    let deviation = true;

    if (route == null || route == []) {
      return false;
    }

    let size = route.length;

    for (let i = 0; i < size - 1; i++) {
      let startPoint = route[i];
      let endPoint = route[i + 1];
      /*Use Heron's formula now, but it is not precise.
      //see https://stackoverflow.com/questions/20231258/minimum-distance-between-a-point-and-a-line-in-latitude-longitude
      /and https://geographiclib.sourceforge.io/1.50/js/ */
      //TODO what is s12?
      let a = geographicUtil
        .Inverse(
          startPoint.latitude,
          startPoint.longitude,
          endPoint.latitude,
          endPoint.longitude
        )
        .s12.valueOf();
      let b = geographicUtil
        .Inverse(startPoint.latitude, startPoint.longitude, latitude, longitude)
        .s12.valueOf();
      let c = geographicUtil
        .Inverse(endPoint.latitude, endPoint.longitude, latitude, longitude)
        .s12.valueOf();
      let s = (a + b + c) / 2;
      let A = Math.sqrt(s * (s - a) * (s - b) * (s - c));
      let distance = A / a;
      // If current position is within 200m with any line segment, no alarm raised.
      if (distance < 200) {
        deviation = false;
        break;
      }
    }
    return deviation;
  }
  //new
  async getData(lat1, long1, lat2, long2) {
    console.log("get data");
    this.state.loading = true;
    //Fetch data and put in a json then update coordinates (state)
    url =
      "https://krapp-server.appspot.com/route?o_lat=" +
      lat1 +
      "&o_lon=" +
      long1 +
      "&d_lat=" +
      lat2 +
      "&d_lon=" +
      long2 +
      "&fbclid=IwAR3DTOjFLpzafw0ezkszTOrPm1ckGTG75h7IobywLVgh4gmMU8jd4zrIH0I";
    //If abortController is added to fix the memory leak, then Fetch won't finish executing => it won't show any routes
    //this._run = true;
    //let json = await fetch(url, {signal: abortController.signal}).then((response)=>response.json());
    //this._cancel = function () {abortController.abort();}//this._run = false;
    var json = await fetch(url).then((response) => response.json());
    console.log("get data 1");
    if (typeof json !== "undefined") {
      coordss[0] = json[0].vertices;
      coordss[1] = json[1].vertices;
      coordss[2] = json[2].vertices;
      this.convertCoords(coordss[0]);
      this.convertCoords(coordss[1]);
      this.convertCoords(coordss[2]);
      render_route = [true, true, true]; //update which routes to render
      console.log("get data 2");
      this.state.loading = false;
      //this.mem_fix_3 = setTimeout(function () {
      i = -1;
      Alert.alert(
        "Please choose a route",
        "Choose a route you would like to follow.",
        [
          {
            text: "Shortest",
            onPress: function killlong() {
              render_route = [true, false, false];
              currently_active = 0;
            },
          }, //console.log('shortest')
          {
            text: "Safe and short",
            onPress: function killextreme() {
              render_route = [false, false, true];
              currently_active = 2;
            },
          }, //, style: 'cancel' console.log('safe and short')
          {
            text: "Safest",
            onPress: function killunsafe() {
              render_route = [false, true, false];
              currently_active = 1;
            },
          },
        ],
        { cancelable: false }
      ); //end alert
    } //let user wait 5 seconds before forcing them to choose a path
    //}
    else {
      console.log("Fetching failed");
    }
  }

  //end
  async componentDidMount() {
    //let data = await this.getData()
    //console.log("component did mount")
    // Asking for device location permission

    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status === "granted") {
      this._getLocationAsync();
    } else {
      this.setState({ error: "Locations services needed" });

      Alert.alert(
        "Insufficient permissions!",
        "You need to grant location permissions to use this app.",
        [{ text: "Okay!" }]
      );
    }

    // Determine dark theme settings
    const d = await AsyncStorage.getItem("darkTheme");

    this.state.dark = d === "true" || d === null;
    //add components so they can be unmounted to prevent a memory leak
    this.mem_fix_1 = setTimeout(
      () => this.setState({ statusBarContainer: 10 }),
      500
    );
    if (this.props.customPadding !== 1) {
      this.mem_fix_2 = setTimeout(() => {
        this.map.animateCamera({ center: this.state.region, zoom: 18 }); //TODO: Possibly don't zoom in on map so user can see more of the heatmap?
      }, 500);
    }
    stop_rendering_everything = false;
  }

  async componentWillUnmount() {
    if (this.location) {
      this.location.remove();
    }
    clearInterval(this.mem_fix_2);
    clearInterval(this.mem_fix_2);
    clearInterval(this.mem_fix_3);
    //stop_rendering_everything = true;
    //this._cancel;//https://stackoverflow.com/questions/56120941/cancel-a-fetch-request-in-react-native
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // Used to rerender if the dark theme setting changes
    if (prevState.key !== null) {
      return { key: nextProps.key };
    }
  }
  convertCoords(c) {
    //convert lat to latitude
    try {
      if (typeof c !== "undefined" && c.length > 0 && c !== null) {
        //c_cpy = JSON.parse(JSON.stringify(c));
        for (i = 0; i < c.length; i++) {
          c[i]["latitude"] = c[i]["lat"];
          c[i]["longitude"] = c[i]["lon"];
        }
      } else {
        console.log("Coords undefined");
      }
    } catch {
      console.log("CATCH RANNNN!!");
      console.log(c);
    }
    return c;
  }
  render() {
    //TODO Change the logic to detect whether it is on heatmap screen or not too

    let isDestinationGot =
      this.props.origin != null && this.props.destination != null; //if this is true, then props.destination exists => we want to check if it's been updated
    let render_new_lines = false;
    if (isDestinationGot === true) {
      if (
        destination_copy.latitude == this.props.destination.latitude &&
        destination_copy.longitude == this.props.destination.longitude
      ) {
        render_new_lines = false;
      } else {
        render_new_lines = true;
        destination_copy.latitude = this.props.destination.latitude;
        destination_copy.longitude = this.props.destination.longitude;
      }
    }
    if (render_new_lines) {
      //render_new_lines
      console.log("please display me once");
      console.log("origin lat: " + this.props.origin.coords.latitude);
      console.log("origin lon: " + this.props.origin.coords.longitude);
      console.log("end: " + this.props.destination.latitude);

      try {
        this.getData(
          this.props.origin.coords.latitude,
          this.props.origin.coords.longitude,
          this.props.destination.latitude,
          this.props.destination.longitude
        );
      } catch {
        console.log(
          "EXCEPTION GETTING DATA (maybe FROM SERVER or translating it)!!!!!"
        );
      }
    }

    if (clearRoute) {
      //clear route and turn off deviation detector
      currently_active = -1;
      coordss[0] = [{ latitude: 0, longitude: 0 }];
      coordss[1] = [{ latitude: 0, longitude: 0 }];
      coordss[2] = [{ latitude: 0, longitude: 0 }];
      resetClearRoute();
    }
    //sanity checks. compiler complains if there are no coordinates.
    /*
	if(typeof coordss[0] === "undefined" || coordss[0].length == 0){
		coordss[0] = [{latitude:0,longitude:0}];
	}
	if(typeof coordss[1] === "undefined" || coordss[1].length == 0){
		coordss[1] = [{latitude:0,longitude:0}];
	}
	if(typeof coordss[2] === "undefined" || coordss[2].length == 0){
		coordss[2] = [{latitude:0,longitude:0}];
	}
    */
    return (
      <View
        style={[
          styles.container,
          {
            paddingBottom: this.props.customPadding === 0 ? 0 : "6%",
            // paddingTop: this.state.statusBarContainer,
          }, //Used to shift map up allowing space for deadman's switch
        ]}
      >
        <MapView
          // custom style, if dark setting on show dark theme else show default
          customMapStyle={this.state.dark ? mapStyle : []}
          initialRegion={this.state.region}
          showsCompass={true}
          showsUserLocation={true}
          rotateEnabled={true}
          toolbarEnabled={false}
          // on drag stop follow the user for 8 seconds
          onPanDrag={() => {
            this.setState({ follow: false });
            setTimeout(() => {
              this.setState({ follow: true });
            }, 8000);
          }}
          ref={(map) => {
            this.map = map;
          }}
          style={{ flex: 1 }}
          provider={MapView.PROVIDER_GOOGLE}
          showsMyLocationButton={true}
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          {render_route[0] ? (
            <MapView.Polyline
              coordinates={coordss[0]}
              strokeColor="red"
              strokeWidth={3}
            />
          ) : null}
          {render_route[1] ? (
            <MapView.Polyline
              coordinates={coordss[1]}
              strokeColor="green"
              strokeWidth={3}
            />
          ) : null}
          {render_route[2] ? (
            <MapView.Polyline
              coordinates={coordss[2]}
              strokeColor="blue"
              strokeWidth={3}
            />
          ) : null}
        </MapView>
        {/* If loading boolean true begin the loading spinner GIF */}
        {this.state.loading ? (
          <View
            style={{
              position: "absolute",
              flex: 1,
              padding: 20,
            }}
          >
            <ActivityIndicator size="large" color="#ff0000" />
          </View>
        ) : null}
      </View>
    );
  }
}

//Currently no state is used in this component
const mapStateToProps = (state) => {
  let origin = state.router.origin;
  let destination = state.router.destination;
  let route = state.router.route;

  return { origin, destination, route };
};

export default connect(mapStateToProps)(Map);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
