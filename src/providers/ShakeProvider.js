import React, { useState, useCallback, useEffect } from 'reactn';
import {
  Text,
  Modal,
  View,
  Image,
  Pressable,
  SafeAreaView,
  Platform,
} from "react-native";
import moment from 'moment';

import RNShake from '../../lib';

import { uploadToCloud } from '../actions/userActions';

import cloudInstance from '../config/cloud';

import { SharedStyles, Fonts, Palette, gutters } from '../styles';

import { LoadingProvider, TooltipProvider } from '../providers';

import { icons } from '../assets/';
import Button from '../components/Buttons/Button';
import Input from '../components/Inputs/Input';
import DismissKeyboard from '../components/Inputs/DismissKeyboard';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const isHorizontal = responsiveHeight(100) < responsiveWidth(100);

interface Props {
  projectID?: string | null;
  enabled?: boolean;
  children: React.ReactNode;
}

interface Step {
  title: string;
  showTitle: boolean;
}

const stepList: Step[] = [
  { title: 'Envoyer un nouveau rapport', showTitle: !isHorizontal },
  { title: 'Description du problème', showTitle: true },
];

const MyComponent: React.FC<Props> = ({ projectID = null, enabled = false, children }) => {
  const [, setTooltip] = useGlobal('_tooltip');
  const [, setIsLoading] = useGlobal('_isLoading');
  const [consoleLogs] = useGlobal('_consoleLogs');

  const [showModal, setShowModal] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);

  const [screenshotURI, setScreenshotURI] = useState<string | null>(null);
  const [tmpScreenshotURI, setTmpScreenshotURI] = useState<string | null>(null);
  const [description, setDescription] = useState<string>(__DEV__ ? 'teeeeeeeest' : '');

  useEffect(() => {
    if (tmpScreenshotURI && !screenshotURI) {
      setScreenshotURI(tmpScreenshotURI);
    }
  }, [tmpScreenshotURI]);

  useEffect(() => {
    const subscription = RNShake.addListener((data: string) => {
      if (enabled) {
        setTmpScreenshotURI(data);
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
      setTmpScreenshotURI(null);
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

      if (!screenshotURI && !__DEV__) {
        throw new Error("Aucune capture d'écran détectée...");
      }

      await setIsLoading(true);
      await setTooltip({ text: 'Publication en cours ...' });

      const { uri } = await uploadToCloud({
        path: `shakes/${projectID}/${moment().valueOf()}.jpg`,
        uri: screenshotURI,
      });

      await cloudInstance.functions().httpsCallable("shakes-submitNewShake")({
        screenshot: uri,
        description: description.trim(),
        projectID,
        consoleLogs,
        platform: Platform.OS === "ios" ? "IOS" : "ANDROID",
      });

      await setTooltip({ text: 'Publication effectuée !' });
      setShowModal(false);
    } catch (e: any) {
      console.log(e.message);
      await setTooltip({ text: e.message });
    } finally {
      await setIsLoading(false);
    }
  };

  const Header = useCallback(() => {
    return (
      <SafeAreaView style={[{ backgroundColor: Palette.darkPurple }]}>
        <View style={{ ...SharedStyles.containerRowSpaceBetween, padding: 20 }}>
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
              style={{ height: 20, width: 20, tintColor: Palette.mainWhite }}
            />
          </Pressable>

          <Image
            resizeMode="contain"
            source={require('../assets/images/logoFull.png')}
            style={{ height: 20, width: 100 }}
          />

          <View style={{ width: 30 }} />
        </View>
      </SafeAreaView>
    );
  }, [step]);

  const currentStep = stepList[step];

  return (
    <>
      <View style={{ flex: 1 }}>{children}</View>

      <Modal
        animationType="slide"
        visible={showModal}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}
        presentationStyle={'formSheet'}
      >
        <LoadingProvider>
          <TooltipProvider>
            <DismissKeyboard>
              <Header />

              <SafeAreaView
                style={{
                  flex: 1,
                  backgroundColor: '#13131a',
                }}
              >
                <View style={{ flex: 1, padding: 20 }}>
                  {currentStep?.showTitle && (
                    <Text
                      style={[
                        Fonts.primary.regular(15, Palette.mainWhite),
                        { textAlign: 'center', marginBottom: 20 },
                      ]}
                    >
                      {currentStep?.title || ''}
                    </Text>
                  )}

                  {!step ? (
                    <View
                      style={{
                        flex: 0.8,
                        borderRadius: 10,
                        overflow: 'hidden',
                      }}
                    >
                      <Image
                        resizeMode={'cover'}
                        style={{ flex: 1 }}
                        source={{
                          uri: __DEV__
                            ? 'https://m.media-amazon.com/images/I/51q1y-Ae9gL.png'
                            : screenshotURI,
                        }}
                      />
                    </View>
                  ) : (
                    <Input
                      style={{
                        height: isHorizontal ? 150 : 300,
                        backgroundColor: Palette.mainWhite,
                      }}
                      value={description}
                      onChange={setDescription}
                      isTextarea
                    />
                  )}

                  <Button
                    text={
                      step === stepList.length - 1 ? 'Envoyer' : 'Continuer'
                    }
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
                        ? { width: '50%', alignSelf: 'center', minHeight: 40 }
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
                </View>
              </SafeAreaView>
            </DismissKeyboard>
          </TooltipProvider>
        </LoadingProvider>
      </Modal>
    </>
  );
};

export default MyComponent;
