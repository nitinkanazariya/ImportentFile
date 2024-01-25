import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  LogBox,
  StatusBar,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Video from "react-native-video";
import Slider from "@react-native-community/slider";
import orientation from "react-native-orientation-locker";
LogBox.ignoreAllLogs();
const App = () => {
  const ref = useRef();
  const [Progress, setProgress] = useState(null);
  const [click, setClick] = useState(false);
  const [mute, setMute] = useState(false);
  const [play, setPlay] = useState(false);
  const [fullscreen, setFullScreen] = useState(false);

  const time = (sec) => {
    let minitus = parseInt(sec / 60)
      .toString()
      .padStart(2, "0");
    let second = (Math.trunc(sec) % 60).toString().padStart(2, "0");
    return `${minitus}:${second}`;
  };
  const fullScreenView = () => {
    if (fullscreen) {
      orientation.lockToPortrait();
    } else {
      orientation.lockToLandscape();
    }
  };
  useEffect(() => {
    show();
  }, [click]);

  const show = () => {
    if (click == true) {
      setTimeout(() => {
        setClick(!click);
      }, 8000);
    }
  };
  const onplay = () => {
    if (Progress?.currentTime == Progress?.seekableDuration) {
      setPlay(!play);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: "black",
          height: fullscreen ? "100%" : 210,
          width: "100%",
        }}
      >
        <StatusBar backgroundColor={"black"} barStyle={"light-content"} />
        <TouchableOpacity
          onPress={() => {
            setClick(true);
          }}
          style={{
            height: fullscreen ? "100%" : 210,
            width: "100%",
            backgroundColor: "black",
          }}
        >
          <Video
            resizeMode={"contain"}
            repeat={true}
            paused={play}
            ref={ref}
            onProgress={(res) => setProgress(res)}
            muted={mute}
            source={{
              uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            }}
            style={{
              position: "absolute",
              width: "100%",
              height: fullscreen ? "100%" : 210,
            }}
          />
          {click == true && (
            <TouchableOpacity
              onPress={() => setClick(false)}
              style={{
                height: fullscreen ? "100%" : 210,
                width: "100%",
                position: "absolute",
                backgroundColor: "rgba(0,0,0,0.6)",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => ref.current.seek(Progress?.currentTime - 10)}
                >
                  <Image
                    source={require("./src/assets/back10sec.png")}
                    style={{
                      tintColor: "white",
                      height: 25,
                      width: 25,
                      resizeMode: "contain",
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ marginHorizontal: 50 }}
                  onPress={() => {
                    setPlay(!play);
                  }}
                >
                  {play ? (
                    <Image
                      source={require("./src/assets/pause.png")}
                      style={{
                        tintColor: "white",
                        height: 25,
                        width: 25,
                        resizeMode: "contain",
                      }}
                    />
                  ) : (
                    <Image
                      source={require("./src/assets/resume.png")}
                      style={{
                        tintColor: "white",
                        height: 25,
                        width: 25,
                        resizeMode: "contain",
                      }}
                    />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => ref.current.seek(Progress?.currentTime + 10)}
                >
                  <Image
                    source={require("./src/assets/skip10sec.png")}
                    style={{
                      tintColor: "white",
                      height: 25,
                      width: 25,
                      resizeMode: "contain",
                    }}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setFullScreen(!fullscreen);
                  fullScreenView();
                }}
                style={{ position: "absolute", top: 10, right: 10 }}
              >
                {fullscreen ? (
                  <Image
                    source={require("./src/assets/fullscreen.png")}
                    style={{
                      tintColor: "white",
                      height: 20,
                      width: 20,
                      resizeMode: "contain",
                    }}
                  />
                ) : (
                  <Image
                    source={require("./src/assets/fullscreen.png")}
                    style={{
                      tintColor: "white",
                      height: 15,
                      width: 15,
                      resizeMode: "contain",
                    }}
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={{ position: "absolute", top: 10, left: 10 }}
              >
                <Image
                  source={require("./src/assets/back.png")}
                  style={{
                    tintColor: "white",
                    height: 20,
                    width: 20,
                    resizeMode: "contain",
                  }}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setMute(!mute);
                }}
                style={{ position: "absolute", bottom: 7, right: 7 }}
              >
                {mute ? (
                  <Image
                    source={require("./src/assets/mute.png")}
                    style={{
                      tintColor: "white",
                      height: 25,
                      width: 25,
                      resizeMode: "contain",
                    }}
                  />
                ) : (
                  <Image
                    source={require("./src/assets/unmute.png")}
                    style={{
                      tintColor: "white",
                      height: 25,
                      width: 25,
                      resizeMode: "contain",
                    }}
                  />
                )}
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  bottom: 10,
                  position: "absolute",
                  justifyContent: "flex-start",
                  width: fullscreen ? "85%" : "75%",
                  alignSelf: "flex-start",
                  marginLeft: fullscreen ? 10 : 0,
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 12, fontWeight: "700" }}
                >
                  {Progress == null ? "--:--" : time(Progress?.currentTime)}
                </Text>
                <Slider
                  style={{
                    width: "100%",
                    height: 10,
                  }}
                  minimumValue={0}
                  maximumValue={Progress?.seekableDuration}
                  onValueChange={(res) => ref.current.seek(res)}
                  minimumTrackTintColor="#FFFFFF"
                  maximumTrackTintColor="white"
                  value={Progress?.currentTime}
                />
                <Text
                  style={{ color: "white", fontSize: 12, fontWeight: "700" }}
                >
                  {Progress == null
                    ? "--:--"
                    : time(Progress?.seekableDuration)}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default App;
const styles = StyleSheet.create({
  backgroundVideo: {},
});
