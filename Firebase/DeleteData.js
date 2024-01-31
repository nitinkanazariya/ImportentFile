import {View, Text} from 'react-native';
import React from 'react';

const DeleteData = () => {
  const userIdToDelete = 'USER_ID_TO_DELETE';

  database.ref('users/' + userIdToDelete).remove();

  return (
    <View>
      <Text>DeleteData</Text>
    </View>
  );
};

export default DeleteData;
