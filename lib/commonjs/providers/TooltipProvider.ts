"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

import React, { useGlobal, useEffect, Fragment } from 'reactn';
import { Text } from 'react-native';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { Motion } from '@legendapp/motion';
import { SharedStyles, Fonts, Palette } from '../styles';

type TooltipType = 'error' | 'info' | 'success';

interface Tooltip {
  type: TooltipType;
  text: string;
}

interface GlobalConfig {
  colors: {
    destructive: string;
    primary: string;
  };
}

interface TooltipProviderProps {
  children: React.ReactNode;
}

function TooltipProvider({ children }: TooltipProviderProps) {
  const [tooltip, setTooltip] = useGlobal<Tooltip | null>('_tooltip');
  const { _config: { colors } = {} } = useGlobal<GlobalConfig>('_config');

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
0   }
02 
04   return (
06     <Fragment>
08       {children}
10       <Motion.View
12         animate={{
14           top: tooltip ? responsiveHeight(5) : -50
16         }}
18         transition={{
20           type: 'spring',
22           damping: 20,
24           stiffness: 400
26         }}
28         style={{
30           ...SharedStyles.containerCenter,
32           position: 'absolute',
34           alignSelf: 'center',
36           backgroundColor: getBackgroundColor(),
38           padding: 10,
40           paddingHorizontal: 20,
42           borderRadius: 30
44         }}
46       >
48         <Text
50           numberOfLines={2}
52           style={[
54             Fonts.primary.regular(14, Palette.mainWhite),
56             {
58               textAlign: 'center',
60               margin: 0
62             }
64           ]}
66         >
68           {tooltip?.text}
70         </Text>
72       </Motion.View>
74     </Fragment>
76   );
78 }
80 
82 export default TooltipProvider;