export const ROUTE_FETCHED = 'ROUTE_FETCHED';
export const ORIGIN_DESTINATION_GOT ='ORIGIN_DESTINATION_GOT';
export const PAUSE_TRACKING = 'PAUSE_TRACKING';
export const RESUME_TRACKING = 'RESUME_TRACKING';

export const routeFetched = (route) => {
  return {type: ROUTE_FETCHED, route: route};
};

export const originAndDestinationGot = (origin, destination) => {
  return {type: ORIGIN_DESTINATION_GOT, origin: origin, destination:destination};
};

export const pauseTracking = () => {
  return {type:PAUSE_TRACKING};
};

export const resumeTracking = () => {
  return {type:RESUME_TRACKING};
};
