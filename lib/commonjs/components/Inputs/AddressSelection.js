"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = AddressSelection;

var _reactn = _interopRequireWildcard(require("reactn"));

var _reactNative = require("react-native");

var _reactNativeResponsiveDimensions = require("react-native-responsive-dimensions");

var _reactNativePlacesInput = _interopRequireDefault(require("react-native-places-input"));

var _reactNativeMaps = _interopRequireWildcard(require("react-native-maps"));

var _styles = require("styles");

var _components = require("components");

var _locationActions = require("../../actions/locationActions");

var _config = require("../config/config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function AddressSelection(_ref) {
  var _newCoordinates$coord, _newCoordinates$coord2;

  let {
    visible = false,
    setIsVisible = () => null,
    coordinates = null,
    setCoordinates
  } = _ref;
  const [newCoordinates, setNewCoordinates] = (0, _reactn.useState)(coordinates || null);
  const mapRef = (0, _reactn.useRef)();
  return /*#__PURE__*/_reactn.default.createElement(_reactNative.Modal, {
    presentationStyle: 'formSheet',
    animationType: "slide",
    visible: visible,
    onRequestClose: () => {
      setIsVisible(false);
    },
    style: {
      flex: 1
    }
  }, /*#__PURE__*/_reactn.default.createElement(_components.DismissKeyboard, null, /*#__PURE__*/_reactn.default.createElement(_reactNativeMaps.default, {
    ref: mapRef,
    rotateEnabled: false,
    style: {
      flex: 1,
      ..._reactNative.StyleSheet.absoluteFill
    },
    region: {
      latitude: 44.853057263793794,
      longitude: -0.5679415038745691,
      latitudeDelta: 10,
      longitudeDelta: 10
    }
  }, newCoordinates && /*#__PURE__*/_reactn.default.createElement(_reactNativeMaps.Marker, {
    coordinate: {
      latitude: (newCoordinates === null || newCoordinates === void 0 ? void 0 : (_newCoordinates$coord = newCoordinates.coordinates) === null || _newCoordinates$coord === void 0 ? void 0 : _newCoordinates$coord.latitude) || 0,
      longitude: (newCoordinates === null || newCoordinates === void 0 ? void 0 : (_newCoordinates$coord2 = newCoordinates.coordinates) === null || _newCoordinates$coord2 === void 0 ? void 0 : _newCoordinates$coord2.longitude) || 0
    }
  })), /*#__PURE__*/_reactn.default.createElement(_reactNativePlacesInput.default, {
    stylesContainer: {
      position: 'absolute',
      top: (0, _reactNativeResponsiveDimensions.responsiveHeight)(5),
      right: 24,
      left: 24
    },
    stylesInput: {
      borderRadius: 10
    },
    clearQueryOnSelect: true,
    placeHolder: (newCoordinates === null || newCoordinates === void 0 ? void 0 : newCoordinates.address) || "Quelle est l'adresse de l'évènement?",
    iconInput: /*#__PURE__*/_reactn.default.createElement(_reactNative.Image, {
      style: {
        height: 20,
        width: 30,
        tintColor: _styles.Palette.primary
      },
      resizeMode: "contain",
      source: require('../assets/icons/focusLocation.png')
    }),
    textInputProps: {
      returnKeyType: 'done',
      autoFocus: true,
      ..._styles.Fonts.primary.regular(14, _styles.Palette.black)
    },
    googleApiKey: _config.apiKeyGooglePlaces,
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
      setNewCoordinates((0, _locationActions.formatCoordinates)({
        latitude,
        longitude,
        address
      }));
      (0, _locationActions.animateToCoordinates)({
        coordinates: {
          latitude,
          longitude
        },
        mapRef
      });
    },
    language: 'fr-FR'
  }), /*#__PURE__*/_reactn.default.createElement(_components.Button, {
    onPress: () => {
      if (newCoordinates) {
        setCoordinates(newCoordinates);
      }

      setIsVisible(false);
    },
    value: "Valider l'adresse",
    containerStyle: [_styles.Style.con({
      pos: 'absolute',
      b: 145,
      r: 24,
      l: 24,
      w: 'auto'
    })]
  }), /*#__PURE__*/_reactn.default.createElement(_components.Button, {
    onPress: () => setIsVisible(false),
    value: "Annuler",
    containerStyle: _styles.Style.con({
      pos: 'absolute',
      b: 90,
      r: 24,
      l: 24,
      w: 'auto'
    }),
    style: {
      backgroundColor: _styles.Palette.gray2
    },
    textStyle: _styles.Fonts.primary.bold(16, _styles.Palette.white)
  })));
}
//# sourceMappingURL=AddressSelection.js.map