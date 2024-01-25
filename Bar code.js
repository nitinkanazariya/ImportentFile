import React from "react";
import { Text, View, Dimensions } from "react-native";
import Barcode from "@kichiyaki/react-native-barcode-generator";

const App = () => {
  return (
    <View
      style={{ flex: 1, backgroundColor: "white", justifyContent: "center" }}
    >
      <Barcode
        format="CODE128"
        value="nitin " //code value
        text="0123456789012134178"
        style={{}}
        maxWidth={Dimensions.get("window").width / 2}
      />
    </View>
  );
};

export default App;
