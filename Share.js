// import React from 'react';
// import {Share, View, Button} from 'react-native';

// const ShareExample = () => {
//   const onShare = async () => {
//     try {
//       const result = await Share.share({
//         message:
//           'React Native | A framework for building native apps using React',
//       });
//       if (result.action === Share.sharedAction) {
//         if (result.activityType) {
//           // shared with activity type of result.activityType
//         } else {
//           // shared
//         }
//       } else if (result.action === Share.dismissedAction) {
//         // dismissed
//       }
//     } catch (error) {
//       alert(error.message);
//     }
//   };
//   return (
//     <View style={{marginTop: 50}}>
//       <Button onPress={onShare} title="Share" />
//     </View>
//   );
// };

// export default ShareExample;

import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import Share from "react-native-share";

const url = "https://awesome.contents.com/";
const title = "Awesome Contents";
const message = "Please check this out.";

const options = {
  title,
  url,
  message,
};
const App = () => {
  const [img, setImg] = useState(
    "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-674010.jpg&fm=jpg"
  );
  const share = async (customOptions = options) => {
    try {
      await Share.open(customOptions);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View>
      <Text>Open up App.js to start working on your app!</Text>

      <Image
        source={{
          uri: img,
        }}
        style={{ height: 200, width: 200 }}
      />

      <View style={{ marginVertical: 5 }}>
        <Button
          onPress={async () => {
            await share({
              title: "Sharing image file from awesome share app",
              message: "Please take a look at this image",
              url: img,
            });
          }}
          title="Share Image"
        />
      </View>
    </View>
  );
};

export default App;
