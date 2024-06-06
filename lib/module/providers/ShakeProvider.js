import React, { useState, useCallback, useEffect } from 'react';
import { Text, Modal, View, Image, Pressable } from 'react-native';
import moment from 'moment';
import RNShake from '../../lib';
import { uploadToCloud } from '../actions/userActions';
import cloudInstance from '../config/cloud';
import { SharedStyles, Fonts, Palette } from '../styles';
import { icons } from '../assets/';
import Button from '../components/Buttons/Button';
import Input from '../components/Inputs/Input';
interface Step {
  title: string;
}
interface Props {
  projectID?: string | null;
  children: React.ReactNode;
}
const stepList: Step[] = [{
  title: 'Envoyer un nouveau rapport'
}, {
  title: 'Description du problème'
}];
const ShakeProvider: React.FC<Props> = ({ projectID = null, children }) => {
  const [, setTooltip] = useGlobal('_tooltip');
  const [, setIsLoading] = useGlobal('_isLoading');
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(0);
  const [screenshotURI, setScreenshotURI] = useState<string | null>(null);
  const [description, setDescription] = useState(__DEV__ ? 'teeeeeeeest' : '');
  useEffect(() => {
    const subscription = RNShake.addListener((data: string) => {
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
0     try {
02       if (description.length < 5) {
04         throw new Error('Description trop courte');
06       }
08       if (description.length > 250) {
10         throw new Error('Description trop longue');
12       }
14       if (!screenshotURI) {
16         throw new Error("Aucune capture d'écran détectée...");
18       }
20       setIsLoading(true);
22       setTooltip({
24         text: 'Publication en cours ...'
26       });
28       const { uri } = await uploadToCloud({
30         path: `shakes/${projectID}/${moment().valueOf()}.jpg`,
32         uri: screenshotURI
34       });
36       await cloudInstance.functions().httpsCallable('shakes-submitNewShake')({
38         screenshot: uri,
40         description,
42         projectID
44       });
46       setTooltip({
48         text: 'Publication effectuée !'
50       });
52       setShowModal(false);
54     } catch (e) {
56       console.log(e.message);
58       setTooltip({
60         text: e.message
62       });
64     } finally {
66       setIsLoading(false);
68     }
70   };
72   const Header = useCallback(() => {
74     return (
76       <View style={[SharedStyles.containerRowSpaceBetween, { backgroundColor: Palette.darkPurple, padding: 20 }]}>
78         <Pressable onPress={() => {
80           if (step === 0) {
82             setShowModal(false);
84           } else {
86             setStep(step - 1);
88           }
90         }}>
92           <Image
94             resizeMode="contain"
96             source={icons.back}
98             style={{ height: 30, width: 30, tintColor: Palette.mainWhite }}
00           />
02         </Pressable>
04         <Image
06           resizeMode="contain"
08           source={require('../assets/images/logoFull.png')}
10           style={{ height: 30, width: 150 }}
12         />
14         <View style={{ width: 30 }} />
16       </View>
18     );
20   }, [step]);
22   return (
24     <>
26       <Pressable style={{ flex: 1 }}>
28         <View style={{ flex: 1 }}>
30           {children}
32         </View>
34       </Pressable>
36       <Modal
38         animationType="slide"
40         visible={showModal}
42         onRequestClose={() => {
44           setShowModal(!showModal);
46         }}
48         presentationStyle='formSheet'
50       >
52         <Header />
54         <View style={{ flex: 1, padding: 20, backgroundColor: '#13131a' }}>
56           <Text style={[Fonts.primary.bold(17, Palette.mainWhite), { textAlign: 'center', marginBottom: 20 }]}>
58             {stepList[step].title}
60           </Text>
62           {!step ? (
64             <View style={{ flex: 0.8, borderRadius: 10, overflow: 'hidden' }}>
66               <Image
68                 resizeMode='cover'
70                 style={{ flex: 1 }}
72                 source={{ uri: screenshotURI }}
74               />
76             </View>
78           ) : (
80             <Input
82               style={{ height: 300, backgroundColor: Palette.mainWhite }}
84               value={description}
86               onChange={setDescription}
88               isTextarea={true}
90             />
92           )}
94           <Button
96             text={step === stepList.length - 1 ? 'Envoyer' : 'Continuer'}
98             primary={true}
00             isAbsoluteBottom={true}
02             textColor={Palette.mainWhite}
04             onPress={() => {
06               if (step === stepList.length - 1) {
08                 submitShake();
10               } else {
12                 setStep(step + 1);
14               }
16             }}
18           />
20         </View>
22       </Modal>
24     </>
26   );
28 };
30 export default ShakeProvider;