import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  LogBox,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  statusCodes,
  GoogleSignin,
} from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";

LogBox.ignoreAllLogs();
const App = () => {
  const [userdata, setUserData] = useState(null);

  useEffect(() => {
    GoogleSignin.configure({
      offlineAccess: true,
      webClientId:
        "557944749898-nkguk1jo15vp060brjd8ul8k9vl26g8e.apps.googleusercontent.com",
      scopes: ["email"],
    });
  });

  const _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      console.log("User Info --> ", userInfo);
      setUserData(userInfo);
    } catch (error) {
      console.log("Message", JSON.stringify(error));
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert("User Cancelled the Login Flow");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert("Signing In");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert("Play Services Not Available or Outdated");
      } else {
        Alert.alert(error.message);
      }
    }
    // await onGoogleLinkButtonPress();
  };
  signOut = async () => {
    try {
      await GoogleSignin.signOut();
      setUserData(null);
    } catch (error) {
      console.error(error);
    }
  };

  const onGoogleLinkButtonPress = async () => {
    // Get the user ID token
    const { idToken } = await GoogleSignin.signIn();
    console.log({ idToken });
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    console.log(googleCredential);
    // Link the user with the credential
    // const firebaseUserCredential = await auth().currentUser.linkWithCredential(googleCredential);
    // You can store in your app that the account was linked.
    return googleCredential;
  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <StatusBar backgroundColor={"black"} />
      {userdata == null ? (
        <TouchableOpacity
          onPress={() => _signIn()}
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "lightgray",
            padding: 10,
            borderRadius: 100,
            paddingHorizontal: 20,
            alignSelf: "center",
          }}
        >
          <Image
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/800px-Google_%22G%22_Logo.svg.png",
            }}
            style={{ height: 30, width: 30, marginRight: 10 }}
          />
          <Text style={{ fontSize: 18, color: "black", fontWeight: "700" }}>
            Sign in with google
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "lightgray",
            padding: 10,
            borderRadius: 100,
            paddingHorizontal: 20,
            alignSelf: "center",
          }}
        >
          <Image
            source={{
              uri: "https://icons-for-free.com/download-icon-logout-1324760598547500271_256.icns",
            }}
            style={{ height: 30, width: 30, marginRight: 10 }}
          />
          <Text style={{ fontSize: 18, color: "black", fontWeight: "700" }}>
            Sign Out
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default App;
