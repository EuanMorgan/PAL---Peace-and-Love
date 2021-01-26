Explanation of folders/files

Assets folder
Contains the splash screen and icon which are displayed as the app loads in expo and the background

App.js
The main file, it is basically a wrapper around all the other screens and is constantly running
Therefore its where we invoke the app navigator and begin checking the battery % and other things

app.json
This defines some key settings about the app, for example the icon and description

components folder
This is where we store components that may be reused in any screen, or just to store them in their
own file to make the code cleaner such as the camera component used only in the police countdown screen

constants folder
This is where we store common styles and common colours, no real code is written here

helper
This folder contains some helpers/wrappers for the database and async storage

navigation folder
This contains the app navigator which defines a navigation stack for all pages
and also the navigation drawer

screens folder
Each screen has its own unique file in this folder, the various help screens are stored in the
help subfolder

store
This contains some required files for the backend

Remaining files are mostly configs

============================================================================================================

The following is a list of all external packages used in the app

react-native-keyboard-aware-scroll-view
react-native-datepicker
expo-battery
expo-media-library
expo-av
expo-camera
expo-sensors
lodash
react-native-confirmation-code-field
react-native-picker-select
react-native-gesture-handler
react-native-reanimated
react-native-screens
react-native-safe-area-context
@react-native-community/masked-view
expo-location
react-native-maps
react-native-maps-directions
expo-permissions
react-native-communications
react-native-vector-icons
expo-sqlite
react-native-countdown-component
react-navigation
react-navigation-stack
@react-native-community/async-storage
react-navigation-drawer
react-navigation-header-buttons
geographiclib
googlemaps
react-native-get-location
react-native-google-places-autocomplete
react-native-vector-icons
reactotron-react-native
reacto
react-native-firebase
react-native-webview
react-native-google-places-autocomplete
