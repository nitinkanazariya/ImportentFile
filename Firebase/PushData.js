import { View, Text } from "react-native";
import React from "react";

const PushData = () => {
  const newData = {
    name: "John Doe",
    age: 25,
    email: "john.doe@example.com",
  };

  database.ref("users").push(newData);

  return (
    <View>
      <Text>PushData</Text>
    </View>
  );
};

export default PushData;
