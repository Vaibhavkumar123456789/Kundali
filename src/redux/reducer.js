
const data = {
  userDetail: {},
  user_id: '',
  user: {},
  user_details: {},
  deviceInfo: {
    id: '',
    token: '',
    model: '',
    os: '',
  },
  userType: '',
  ftoken: '',
  netInfo: {
    details: {},
    isConnected: false,
    isInternetReachable: false,
    isWifiEnabled: false,
    type: '',
  },
  language: 'en',
};
const reducer = (state = data, action) => {
  switch (action.type) {
    case 'setUserDetail':
      return {
        ...state,
        userDetail: action.payload,
        isLogin: true,
      };
    case 'language':
      return { ...state, language: action.payload };
    case 'profile':
      return { ...state, profile: action.payload };
    case 'setDeviceInfo':
      return {
        ...state,
        deviceInfo: action.payload,
      };
    case 'phone':
      return {
        ...state,
        phone: action.payload,
      };

    case 'ftoken':
      return {
        ...state,
        ftoken: action.paylod,
      };
    case 'netInfo':
      return {
        ...state,
        netInfo: action.payload,
      };
    case 'user_id':
      return {
        ...state,
        user_id: action.payload,
      };



    default:
      return state;
  }
};
export default reducer;
