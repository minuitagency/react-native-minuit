import React, { useEffect, useState } from 'reactn';
import { Image, Pressable, Text, View } from 'react-native';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import auth from '@react-native-firebase/auth';
import functions from '@react-native-firebase/functions';
import ModalWebView from '.././ModalWebView';
import { formatNumber } from '../actions/userActions';
import styles, { mainBorderRadius } from './styles/global';
import Fonts from './styles/fonts';
import { Palette } from './styles/colors';

export default function Wallet() {
  const [walletBalance, setWalletBalance] = useState(null);
  const [walletLink, setWalletLink] = useState(null);
  const [showAccountLink, setShowAccountLink] = useState(null);
  const uid = auth()?.currentUser?.uid || null;

  useEffect(() => {
      //getUserWallet();
  }, [uid]);

  const getUserWallet = async () => {
    try {
      const {
        data: {totalBalance, accountLink},
      } = await functions().httpsCallable('payment-getAccountBalance')();

      setWalletBalance(totalBalance);
      setWalletLink(accountLink);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Pressable
        onPress={() => setShowAccountLink(true)}
        style={{
          ...styles.containerCenter,
          width: '100%',
          height: responsiveHeight(12),
          borderRadius: mainBorderRadius,
          overflow: 'hidden',
          marginBottom: responsiveHeight(2),
        }}>
        <Image
          resizeMode={'cover'}
          source={require('../assets/backgrounds/wallet.png')}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}
        />

        <View style={{alignItems: 'center'}}>
          <Text
            style={[Fonts.primary.medium(20, Palette.white), {marginBottom: responsiveHeight(1)}]}>
            {walletBalance ? `${formatNumber(walletBalance)}€` : '...'}
          </Text>

          <Text style={Fonts.primary.medium(14, Palette.white)}>
            Wallet
          </Text>
        </View>
      </Pressable>

      <ModalWebView
        presentationStyle={'formSheet'}
        animationType="slide"
        visible={showAccountLink}
        onDismiss={() => setShowAccountLink(null)}
        uri={walletLink}
      />
    </>
  );
}
