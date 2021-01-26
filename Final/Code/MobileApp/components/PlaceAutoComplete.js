import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import React from "react";
import { useDispatch, useStore } from "react-redux";
import { originAndDestinationGot } from "../store/actions/route";
import * as Location from "expo-location";
import Colors from "react-native/Libraries/NewAppScreen/components/Colors";

/**
 * This component will show up on the top of the HeatMapScreen.
 * It allows the user to enter their destination, and try to autocomplete the places.
 * Once a location is selected, it will dispatch an action to store the origin an destination detail in the redux,
 * and navigate the App to MapScreen.
 *
 * For implementation, it wraps up a google-place-auto-complete open-source component.
 *
 * @author liz
 * **/

const placesAutocomplete = (props) => {
  const dispatch = useDispatch();
  const store = useStore();

  const getLocation = async () => {
    let location = await Location.getCurrentPositionAsync({});

    console.log("Current location got in PlaceAutoComplete");
    return location;
  };

  const onDestinationGot = async (destination) => {
    let location = await getLocation();

    dispatch(
      originAndDestinationGot(location, {
        address: destination.name,
        latitude: destination.geometry.location.lat,
        longitude: destination.geometry.location.lng,
      })
    );
    setTimeout(() => {
      props.navigation.navigate({
        routeName: "Map",
        params: {
          //Although the destination info is stored in Redux already, it is passed to Map screen to avoid refactoring the MapScreen at this phrase
          address: destination.name,
          latitude: destination.geometry.location.lat,
          longitude: destination.geometry.location.lng,
        },
      });
    }, 2000);
  };

  return (
    <GooglePlacesAutocomplete
      placeholder="Enter destination to start journey"
      minLength={3} // minimum length of text to search
      autoFocus={false}
      returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
      keyboardAppearance={"light"} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
      listViewDisplayed="auto" // true/false/undefined
      fetchDetails={true} //TODO is it necessary?
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        onDestinationGot(details);
      }}
      getDefaultValue={() => ""}
      query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: "AIzaSyBxJb8oxSFCCqPAofx1uAWxJ72-bFkHwvQ",
        language: "en", // languages of the results
      }}
      styles={{
        container: {
          overflow: "visible",
          height: 50,
          flexGrow: 0,
          flexShrink: 0,
        },
        textInputContainer: {
          borderTopWidth: 0,
          borderBottomWidth: 0,
          height: 50,
          overflow: "visible",
          backgroundColor: Colors.white,
          borderColor: Colors.white,
          borderRadius: 100,
        },
        textInput: {
          backgroundColor: "transparent",
          fontSize: 15,
          lineHeight: 22.5,
          paddingBottom: 0,
          flex: 1,
        },
        listView: {
          position: "absolute",
          top: 60,
          left: 10,
          right: 10,
          backgroundColor: "white",
          borderRadius: 5,
          flex: 1,
          elevation: 3,
        },
        description: {
          color: "#1faadb",
        },
        predefinedPlacesDescription: {
          color: "#1faadb",
        },
      }}
      currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
      nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
      debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
    />
  );
};

export default placesAutocomplete;
