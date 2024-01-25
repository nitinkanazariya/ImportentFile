import { View, Text, StyleSheet, ScrollView, StatusBar } from "react-native";
import React from "react";

const App = () => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar backgroundColor={"white"} barStyle={"light-content"} />
      <Text style={[style.Txt, { fontFamily: "Agbalumo-Regular" }]}>App</Text>
      <Text style={[style.Txt, { fontFamily: "Nosifer-Regular" }]}>App</Text>
      <Text style={[style.Txt, { fontFamily: "Pacifico-Regular" }]}>App k</Text>
      <Text style={[style.Txt, { fontFamily: "Gugi-Regular" }]}>Task me</Text>
      <Text style={[style.Txt, { fontFamily: "Sacramento-Regular" }]}>
        Task me
      </Text>
    </ScrollView>
  );
};

export default App;
const style = StyleSheet.create({
  Txt: {
    fontSize: 70,
    marginTop: 10,
    color: "black",
    textAlign: "center",
  },
});
////////////////////////////Important///////////////////
//step =1
//react-native.config.js fill create
// module.exports = {
//   project: {
//     ios: {},
//     android: {},
//   },
//   assets: ['./assets/fonts/'],
// };

// step=2 download google Font
//ex: gugi.ttf

//step=3
// npx react-native-asset

//step=4
// npx react-native run-android
