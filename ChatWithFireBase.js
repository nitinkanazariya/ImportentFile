import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  Image,
  LogBox,
  StatusBar,
  BackHandler,
  Modal,
  ScrollView,
  Linking,
} from "react-native";
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import Chatheader from "../../custom/Header/chatHeader";
import COLOR from "../../color/color";
import ChatModal from "../../custom/Modal/ChatModal";
import uuid from "react-native-uuid";
import DocumentPicker from "react-native-document-picker";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { MsgImage } from "../../custom/RenderMessageComponent/MsgImage/MsgImage";
import { MsgMeeting } from "../../custom/RenderMessageComponent/MsgMeeting/Msgeeting";
import CreateMsgMeeting from "../../custom/RenderMessageComponent/MsgMeeting/CreateMsgMeeting";
import MsgText from "../../custom/RenderMessageComponent/MsgText/MsgText";
import CreateReminder from "../../custom/RenderMessageComponent/MsgReminder/CreateReminder";
import RenderInputToolbar from "../../custom/RenderMessageComponent/renderInputToolbar/renderInputToolbar";
import MsgReminder from "../../custom/RenderMessageComponent/MsgReminder/MsgReminder";
import Header from "../../custom/Header/Header";
import MsgChecklist from "../../custom/RenderMessageComponent/MsgCheckList/MsgChecklist";
import CreateTask from "../../custom/RenderMessageComponent/MsgCheckList/CreateTask";
import firestore from "@react-native-firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
LogBox.ignoreAllLogs();
const ChatScreen = (props) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [visible, setVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [ReMeCkModal, setReMeCkModal] = useState(false);
  const [change, setChange] = useState(false);
  const [addMessage, setAddMessage] = useState(0);
  const [file, setFile] = useState(null);
  const [cameraImage, setCameraImage] = useState(null);
  const [gallery, setGallery] = useState(null);
  const [myID, setMyId] = useState("");
  const [newMessageCount, setNewMessageCount] = useState(0);
  const chatProfileData = props?.route?.params?.data;
  const userId = chatProfileData.id;
  // const name = chatProfileData?.name;

  const onhandalePhoneCall = () => {
    Linking.openURL(`tel:${chatProfileData?.phonenumber}`);
  };
  const renderScrollButton = () => (
    <Image
      source={{
        uri: "https://cdn4.iconfinder.com/data/icons/navigation-40/24/chevron-force-down-512.png",
      }}
      style={{ height: 25, width: 25 }}
    />
  );

  const closeModal = () => {
    setVisible(false);
  };
  const getMyId = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("userData");
      const myid = JSON.parse(jsonValue);
      setMyId(myid.id);
    } catch (e) {}
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      closeModal
    );
    return () => backHandler.remove();
  }, [visible]);
  useEffect(() => {
    const Msg = firestore().collection("messages").orderBy("createdAt", "desc");
    Msg.onSnapshot((res) => {
      const allMsg = res.docs
        .map((item) => {
          const data = item.data();
          if (
            (data.sendBy === myID && data.sendTo === userId) ||
            (data.sendBy === userId && data.sendTo === myID)
          ) {
            return {
              ...data,
              text: data.text,
              createdAt: data.createdAt,
            };
          } else {
            return null;
          }
        })
        .filter((message) => message !== null);
      setMessages(allMsg);
    });
  }, [myID, userId]);
  useEffect(() => {
    getMyId();
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  const handleSend = async (currentMsgData) => {
    if (
      inputText.trim() == "" &&
      addMessage == 0 &&
      gallery == null &&
      cameraImage == null &&
      currentMsgData?.descriptions == null
    ) {
      return null;
    }
    if (currentMsgData.type == "Checklist") {
      setChange(true);
    } else {
      setChange(false);
    }
    const newMessage = {
      _id: uuid.v4(),
      messageType: "",
      sendBy: myID,
      sendTo: userId,
      text: inputText.trim(),
      createdAt: Date.parse(new Date()),
      Checklist:
        currentMsgData.type == "Checklist"
          ? {
              title: currentMsgData?.tasktitle,
              descriptions: currentMsgData?.taskdescriptions,
              remind: [],
              tasktime: {},
            }
          : {},
      meeting:
        currentMsgData.type == "Meeting"
          ? {
              id: 1,
              title: currentMsgData?.title,
              descriptions: currentMsgData?.descriptions,
              date: currentMsgData?.meetingdate,
              time: currentMsgData?.meetingtime,
              remind: [],
            }
          : {},
      reminder:
        currentMsgData.type == "Reminder"
          ? {
              id: 1,
              descriptions: currentMsgData?.reminddescriptions,
              location: currentMsgData?.location,
              time: currentMsgData?.remindtime,
            }
          : {},
      cameraimg: cameraImage,
      galleryimg: gallery,
      user: {
        _id: myID,
      },
    };

    onSend([newMessage]);
    setInputText("");
    setAddMessage(0);
    setCameraImage(null);
    setGallery(null);
    setFile(null);
    await firestore().collection("messages").add(newMessage);
  };
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setFile(result);
      setVisible(false);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
      }
    }
  };
  const onCamera = async () => {
    const result = await launchCamera();
    if (result?.assets[0]?.uri) {
      setCameraImage(result.assets[0].uri);
      setVisible(false);
    }
  };

  const onPhotoGallery = async () => {
    const result = await launchImageLibrary();
    if (result?.assets[0]?.uri) {
      setGallery(result.assets[0].uri);
      setVisible(false);
    }
  };

  const renderMessage = (props) => {
    const { currentMessage } = props;
    console.log(currentMessage);
    const dateString = currentMessage.createdAt;
    const dateObject = new Date(dateString);
    const hours =
      dateObject.getHours() > 12
        ? dateObject.getHours() - 12
        : dateObject.getHours();
    const minutes = dateObject.getMinutes().toString().padStart(2, "0");
    const amOrPm = dateObject.getHours() >= 12 ? "PM" : "AM";
    const Msgtime = hours + ":" + minutes + " " + amOrPm;
    return (
      <View style={{ marginHorizontal: 20, marginVertical: 5 }}>
        {!change ? (
          <View>
            {currentMessage?.Checklist?.descriptions ? (
              <MsgChecklist
                MYID={myID}
                data={currentMessage}
                userinfo={chatProfileData}
                time={Msgtime}
              />
            ) : currentMessage?.text ? (
              <MsgText
                data={currentMessage}
                myId={myID}
                userId={userId}
                time={Msgtime}
                onPress={() => console.log("")}
              />
            ) : currentMessage?.meeting?.title ? (
              <MsgMeeting
                data={currentMessage}
                MYID={myID}
                time={Msgtime}
                onPress={() => console.log("")}
              />
            ) : currentMessage?.cameraimg ? (
              <MsgImage data={currentMessage} time={Msgtime} MYID={myID} />
            ) : currentMessage?.galleryimg ? (
              <MsgImage data={currentMessage} time={Msgtime} MYID={myID} />
            ) : currentMessage?.reminder?.descriptions ? (
              <MsgReminder MYID={myID} data={currentMessage} time={Msgtime} />
            ) : null}
          </View>
        ) : (
          <View style={{}}>
            {currentMessage?.Checklist?.descriptions ? (
              <MsgChecklist
                MYID={myID}
                data={currentMessage}
                userinfo={chatProfileData}
                time={Msgtime}
              />
            ) : null}
          </View>
        )}
      </View>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: COLOR.DeepSkyBlue }}>
      <View
        style={{ backgroundColor: COLOR.DeepSkyBlue, paddingHorizontal: 10 }}
      >
        <Chatheader
          onProfile={() =>
            props.navigation.navigate("userprofile", chatProfileData)
          }
          onCall={onhandalePhoneCall}
          value={change}
          onChange={() => setChange(!change)}
          source={
            chatProfileData.data.profile_image == ""
              ? require("../../assets/userimg.png")
              : { uri: chatProfileData.data.profile_image }
          }
          title={
            chatProfileData.data.first_name.length >= 20
              ? chatProfileData.data.first_name?.slice(0, 15) + " . . . "
              : chatProfileData.data.first_name
          }
          onSearch={() => Alert.alert("search")}
          onBack={() => props.navigation.goBack()}
        />
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: COLOR.lightgray,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          paddingTop: 15,
        }}
      >
        <GiftedChat
          inverted={change ? false : true}
          renderMessage={(props) => renderMessage(props)}
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={{ _id: 1 }}
          scrollToBottom={true}
          scrollToBottomComponent={renderScrollButton}
          renderInputToolbar={(props) => {
            return (
              <RenderInputToolbar
                onChangeText={(text) => setInputText(text)}
                onBlur={() => setIsFocused(false)}
                onFocus={() => setIsFocused(true)}
                value={inputText}
                onsend={handleSend}
                onPress={() => setVisible(true)}
                source={
                  inputText == "" && gallery == null && cameraImage == null
                    ? require("../../assets/voice.png")
                    : require("../../assets/send.png")
                }
              />
            );
          }}
        />

        <View
          style={{
            marginBottom: isFocused == false ? 45 : 30,
            backgroundColor: COLOR.lightgray,
          }}
        ></View>

        <ChatModal
          onRequestClose={closeModal}
          visible={visible}
          onClose={() => setVisible(false)}
          onCheckList={() => {
            setAddMessage(1);
            setVisible(false);
            setReMeCkModal(true);
          }}
          onMeeting={() => {
            setAddMessage(2);
            setVisible(false);
            setReMeCkModal(true);
          }}
          onReminder={() => {
            setAddMessage(3);
            setVisible(false);
            setReMeCkModal(true);
          }}
          onFiles={() => {
            pickDocument();
            setAddMessage(0);
          }}
          onCamera={() => {
            onCamera();
            setAddMessage(4);
          }}
          onPhotoGallery={() => {
            onPhotoGallery();
            setAddMessage(5);
          }}
          onContacts={() => {
            props.navigation.navigate("contact"), setVisible(false);
          }}
          onLocation={() => {
            Alert.alert("Location");
            setVisible(false);
          }}
        />
        <Modal visible={ReMeCkModal}>
          <View style={{ backgroundColor: COLOR.DeepSkyBlue, flex: 1 }}>
            <Header
              color={COLOR.white}
              title={
                addMessage == 1
                  ? "Create Task"
                  : addMessage == 2
                  ? "Create Meeting"
                  : addMessage == 3
                  ? "Create Remind"
                  : null
              }
              onPress={() => {
                setAddMessage(0);
                setReMeCkModal(false);
              }}
            />
            <View style={{ flex: 1, justifyContent: "center", marginTop: 10 }}>
              {addMessage == 1 ? (
                <CreateTask
                  onSubmit={(taskdata) => {
                    setAddMessage(0), setReMeCkModal(false);
                    handleSend(taskdata);
                  }}
                />
              ) : addMessage == 2 ? (
                <CreateMsgMeeting
                  onSubmit={(data) => {
                    handleSend(data);
                    setAddMessage(0), setReMeCkModal(false);
                  }}
                />
              ) : addMessage == 3 ? (
                <CreateReminder
                  onSubmit={(reminddata) => {
                    handleSend(reminddata);
                    setAddMessage(0), setReMeCkModal(false);
                  }}
                />
              ) : null}
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};
export default ChatScreen;
