
import store from '../redux/store';
export const Token = user =>
  store.dispatch({ type: 'token', paylod: user ? user : '' });
export const Phone = payload => store.dispatch({ type: 'phone', payload });
export const Firebase = user =>
  store.dispatch({ type: 'ftoken', paylod: user ? user : '' });
export const SetUser = payload => ({ type: 'user', payload });
export const SetDeviceInfo = deviceInfo => ({
  type: 'SetDeviceInfo',
  payload: deviceInfo,
});

export const Language = payload => ({ type: 'language', payload });

