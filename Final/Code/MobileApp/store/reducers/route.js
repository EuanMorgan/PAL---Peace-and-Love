import {ORIGIN_DESTINATION_GOT, PAUSE_TRACKING, RESUME_TRACKING, ROUTE_FETCHED} from '../actions/route';

const initialState = {
  // bool - whether the route tracking is active or user pause it
  isMonitoring: false,
  // an array that stores all nodes' lat & lon.
  route: null,
  // the last time that the user deviated from the path -- the App will not warn deviation in few minutes
  lastDeviationTime: null,
  destination: null,
  origin: null
};

const routeReducer = (state = initialState, action ) =>{
  console.log("route reducer triggered");
  console.log("action type:",action.type);
  switch (action.type) {
    case ROUTE_FETCHED:
      console.log("route has been added into storage");
      return {...state, route: action.route};
    case ORIGIN_DESTINATION_GOT:
      console.log("origin and destination are added into storage");
      return {...state, destination: action.destination, origin: action.origin};
    case PAUSE_TRACKING:
      console.log("tracking paused");
      return {...state, isMonitoring: false};
    case RESUME_TRACKING:
      return  {...state, isMonitoring: true};
    default:
      return state;
  }
};

export default routeReducer;
