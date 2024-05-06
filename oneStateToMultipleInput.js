import React, { useState } from "react";
import { View, TextInput, Text, Alert } from "react-native";

const MultipleTextInput = () => {
  const [inputs, setInputs] = useState({
    textInput1: "",
    textInput2: "",
  });

  const handleInputChange = (inputName, text) => {
    setInputs({
      ...inputs,
      [inputName]: text,
    });
    if (inputs.textInput1.length == 10) {
      Alert.alert("10");
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TextInput
        placeholder="Enter text for TextInput 1"
        onChangeText={(text) => handleInputChange("textInput1", text)}
        value={inputs.textInput1}
      />
      <TextInput
        placeholder="Enter text for TextInput 2"
        onChangeText={(text) => handleInputChange("textInput2", text)}
        value={inputs.textInput2}
      />
      <Text>Text from TextInput 1: {inputs.textInput1}</Text>
      <Text>Text from TextInput 2: {inputs.textInput2}</Text>
    </View>
  );
};

export default MultipleTextInput;
