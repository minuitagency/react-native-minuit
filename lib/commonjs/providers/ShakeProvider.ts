"use strict";

import React, { useGlobal, useState, useEffect, useCallback, Fragment } from 'reactn';
import { View, Pressable, Image, Modal, Text } from 'react-native';
import moment from 'moment';
import lib from '../../lib';
import { uploadToCloud } from '../actions/userActions';
import cloud from '../config/cloud';
import { SharedStyles, Palette, Fonts } from '../styles';
import { icons } from '../assets/';
import Button from '../components/Buttons/Button';
import Input from '../components/Inputs/Input';

interface ShakeProviderProps {
  projectID?: string | null;
  children: React.ReactNode;
}

interface Tooltip {
  text: string;
}

interface UploadToCloudParams {
  path: string;
  uri: string;
}

interface ShakeSubmitParams {
  screenshot: string;
  description: string;
  projectID: string | null;
}

const stepList = [
  { title: 'Envoyer un nouveau rapport' },
  { title: 'Description du problème' }
];

const ShakeProvider: React.FC<ShakeProviderProps> = ({ projectID = null, children }) => {
  const [, setTooltip] = useGlobal<Tooltip>('_tooltip');
  const [, setIsLoading] = useGlobal<boolean>('_isLoading');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);
  const [screenshotURI, setScreenshotURI] = useState<string | null>(null);
  const [description, setDescription] = useState<string>(__DEV__ ? 'teeeeeeeest' : '');

  useEffect(() => {
    const subscription = lib.addListener((data: string) => {
      console.log('hello', data);
      setScreenshotURI(data);
      setShowModal(true);
    });

    return () => {
      subscription?.remove?.();
    };
  }, []);

  useEffect(() => {
    if (showModal === false) {
      setScreenshotURI(null);
      setDescription('');
      setStep(0);
    }
  }, [showModal]);

  const submitShake = async () => {
    try {
      if (description.length < 5) {
        throw new Error('Description trop courte');
      }

      if (description.length > 250) {
        throw new Error('Description trop longue');
      }

      if (!screenshotURI) {
        throw new Error("Aucune capture d'écran détectée...");
      }

      setIsLoading(true);
      setTooltip({ text: 'Publication en cours ...' });

      const { uri } = await uploadToCloud({
        path: `shakes/${projectID}/${moment().valueOf()}.jpg`,
        uri: screenshotURI
      });

      await cloud.functions().httpsCallable('shakes-submitNewShake')({
        screenshot: uri,
        description,
        projectID
      });

      setTooltip({ text: 'Publication effectuée !' });
      setShowModal(false);
    } catch (e) {
      console.log(e.message);
      setTooltip({ text: e.message });
    } finally {
      setIsLoading(false);
    }
  };

  const Header = useCallback(() => {
    return (
      <View style={[SharedStyles.containerRowSpaceBetween, { backgroundColor: Palette.darkPurple, padding: 20 }]}>
        <Pressable
          onPress={() => {
            if (step === 0) {
              setShowModal(false);
            } else {
              setStep(step - 1);
            }
          }}
        >
          <Image
            resizeMode="contain"
            source={icons.back}
            style={{ height: 30, width: 30, tintColor: Palette.mainWhite }}
          />
        </Pressable>
        <Image
          resizeMode="contain"
          source={require('../assets/images/logoFull.png')}
          style={{ height: 30, width: 150 }}
        />
        <View style={{ width: 30 }} />
      </View>
    );
  }, [step]);

  return (
    <Fragment>
      <Pressable style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>{children}</View>
      </Pressable>
      <Modal
        animationType="slide"
        visible={showModal}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}
        presentationStyle="formSheet"
      >
        <Header />
        <View style={{ flex: 1, padding: 20, backgroundColor: '#13131a' }}>
          <Text style={[Fonts.primary.bold(17, Palette.mainWhite), { textAlign: 'center', marginBottom: 20 }]}>
            {stepList[step].title}
          </Text>
          {!step ? (
            <View style={{ flex: 0.8, borderRadius: 10, overflow: 'hidden' }}>
              <Image resizeMode="cover" style={{ flex: 1 }} source={{ uri: screenshotURI }} />
            </View>
          ) : (
            <Input
              style={{ height: 300, backgroundColor: Palette.mainWhite }}
              value={description}
              onChange={setDescription}
              isTextarea={true}
            />
          )}
          <Button
            text={step === stepList.length - 1 ? 'Envoyer' : 'Continuer'}
            primary={true}
            isAbsoluteBottom={true}
            textColor={Palette.mainWhite}
            onPress={() => {
              if (step === stepList.length - 1) {
                submitShake();
              } else {
                setStep(step + 1);
              }
            }}
          />
        </View>
      </Modal>
    </Fragment>
  );
};

export default ShakeProvider;
//# sourceMappingURL=ShakeProvider.js.map