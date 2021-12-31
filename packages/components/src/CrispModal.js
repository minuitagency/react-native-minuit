import CrispChat, {
  resetSession,
  setUserNickname,
  setUserPhone,
  setUserTokenId,
  show,
} from 'react-native-crisp-chat-sdk';
import React from 'react';
import ReactN from 'reactn';

export default function CrispModal() {
  const [showCrisp, setShowCrisp] = ReactN.useGlobal('showCrisp');
  const [user, setUser] = ReactN.useGlobal('user');

  React.useEffect(() => {
    if (!user) {
      resetSession();
    } else {
      if (user.phone) setUserPhone(user.phone);
      if (user.id) setUserTokenId(user.id);
      if (user.firstName && user.lastName)
        setUserNickname(`${user.firstName} ${user.lastName}`);
    }
  }, [user]);

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
