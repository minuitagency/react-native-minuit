import React, { useMemo, useRef } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { Fonts, gutters, Palette } from '@react-native-minuit/styles';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { Text, View } from 'react-native';
import Button from '../Button';
import DriverItinary from './DriverItinary';
import { getDistance } from '@react-native-minuit/utils';
import { useGlobal } from 'reactn';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

function Details({ order }) {
  const [refusedCourses, setRefusedCourses] = useGlobal('refusedCourses');
  const distance = getDistance(
    order.userLoc.geopoint,
    order.sellerLoc.geopoint
  );
  const price = order.deliveryFees.driver;

  const onRefuseCourse = async () => {
    await setRefusedCourses([...refusedCourses, order.id]);
  };
  const onAcceptCourse = async () => {
    await firestore()
      .collection('users')
      .doc(order.user.id)
      .collection('orders')
      .doc(order.id)
      .update({ attributedTo: auth().currentUser.uid });
    await firestore()
      .collection('users')
      .doc(auth().currentUser.uid)
      .update({ isDriverInCourse: true });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'space-between' }}>
      <DriverItinary
        from={{ name: order.seller.name, address: order.seller.address }}
        to={{ name: order.user.firstName, address: order.address.address }}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={Fonts.primary.medium(20)}>{distance}</Text>
        <Text style={Fonts.primary.medium(20)}>{price.toFixed(2)}€</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button
          onPress={onRefuseCourse}
          text={'Refuser'}
          style={{
            flex: 1,
            marginRight: responsiveWidth(4),
            backgroundColor: '#EA190C',
            borderColor: 'transparent',
          }}
        />
        <Button
          onPress={onAcceptCourse}
          text={'Accepter'}
          style={{
            flex: 1,
            backgroundColor: '#53B047',
            borderColor: 'transparent',
          }}
        />
      </View>
    </View>
  );
}

export default function DriverCourseRequestSheet({ order, onChange }) {
  const bottomSheetRef = useRef();
  const snapPoints = useMemo(() => [responsiveHeight(35) + 25], []);

  return (
    <BottomSheet
      {...{ onChange, snapPoints }}
      //handleComponent={null}
      ref={bottomSheetRef}
      index={0}
      style={{ paddingHorizontal: gutters }}
    >
      {order && (
        <View
          style={{
            paddingVertical: responsiveHeight(2),
            flex: 1,
            backgroundColor: Palette.white,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
          }}
        >
          <Details {...{ order }} />
        </View>
      )}
    </BottomSheet>
  );
}
