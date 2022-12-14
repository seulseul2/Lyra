import {useNavigation} from '@react-navigation/native';
import React, {Dispatch, SetStateAction, useState} from 'react';
import {Dimensions, Modal, StyleSheet, Text, View} from 'react-native';
import Colors from '../../constants/Colors';
import Button from './Button';

import Icon from 'react-native-vector-icons/FontAwesome';
import GestureRecognizer from 'react-native-swipe-gestures';

export const LocationModal = ({
  modalVisible,
  setModalVisible,
  text,
  onChangeText,
}: {
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  text: string;
  onChangeText: Dispatch<SetStateAction<string>>;
}) => {
  const navigation = useNavigation();
  const pressHandler = () => {
    navigation.navigate('LocationSearch');
    // setModalVisible(false);
  };

  // const [modalVisible, setModalVisible] = useState(true);

  return (
    <GestureRecognizer
      onSwipeDown={() => setModalVisible(false)}
      config={{
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80,
      }}>
      <Modal animationType={'slide'} transparent={true} visible={modalVisible}>
        <View
          style={styles.blankSpace}
          // onTouchEnd={() => navigation.navigate('CreatePheed')}
          onTouchEnd={() => setModalVisible(false)}
        />
        <View style={styles.modal}>
          <Text style={styles.title}>장소 설정</Text>
          <Button
            title="도로명 또는 지번으로 검색"
            btnSize="large"
            textSize="medium"
            isGradient={false}
            isOutlined={false}
            onPress={pressHandler}
            customStyle={styles.button}
          />
          <Button
            title="현재 위치로 주소 설정"
            btnSize="medium"
            textSize="small"
            isGradient={false}
            isOutlined={false}
            customStyle={styles.currentBtn}
            onPress={() => {}}
          />
          {/* <Text>{address}</Text> */}
          <View style={styles.addressLog}>
            <Icon name="map-marker" size={20} color="white" />
            <Text style={styles.address}>롯데마트 앞 광장</Text>
          </View>
          <View style={styles.addressLog}>
            <Icon name="map-marker" size={20} color="white" />
            <Text style={styles.address}>홍대 놀이터 앞</Text>
          </View>
          <View style={styles.addressLog}>
            <Icon name="map-marker" size={20} color="white" />
            <Text style={styles.address}>건대입구 2번출구</Text>
          </View>
        </View>
      </Modal>
    </GestureRecognizer>
  );
};
const deviceWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  modal: {
    width: '100%',
    height: '40%',
    position: 'absolute',
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: Colors.purple300,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    bottom: 0,
    backgroundColor: Colors.black500,
  },
  title: {
    fontFamily: 'NanumSquareRoundR',
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    marginTop: 20,
  },
  button: {
    marginTop: 20,
    width: deviceWidth * 0.8,
  },
  currentBtn: {
    backgroundColor: 'none',
    marginBottom: 5,
  },
  address: {
    fontFamily: 'NanumSquareRoundR',
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
    marginVertical: 5,
    marginLeft: 10,
  },
  addressLog: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  blankSpace: {
    position: 'absolute',
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    backgroundColor: '#000000',
    opacity: 0.5,
  },
});
