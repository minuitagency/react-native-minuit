// import React, { useEffect, useState } from 'react';
// import { Camera, CameraType, FlashMode, VideoCodec } from 'expo-camera';
// import { Linking, Platform, Text, TouchableOpacity, View } from 'react-native';
// import {
//   responsiveHeight,
//   responsiveWidth,
// } from 'react-native-responsive-dimensions';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { Ionicons } from '@expo/vector-icons';
// import { useGlobal } from 'reactn';
// import Button from '../Buttons/Button';
// import { gutters } from '../../../lib/module/styles';
//
// export default function MinuitCamera({
//   onPictureTaken,
//   onVideoTaken,
//   style,
//   theme = {
//     primary: 'red',
//     disabled: 'grey',
//     backgroundColor: '#fff',
//     button: {
//       backgroundColor: 'red',
//       textColor: '#FFF',
//       disabledBackgroundColor: 'grey',
//       disabledTextColor: '#FFF',
//     },
//     input: {
//       iconSize: 30,
//       backgroundColor: '#0F0F0F',
//       textInputBackgroundColor: '#FFF',
//       placeholderTextColor: '#000',
//       inputStyle: {},
//       darkInput: false,
//     },
//   },
//   videoMode = false,
// }) {
//   const [, setMsg] = useGlobal('_tooltip');
//   const [camReady, setCamReady] = useState(false);
//   const [permission, requestPermission] = Camera.useCameraPermissions();
//   const [camRef, setCameRef] = useState(null);
//   const [recording, setRecording] = useState(false);
//   const [isPictureMode, setIsPictureMode] = useState(true);
//   const [cameraType, setCameraType] = useState(CameraType.back);
//   const [viewDimension, setViewDimension] = useState(null);
//   const [imagePadding, setImagePadding] = useState(0);
//   const [ratio, setRatio] = useState('4:3');
//   const [isRatioSet, setIsRatioSet] = useState(false);
//   const [flash, setFlash] = useState(false);
//
//   const insets = useSafeAreaInsets();
//
//   const btnSize = responsiveWidth(16);
//
//   useEffect(() => {
//     if (!permission?.granted) {
//       requestPermission();
//     }
//   }, [permission]);
//
//   async function takePicture() {
//     try {
//       const picture = await camRef.takePictureAsync({ quality: 1 });
//       if (picture?.uri) {
//         onPictureTaken(picture);
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   }
//
//   async function takeVideo() {
//     try {
//       const promise = camRef.recordAsync({
//         videoCodec: VideoCodec.H264,
//         quality: '720p',
//         maxDuration: 60,
//         videoBitrate: 1 * 1000 * 1000,
//         mirrorVideo: cameraType === CameraType.front,
//       });
//
//       if (promise) {
//         setRecording(true);
//         const data = await promise;
//         onVideoTaken(data);
//       }
//     } catch (e) {
//       console.log(e);
//       await setMsg({
//         text: 'Une erreur est survenue. Vérifier vos permissions micro et caméra',
//         type: 'error',
//       });
//     } finally {
//       setRecording(false);
//     }
//   }
//
//   const prepareRatio = async () => {
//     let desiredRatio = '4:3';
//     if (Platform.OS === 'android') {
//       const screenRatio = viewDimension.height / viewDimension.width;
//       const ratios = await camRef.getSupportedRatiosAsync();
//       console.log({ ratios });
//       let distances = {};
//       let realRatios = {};
//       let minDistance = null;
//       for (const ratio of ratios) {
//         const parts = ratio.split(':');
//         const realRatio = parseInt(parts[0], 10) / parseInt(parts[1], 10);
//         realRatios[ratio] = realRatio;
//         const distance = screenRatio - realRatio;
//         distances[ratio] = realRatio;
//         if (minDistance == null) {
//           minDistance = ratio;
//         } else {
//           if (distance >= 0 && distance < distances[minDistance]) {
//             minDistance = ratio;
//           }
//         }
//       }
//       desiredRatio = minDistance;
//       const remainder = Math.floor(
//         (viewDimension.height -
//           realRatios[desiredRatio] * viewDimension.width) /
//           2
//       );
//       setImagePadding(remainder);
//       setRatio(desiredRatio);
//       setIsRatioSet(true);
//     }
//   };
//
//   useEffect(() => {
//     if (camReady && !isRatioSet && !!viewDimension) {
//       prepareRatio();
//     }
//   }, [camReady, isRatioSet, viewDimension]);
//
//   if (!permission) {
//     return <View />;
//   }
//
//   if (!permission.granted) {
//     return (
//       <View
//         style={{
//           flex: 1,
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}
//       >
//         <Text
//           style={{
//             color: theme.primary,
//             textAlign: 'center',
//             paddingHorizontal: responsiveWidth(10),
//             marginBottom: responsiveHeight(2),
//           }}
//         >
//           {"Vous n'avez pas donné la permission d'accès à la caméra"}
//         </Text>
//         <Button
//           text={'Ouvrir les paramètres'}
//           onPress={() => Linking.openSettings()}
//           style={{
//             paddingHorizontal: responsiveWidth(10),
//           }}
//         />
//       </View>
//     );
//   }
//
//   return (
//     <View
//       style={{
//         flex: 1,
//         ...style,
//       }}
//     >
//       <View
//         onLayout={(event) => {
//           const { height, width } = event.nativeEvent.layout;
//           setViewDimension({ height, width });
//         }}
//         style={{
//           flex: 1,
//           justifyContent: 'center',
//         }}
//       >
//         <Camera
//           ref={(ref) => setCameRef(ref)}
//           onCameraReady={() => setCamReady(true)}
//           type={cameraType}
//           ratio={ratio}
//           flashMode={flash ? FlashMode.on : FlashMode.off}
//           style={{
//             flex: 1,
//             marginVertical: imagePadding,
//           }}
//         />
//       </View>
//       {!!videoMode && (
//         <MediaTypeSelector
//           theme={theme}
//           disabled={recording}
//           style={{
//             alignSelf: 'center',
//             flexDirection: 'row',
//             alignItems: 'center',
//             marginTop: responsiveHeight(2),
//             marginBottom:
//               (insets.bottom || responsiveHeight(2)) +
//               btnSize +
//               responsiveHeight(2),
//           }}
//           isPictureMode={isPictureMode}
//           setIsPictureMode={setIsPictureMode}
//         />
//       )}
//       {camReady && !recording && (
//         <TouchableOpacity
//           onPress={() => setFlash(!flash)}
//           style={{
//             position: 'absolute',
//             bottom:
//               (insets.bottom || responsiveHeight(2)) + responsiveHeight(2),
//             left: gutters,
//           }}
//         >
//           <Ionicons
//             name={flash ? 'flash-outline' : 'flash-off-outline'}
//             size={theme.input.iconSize}
//             color={theme.primary}
//           />
//         </TouchableOpacity>
//       )}
//       {camReady && (
//         <TouchableOpacity
//           onPress={async () => {
//             if (isPictureMode) {
//               await takePicture();
//             } else {
//               if (recording) {
//                 camRef.stopRecording();
//               } else {
//                 await takeVideo();
//               }
//             }
//           }}
//           style={{
//             position: 'absolute',
//             bottom: insets.bottom || responsiveHeight(2),
//             alignSelf: 'center',
//           }}
//         >
//           <View
//             style={{
//               borderWidth: 2,
//               borderRadius: 50,
//               borderColor: 'white',
//               height: btnSize,
//               width: btnSize,
//               display: 'flex',
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}
//           >
//             {recording && (
//               <View
//                 style={{
//                   borderRadius: 5,
//                   backgroundColor: 'red',
//                   height: btnSize / 2,
//                   width: btnSize / 2,
//                 }}
//               />
//             )}
//           </View>
//         </TouchableOpacity>
//       )}
//       {camReady && !recording && (
//         <TouchableOpacity
//           onPress={() => {
//             if (cameraType === CameraType.back) {
//               setCameraType(CameraType.front);
//             } else {
//               setCameraType(CameraType.back);
//             }
//           }}
//           style={{
//             position: 'absolute',
//             bottom:
//               (insets.bottom || responsiveHeight(2)) + responsiveHeight(2),
//             right: gutters,
//           }}
//         >
//           <Ionicons
//             name="camera-reverse-outline"
//             size={theme.input.iconSize}
//             color={theme.primary}
//           />
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// }
//
// function MediaTypeSelector({
//   isPictureMode,
//   setIsPictureMode,
//   disabled = false,
//   theme,
//   style,
// }) {
//   return (
//     <View style={style}>
//       <TouchableOpacity
//         disabled={isPictureMode || disabled}
//         onPress={() => setIsPictureMode(true)}
//         style={{
//           marginRight: responsiveWidth(4),
//         }}
//       >
//         <Text
//           style={{
//             color: isPictureMode ? theme.primary : theme.disabled,
//           }}
//         >
//           Photo
//         </Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         disabled={!isPictureMode || disabled}
//         onPress={() => setIsPictureMode(false)}
//       >
//         <Text
//           style={{
//             color: !isPictureMode ? theme.primary : theme.disabled,
//           }}
//         >
//           Video
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// }
