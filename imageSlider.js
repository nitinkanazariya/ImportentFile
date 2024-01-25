// import { View, Text } from "react-native";
// import React from "react";
// import { SliderBox } from "react-native-image-slider-box";
// import COLOR from "./Src/color/color";

// const App = () => {
//   const data = [
//     "https://source.unsplash.com/1024x768/?nature",
//     "https://source.unsplash.com/1024x768/?water",
//     "https://source.unsplash.com/1024x768/?girl",
//     "https://source.unsplash.com/1024x768/?tree",
//   ];
//   return (
//     <View style={{ flex: 1 }}>
//       <SliderBox
//         images={data}
//         sliderBoxHeight={300}
//         onCurrentImagePressed={(index) => console.log(index)}
//         dotColor={COLOR.gree}
//         inactiveDotColor={COLOR.gray}
//         dotStyle={{
//           width: 8,
//           height: 8,
//           borderRadius: 50,
//         }}
//       />
//     </View>
//   );
// };

// export default App;
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import COLOR from "../../color/color";
import { SliderBox } from "react-native-image-slider-box";
const Board = () => {
  const [itemimg, setItemImg] = useState(1);

  const HEIGHT = Dimensions.get("screen").height;
  const WIDTH = Dimensions.get("screen").width;
  const data = [
    { id: 1, name: "Screen", msgcount: 0 },
    { id: 2, name: "Hollyday", msgcount: 0 },
    { id: 3, name: "Meetings", msgcount: 2 },
    { id: 4, name: "Events", msgcount: 5 },
  ];

  const no1 = itemimg == 1;
  const no2 = itemimg == 2;
  const no3 = itemimg == 3;
  const no4 = itemimg == 4;
  const imgname = no1
    ? "Pc"
    : no2
    ? "Traveller"
    : no3
    ? "Meeting"
    : no4
    ? "Party"
    : "Pc";

  const image = [
    `https://source.unsplash.com/1024x768/?${imgname}`,
    `https://source.unsplash.com/1024x768/?${imgname}`,
    `https://source.unsplash.com/1024x768/?${imgname}`,
    `https://source.unsplash.com/1024x768/?${imgname}`,
    `https://source.unsplash.com/1024x768/?${imgname}`,
  ];
  const list = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => setItemImg(item.id)}
        style={{
          marginHorizontal: 2,
          backgroundColor: COLOR.lightgray,
          height: 80,
          width: WIDTH / 4.6,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10,
        }}
      >
        <Text style={{ fontSize: 17, fontWeight: "600" }}>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLOR.DeepSkyBlue,
      }}
    >
      <StatusBar hidden={false} barStyle={"light-content"} />

      <View
        style={{
          flex: 1,
          marginTop: 50,
          backgroundColor: COLOR.white,
          borderRadius: 20,
          paddingTop: 5,
          padding: 15,
        }}
      >
        <TouchableOpacity
          style={{ alignSelf: "center", marginTop: 15, alignItems: "center" }}
        >
          <Text style={{ color: COLOR.black, fontWeight: "700", fontSize: 25 }}>
            Today
          </Text>
          <Image
            source={require("../../assets/downarrow.png")}
            style={{ height: 25, width: 25 }}
          />
        </TouchableOpacity>
        <FlatList
          style={{ marginTop: 20 }}
          renderItem={list}
          data={data}
          horizontal
          bounces={false}
        />
        <View style={{ position: "absolute", left: 18, right: 18, top: "21%" }}>
          <SliderBox
            images={image}
            sliderBoxHeight={250}
            onCurrentImagePressed={(index) => console.log(index)}
            dotColor={COLOR.green}
            inactiveDotColor={COLOR.gray}
            autoplay
            circleLoop
            parentWidth={WIDTH - 40}
            autoplayInterval={4000}
            ImageComponentStyle={{
              borderRadius: 10,
              marginTop: 20,
            }}
            dotStyle={{
              width: 8,
              height: 8,
              borderRadius: 50,
              marginHorizontal: -10,
              alignItems: "center",
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default Board;
