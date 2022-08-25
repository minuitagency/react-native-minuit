import React, { useState, useRef } from 'reactn';
import { Image, StyleSheet, Modal } from 'react-native';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import PlacesInput from 'react-native-places-input';
import MapView, { Marker } from 'react-native-maps';
import { Fonts, Palette, Style } from 'styles';
import { Button, DismissKeyboard } from 'components';
import { formatCoordinates, animateToCoordinates } from '../../actions/locationActions';
import { apiKeyGooglePlaces } from '../config/config';
export default function AddressSelection(_ref) {
  var _newCoordinates$coord, _newCoordinates$coord2;

  let {
    visible = false,
    setIsVisible = () => null,
    coordinates = null,
    setCoordinates
  } = _ref;
  const [newCoordinates, setNewCoordinates] = useState(coordinates || null);
  const mapRef = useRef();
  return /*#__PURE__*/React.createElement(Modal, {
    presentationStyle: 'formSheet',
    animationType: "slide",
    visible: visible,
    onRequestClose: () => {
      setIsVisible(false);
    },
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(DismissKeyboard, null, /*#__PURE__*/React.createElement(MapView, {
    ref: mapRef,
    rotateEnabled: false,
    style: {
      flex: 1,
      ...StyleSheet.absoluteFill
    },
    region: {
      latitude: 44.853057263793794,
      longitude: -0.5679415038745691,
      latitudeDelta: 10,
      longitudeDelta: 10
    }
  }, newCoordinates && /*#__PURE__*/React.createElement(Marker, {
    coordinate: {
      latitude: (newCoordinates === null || newCoordinates === void 0 ? void 0 : (_newCoordinates$coord = newCoordinates.coordinates) === null || _newCoordinates$coord === void 0 ? void 0 : _newCoordinates$coord.latitude) || 0,
      longitude: (newCoordinates === null || newCoordinates === void 0 ? void 0 : (_newCoordinates$coord2 = newCoordinates.coordinates) === null || _newCoordinates$coord2 === void 0 ? void 0 : _newCoordinates$coord2.longitude) || 0
    }
  })), /*#__PURE__*/React.createElement(PlacesInput, {
    stylesContainer: {
      position: 'absolute',
      top: responsiveHeight(5),
      right: 24,
      left: 24
    },
    stylesInput: {
      borderRadius: 10
    },
    clearQueryOnSelect: true,
    placeHolder: (newCoordinates === null || newCoordinates === void 0 ? void 0 : newCoordinates.address) || "Quelle est l'adresse de l'évènement?",
    iconInput: /*#__PURE__*/React.createElement(Image, {
      style: {
        height: 20,
        width: 30,
        tintColor: Palette.primary
      },
      resizeMode: "contain",
      source: require('../assets/icons/focusLocation.png')
    }),
    textInputProps: {
      returnKeyType: 'done',
      autoFocus: true,
      ...Fonts.primary.regular(14, Palette.black)
    },
    googleApiKey: apiKeyGooglePlaces,
    queryFields: 'formatted_address,geometry,name,address_components',
    onSelect: inputData => {
      const {
        geometry: {
          location: {
            lat: latitude,
            lng: longitude
          }
        },
        formatted_address: address
      } = inputData.result;
      setNewCoordinates(formatCoordinates({
        latitude,
        longitude,
        address
      }));
      animateToCoordinates({
        coordinates: {
          latitude,
          longitude
        },
        mapRef
      });
    },
    language: 'fr-FR'
  }), /*#__PURE__*/React.createElement(Button, {
    onPress: () => {
      if (newCoordinates) {
        setCoordinates(newCoordinates);
      }

      setIsVisible(false);
    },
    value: "Valider l'adresse",
    containerStyle: [Style.con({
      pos: 'absolute',
      b: 145,
      r: 24,
      l: 24,
      w: 'auto'
    })]
  }), /*#__PURE__*/React.createElement(Button, {
    onPress: () => setIsVisible(false),
    value: "Annuler",
    containerStyle: Style.con({
      pos: 'absolute',
      b: 90,
      r: 24,
      l: 24,
      w: 'auto'
    }),
    style: {
      backgroundColor: Palette.gray2
    },
    textStyle: Fonts.primary.bold(16, Palette.white)
  })));
}
//# sourceMappingURL=AddressSelection.js.map