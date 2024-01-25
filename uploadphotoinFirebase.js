import { View, Text, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { launchImageLibrary } from "react-native-image-picker";
import storage from "@react-native-firebase/storage";

const App = () => {
  const [img, setImg] = useState("");

  const pickImage = async () => {
    const result = await launchImageLibrary();
    if (result?.assets[0]?.uri) {
      setImg(result.assets[0].uri);
    }
  };
  const upload = async () => {
    const reference = storage().ref("hello devloper");
    const filePath = img;
    await reference.putFile(filePath);
    const url = await storage().ref("hello devloper").getDownloadURL();
    console.log(url);
  };

  return (
    <View>
      <Button
        title="choose"
        onPress={() => {
          pickImage();
        }}
      />
      <Button
        title="baba"
        onPress={() => {
          upload();
        }}
      />
    </View>
  );
};

export default App;
