import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { Text, View } from 'react-native';
import { Fonts, gutters, Palette } from '@react-native-minuit/styles';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from './Button';
import React from 'react';
import ReactN from 'reactn';
import { AirbnbRating } from 'react-native-ratings';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default function RatingBottomSheet() {
  const [orders] = ReactN.useGlobal('orders');
  const bottomSheetRef = React.useRef();
  const snapPoints = React.useMemo(() => ['33%'], []);
  const [orderSelected, setOrderSelected] = React.useState(null);
  const [rating, setRating] = React.useState(null);

  React.useEffect(() => {
    if (auth().currentUser) {
      const orderDeliveredAndNotRated = orders.findIndex(
        (order) => order.status === 'DELIVERED' && !order.rated
      );
      const isOrderDeliveredAndNotRated = orderDeliveredAndNotRated !== -1;

      if (isOrderDeliveredAndNotRated) {
        bottomSheetRef.current?.expand();
        setOrderSelected(orders[orderDeliveredAndNotRated]);
      } else {
        bottomSheetRef.current?.close();
        setOrderSelected(null);
        setRating(null);
      }
    } else {
      setOrderSelected(null);
      setRating(null);
    }
  }, [orders, auth().currentUser]);

  return (
    <BottomSheet
      enablePanDownToClose
      handleComponent={null}
      backdropComponent={BottomSheetBackdrop}
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      style={{ paddingHorizontal: gutters }}
    >
      <View
        style={{
          paddingTop: responsiveHeight(2),
          flex: 1,
          paddingHorizontal: gutters,
          backgroundColor: Palette.white,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          alignItems: 'center',
        }}
      >
        <Text style={[Fonts.primary.semibold(20), { textAlign: 'center' }]}>
          Comment s&apos;est passé votre commande chez{' '}
          {orderSelected?.seller.name} ?
        </Text>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <AirbnbRating
            showRating={false}
            selectedColor={'#FFA900'}
            size={30}
            onFinishRating={setRating}
          />
        </View>
      </View>
      <SafeAreaView
        edges={['bottom']}
        style={{ paddingBottom: responsiveHeight(2) }}
      >
        <Button
          text={'Valider'}
          disabled={!rating}
          onPress={() => {
            const sellerRef = firestore()
              .collection('sellers')
              .doc(orderSelected.seller.id);
            firestore()
              .runTransaction((transaction) => {
                return transaction.get(sellerRef).then((sellerSnapshot) => {
                  if (!sellerSnapshot.exists) {
                    throw 'Document does not exist!';
                  }
                  const newRating = sellerSnapshot.data().rating || [
                    0, 0, 0, 0, 0, 0,
                  ];
                  newRating[rating] += 1;
                  transaction.update(sellerRef, { rating: newRating });
                });
              })
              .then(() => {
                firestore()
                  .collection('users')
                  .doc(auth().currentUser.uid)
                  .collection('orders')
                  .doc(orderSelected.id)
                  .update({ rated: true });
              })
              .catch((error) => {
                console.log('Transaction failed: ', error);
              });
          }}
        />
      </SafeAreaView>
    </BottomSheet>
  );
}
