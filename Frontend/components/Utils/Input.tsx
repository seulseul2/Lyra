import React, {Dispatch, SetStateAction} from 'react';
import {StyleSheet, TextInput, Dimensions} from 'react-native';
import Colors from '../../constants/Colors';
import LinearGradient from 'react-native-linear-gradient';

//너비, 높이, 키보드타입(1이면 ascii[기본키패드], 2면 numberpad), borderRadius
type InputProps = {
  width: number;
  height: number;
  keyboard: number;
  borderRadius: number;
  placeholder?: string;
  customStyle?: any;
  maxLength?: number;
  enteredValue?: string;
  multiline?: boolean;
  setEnteredValue?: Dispatch<SetStateAction<string>>;
  inputCustomStyle?: any;
};

const Input: React.FC<InputProps> = ({
  width,
  height,
  keyboard,
  borderRadius,
  placeholder,
  customStyle,
  maxLength,
  enteredValue,
  setEnteredValue,
  multiline,
  inputCustomStyle,
}) => {
  const styles = StyleSheet.create({
    input: {
      width: width * Dimensions.get('window').width - 2,
      height: height * Dimensions.get('window').height - 2,
      borderRadius: borderRadius,
      backgroundColor: Colors.black500,
      color: Colors.gray300,
      alignSelf: 'center',
      justifyContent: 'center',
      fontFamily: 'NanumSquareRoundR',
      paddingHorizontal: 10,
    },
    gradient: {
      width: width * Dimensions.get('window').width,
      height: height * Dimensions.get('window').height,
      borderRadius: borderRadius,
      justifyContent: 'center',
      alignSelf: 'center',
    },
  });

  return (
    <>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        useAngle={true}
        angle={135}
        angleCenter={{x: 0.5, y: 0.5}}
        colors={[Colors.purple300, Colors.pink500]}
        style={[styles.gradient, customStyle]}>
        <TextInput
          style={[styles.input, inputCustomStyle]}
          multiline={multiline}
          blurOnSubmit
          autoCorrect={false}
          keyboardType={keyboard === 1 ? 'ascii-capable' : 'numeric'}
          placeholder={placeholder}
          placeholderTextColor={Colors.white300}
          maxLength={maxLength}
          value={enteredValue}
          onChangeText={setEnteredValue}
        />
      </LinearGradient>
    </>
  );
};

export default Input;
