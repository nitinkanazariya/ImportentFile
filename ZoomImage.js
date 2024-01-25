// import { View, Image } from "react-native";
// import React from "react";
// import Pinchable from "react-native-pinchable";

// const App = () => {
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Pinchable minimumZoomScale={1} maximumZoomScale={10}>
//         <Image
//           source={{
//             uri: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png",
//           }}
//           style={{ height: 400, width: 400 }}
//         />
//       </Pinchable>
//     </View>
//   );
// };

// export default App;

import { StyleSheet, View, Text, Image } from "react-native";
import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";

const App = () => {
  return (
    <View style={styles.container}>
      <ReactNativeZoomableView maxZoom={10} minZoom={1}>
        <Image
          style={{ width: "100%", height: "100%", resizeMode: "contain" }}
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png",
          }}
        />
      </ReactNativeZoomableView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
