import React from 'react';
import {Pressable, Image, StyleSheet} from 'react-native';

import CircleGradient from './CircleGradient';

type gradeType = 'new' | 'normal' | 'hot';
type sizeType = 'extraSmall' | 'small' | 'medium' | 'large' | 'extraLarge';

// TODO make onPress
const CircleProfile = ({
  imageURI,
  grade,
  size,
  isGradient,
}: {
  imageURI?: string;
  grade?: gradeType;
  size: sizeType;
  isGradient: boolean;
}) => {
  const imageSizes = {
    extraSmall: 32,
    small: 48,
    medium: 56,
    large: 64,
    extraLarge: 72,
  };

  const imageSize = imageSizes[size];

  const imageStyle = {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
  };

  if (isGradient) {
    return (
      <CircleGradient grade={grade!} size={size}>
        <Pressable>
          {imageURI && (
            <Image
              style={[styles.image, imageStyle]}
              source={{uri: imageURI}}
            />
          )}
        </Pressable>
      </CircleGradient>
    );
  }

  return (
    <Pressable>
      {imageURI && (
        <Image style={[styles.image, imageStyle]} source={{uri: imageURI}} />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  image: {
    overflow: 'hidden',
  },
});

export default CircleProfile;
