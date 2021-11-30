import React, { forwardRef, useEffect, useMemo, useState } from 'react';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Colors, Fonts, gutters, Palette } from '@react-native-minuit/styles';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  Alert,
  Image,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useGlobal } from 'reactn';
import DriverItinary from './DriverItinary';
import Separator from '../Separator';
import Button from '../Button';
import firestore from '@react-native-firebase/firestore';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import auth from '@react-native-firebase/auth';

function IconButton({ icon, onPress, style }) {
  const containerSize = 40;
  return (
    <Pressable
      {...{ onPress }}
      style={{
        height: containerSize,
        width: containerSize,
        borderRadius: containerSize / 5,
        backgroundColor: Palette.greyTransparent,
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      <Image
        source={icon}
        style={{
          tintColor: Palette.mainGrey,
          width: containerSize / 1.5,
          height: containerSize / 1.5,
        }}
      />
    </Pressable>
  );
}

function ItinaryDetails({ order }) {
  return (
    <View>
      <DriverItinary
        from={{ name: order.seller.name, address: order.seller.address }}
        to={{ name: order.user.firstName, address: order.address.address }}
      />
    </View>
  );
}

const CELL_COUNT = 4;

// eslint-disable-next-line react/display-name
const PinCodeSheet = forwardRef(({ pin, onSuccess }, ref) => {
  const snapPoints = React.useMemo(() => ['50%'], []);
  const [value, setValue] = useState('');
  const codeFieldRef = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    if (value.length === CELL_COUNT) {
      if (pin === value) {
        Alert.alert('Commande terminée');
        ref.current?.close();
        onSuccess();
      } else {
        Alert.alert('Code incorrect');
        setValue('');
      }
    }
  }, [value]);

  return (
    <BottomSheet
      {...{ snapPoints }}
      ref={ref}
      index={-1}
      handleComponent={null}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View
          style={{
            flex: 1,
            paddingHorizontal: gutters,
            paddingVertical: responsiveHeight(2),
            justifyContent: 'space-between',
          }}
        >
          <View>
            <Text
              style={[
                Fonts.primary.bold(18),
                { textAlign: 'center', marginBottom: responsiveHeight(2) },
              ]}
            >
              Quel est le code du client?
            </Text>
            <CodeField
              //autoFocus (bug w/ bottomSheet)
              ref={codeFieldRef}
              {...props}
              value={value}
              onChangeText={setValue}
              cellCount={CELL_COUNT}
              rootStyle={pinStyles.codeFieldRoot}
              keyboardType="number-pad"
              renderCell={({ index, symbol, isFocused }) => (
                <Text
                  key={index}
                  style={[
                    pinStyles.cell,
                    isFocused && pinStyles.focusCell,
                    symbol && pinStyles.completedCell,
                  ]}
                  onLayout={getCellOnLayoutHandler(index)}
                >
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              )}
            />
          </View>
          <Button
            secondary
            text="Annuler"
            onPress={() => ref.current?.close()}
          />
        </View>
      </TouchableWithoutFeedback>
    </BottomSheet>
  );
});

const pinStyles = StyleSheet.create({
  codeFieldRoot: {
    marginBottom: responsiveHeight(2),
    width: 50 * 6,
    alignSelf: 'center',
  },
  cell: {
    width: 50,
    height: 50,
    fontSize: 24,
    borderWidth: 1,
    lineHeight: 45,
    borderColor: Palette.lightGrey,
    borderRadius: 10,
    textAlign: 'center',
    overflow: 'hidden',
    color: Palette.main,
  },
  focusCell: {
    borderColor: Palette.mainGrey,
    backgroundColor: Colors.input.background,
  },
  completedCell: {
    backgroundColor: Colors.input.background,
  },
});

export default function DriverActiveCourseSheet({ order, onChange }) {
  const bottomSheetRef = React.useRef();
  const pinBottomSheetRef = React.useRef();
  const [, setShowCrisp] = useGlobal('showCrisp');
  const snapPoints = React.useMemo(() => [responsiveHeight(8) + 25, '40%'], []);
  const [, setCurrentCourse] = useGlobal('currentCourse');
  const orderRef = useMemo(
    () =>
      firestore()
        .collection('users')
        .doc(order.user.id)
        .collection('orders')
        .doc(order.id),
    [order]
  );

  return (
    <>
      <BottomSheet {...{ onChange, snapPoints }} ref={bottomSheetRef} index={0}>
        <View
          style={{
            paddingHorizontal: gutters,
            height: responsiveHeight(8),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Button
            style={{ paddingHorizontal: gutters }}
            text={
              order.status === 'READY_TO_PICKUP'
                ? 'Commande récupérée'
                : 'Commande livrée'
            }
            onPress={() => {
              if (order.status === 'READY_TO_PICKUP') {
                Alert.alert('La commande est-elle récupérée ?', '', [
                  {
                    text: 'Non',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'Oui',
                    onPress: () => {
                      orderRef.update({ status: 'DELIVERY_IN_PROGRESS' });
                      setCurrentCourse(null);
                    },
                  },
                ]);
              } else {
                Alert.alert('La commande est-elle livrée ?', '', [
                  {
                    text: 'Non',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'Oui',
                    onPress: () => {
                      pinBottomSheetRef.current?.expand();
                    },
                  },
                ]);
              }
            }}
          />
          <View style={{ flexDirection: 'row' }}>
            <IconButton
              icon={require('assets/icons/call.png')}
              style={{ marginRight: responsiveWidth(2) }}
            />
            <IconButton icon={require('assets/icons/map.png')} />
          </View>
        </View>
        <Separator style={{ marginBottom: 0 }} />

        <BottomSheetScrollView
          edges={['bottom']}
          style={{ backgroundColor: Palette.white }}
          contentContainerStyle={{
            paddingHorizontal: gutters,
            paddingTop: responsiveHeight(2),
          }}
        >
          <ItinaryDetails {...{ order }} />
          {/* <Button secondary text={'Signaler un problème'} style={{borderColor: 'transparent'}} textColor={Palette.red} /> */}
        </BottomSheetScrollView>
      </BottomSheet>
      <PinCodeSheet
        ref={pinBottomSheetRef}
        pin={order.pin}
        onSuccess={() => {
          orderRef.update({ status: 'DELIVERED' });
          firestore()
            .collection('users')
            .doc(auth().currentUser.uid)
            .update({ isDriverInCourse: false });
          setCurrentCourse(null);
        }}
      />
    </>
  );
}
