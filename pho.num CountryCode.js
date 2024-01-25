// import { View, Text } from "react-native";
// import React, { useState } from "react";
// import PhoneInput from "react-native-phone-number-input";

// const App = () => {
//   const [number, setNumber] = useState("");
//   const [code, setCode] = useState("");
//   console.log(number);

//   return (
//     <View style={{ flex: 1, backgroundColor: "white" }}>
//       <PhoneInput
//         containerStyle={{
//           alignItems: "center",

//           flexDirection: "row",
//         }}
//         flagButtonStyle={{ backgroundColor: "white" }}
//         textInputStyle={{ height: 45 }}
//         value={number}
//         onChangeText={(txt) => setNumber(txt)}
//         onChangeCountry={(t) => setCode(t)}
//       />
//       <Text>{code.callingCode}</Text>
//     </View>
//   );
// };

// export default App;

import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CountryPicker from "rn-country-picker";

const App = () => {
  const [countryCode, setCountryCode] = useState("91");

  const selectedValue = (value) => {
    setCountryCode(value);
  };
  console.log(countryCode);

  return (
    <View>
      <CountryPicker
        animationType={"slide"}
        language="en"
        selectedCountryTextStyle={styles.selectedCountryTextStyle}
        countryNameTextStyle={styles.countryNameTextStyle}
        searchBarPlaceHolder={"Search here......"}
        countryFlagStyle={{ height: 20, width: 25 }}
        hideCountryCode={false}
        searchBarStyle={styles.searchBarStyle}
        countryCode={"91"}
        selectedValue={selectedValue}
      />
    </View>
  );
};
export default App;

const styles = StyleSheet.create({
  titleText: {
    color: "black",
    fontSize: 25,
    marginBottom: 25,
    fontWeight: "bold",
  },
  pickerTitleStyle: {
    justifyContent: "center",
    flexDirection: "row",
    alignSelf: "center",
    fontWeight: "bold",
  },

  selectedCountryTextStyle: {
    paddingLeft: 5,
    color: "black",
    textAlign: "right",
    fontWeight: "bold",
  },

  countryNameTextStyle: {
    paddingLeft: 20,
    color: "#000",
    fontSize: 16,
    textAlign: "right",
    fontWeight: "700",
  },
});
