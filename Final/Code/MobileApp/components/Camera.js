import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Button,
  AsyncStorage,
  Alert,
  Platform,
} from "react-native";

import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { Video } from "expo-av";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
let reloads = 0;
let reloads2 = 0;
let reloads3 = 0;
export default class Cam extends React.Component {
  state = {
    hasCameraPermission: null,
    hasRollPermission: null,
    type: Camera.Constants.Type.back,
    video: null,
    isRecording: false,
  };

  async componentDidMount() {
    // Ask for & verify permissions

    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    const audio_status = await Permissions.askAsync(
      Permissions.AUDIO_RECORDING
    );
    const roll_status = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    console.log(status);
    console.log(audio_status.status);
    console.log(roll_status.status);
    if (
      status !== "granted" ||
      audio_status.status !== "granted" ||
      roll_status.status !== "granted"
    ) {
      Alert.alert(
        "Insufficient Permissions",
        "Please allow Camera, Audio and Camera Roll permissions to use automatic recording"
      );
    }
    this.setState({ hasCameraPermission: status === "granted" });
    this.setState({ hasRollPermission: roll_status.status === "granted" });
  }

  componentDidUpdate() {
    // Page reloads indicate that we should start or stop recording
    if (this.props.rec == true && reloads == 0) {
      reloads++;

      this.snap();
    }

    if (this.props.rec == false && reloads2 == 0 && reloads > 0) {
      reloads2++;
      this.snap();
    }
  }

  snap = async () => {
    // If not recording, start
    // If recording stop and set the video as a class state
    if (this.camera) {
      if (this.state.isRecording) {
        this.camera.stopRecording();
        this.setState({ isRecording: false });
      } else {
        this.setState({ isRecording: true });
        let video = await this.camera.recordAsync();
        this.setState({ video });
      }
    }
  };

  reset = () => {
    this.resetVideoToNull();
    reloads = 0;
    reloads2 = 0;
    reloads3 = 0;
    this.props.endVid();
  };

  resetVideoToNull = () => {
    this.setState({ video: null });
  };

  render() {
    // If we have permission render the camera, if not show error text
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else if (this.state.hasRollPermission === false) {
      return <Text>No access to camera roll</Text>;
    } else {
      if (this.state.video && reloads3 == 0) {
        reloads3++;
        // Store data
        const storeData = async () => {
          try {
            console.log("saving video");
            // Save to camera roll
            await MediaLibrary.saveToLibraryAsync(this.state.video.uri);

            this.reset();
          } catch (error) {
            // Error saving data
          }
        };
        storeData();
      }
      return (
        <View style={styles.container}>
          <Camera
            style={styles.container}
            type={this.state.type}
            ref={(ref) => {
              this.camera = ref;
            }}
          >
            {this.state.isRecording && (
              <Text style={styles.recording}>Recording!</Text>
            )}
            <View
              style={{
                flex: 1,
                backgroundColor: "transparent",
                flexDirection: "column",
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignSelf: "flex-end",
                  alignItems: "center",
                }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back,
                  });
                }}
              >
                <Text style={{ fontSize: 18, marginTop: 25, color: "white" }}>
                  {" "}
                  Flip{" "}
                </Text>
              </TouchableOpacity>

              {this.state.isRecording ? (
                <Button
                  style={styles.button}
                  title={"Stop Recording"}
                  onPress={() => this.snap()}
                />
              ) : (
                <Button
                  style={styles.button}
                  title={"Start Recording"}
                  onPress={() => this.snap()}
                />
              )}
            </View>
          </Camera>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  recording: {
    textAlign: "center",
    fontSize: 22,
    marginTop: 30,
    color: "red",
  },
  container: {
    // Adjust if android as camera becomes visible on screen
    width: Platform.OS === "android" ? 0.5 : 0,
    height: Platform.OS === "android" ? 0.5 : 0,
  },

  button: {
    alignSelf: "flex-end",
    alignItems: "center",
  },
});
