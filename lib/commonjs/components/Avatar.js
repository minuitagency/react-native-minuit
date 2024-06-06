 
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

import React, { useState, Fragment } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Motion } from '@legendapp/motion';
import { Blurhash } from 'react-native-blurhash';
import { Style, Palette } from 'styles';
import { icons } from 'assets';

type AvatarProps = {
  size?: number;
  style?: object;
  isCreator?: boolean;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  profilePicture?: string | null;
  profilePictureBlurhash?: string | null;
  status?: 'CONFIRMED' | 'PENDING' | null;
};

const Avatar: React.FC<AvatarProps> = ({
  size = 60,
  style = {},
  isCreator = false,
  firstName,
  lastName,
  phoneNumber,
  profilePicture = null,
  profilePictureBlurhash = null,
  status = null
}) => {
  const [showBlurhash, setShowBlurhash] = useState(true);
  const statusIcon = status === 'CONFIRMED' ? icons.joined : status === 'PENDING' ? icons.waiting : null;
  const statusIconSize = 25 * size / 60;

  const randomIntFromInterval = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  if (profilePictureBlurhash) {
    console.log('has blurhash' + profilePictureBlurhash);
  }

  return (
    <Motion.View
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      style={[Style.con({ size, mx: 5, cen: true }), style]}
    >
      <View
        style={[
          Style.con({
            cen: true,
            size: size - 5,
            bor: 150,
            over: 'hidden',
            bg: Palette.primary,
            op: status === 'CONFIRMED' || !status ? 1 : 0.5
          }),
          isCreator ? { borderWidth: 3, borderColor: Palette.primary } : {}
        ]}
      >
        {profilePicture ? (
          <Fragment>
            <FastImage
              style={Style.con({ w: '100%', h: '100%' })}
              source={{ uri: profilePicture }}
              onLoadEnd={() => setShowBlurhash(false)}
            />
            {profilePictureBlurhash && showBlurhash && (
              <Blurhash
                blurhash={profilePictureBlurhash}
                style={[Style.con({ w: '100%', h: '100%' }), { ...StyleSheet.absoluteFill }]}
                resizeMode="cover"
              />
            )}
          </Fragment>
        ) : (
          <Text style={Style.Fonts.primary.bold(size * 18 / 60, Palette.white)}>
            {`${firstName?.[0]?.toUpperCase() || ''}${lastName?.[0]?.toUpperCase() || ''}`}
          </Text>
        )}
      </View>
      {statusIcon && (
        <Motion.Image
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: randomIntFromInterval(50, 150),
            damping: 20
          }}
          style={Style.con({
            pos: 'absolute',
            size: statusIconSize < 15 ? 15 : statusIconSize,
            bor: 50,
            r: -(5 * size) / 60,
            b: 0
          })}
          source={statusIcon}
        />
      )}
    </Motion.View>
  );
};

export default Avatar;
