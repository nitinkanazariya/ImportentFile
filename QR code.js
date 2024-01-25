import React, { useState } from "react";
import { View, TextInput, Button, TouchableOpacity } from "react-native";
import QRCode from "react-native-qrcode-svg";

const QRCodeGenerator = () => {
  const [text, setText] = useState("");
  const [show, setShow] = useState(false);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {!show ? (
        <View>
          <TextInput
            style={{
              height: 40,
              width: 300,
              borderColor: "gray",
              borderWidth: 1,
              marginBottom: 20,
              paddingHorizontal: 10,
            }}
            placeholder="Enter text to generate QR code"
            onChangeText={(inputText) => setText(inputText)}
            value={text}
          />

          <Button title="Generate QR Code" onPress={() => setShow(true)} />
        </View>
      ) : (
        <TouchableOpacity
          style={{ marginBottom: 20 }}
          onPress={() => setShow(false)}
        >
          <QRCode
            value={text}
            size={250}
            logoBorderRadius={100}
            logoSize={50}
            logoMargin={10}
            logoBackgroundColor="white"
            logo={require("../FirstApp/src/assets/out.png")}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default QRCodeGenerator;
