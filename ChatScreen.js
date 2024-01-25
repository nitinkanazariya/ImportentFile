// import React, { useState, useCallback, useEffect } from "react";
// import {
//   View,
//   TextInput,
//   Text,
//   Image,
//   TouchableOpacity,
//   LogBox,
// } from "react-native";
// import { Bubble, GiftedChat } from "react-native-gifted-chat";
// LogBox.ignoreAllLogs();
// const ChatScreen = () => {
//   const [messages, setMessages] = useState([]);
//   const [inputText, setInputText] = useState("");

//   const renderScrollButton = () => (
//     <Image
//       source={{
//         uri: "https://cdn4.iconfinder.com/data/icons/navigation-40/24/chevron-force-down-512.png",
//       }}
//       style={{ height: 20, width: 20 }}
//     />
//   );

//   useEffect(() => {
//     setMessages([
//       {
//         _id: 1,
//         text: "Hello developer",
//         createdAt: new Date(),
//         user: {
//           _id: 2,
//           name: "React Native",
//           avatar:
//             "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg",
//         },
//       },
//     ]);
//   }, []);

//   const onSend = useCallback((messages = []) => {
//     setMessages((previousMessages) =>
//       GiftedChat.append(previousMessages, messages)
//     );
//   }, []);

//   const handleSend = () => {
//     if (inputText.trim() === "") {
//       return;
//     }

//     const newMessage = {
//       _id: messages.length + 1,
//       text: inputText.trim(),
//       createdAt: new Date(),
//       user: {
//         _id: 1,
//       },
//     };

//     onSend([newMessage]);
//     setInputText("");
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <GiftedChat
//         messages={messages}
//         onSend={(messages) => onSend(messages)}
//         user={{
//           _id: 1,
//         }}
//         renderBubble={(props) => {
//           return (
//             <Bubble
//               {...props}
//               textStyle={{
//                 left: { color: "black", fontWeight: "500", fontSize: 15 },
//                 right: { color: "white", fontWeight: "500", fontSize: 15 },
//               }}
//               wrapperStyle={{
//                 right: { backgroundColor: "#1BA9AD", borderRadius: 5 },
//                 left: {
//                   borderWidth: 1,
//                   borderRadius: 5,
//                   backgroundColor: "white",
//                 },
//               }}
//             />
//           );
//         }}
//         scrollToBottom={true}
//         scrollToBottomComponent={renderScrollButton}
//         renderInputToolbar={() => {
//           return (
//             <View
//               style={{
//                 flexDirection: "row",
//                 alignItems: "center",
//                 height: 40,
//                 marginHorizontal: 15,
//               }}
//             >
//               <View
//                 style={{
//                   backgroundColor: "#1BA9AD",
//                   borderRadius: 5,
//                   flex: 1,
//                   flexDirection: "row",
//                   alignItems: "center",
//                 }}
//               >
//                 <TouchableOpacity>
//                   <Text
//                     style={{
//                       fontSize: 24,
//                       color: "white",
//                       marginLeft: 12,
//                       marginRight: 7,
//                       fontWeight: "700",
//                     }}
//                   >
//                     +
//                   </Text>
//                 </TouchableOpacity>
//                 <TextInput
//                   value={inputText}
//                   onChangeText={(text) => setInputText(text)}
//                   placeholderTextColor={"white"}
//                   cursorColor={"white"}
//                   style={{
//                     flex: 1,
//                     height: 45,
//                     fontSize: 12,
//                     fontWeight: "400",
//                     alignItems: "flex-start",
//                     color: "white",
//                   }}
//                   placeholder="Message Type Here"
//                 />
//               </View>
//               <TouchableOpacity
//                 onPress={handleSend}
//                 style={{
//                   backgroundColor: "#01D6C9",
//                   height: 45,
//                   width: 45,
//                   marginLeft: 10,
//                   alignItems: "center",
//                   justifyContent: "center",
//                   borderRadius: 5,
//                 }}
//               >
//                 <Image
//                   source={require("./assets/send.png")}
//                   style={{ height: 15, width: 15, tintColor: "white" }}
//                 />
//               </TouchableOpacity>
//             </View>
//           );
//         }}
//       />
//     </View>
//   );
// };

// export default ChatScreen;

/////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////Importtent
// // useEffect(() => {
// //   const UserMsg = firestore()
// //     .collection('chat')
// //     .doc(myId + userData.id)
// //     .collection('Message')
// //     .orderBy('createdAt', 'desc');
// //   UserMsg.onSnapshot(res => {
// //     const allmsg = res.docs.map(item => {
// //       return {
// //         ...item._data,
// //         createdAt: item._data.createdAt,
// //       };
// //     });
// //     setMessages(allmsg);
// //   });
// //   return () => UserMsg;
// // }, []);

// // const onSend = useCallback((messages = []) => {
// //   const msg = messages[0];
// //   const allmsg = {
// //     ...msg,
// //     sendBy: myId,
// //     sendTo: userData.id,
// //     createdAt: Date.parse(new Date()),
// //   };
// //   setMessages(previousMessages =>
// //     GiftedChat.append(previousMessages, allmsg),
// //   );
// //   firestore()
// //     .collection('chat')
// //     .doc(myId + userData.id)
// //     .collection('Message')
// //     .add(allmsg);
// //   firestore()
// //     .collection('chat')
// //     .doc(userData.id + myId)
// //     .collection('Message')
// //     .add(allmsg);
// // }, []);

//////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

// import {
//   View,
//   StatusBar,
//   Alert,
//   FlatList,
//   Text,
//   Image,
//   TouchableOpacity,
// } from 'react-native';
// import COLOR from '../../color/color';
// import Chatheader from '../../custom/Header/chatHeader';
// import {chatInerScreenData} from '../../Object/Data';
// import CheckBox from '../../custom/CheckBox/CheckBox';
// import MessageFooter from '../../custom/messageFooter/MessageFooter';
// import ChatModal from '../../custom/Modal/ChatModal';
// import React, {useState} from 'react';
// import styles from './chatStyle';

// const ChatScreen = props => {
//   const chatProfileData = props?.route?.params?.data;
//   console.log(chatProfileData);
//   const [message, setMessage] = useState('');
//   const [visible, setVisible] = useState(false);

//   const list = ({item}) => {
//     return (
//       <TouchableOpacity style={styles.listView}>
//         <CheckBox tintColor={COLOR.lightBlack} />
//         <Text style={styles.listtitle}>{item.title}</Text>
//         <Image
//           source={require('../../assets/clock.png')}
//           style={styles.listclockicon}
//         />
//       </TouchableOpacity>
//     );
//   };
//   return (
//     <View style={styles.container}>
//       <StatusBar
//         backgroundColor={COLOR.lightBlack}
//         barStyle={'light-content'}
//       />
//       <Chatheader
//         source={{uri: chatProfileData.img}}
//         title={chatProfileData.name}
//         onSearch={() => Alert.alert('search')}
//         onBack={() => props.navigation.navigate('received')}
//       />

//       <FlatList data={chatInerScreenData} renderItem={list} />
//       <MessageFooter
//         onSend={() => Alert.alert('hello')}
//         onAdd={() => setVisible(true)}
//         value={message}
//         onChangeText={txt => setMessage(txt)}
//       />
//       <ChatModal
//         visible={visible}
//         onClose={() => setVisible(false)}
//         onCheckList={() => Alert.alert('onCheckList')}
//         onMeeting={() => Alert.alert('onMeeting')}
//         onReminder={() => Alert.alert('onReminder')}
//         onCamera={() => Alert.alert('onCamera')}
//         onPhotoGallery={() => Alert.alert('onPhotoGallery')}
//         onContacts={() => Alert.alert('onContacts')}
//         onFiles={() => Alert.alert('onFiles')}
//       />
//     </View>
//   );
// };

// export default ChatScreen;
