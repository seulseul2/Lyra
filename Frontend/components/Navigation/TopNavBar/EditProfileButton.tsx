import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';

import Colors from '../../../constants/Colors';

const EditProfileButton = () => {
  return (
    <Pressable>
      <Text style={styles.text}>완료</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'NanumSquareRoundR',
    fontSize: 20,
    color: Colors.pink500,
  },
});

export default EditProfileButton;
