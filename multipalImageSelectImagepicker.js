import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { launchImageLibrary } from "react-native-image-picker";

const App = () => {
  var imgArray = [];
  const [filePath, setFilePath] = useState([]);
  const [filePathArray, setFilePathArray] = useState([]);
  const chooseFile = (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      selectionLimit: 5,
    };
    launchImageLibrary(options, (response) => {
      if (response?.assets) {
        response?.assets?.forEach(function (item, index) {
          console.log(item);
          if (item[index] != null) {
            imgArray.push(item[0].uri);
            setFilePathArray((filePathArray) => [...filePathArray, imgArray]);
          }
        });
        setFilePath(response?.assets[0]);
      }
    });
  };
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
      onPress={() => chooseFile("photo")}
    >
      <Text>Choose Image</Text>
    </TouchableOpacity>
  );
};

export default App;
