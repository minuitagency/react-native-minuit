"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var geofirex = _interopRequireWildcard(require("geofirex"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useGeoFire = _ref => {
  let {
    ref,
    firebase,
    // require
    center,
    formatFunction = null,
    radius = 100,
    parameter = 'point'
  } = _ref;
  const geo = geofirex.init(firebase);
  const [data, setData] = (0, _react.useState)([]);
  (0, _react.useEffect)(() => {
    if (center !== null && center !== void 0 && center.latitude && center !== null && center !== void 0 && center.longitude) {
      console.log('FETCH');
      fetchQuery();
    } else {
      console.log(center);
    }
  }, [center, radius]);

  const fetchQuery = async function () {
    let {
      customLocation = null
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    try {
      const geoQuery = geo.query(ref).within(geo.point(center.latitude, center.longitude), radius, parameter);
      const hits = await geofirex.get(geoQuery);

      if (formatFunction) {
        setData(formatFunction(hits));
      } else {
        setData(hits);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return {
    data
  };
};

var _default = useGeoFire;
exports.default = _default;
//# sourceMappingURL=useGeoFire.js.map