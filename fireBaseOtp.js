import { View, Text, TextInput, Button, Alert, LogBox } from "react-native";
import React, { useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
LogBox.ignoreAllLogs();
const App = () => {
  const [phonenumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [data, setData] = useState("");
  console.log(data);
  const onSend = async () => {
    const number = "+91" + phonenumber;
    const res = await auth().verifyPhoneNumber(number);
    // setData(res);
    Alert.alert("otp send");
    console.log(res);
  };
  const onSubmit = async () => {};
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TextInput
        keyboardType="number-pad"
        style={{
          borderRadius: 10,
          borderWidth: 1,
          width: "90%",
          marginVertical: 10,
        }}
        placeholder="phone number"
        value={phonenumber}
        onChangeText={(txt) => setPhoneNumber(txt)}
      />
      <Button title="send code" onPress={onSend} />
      <TextInput
        style={{
          borderRadius: 10,
          borderWidth: 1,
          width: "90%",
          marginVertical: 10,
        }}
        placeholder="otp"
        onChangeText={(txt) => setOtp(txt)}
        value={otp}
      />
      <Button title="submit" onPress={onSubmit} />
    </View>
  );
};

export default App;
