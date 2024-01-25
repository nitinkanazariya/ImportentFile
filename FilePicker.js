import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import DocumentPicker from "react-native-document-picker";

const App = () => {
  const [pickedDocument, setPickedDocument] = useState(null);
  console.log(pickedDocument);
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      setPickedDocument(result);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("User cancelled the picker");
      } else {
        console.log("Error occurred while picking the document:", err);
      }
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity onPress={pickDocument}>
        <Text>Select Document</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;
