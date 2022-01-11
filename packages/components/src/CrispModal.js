import React from 'react';
import ReactN from 'reactn';
import ModalWebView from './ModalWebView';

export default function CrispModal({
  showCrisp,
  setShowCrisp,
  crispId = '1f800d0f-2456-4621-a9ae-43cd13c6a1f3',
}) {
  const [showCrispGlobal, setShowCrispGlobal] = ReactN.useGlobal('showCrisp');
  const [user] = ReactN.useGlobal('user');

  const visible = showCrisp === undefined ? showCrispGlobal : showCrisp;
  const setVisible =
    showCrisp === undefined ? setShowCrispGlobal : setShowCrisp;

  if (!user) return null;

  const crispBaseUrl = 'https://go.crisp.chat/chat/embed/';
  const crispURL = `${crispBaseUrl}?website_id=${crispId}&user_nickname=${user.firstName}&user_phone=${user.phone}&token_id=${user.id}`;

  return (
    <ModalWebView
      uri={crispURL}
      visible={visible}
      onDismiss={() => setVisible(false)}
    />
  );
}
