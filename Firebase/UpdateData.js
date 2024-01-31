import {View, Text} from 'react-native';
import React from 'react';

const UpdateData = () => {
  const userId = 'USER_ID_TO_UPDATE';
  const updatedData = {
    age: 26,
    email: 'john.updated@example.com',
  };

  database.ref('users/' + userId).update(updatedData);

  return (
    <View>
      <Text>UpdateData</Text>
    </View>
  );
};

export default UpdateData;
