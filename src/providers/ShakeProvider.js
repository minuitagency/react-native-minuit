import React, {useState, useCallback, useEffect, useGlobal} from 'reactn';
import {Text, Modal, View, Image, Pressable, SafeAreaView} from 'react-native';
import moment from 'moment';

import RNShake from '../../lib';

import {uploadToCloud} from '../actions/userActions';

import cloudInstance from '../config/cloud';

import {SharedStyles, Fonts, Palette, gutters} from '../styles';

import {LoadingProvider, TooltipProvider} from '../providers';

import {icons} from '../assets/';
import Button from '../components/Buttons/Button';
import Input from '../components/Inputs/Input';
import DismissKeyboard from '../components/Inputs/DismissKeyboard';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const isHorizontal = responsiveHeight(100) < responsiveWidth(100);

export default ({projectID = null, children}) => {
  const enabled = true;

  const [, setTooltip] = useGlobal('_tooltip');
  const [, setIsLoading] = useGlobal('_isLoading');

  const [showModal, setShowModal] = useState(true);
  const [step, setStep] = useState(0);

  const [screenshotURI, setScreenshotURI] = useState(null);
  const [description, setDescription] = useState(__DEV__ ? 'teeeeeeeest' : '');

  const stepList = [
    {title: 'Envoyer un nouveau rapport', showTitle: !isHorizontal},
    {title: 'Description du problème'},
  ];

  React.useEffect(() => {
    const subscription = RNShake.addListener(data => {
      if (enabled) {
        setScreenshotURI(data);
        setShowModal(true);
      } else {
        console.log('Shake disabled');
      }
    });

    return () => {
      subscription?.remove?.();
    };
  }, [enabled]);

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

      if (description.length > 500) {
        throw new Error('Description trop longue');
      }

      if (!screenshotURI) {
        throw new Error("Aucune capture d'écran détectée...");
      }

      setIsLoading(true);
      setTooltip({text: 'Publication en cours ...'});

      const {uri} = await uploadToCloud({
        path: `shakes/${projectID}/${moment().valueOf()}.jpg`,
        uri: screenshotURI,
      });

      await cloudInstance.functions().httpsCallable('shakes-submitNewShake')({
        screenshot: uri,
        description: description.trim(),
        projectID,
      });

      setTooltip({text: 'Publication effectuée !'});
      setShowModal(false);
    } catch (e) {
      console.log(e.message);
      setTooltip({text: e.message});
    } finally {
      setIsLoading(false);
    }
  };

  const Header = useCallback(() => {
    return (
      <SafeAreaView
        style={[
          SharedStyles.containerRowSpaceBetween,
          {backgroundColor: Palette.darkPurple, padding: 10, minHeight: 50},
        ]}>
        <Pressable
          onPress={() => {
            if (step === 0) {
              setShowModal(false);
            } else {
              setStep(step - 1);
            }
          }}>
          <Image
            resizeMode="contain"
            source={icons.back}
            style={{height: 20, width: 20, tintColor: Palette.mainWhite}}
          />
        </Pressable>

        <Image
          resizeMode="contain"
          source={require('../assets/images/logoFull.png')}
          style={{height: 20, width: 100}}
        />

        <View style={{width: 30}} />
      </SafeAreaView>
    );
  }, [step]);

  const currentStep = stepList[step];

  return (
    <>
      <View style={{flex: 1}}>{children}</View>

      <Modal
        animationType="slide"
        visible={showModal}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}
        presentationStyle={'formSheet'}>
        <LoadingProvider>
          <TooltipProvider>
            <DismissKeyboard>
              <Header />

              <SafeAreaView
                style={{
                  flex: 1,
                  padding: 20,
                  backgroundColor: '#13131a',
                }}>
                {currentStep?.showTitle && (
                  <Text
                    style={[
                      Fonts.primary.bold(17, Palette.mainWhite),
                      {textAlign: 'center', marginBottom: 20},
                    ]}>
                    {currentStep?.title || ''}
                  </Text>
                )}

                {!step ? (
                  <View
                    style={{
                      flex: 0.8,
                      borderRadius: 10,
                      overflow: 'hidden',
                    }}>
                    <Image
                      resizeMode={'cover'}
                      style={{flex: 1}}
                      source={{
                        uri: screenshotURI,
                      }}
                    />
                  </View>
                ) : (
                  <Input
                    style={{height: 300, backgroundColor: Palette.mainWhite}}
                    value={description}
                    onChange={setDescription}
                    isTextarea
                  />
                )}

                <Button
                  text={step === stepList.length - 1 ? 'Envoyer' : 'Continuer'}
                  primary
                  isAbsoluteBottom
                  containerStyle={
                    isHorizontal
                      ? {
                          bottom: gutters,
                          right: 0,
                          left: 0,
                        }
                      : {}
                  }
                  style={{
                    ...(isHorizontal
                      ? {width: '40%', alignSelf: 'center', minHeight: 40}
                      : {}),
                    backgroundColor: Palette.primary,
                  }}
                  textColor={Palette.mainWhite}
                  onPress={() => {
                    if (step === stepList.length - 1) {
                      submitShake();
                    } else {
                      setStep(step + 1);
                    }
                  }}
                />
              </SafeAreaView>
            </DismissKeyboard>
          </TooltipProvider>
        </LoadingProvider>
      </Modal>
    </>
  );
};
