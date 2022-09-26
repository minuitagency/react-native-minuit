import React, { useState, useCallback, useEffect, useGlobal } from "reactn";
import { Text, Modal, View, Image, Pressable } from "react-native";
import moment from "moment";

import RNShake from "../../lib";

import { uploadToCloud } from "../actions/userActions";

import cloudInstance from "../config/cloud";

import { SharedStyles, Fonts, Palette } from "../styles";

import { LoadingProvider, TooltipProvider } from "../providers";

import { icons } from "../assets/";
import Button from "../components/Buttons/Button";
import Input from "../components/Inputs/Input";
import DismissKeyboard from "../components/Inputs/DismissKeyboard";

const stepList = [
  { title: "Envoyer un nouveau rapport" },
  { title: "Description du problème" },
];

export default ({ projectID = null, children }) => {
  const [, setTooltip] = useGlobal("_tooltip");
  const [, setIsLoading] = useGlobal("_isLoading");

  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(0);

  const [screenshotURI, setScreenshotURI] = useState(null);
  const [description, setDescription] = useState(__DEV__ ? "teeeeeeeest" : "");

  React.useEffect(() => {
    const subscription = RNShake.addListener((data) => {
      console.log("hello", data);
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
      setDescription("");
      setStep(0);
    }
  }, [showModal]);

  const submitShake = async () => {
    try {
      if (description.length < 5) {
        throw new Error("Description trop courte");
      }

      if (description.length > 500) {
        throw new Error("Description trop longue");
      }

      if (!screenshotURI) {
        throw new Error("Aucune capture d'écran détectée...");
      }

      setIsLoading(true);
      setTooltip({ text: "Publication en cours ..." });

      const { uri } = await uploadToCloud({
        path: `shakes/${projectID}/${moment().valueOf()}.jpg`,
        uri: screenshotURI,
      });

      await cloudInstance.functions().httpsCallable("shakes-submitNewShake")({
        screenshot: uri,
        description: description.trim(),
        projectID,
      });

      setTooltip({ text: "Publication effectuée !" });
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
      <View
        style={[
          SharedStyles.containerRowSpaceBetween,
          { backgroundColor: Palette.darkPurple, padding: 20 },
        ]}
      >
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
          source={require("../assets/images/logoFull.png")}
          style={{ height: 30, width: 150 }}
        />

        <View style={{ width: 30 }} />
      </View>
    );
  }, [step]);

  return (
    <>
      <View style={{ flex: 1 }}>{children}</View>

      <Modal
        animationType="slide"
        visible={showModal}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}
        presentationStyle={"formSheet"}
      >
        <LoadingProvider>
          <TooltipProvider>
            <DismissKeyboard>
              <Header />

              <View
                style={{
                  flex: 1,
                  padding: 20,
                  backgroundColor: "#13131a",
                }}
              >
                <Text
                  style={[
                    Fonts.primary.bold(17, Palette.mainWhite),
                    { textAlign: "center", marginBottom: 20 },
                  ]}
                >
                  {stepList[step].title}
                </Text>

                {!step ? (
                  <View
                    style={{ flex: 0.8, borderRadius: 10, overflow: "hidden" }}
                  >
                    <Image
                      resizeMode={"cover"}
                      style={{ flex: 1 }}
                      source={{
                        uri: screenshotURI,
                      }}
                    />
                  </View>
                ) : (
                  <Input
                    style={{ height: 300, backgroundColor: Palette.mainWhite }}
                    value={description}
                    onChange={setDescription}
                    isTextarea
                  />
                )}

                <Button
                  text={step === stepList.length - 1 ? "Envoyer" : "Continuer"}
                  primary
                  isAbsoluteBottom
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
            </DismissKeyboard>
          </TooltipProvider>
        </LoadingProvider>
      </Modal>
    </>
  );
};
