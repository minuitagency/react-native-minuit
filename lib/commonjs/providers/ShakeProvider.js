"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactn = _interopRequireWildcard(require("reactn"));

var _reactNative = require("react-native");

var _moment = _interopRequireDefault(require("moment"));

var _lib = _interopRequireDefault(require("../../lib"));

var _userActions = require("../actions/userActions");

var _cloud = _interopRequireDefault(require("../config/cloud"));

var _styles = require("../styles");

var _assets = require("../assets/");

var _Button = _interopRequireDefault(require("../components/Buttons/Button"));

var _Input = _interopRequireDefault(require("../components/Inputs/Input"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const stepList = [{
  title: 'Envoyer un nouveau rapport'
}, {
  title: 'Description du problème'
}];

var _default = _ref => {
  let {
    projectID = null,
    children
  } = _ref;
  const [, setTooltip] = (0, _reactn.useGlobal)('_tooltip');
  const [, setIsLoading] = (0, _reactn.useGlobal)('_isLoading');
  const [showModal, setShowModal] = (0, _reactn.useState)(false);
  const [step, setStep] = (0, _reactn.useState)(0);
  const [screenshotURI, setScreenshotURI] = (0, _reactn.useState)(null);
  const [description, setDescription] = (0, _reactn.useState)(__DEV__ ? 'teeeeeeeest' : '');

  _reactn.default.useEffect(() => {
    const subscription = _lib.default.addListener(data => {
      console.log('hello', data);
      setScreenshotURI(data);
      setShowModal(true);
    });

    return () => {
      var _subscription$remove;

      subscription === null || subscription === void 0 ? void 0 : (_subscription$remove = subscription.remove) === null || _subscription$remove === void 0 ? void 0 : _subscription$remove.call(subscription);
    };
  }, []);

  (0, _reactn.useEffect)(() => {
    if (showModal === false) {
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

      if (description.length > 250) {
        throw new Error('Description trop longue');
      }

      if (!screenshotURI) {
        throw new Error("Aucune capture d'écran détectée...");
      }

      setIsLoading(true);
      setTooltip({
        text: 'Publication en cours ...'
      });
      const {
        uri
      } = await (0, _userActions.uploadToCloud)({
        path: `shakes/${projectID}/${(0, _moment.default)().valueOf()}.jpg`,
        uri: screenshotURI
      });
      await _cloud.default.functions().httpsCallable('shakes-submitNewShake')({
        screenshot: uri,
        description,
        projectID
      });
      setTooltip({
        text: 'Publication effectuée !'
      });
      setShowModal(false);
    } catch (e) {
      console.log(e.message);
      setTooltip({
        text: e.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  const Header = (0, _reactn.useCallback)(() => {
    return /*#__PURE__*/_reactn.default.createElement(_reactNative.View, {
      style: [_styles.SharedStyles.containerRowSpaceBetween, {
        backgroundColor: _styles.Palette.darkPurple,
        padding: 20
      }]
    }, /*#__PURE__*/_reactn.default.createElement(_reactNative.Pressable, {
      onPress: () => {
        if (step === 0) {
          setShowModal(false);
        } else {
          setStep(step - 1);
        }
      }
    }, /*#__PURE__*/_reactn.default.createElement(_reactNative.Image, {
      resizeMode: "contain",
      source: _assets.icons.back,
      style: {
        height: 30,
        width: 30,
        tintColor: _styles.Palette.mainWhite
      }
    })), /*#__PURE__*/_reactn.default.createElement(_reactNative.Image, {
      resizeMode: "contain",
      source: require('../assets/images/logoFull.png'),
      style: {
        height: 30,
        width: 150
      }
    }), /*#__PURE__*/_reactn.default.createElement(_reactNative.View, {
      style: {
        width: 30
      }
    }));
  }, [step]);
  return /*#__PURE__*/_reactn.default.createElement(_reactn.default.Fragment, null, /*#__PURE__*/_reactn.default.createElement(_reactNative.Pressable, {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/_reactn.default.createElement(_reactNative.View, {
    style: {
      flex: 1
    }
  }, children)), /*#__PURE__*/_reactn.default.createElement(_reactNative.Modal, {
    animationType: "slide",
    visible: showModal,
    onRequestClose: () => {
      setShowModal(!showModal);
    },
    presentationStyle: 'formSheet'
  }, /*#__PURE__*/_reactn.default.createElement(Header, null), /*#__PURE__*/_reactn.default.createElement(_reactNative.View, {
    style: {
      flex: 1,
      padding: 20,
      backgroundColor: '#13131a'
    }
  }, /*#__PURE__*/_reactn.default.createElement(_reactNative.Text, {
    style: [_styles.Fonts.primary.bold(17, _styles.Palette.mainWhite), {
      textAlign: 'center',
      marginBottom: 20
    }]
  }, stepList[step].title), !step ? /*#__PURE__*/_reactn.default.createElement(_reactNative.View, {
    style: {
      flex: 0.8,
      borderRadius: 10,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/_reactn.default.createElement(_reactNative.Image, {
    resizeMode: 'cover',
    style: {
      flex: 1
    },
    source: {
      uri: screenshotURI
    }
  })) : /*#__PURE__*/_reactn.default.createElement(_Input.default, {
    style: {
      height: 300,
      backgroundColor: _styles.Palette.mainWhite
    },
    value: description,
    onChange: setDescription,
    isTextarea: true
  }), /*#__PURE__*/_reactn.default.createElement(_Button.default, {
    text: step === stepList.length - 1 ? 'Envoyer' : 'Continuer',
    primary: true,
    isAbsoluteBottom: true,
    textColor: _styles.Palette.mainWhite,
    onPress: () => {
      if (step === stepList.length - 1) {
        submitShake();
      } else {
        setStep(step + 1);
      }
    }
  }))));
};

exports.default = _default;
//# sourceMappingURL=ShakeProvider.js.map