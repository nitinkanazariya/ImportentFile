// import {View, Text, LogBox} from 'react-native';
// import React, {useEffect} from 'react';
// import firestore from '@react-native-firebase/firestore';
// LogBox.ignoreAllLogs();
// const App = () => {
//   useEffect(() => {
//     getDataFireBase();
//   }, []);
//   const getDataFireBase = async () => {
//     const res = await firestore()
//       .collection('baba')
//       .doc('DEtTGcxLcjq7N5O0CYtF')
//       .get();
//     console.log(JSON.stringify(res.data()));
//   };
//   return (
//     <View>
//       <Text>App</Text>
//     </View>
//   );
// };

// export default App;
//////////////////////////////////////////////////  FireStore

// import {View, Text, LogBox} from 'react-native';
// import React, {useEffect} from 'react';
// import database from '@react-native-firebase/database';

// LogBox.ignoreAllLogs();
// const App = () => {
//   useEffect(() => {
//     getDataFireBase();
//   }, []);
//   const getDataFireBase = async () => {
//     const res = await database().ref('user').once('value');

//     console.log(res);
//   };
//   return (
//     <View>
//       <Text>App</Text>
//     </View>
//   );
// };

// export default App;
/////////////////////////////////////////////   realtime DataBase

import {
  View,
  Text,
  LogBox,
  TextInput,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import database from "@react-native-firebase/database";

LogBox.ignoreAllLogs();
const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);
  const [isupdate, setIsUpdate] = useState(false);
  const [index, setIndex] = useState();

  useEffect(() => {
    getDataFireBase();
  }, []);
  const getDataFireBase = async () => {
    const res = await database()
      .ref("user")
      .on("value", (tempData) => {
        setData(tempData?.val());
      });
  };
  const onhandaleAdd = async () => {
    try {
      const res = await database()
        .ref(`user/${data !== null ? data?.length : 1}`)
        .set({ email: email, password: password });
      setEmail("");
      setPassword("");
    } catch {}
  };
  const onhandleUpdate = async () => {
    const res = await database().ref(`user/${index}`).update({
      email: email,
      password: password,
    });
    setEmail(""), setPassword("");
    setIndex("");
    setIsUpdate(false);
  };

  const list = ({ item }) => {
    if (item !== null) {
      const onhandleDelete = async () => {
        try {
          const res = await database().ref(`user/${index}`).remove();
        } catch (error) {
          console.log(error);
        }
      };
      const createTwoButtonAlert = () =>
        Alert.alert("Alert Title", "My Alert Msg", [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => onhandleDelete() },
        ]);
      return (
        <View
          style={{
            backgroundColor: "lightgray",
            marginHorizontal: 10,
            borderRadius: 15,
            borderWidth: 1,
            borderColor: "black",
            padding: 10,
            marginTop: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              marginRight: 15,
              fontWeight: "bold",
              fontSize: 16,
              color: "black",
            }}
          >
            {data.length}
          </Text>
          <View
            style={{
              alignSelf: "flex-end",
              flex: 1,
              padding: 5,
              marginBottom: 10,
            }}
          >
            <Text style={{ color: "black", fontWeight: "500", fontSize: 15 }}>
              {item?.email}
            </Text>
            <Text style={{ color: "black", fontWeight: "500", fontSize: 15 }}>
              {item?.password}
            </Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                setIsUpdate(true);
                setEmail(item.email);
                setPassword(item.password);
                setIndex(index);
              }}
              style={{
                backgroundColor: "green",
                padding: 5,
                paddingHorizontal: 10,
                borderRadius: 10,
              }}
            >
              <Text
                style={{ fontSize: 15, color: "white", textAlign: "center" }}
              >
                Edit
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                createTwoButtonAlert();
                setIndex(index);
                console.log(index, item);
              }}
              style={{
                backgroundColor: "red",
                padding: 5,
                paddingHorizontal: 10,
                borderRadius: 10,
                marginTop: 10,
              }}
            >
              <Text style={{ fontSize: 15, color: "white" }}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <StatusBar backgroundColor={"white"} />
      <Text
        style={{
          textAlign: "center",
          fontSize: 20,
          color: "black",
          fontWeight: "700",
        }}
      >
        Todo List
      </Text>
      <TextInput
        style={{
          borderRadius: 10,
          borderWidth: 2,
          marginHorizontal: 20,
          marginTop: 10,
        }}
        placeholder="Enter Email"
        value={email}
        onChangeText={(res) => setEmail(res)}
      />
      <TextInput
        style={{
          borderRadius: 10,
          borderWidth: 2,
          marginHorizontal: 20,
          marginTop: 10,
        }}
        placeholder="Enter Password"
        value={password}
        onChangeText={(res) => setPassword(res)}
      />
      {!isupdate ? (
        <TouchableOpacity
          onPress={() => {
            email == "" || password == ""
              ? Alert.alert("please enter details")
              : onhandaleAdd();
          }}
          style={{
            backgroundColor: "black",
            alignSelf: "center",
            padding: 10,
            paddingHorizontal: 20,
            borderRadius: 10,
            marginTop: 10,
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "700",
              fontSize: 16,
            }}
          >
            Add
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => {
            email == "" || password == ""
              ? Alert.alert("please enter details")
              : onhandleUpdate();
          }}
          style={{
            backgroundColor: "black",
            alignSelf: "center",
            padding: 10,
            paddingHorizontal: 20,
            borderRadius: 10,
            marginTop: 10,
          }}
        >
          <Text style={{ color: "white", fontWeight: "700", fontSize: 16 }}>
            Update
          </Text>
        </TouchableOpacity>
      )}
      <FlatList style={{ marginTop: 32 }} renderItem={list} data={data} />
    </View>
  );
};

export default App;
///////////////////////////////////////////   realtime DataBase
