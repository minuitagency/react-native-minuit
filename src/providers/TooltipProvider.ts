import React, { getGlobal, useEffect, useGlobal } from 'reactn';
import { Text } from 'react-native';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { Motion } from '@legendapp/motion';

import { Fonts, Palette, SharedStyles } from '../styles';

interface Tooltip {
  type: 'error' | 'info' | 'success';
  text: string;
}

interface TooltipProviderProps {
  children: React.ReactNode;
}

function TooltipProvider({ children }: TooltipProviderProps) {
  const [tooltip, setTooltip] = useGlobal<Tooltip | null>('_tooltip');
  const { _config: { colors } = {} } = getGlobal();

  useEffect(() => {
    const resetTimeout = setTimeout(async () => {
      setTooltip(null);
    }, 2500);

    return () => clearTimeout(resetTimeout);
  }, [tooltip]);

  function getBackgroundColor() {
    if (tooltip?.type === 'error') {
      return colors.destructive;
    }
    return colors.primary;
  }

  return (
    <>
      {children}

      <Motion.View
        animate={{
          top: tooltip ? responsiveHeight(6) : -50,
          opacity: tooltip ? 1 : 0,
        }}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 400,
        }}
        style={{
          ...SharedStyles.containerCenter,
          position: 'absolute',
          alignSelf: 'center',
          backgroundColor: getBackgroundColor(),
          padding: 10,
          paddingHorizontal: 20,
          borderRadius: 30,
        }}
      >
        <Text
          numberOfLines={2}
          style={[
            Fonts.primary.regular(14, Palette.mainWhite),
            { textAlign: 'center', margin: 0 },
          ]}
        >
          {tooltip?.text}
        </Text>
      </Motion.View>
    </>
  );
}

export default TooltipProvider;