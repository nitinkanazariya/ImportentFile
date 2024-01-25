import {
  View,
  Text,
  TextInput,
  Alert,
  Linking,
  TouchableOpacity,
  PermissionsAndroid,
} from "react-native";
import RNFetchBlob from "rn-fetch-blob";
import React, { useState } from "react";

const LoginScreen = () => {
  const [link, setLink] = useState("");

  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "Cool Photo App Camera Permission",
          message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        DownloadVideo();
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const DownloadVideo = () => {
    const { config, fs } = RNFetchBlob;
    const videoDir = fs.dirs.DownloadDir;
    const date = new Date();
    config({
      fileCache: true,
      addAndroidDownloads: {
        notification: true,
        useDownloadManager: true,
        path:
          videoDir +
          "/Download_" +
          Math.floor(date.getDate() + date.getSeconds() / 2) +
          ".mp4",
        description: "Video download",
      },
    })
      .fetch("GET", link, {})
      .then((res) => {
        console.log("The file saved to ", res.path());
      });
  };
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TextInput
        placeholder="Enter Video URL"
        value={link}
        onChangeText={(text) => setLink(text)}
        style={{
          backgroundColor: "white",
          borderWidth: 1,
          borderRadius: 10,
          width: "80%",
          fontSize: 16,
          padding: 10,
          marginBottom: 20,
        }}
      />
      <TouchableOpacity
        onPress={() => {
          if (link !== "") {
            requestStoragePermission();
          } else {
            Alert.alert("Error", "Please enter a valid video URL.");
          }
        }}
        style={{
          backgroundColor: "blue",
          padding: 15,
          width: "50%",
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "white", textAlign: "center", fontSize: 18 }}>
          Download Video
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
