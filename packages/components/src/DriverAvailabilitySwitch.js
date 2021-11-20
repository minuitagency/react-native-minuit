import React, { useEffect, useGlobal, useState } from 'reactn';
import { Pressable, Text, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { Fonts, Palette, Style } from '@react-native-minuit/styles';

export default function DriverAvailabilitySwitch({ containerStyle }) {
  const [currentUserData] = useGlobal('user');

  const [isDriverAvailable, setIsDriverAvailable] = useState(true);

  const { uid = null } = currentUserData || {};

  useEffect(() => {
    if (currentUserData.isDriverAvailable !== isDriverAvailable) {
      setIsDriverAvailable(currentUserData.isDriverAvailable);
    }
  }, [currentUserData.isDriverAvailable]);

  const updateDriverAvailability = async (available = true) => {
    try {
      await firestore()
        .collection('users')
        .doc(uid)
        .update({ isDriverAvailable: available });
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <View
      style={[
        Style.containerCenter,
        Style.containerSpaceBetween,
        {
          alignSelf: 'center',
          backgroundColor: Palette.mainGrey,
          borderRadius: 30,
          ...containerStyle,
        },
      ]}
    >
      <Text
        numberOfLines={2}
        style={[
          Fonts.primary.medium(13),
          { color: Palette.white, marginHorizontal: 20 },
        ]}
      >
        {isDriverAvailable ? 'En service' : 'Hors service'}
      </Text>

      <Pressable
        onPress={() => {
          setIsDriverAvailable(!isDriverAvailable);
          updateDriverAvailability(!isDriverAvailable);
        }}
        style={[
          {
            width: responsiveWidth(12),
            backgroundColor: Palette.white,
            borderRadius: 30,
            margin: 5,
          },
        ]}
      >
        <View
          style={[
            Style.containerRound,
            {
              alignSelf: isDriverAvailable ? 'flex-end' : 'flex-start',
              backgroundColor: isDriverAvailable ? Palette.green : Palette.red,
              width: 20,
              height: 20,
              margin: 3,
            },
          ]}
        />
      </Pressable>
    </View>
  );
}
