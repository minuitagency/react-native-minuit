import CrispChat, { setUserPhone, show } from 'react-native-crisp-chat-sdk';
import React from 'react';
import ReactN from 'reactn';
import auth from '@react-native-firebase/auth';

export default function CrispModal() {
  const [showCrisp, setShowCrisp] = ReactN.useGlobal('showCrisp');

  React.useEffect(() => {
    if (auth().currentUser) {
      setUserPhone(auth().currentUser.phoneNumber);
    }
  }, [auth().currentUser?.phoneNumber]);

  React.useEffect(() => {
    if (showCrisp) {
      show();
      setTimeout(() => {
        setShowCrisp(false);
      }, 1000);
    }
  }, [showCrisp]);

  return showCrisp ? <CrispChat /> : null;
}
