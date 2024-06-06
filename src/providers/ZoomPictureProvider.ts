import React, { createRef, useRef, useState, ReactNode } from 'react';
import {
  Animated,
  TouchableWithoutFeedback,
  Modal,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useGlobal } from 'reactn';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PinchGestureHandler,
  State,
  PanGestureHandlerGestureEvent,
  PinchGestureHandlerGestureEvent,
  HandlerStateChangeEvent,
} from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Motion } from '@legendapp/motion';
import { gutters } from '../styles';
import { _rSize, _size } from '../styles/SharedStyles';
import { icons } from '../assets';

interface ZoomPictureProviderProps {
  children: ReactNode;
}

export default function ZoomPictureProvider({ children }: ZoomPictureProviderProps) {
  const [zoomPicture, setZoomPicture] = useGlobal<string | null>('zoomPicture');
  const [config] = useGlobal<any>('_config');

  const {
    colors: { background, primary },
  } = config;
  const insets = useSafeAreaInsets();

  const [panEnabled, setPanEnabled] = useState(false);

  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const pinchRef = createRef<PinchGestureHandler>();
  const panRef = createRef<PanGestureHandler>();

  const onPinchEvent = Animated.event<PinchGestureHandlerGestureEvent>(
    [
      {
        nativeEvent: { scale },
      },
    ],
    { useNativeDriver: true }
  );

  const onPanEvent = Animated.event<PanGestureHandlerGestureEvent>(
    [
      {
        nativeEvent: {
          translationX: translateX,
          translationY: translateY,
        },
      },
    ],
    { useNativeDriver: true }
  );

  const handlePinchStateChange = ({ nativeEvent }: HandlerStateChangeEvent<PinchGestureHandlerGestureEvent>) => {
    // enabled pan only after pinch-zoom
    if (nativeEvent.state === State.ACTIVE) {
      setPanEnabled(true);
    }

    // when scale < 1, reset scale back to original (1)
    const nScale = nativeEvent.scale;
    if (nativeEvent.state === State.END) {
      if (nScale < 1) {
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true,
        }).start();
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();

        setPanEnabled(false);
      }
    }
  };

  return (
    <>
      {children}
      <Modal
        useNativeDriver={true}
        visible={!!zoomPicture}
        onDismiss={() => {
          scale.setValue(1);
          translateX.setValue(0);
          translateY.setValue(0);
        }}
        transparent={true}
      >
        <Motion.View
          style={{
            flex: 1,
          }}
          initial={{
            opacity: 0,
            scale: 0,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            type: 'timing',
            duration: 250,
          }}
        >
          <TouchableWithoutFeedback onPress={() => setZoomPicture(false)}>
            <View
              style={{
                flex: 1,
                backgroundColor: background,
              }}
            >
              <GestureHandlerRootView>
                <PanGestureHandler
                  onGestureEvent={onPanEvent}
                  ref={panRef}
                  simultaneousHandlers={[pinchRef]}
                  enabled={panEnabled}
                  shouldCancelWhenOutside={true}
                >
                  <Animated.View>
                    <PinchGestureHandler
                      ref={pinchRef}
                      onGestureEvent={onPinchEvent}
                      simultaneousHandlers={[panRef]}
                      onHandlerStateChange={handlePinchStateChange}
                    >
                      <Animated.Image
                        source={{ uri: zoomPicture || '' }}
                        style={{
                          width: '100%',
                          height: '100%',
                          transform: [
                            { scale },
                            { translateX },
                            { translateY },
                          ],
                        }}
                        resizeMode="contain"
                        onError={(e) => console.warn(e)}
                      />
                    </PinchGestureHandler>
                  </Animated.View>
                </PanGestureHandler>
              </GestureHandlerRootView>
              <TouchableOpacity
                onPress={() => setZoomPicture(false)}
                style={{
                  ..._rSize(8),
                  borderRadius: 24,
                  backgroundColor: background,
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',
                  top: insets.top || responsiveHeight(2),
                  left: gutters,
                }}
              >
                <Image
                  style={{
                    ..._size(12),
                    tintColor: primary,
                  }}
                  source={icons.close}
                />
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </Motion.View>
      </Modal>
    </>
  );
}