import React, { useEffect, useState } from 'react';
import { Camera, CameraType, FlashMode, VideoCodec } from 'expo-camera';
import { Linking, Platform, Text, TouchableOpacity, View } from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useGlobal } from 'reactn';
import Button from '../Buttons/Button';
import { gutters } from '../../../lib/module/styles';
type Theme = {
  primary: string;
  disabled: string;
  backgroundColor: string;
  button: {
    backgroundColor: string;
    textColor: string;
    disabledBackgroundColor: string;
    disabledTextColor: string;
  };
  input: {
    iconSize: number;
    backgroundColor: string;
    textInputBackgroundColor: string;
    placeholderTextColor: string;
    inputStyle: object;
    darkInput: boolean;
  };
};
type MinuitCameraProps = {
  onPictureTaken: (picture: any) => void;
  onVideoTaken: (video: any) => void;
  style?: object;
  theme?: Theme;
  videoMode?: boolean;
};
const MinuitCamera: React.FC<MinuitCameraProps> = ({
  onPictureTaken,
  onVideoTaken,
  style,
  theme = {
    primary: 'red',
    disabled: 'grey',
    backgroundColor: '#fff',
    button: {
0       backgroundColor: 'red',
02       textColor: '#FFF',
04       disabledBackgroundColor: 'grey',
06       disabledTextColor: '#FFF',
08     },
10     input: {
12       iconSize: 30,
14       backgroundColor: '#0F0F0F',
16       textInputBackgroundColor: '#FFF',
18       placeholderTextColor: '#000',
20       inputStyle: {},
22       darkInput: false,
24     },
26   },
28   videoMode = false,
30 }) => {
32   const [, setMsg] = useGlobal('_tooltip');
34   const [camReady, setCamReady] = useState(false);
36   const [permission, requestPermission] = Camera.useCameraPermissions();
38   const [camRef, setCameRef] = useState<Camera | null>(null);
40   const [recording, setRecording] = useState(false);
42   const [isPictureMode, setIsPictureMode] = useState(true);
44   const [cameraType, setCameraType] = useState(CameraType.back);
46   const [viewDimension, setViewDimension] = useState<{ height: number; width: number } | null>(null);
48   const [imagePadding, setImagePadding] = useState(0);
50   const [ratio, setRatio] = useState('4:3');
52   const [isRatioSet, setIsRatioSet] = useState(false);
54   const [flash, setFlash] = useState(false);
56   const insets = useSafeAreaInsets();
58   const btnSize = responsiveWidth(16);
60   useEffect(() => {
62     if (!permission?.granted) {
64       requestPermission();
66     }
68   }, [permission]);
70   async function takePicture() {
72     try {
74       const picture = await camRef?.takePictureAsync({ quality: 1 });
76       if (picture?.uri) {
78         onPictureTaken(picture);
80       }
82     } catch (e) {
84       console.log(e);
86     }
88   }
90   async function takeVideo() {
92     try {
94       const promise = camRef?.recordAsync({
96         videoCodec: VideoCodec.H264,
98         quality: '720p',
00         maxDuration: 60,
02         videoBitrate: 1 * 1000 * 1000,
04         mirrorVideo: cameraType === CameraType.front,
06       });
08       if (promise) {
10         setRecording(true);
12         const data = await promise;
14         onVideoTaken(data);
16       }
18     } catch (e) {
20       console.log(e);
22       await setMsg({
24         text: 'Une erreur est survenue. Vérifier vos permissions micro et caméra',
26         type: 'error',
28       });
30     } finally {
32       setRecording(false);
34     }
36   }
38   const prepareRatio = async () => {
40     let desiredRatio = '4:3';
42     if (Platform.OS === 'android') {
44       const screenRatio = viewDimension!.height / viewDimension!.width;
46       const ratios = await camRef!.getSupportedRatiosAsync();
48       console.log({ ratios });
50       let distances: { [key: string]: number } = {};
52       let realRatios: { [key: string]: number } = {};
54       let minDistance: string | null = null;
56       for (const ratio of ratios) {
58         const parts = ratio.split(':');
60         const realRatio = parseInt(parts[0], 10) / parseInt(parts[1], 10);
62         realRatios[ratio] = realRatio;
64         const distance = screenRatio - realRatio;
66         distances[ratio] = realRatio;
68         if (minDistance == null) {
70           minDistance = ratio;
72         } else {
74           if (distance >= 0 && distance < distances[minDistance]) {
76             minDistance = ratio;
78           }
80         }
82       }
84       desiredRatio = minDistance!;
86       const remainder = Math.floor(
88         (viewDimension!.height -
90           realRatios[desiredRatio] * viewDimension!.width) /
92           2
94       );
96       setImagePadding(remainder);
97       setRatio(desiredRatio);
99       setIsRatioSet(true);
00     }
02   };
04   useEffect(() => {
06     if (camReady && !isRatioSet && !!viewDimension) {
08       prepareRatio();
10     }
12   }, [camReady, isRatioSet, viewDimension]);
14   if (!permission) {
16     return <View />;
18   }
20   if (!permission.granted) {
22     return (
24       <View
26         style={{
28           flex: 1,
30           justifyContent: 'center',
32           alignItems: 'center',
34         }}
36       >
38         <Text
40           style={{
42             color: theme.primary,
44             textAlign: 'center',
46             paddingHorizontal: responsiveWidth(10),
48             marginBottom: responsiveHeight(2),
50           }}
52         >
54           {"Vous n'avez pas donné la permission d'accès à la caméra"}
56         </Text>
58         <Button
60           text={'Ouvrir les paramètres'}
62           onPress={() => Linking.openSettings()}
64           style={{
66             paddingHorizontal: responsiveWidth(10),
68           }}
70         />
72       </View>
74     );
76   }
78   return (
80     <View
82       style={{
84         flex: 1,
86         ...style,
88       }}
90     >
92       <View
94         onLayout={(event) => {
96           const { height, width } = event.nativeEvent.layout;
98           setViewDimension({ height, width });
00         }}
02         style={{
04           flex: 1,
06           justifyContent: 'center',
08         }}
10       >
12         <Camera
14           ref={(ref) => setCameRef(ref)}
16           onCameraReady={() => setCamReady(true)}
18           type={cameraType}
20           ratio={ratio}
22           flashMode={flash ? FlashMode.on : FlashMode.off}
24           style={{
26             flex: 1,
28             marginVertical: imagePadding,
30           }}
32         />
34       </View>
36       {!!videoMode && (
38         <MediaTypeSelector
40           theme={theme}
42           disabled={recording}
44           style={{
46             alignSelf: 'center',
48             flexDirection: 'row',
50             alignItems: 'center',
52             marginTop: responsiveHeight(2),
54             marginBottom:
56               (insets.bottom || responsiveHeight(2)) +
58               btnSize +
60               responsiveHeight(2),
62           }}
64           isPictureMode={isPictureMode}
66           setIsPictureMode={setIsPictureMode}
68         />
70       )}
72       {camReady && !recording && (
74         <TouchableOpacity
76           onPress={() => setFlash(!flash)}
78           style={{
80             position: 'absolute',
82             bottom:
84               (insets.bottom || responsiveHeight(2)) + responsiveHeight(2),
86             left: gutters,
88           }}
90         >
92           <Ionicons
94             name={flash ? 'flash-outline' : 'flash-off-outline'}
96             size={theme.input.iconSize}
98             color={theme.primary}
00           />
02         </TouchableOpacity>
04       )}
06       {camReady && (
08         <TouchableOpacity
10           onPress={async () => {
12             if (isPictureMode) {
14               await takePicture();
16             } else {
18               if (recording) {
20                 camRef?.stopRecording();
22               } else {
24                 await takeVideo();
26               }
28             }
30           }}
32           style={{
34             position: 'absolute',
36             bottom: insets.bottom || responsiveHeight(2),
38             alignSelf: 'center',
40           }}
42         >
44           <View
46             style={{
48               borderWidth: 2,
50               borderRadius: 50,
52               borderColor: 'white',
54               height: btnSize,
56               width: btnSize,
58               display: 'flex',
60               justifyContent: 'center',
62               alignItems: 'center',
64             }}
66           >
68             {recording && (
70               <View
72                 style={{
74                   borderRadius: 5,
76                   backgroundColor: 'red',
78                   height: btnSize / 2,
80                   width: btnSize / 2,
82                 }}
84               />
86             )}
88           </View>
90         </TouchableOpacity>
92       )}
94       {camReady && !recording && (
96         <TouchableOpacity
98           onPress={() => {
00             if (cameraType === CameraType.back) {
02               setCameraType(CameraType.front);
04             } else {
06               setCameraType(CameraType.back);
08             }
10           }}
12           style={{
14             position: 'absolute',
16             bottom:
18               (insets.bottom || responsiveHeight(2)) + responsiveHeight(2),
20             right: gutters,
22           }}
24         >
26           <Ionicons
28             name="camera-reverse-outline"
30             size={theme.input.iconSize}
32             color={theme.primary}
34           />
36         </TouchableOpacity>
38       )}
40     </View>
42   );
44 };
46 type MediaTypeSelectorProps = {
48   isPictureMode: boolean;
50   setIsPictureMode: (isPictureMode: boolean) => void;
52   disabled?: boolean;
54   theme: Theme;
56   style?: object;
58 };
60 const MediaTypeSelector: React.FC<MediaTypeSelectorProps> = ({
62   isPictureMode,
64   setIsPictureMode,
66   disabled = false,
68   theme,
70   style,
72 }) => {
74   return (
76     <View style={style}>
78       <TouchableOpacity
80         disabled={isPictureMode || disabled}
82         onPress={() => setIsPictureMode(true)}
84         style={{
86           marginRight: responsiveWidth(4),
88         }}
90       >
92         <Text
94           style={{
96             color: isPictureMode ? theme.primary : theme.disabled,
98           }}
00         >
02           Photo
04         </Text>
06       </TouchableOpacity>
08       <TouchableOpacity
10         disabled={!isPictureMode || disabled}
12         onPress={() => setIsPictureMode(false)}
14       >
16         <Text
18           style={{
20             color: !isPictureMode ? theme.primary : theme.disabled,
22           }}
24         >
26           Video
28         </Text>
30       </TouchableOpacity>
32     </View>
34   );
36 };
38 export default MinuitCamera;