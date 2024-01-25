import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Image, StatusBar, StyleSheet, View } from "react-native";
import * as Animatable from "react-native-animatable";

const Home = () => {
  const textRef = useRef(null);
  const [text, setText] = useState("");
  const navigation = useNavigation();

  useLayoutEffect(() => {
    const letters = "Hello Devloper";

    for (let i = 0; i < letters.length; i++) {
      setTimeout(() => {
        setText((prevText) => prevText + letters[i]);
        if (i === letters.length - 1) {
          if (textRef.current) {
            textRef.current.slideInUp(100);
          }
        }
      }, i * 500);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("login");
    }, 20000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"white"} barStyle={"dark-content"} />

      <Animatable.Text
        ref={textRef}
        style={styles.text}
        animation="pulse"
        iterationCount={1}
        direction="alternate"
      >
        {text}
      </Animatable.Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    height: 170,
    width: 170,
    borderRadius: 90,
  },
  text: {
    fontSize: 25,
    fontWeight: "700",
    color: "black",
    marginTop: 10,
    textAlign: "center",
  },
});
