import {useDispatch, useStore} from "react-redux";
import {routeFetched} from "../store/actions/route";
import React from "react";
import MapViewDirections from "react-native-maps-directions";

const GOOGLE_MAPS_API_KEY = 'AIzaSyBxJb8oxSFCCqPAofx1uAWxJ72-bFkHwvQ';

/**
 * This component is embedded to Map component, and should shown up in MapScreen (this code logic is in MapScreen too).
 * It gets the origin and destination from redux, retrieve direction from Google and draw a line directly on the map.
 * Once the result is fetched, raw route information, represented by waypoint[] will be stored in Redux.
 *
 * @author liz
 */

const MapViewDirection = (props) => {
  const dispatch = useDispatch();
  const store = useStore();

  const routeFetchedHandler = (result) => {
    //console.log(routeFetched(result));
    dispatch(routeFetched(result));
  };

  const origin = {latitude: store.getState().router.origin.coords.latitude, longitude: store.getState().router.origin.coords.longitude};
  const destination = {latitude: store.getState().router.destination.latitude, longitude: store.getState().router.destination.longitude};
  
  return (
    <MapViewDirections
      origin= {origin}
      destination={destination}
      apikey={GOOGLE_MAPS_API_KEY}
      strokeWidth={3}
      strokeColor="hotpink"

      mode={"WALKING"}

      onReady={ result => {
        console.log("route fetched from google successfully");
        routeFetchedHandler(result);
      }}
    />);
};

export default MapViewDirection;
