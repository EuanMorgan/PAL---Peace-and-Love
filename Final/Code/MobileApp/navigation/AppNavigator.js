import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import {
  createDrawerNavigator,
  DrawerNavigatorItems,
} from "react-navigation-drawer";
import LoginScreen from "../screens/LoginScreen";
import { Button, SafeAreaView, View, Dimensions, Platform } from "react-native";
import CreateAccountScreen from "../screens/CreateAccountScreen";
import MapScreen from "../screens/MapScreen";
import SettingsScreen from "../screens/SettingsScreen";
import MyAccountScreen from "../screens/MyAccountScreen";
import ReportAProblemScreen from "../screens/ReportAProblemScreen";
import HelpScreen from "../screens/HelpScreen";
import TrustedContactsScreen from "../screens/TrustedContactsScreen";
import TermsNConditionsScreen from "../screens/TermsNConditionsScreen";
import HelpMap from "../screens/help/HelpMap";
import TrustedHelp from "../screens/help/TrustedHelp";
import SettingsHelp from "../screens/help/SettingsHelp";
import PrivacyPolicyScreen from "../screens/PrivacyPolicyScreen";
import AccountHelp from "../screens/help/AccountHelp";
import HeatMapScreen from "../screens/HeatMapScreen";
import AdviceScreen from "../screens/AdviceScreen";
import Colours from "../constants/colours";
import AntIcon from "react-native-vector-icons/AntDesign";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import React from "react";
import firebase from "firebase";

//initialise the stack navigator, create references to each screen
//Left = reference name
//right = actual name of screen from import
const AppNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        //disable gestures on login to prevent opening/closing the menu with a swipe
        gestureEnabled: false,
      },
    },
    CreateAccount: CreateAccountScreen,
    Map: MapScreen,
    Report: ReportAProblemScreen,
    Help: HelpScreen,
    Trusted: TrustedContactsScreen,

    HelpMapp: HelpMap,
    TrustedHelpp: TrustedHelp,
    SettingsHelpp: SettingsHelp,

    AccountHelpp: AccountHelp,
    HeatMap: HeatMapScreen,
    Settings: SettingsScreen,
    Advice: AdviceScreen,
    Account: MyAccountScreen,
    Terms: TermsNConditionsScreen,
    Privacy: PrivacyPolicyScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colours.primary,
      },
      headerTintColor: "black",
    },
  }
);

//Create unique stack navigators for the screens accessible on the side drawer menu
const settingsNav = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  {
    navigationOptions: {
      drawerLabel: "Settings",
      drawerIcon: ({ Color }) => <MaterialIcon name="settings" size={25} />,
    },
  }
);

const accountNav = createStackNavigator(
  {
    Account: MyAccountScreen,
  },
  {
    navigationOptions: {
      drawerLabel: "My Account",
      drawerIcon: ({ Color }) => (
        <MaterialIcon name="account-circle" size={25} />
      ),
    },
  }
);

const reportNav = createStackNavigator(
  {
    Report: ReportAProblemScreen,
  },
  {
    navigationOptions: {
      drawerLabel: "Report A Problem",
      drawerIcon: ({ Color }) => <MaterialIcon name="report" size={25} />,
    },
  }
);

const trustedNav = createStackNavigator(
  {
    Trusted: TrustedContactsScreen,
  },
  {
    navigationOptions: {
      drawerLabel: "Trusted Contacts",
      drawerIcon: ({ Color }) => <AntIcon name="contacts" size={25} />,
    },
  }
);

const helpNav = createStackNavigator(
  {
    Help: HelpScreen,
  },
  {
    navigationOptions: {
      drawerLabel: "Help",
      drawerIcon: ({ Color }) => <MaterialIcon name="help" size={25} />,
    },
  }
);

const adviceNav = createStackNavigator(
  {
    Advice: AdviceScreen,
  },
  {
    navigationOptions: {
      drawerLabel: "Advice",
      drawerIcon: ({ Color }) => <AntIcon name="heart" size={25} />,
    },
  }
);

const termsNav = createStackNavigator(
  {
    Terms: TermsNConditionsScreen,
  },
  {
    navigationOptions: {
      drawerLabel: "T&C's",
      drawerIcon: ({ Color }) => <AntIcon name="filetext1" size={25} />,
    },
  }
);

const privNav = createStackNavigator(
  {
    Privacy: PrivacyPolicyScreen,
  },
  {
    navigationOptions: {
      drawerLabel: "Privacy Policy",
      drawerIcon: ({ Color }) => <AntIcon name="lock" size={25} />,
    },
  }
);

//defines the side drawer navigator
const MainNavigator = createDrawerNavigator(
  {
    Back: {
      screen: AppNavigator,
      navigationOptions: {
        drawerLockMode: "locked-closed",
        // lock the drawer in any item from the stack
      },
    },
    Trusted: trustedNav,
    Settings: settingsNav,
    Account: accountNav,

    Advice: adviceNav,
    Help: helpNav,
    Report: reportNav,
    Terms: termsNav,
    Privacy: privNav,
  },
  {
    //defines the logout button at the bottom of the drawer
    contentComponent: (props) => (
      <View style={{ flex: 1 }}>
        <SafeAreaView
          forceInset={{ top: "always", horizontal: "never" }}
          style={{ paddingTop: Platform.OS === "android" ? 25 : 0 }}
        >
          <DrawerNavigatorItems {...props} />
          <Button
            title="Logout"
            color={"red"}
            onPress={() => {
              firebase
                .auth()
                .signOut()
                .then(function () {
                  // Sign-out successful.
                  props.navigation.navigate("Login");
                })
                .catch(function (error) {
                  // An error happened.
                  Console.log("Unable to log user out");
                });
            }}
          />
        </SafeAreaView>
      </View>
    ),
    contentOptions: {
      activeTintColor: Colours.accent,
    },
    //change the drawer size on smaller phones
    drawerWidth: Dimensions.get("window").width < 414 ? "65%" : "50%",
    drawerBackgroundColor: "gainsboro",
  }
);

export default createAppContainer(MainNavigator);
