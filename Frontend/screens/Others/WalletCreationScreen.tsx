import React, {useContext} from 'react';
import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

import {RootStackParamList, RootTabParamList} from '../../constants/types';

import IIcon from 'react-native-vector-icons/Ionicons';

import AuthContext from '../../store/auth-context';
import Button from '../../components/Utils/Button';
import Colors from '../../constants/Colors';

type WalletNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<RootTabParamList, 'Home'>,
  NativeStackNavigationProp<RootStackParamList>
>;

const WalletCreationScreen = () => {
  const navigation = useNavigation<WalletNavigationProps>();
  const {setWalletCreated, walletCreated, setIsLoggedIn} =
    useContext(AuthContext);
  const guidance = !walletCreated
    ? 'Lyra를 제대로 사용하기 위해서는\n지갑이 필요합니다.'
    : '지갑이 생성되었어요!';

  const cancleBtnStyle = {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.gray300,
    marginRight: 24,
  };

  const cancleHandler = () => {
    // TODO specify alert behavior.
    Alert.alert(
      'Lyra',
      '지갑을 만들지 않으면 앱을 쓸 수 없어요. 그래도 괜찮겠어요?',
    );
  };

  const walletCreationHandler = () => {
    setWalletCreated(true);
    navigation.navigate('WalletCreation');
  };

  const startPressHandler = () => {
    setIsLoggedIn(true);
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/image/permission_background.png')}
        resizeMode="cover"
        style={styles.background}>
        {/* TODO 어떤 정보를 가져가는지 약관 필요 */}
        <View style={styles.permissionContainer}>
          <IIcon
            name={!walletCreated ? 'ios-wallet-outline' : 'happy'}
            size={30}
            color={Colors.gray300}
          />
          <Text style={styles.text}>{guidance}</Text>
          {!walletCreated && (
            <View style={styles.buttonContainer}>
              <Button
                title={'취소하기'}
                btnSize="large"
                textSize="large"
                customStyle={cancleBtnStyle}
                isGradient={false}
                isOutlined={true}
                onPress={cancleHandler}
              />
              <Button
                title={'생성하기'}
                btnSize="large"
                textSize="large"
                isGradient={true}
                isOutlined={false}
                onPress={walletCreationHandler}
              />
            </View>
          )}
          {walletCreated && (
            <TouchableOpacity
              style={styles.startContainer}
              activeOpacity={0.7}
              onPress={startPressHandler}>
              <Text style={styles.buttonText}>Lyra 시작하기</Text>
            </TouchableOpacity>
          )}
        </View>
      </ImageBackground>
    </View>
  );
};

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    alignItems: 'center',
  },
  permissionContainer: {
    flex: 1,
    marginVertical: 8,
    width: deviceWidth - 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.blackTransparent,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  buttonText: {
    fontFamily: 'NanumSquareRoundR',
    fontSize: 24,
    color: Colors.pink300,
  },
  startContainer: {
    width: 250,
    height: 56,
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.blackTransparent,
    borderRadius: 150,
    borderColor: Colors.pink300,
    borderWidth: 1,
  },
  text: {
    fontFamily: 'NanumSquareRoundR',
    fontSize: 20,
    color: Colors.gray300,
    textAlign: 'center',
    lineHeight: 32,
    marginTop: 16,
  },
});

export default WalletCreationScreen;