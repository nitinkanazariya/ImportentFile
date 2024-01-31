import {View, Text} from 'react-native';
import React from 'react';

const getData = () => {
  database
    .ref('users')
    .once('value')
    .then(snapshot => {
      const data = snapshot.val();
      console.log(data);
    })
    .catch(error => {
      console.error('Error reading data:', error);
    });
  return (
    <View>
      <Text>getData</Text>
    </View>
  );
};

export default getData;
