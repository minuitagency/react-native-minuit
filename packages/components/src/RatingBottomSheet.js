import React, { useCallback, useMemo } from 'react';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { Text, View } from 'react-native';
import { Fonts, gutters, Palette } from '@react-native-minuit/styles';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import Button from './Button';
import ReactN from 'reactn';
import { AirbnbRating } from 'react-native-ratings';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function RatingBottomSheet() {
  const [orders] = ReactN.useGlobal('orders');
  const bottomSheetRef = React.useRef();
  const snapPoints = React.useMemo(() => ['33%'], []);
  const [orderSelected, setOrderSelected] = React.useState(null);
  const [rating, setRating] = React.useState(null);
  const insets = useSafeAreaInsets();

  const orderDeliveredAndNotRated = useMemo(
    () =>
      orders.findIndex((order) => order.status === 'DELIVERED' && !order.rated),
    [orders]
  );

  const isOrderDeliveredAndNotRated = useMemo(
    () => orderDeliveredAndNotRated !== -1,
    [orderDeliveredAndNotRated]
  );

  React.useEffect(() => {
    if (isOrderDeliveredAndNotRated) {
      bottomSheetRef.current?.expand();
      setOrderSelected(orders[orderDeliveredAndNotRated]);
    } else {
      bottomSheetRef.current?.close();
      setOrderSelected(null);
      setRating(null);
    }
  }, [isOrderDeliveredAndNotRated]);

  //if (Platform.OS === 'android' && !isOrderDeliveredAndNotRated) return null;

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  const rateOrder = () => {
    const sellerRef = firestore()
      .collection('sellers')
      .doc(orderSelected.seller.id);
    firestore()
      .runTransaction((transaction) => {
        return transaction.get(sellerRef).then((sellerSnapshot) => {
          if (!sellerSnapshot.exists) {
            throw 'Document does not exist!';
          }
          const newRating = sellerSnapshot.data().rating || [0, 0, 0, 0, 0, 0];
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
  };

  return (
    <BottomSheet
      index={-1}
      enablePanDownToClose
      handleComponent={null}
      backdropComponent={renderBackdrop}
      ref={bottomSheetRef}
      snapPoints={snapPoints}
    >
      <BottomSheetView
        style={{
          paddingTop: responsiveHeight(2),
          paddingBottom: insets.bottom + responsiveHeight(2),
          flex: 1,
          paddingHorizontal: gutters,
          backgroundColor: Palette.white,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text style={[Fonts.primary.semibold(20), { textAlign: 'center' }]}>
          Comment s&apos;est passé votre commande chez{' '}
          {orderSelected?.seller.name} ?
        </Text>
        <View
          style={{
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
        <Button
          fullWidth
          text={'Valider'}
          disabled={!rating}
          onPress={rateOrder}
        />
      </BottomSheetView>
    </BottomSheet>
  );
}
