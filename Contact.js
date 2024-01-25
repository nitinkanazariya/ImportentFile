import {
  View,
  Text,
  PermissionsAndroid,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Contacts from 'react-native-contacts';
import {Icon} from '../Image/Icon';

const Contact = props => {
  const [contactData, setContactData] = useState([]);
  const [inputvisible, setInputVisible] = useState(false);

  useEffect(() => {
    requestContectPermission();
  }, []);

  const requestContectPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Contacts',
          message: 'This app would like to view your contacts.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getContactData();
      } else {
        console.log('Contect permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const getContactData = () => {
    Contacts.getAll()
      .then(item => {
        setContactData(item);
      })
      .catch(e => {
        console.log(e);
      });
  };
  const list = ({item, index}) => {
    let number = item.phoneNumbers[0].number;
    let name = item.displayName;
    let image = item.thumbnailPath;
    return (
      <TouchableOpacity
        onPress={() => {
          setInputVisible(false);
          props.navigation.goBack();
        }}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#e8e8e8',
          marginTop: 10,
          padding: 10,
          marginHorizontal: 10,
          borderRadius: 20,
        }}>
        <Image
          source={{
            uri: image
              ? image
              : 'https://www.iimrohtak.ac.in/panel/assets/images/advisory-body/16881262508687Prof.%20S%20Sivakumar.jpeg',
          }}
          style={{height: 45, width: 45, borderRadius: 50, marginRight: 15}}
        />
        <View>
          <Text style={{color: 'black', fontWeight: '700', fontSize: 15}}>
            {name}
          </Text>
          <Text style={{color: 'gray', fontWeight: '700', fontSize: 13}}>
            {number}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <TouchableWithoutFeedback onPress={() => setInputVisible(false)}>
      <View style={{backgroundColor: 'white', flex: 1}}>
        {!inputvisible ? (
          <View
            style={{
              backgroundColor: 'black',
              padding: 20,
              height: 80,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <Image
                source={Icon.back}
                style={{height: 20, width: 20, tintColor: 'white'}}
              />
            </TouchableOpacity>
            <Text
              style={{
                color: 'white',

                fontSize: 20,
                fontWeight: '700',
              }}>
              Contact
            </Text>
            <TouchableOpacity onPress={() => setInputVisible(true)}>
              <Image
                source={Icon.search}
                style={{height: 20, width: 20, tintColor: 'white'}}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{
              backgroundColor: 'black',
              padding: 10,
              height: 80,
              alignItems: 'center',
            }}>
            <View
              style={{
                backgroundColor: 'white',
                flexDirection: 'row',
                borderRadius: 20,
                height: 45,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                marginTop: 8,
              }}>
              <TextInput
                autoFocus
                onEndEditing={() => setInputVisible(false)}
                placeholder="Search"
                cursorColor={'black'}
                style={{
                  backgroundColor: 'white',
                  height: 45,
                  borderRadius: 20,
                  fontSize: 15,
                  flex: 1,
                  color: 'black',
                  fontWeight: '700',
                }}
              />
              <TouchableOpacity onPress={() => setInputVisible(false)}>
                <Image
                  source={Icon.search}
                  style={{height: 20, width: 20, tintColor: 'black'}}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}

        <FlatList data={contactData} renderItem={list} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Contact;
