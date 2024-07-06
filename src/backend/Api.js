import AsyncStorage from '@react-native-async-storage/async-storage';
import { PATH_URL } from './Config';
import ApiSauce from './ApiSauce';
// import { ApiSauce1 } from './ApiSauce';
import { ApiSauceExternal } from './ApiSauce';
import ApiSauceMu from './ApiSauce';
import store from '../redux/store';

import { Dimensions } from 'react-native';

const request = (path, json) => {
  return new Promise((resolve, reject) => {
    ApiSauce.post(path, json).then(response => {
      //alert(JSON.stringify(json))

      if (response.ok) {
        resolve(response.data);
      } else {
        console.log(response.data?.msg);

        alert(JSON.stringify(response.data?.msg));
        reject(response.data?.msg);
      }
    });
  });
};
// const request1 = (path, json) => {
//   return new Promise((resolve, reject) => {
//     ApiSauce1.post(path, json).then(response => {
//       if (response.ok) {
//         resolve(response.data);
//       } else {
//         console.log(response.err);
//         reject(response.err);
//       }
//     });
//   });
// };
const requestMultipart = (path, formdata) => {
  return new Promise((resolve, reject) => {
    ApiSauce.setHeader('Authorization', `${store.getState().token}`);
    ApiSauce.setHeader('Accept', 'application/json');
    ApiSauce.setHeader('Content-Type', 'multipart/form-data');

    ApiSauceMu.post(path, formdata, {
      transformRequest: (data, headers) => {
        return formdata; // this is doing the trick
      },
    }).then(response => {
      // if (response.status == 401) {
      //   alert('You are login to another Device');

      //   return;
      // }
      if (response.ok) {
        resolve(response.data);
      } else {
        // alert(JSON.stringify(response));
        // reject(response.err);
        console.log(JSON.stringify(response.data?.msg));
        reject(response.data?.msg);
      }
    });
  });
};

const requesth = (path, json) => {
  // console.log('Token', store.getState().token);
  var headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  return new Promise((resolve, reject) => {
    ApiSauce.setHeaders(headers);
    ApiSauce.setHeader('Authorization', `Bearer ${store.getState().token}`);
    ApiSauce.post(path, json).then(response => {
      //  alert(JSON.stringify(path))

      // if (response.status == 401){
      //   alert('You are login to another Device')
      //   EventRegister.emit('myCustomEvent3', 'it works!!!')
      //   return
      // }
      if (response.ok) {
        resolve(response.data);
      } else {
        //  alert(JSON.stringify(response))
        // console.log(response.data);
        // reject(response.err);
        console.log(JSON.stringify(response.data?.msg));
        reject(response.data?.msg);
      }
    });
  });
};


export const requestGet = (path, json) => {
  // console.log('Token', store.getState().token);
  return new Promise((resolve, reject) => {
    ApiSauce.get(path, json).then(response => {
      if (response.status == 401) {
        alert('You are login to another Device');

        return;
      }
      if (response.ok) {
        resolve(response.data);
      } else {
        // console.log(JSON.stringify(response, null, 2));
        // resolve({ status: false, data: response.data, error: response?.problem });
        console.log(JSON.stringify(response.data?.msg));
        reject(response.data?.msg);
      }
    });
  });
};

export const requestGet1 = (path, json) => {
  return new Promise((resolve, reject) => {
    ApiSauce.setHeader('Authorization', `Bearer ${store.getState().token}`);
    ApiSauce.get(path, json).then(response => {
      // if (response.status == 401){
      //   alert('You are login to another Device')
      //   EventRegister.emit('myCustomEvent3', 'it works!!!')
      //   return
      // }
      if (response.ok) {
        resolve(response.data);
      } else {
        // console.log(JSON.stringify(response, null, 2));
        // resolve({ status: false, data: response.data, error: response?.problem });
        console.log(JSON.stringify(response.data?.msg));
        reject(response.data?.msg);
      }
    });
  });
};

const requestExternal = (path, json) => {
  return new Promise((resolve, reject) => {
    ApiSauceExternal.post(path, json).then(response => {
      if (response.status == 401) {

        return;
      }
      //alert(JSON.stringify(json))
      if (response.ok) {
        resolve(response.data);
      } else {
        // console.log(response.err);
        // reject(response.err);
        console.log(JSON.stringify(response.data?.msg));
        reject(response.data?.msg);
      }
    });
  });
};


export const UserSignUp = json => request(PATH_URL.signUp, json);
export const Astrologersignup = json => request(PATH_URL.astrologersignup, json);
export const AstrologerCheckMobile = json => request(PATH_URL.checkmobile, json);
export const Consultant = json => request(PATH_URL.consultant1, json);
export const Skill = json => request(PATH_URL.skill1, json);
export const Specialization = json => request(PATH_URL.specialization, json);
export const Language = json => request(PATH_URL.language, json);
export const Country = json => requestGet(PATH_URL.country1, json);
export const State1 = json => requestGet(PATH_URL.state1, json);
export const City1 = json => requestGet(PATH_URL.city1, json);
export const Packagelist = json => request(PATH_URL.package, json);
export const AstrologerUserApi = json => request(PATH_URL.astrologeruserlogin, json);
export const SkipHome = json => request(PATH_URL.skip, json);
export const Passwordforgot = json => request(PATH_URL.forgot, json);
export const PasswordReset = json => request(PATH_URL.changepassword, json);
export const loginastrologer = json => request(PATH_URL.authuser, json);


//token
export const Homebanner = json => requesth(PATH_URL.homebanner, json);
export const GetProfile = json => requestGet1(PATH_URL.drawerprofile, json);
export const Astroreport = json => requestGet1(PATH_URL.astroreport, json);
export const ReportDetailApi = json => requesth(PATH_URL.reportdetail, json);
export const UpdateProfile = json => requesth(PATH_URL.updateProfile, json);
export const HeaderPreviewApi = json => requesth(PATH_URL.headerpreview, json);
export const MessageCenterApi = json => requestGet1(PATH_URL.messagecentera, json);
export const HeaderColor = json => requestGet1(PATH_URL.headerColor, json);
export const Kundlireporthistory = json => requesth(PATH_URL.reporthistory, json);
export const membershipplans = json => requesth(PATH_URL.membershipplan, json);
export const consultancylist = json => requesth(PATH_URL.consultancy, json);
export const astrologeraddmembership = json => requesth(PATH_URL.addmembership, json);
export const astrologermemberlist = json => requesth(PATH_URL.memberlist, json);
export const kundlireportgenerate = json => requesth(PATH_URL.kundlireport, json);
export const deletememberlist = json => requesth(PATH_URL.removemember, json);
export const updatememberlist = json => requesth(PATH_URL.updatemember, json);
export const walletplan = json => requestGet1(PATH_URL.plan, json);
export const addwalletapi = json => requesth(PATH_URL.addwallet, json);
export const addresslist = json => requestGet1(PATH_URL.address, json);
export const addnewaddress = json => requesth(PATH_URL.addaddress, json);
export const deletedaddress = json => requesth(PATH_URL.deleteaddress, json);
export const updateaddress = json => requesth(PATH_URL.update, json);
export const productdatalist = json => requestGet1(PATH_URL.productlist, json);
export const productlist = json => requesth(PATH_URL.list, json);
export const addtocardapi = json => requesth(PATH_URL.addtocart, json);
export const getcartapi = json => requesth(PATH_URL.getcart, json);
export const addorderapi = json => requesth(PATH_URL.addorder, json);
export const getorderhistory = json => requesth(PATH_URL.oederhistory, json);
export const postorderhistory = json => requesth(PATH_URL.orderdetail, json);
export const activepackageapi = json => requesth(PATH_URL.activepackage, json);

// third party api
export const LalkitabForm = json => requestExternal(PATH_URL.lalkitab, json);


// localstorage
export const AsyncStorageSetUser = user =>
  AsyncStorage.setItem('user', JSON.stringify(user));
export const AsyncStorageSettoken = user => AsyncStorage.setItem('token', user);
export const AsyncStorageGetUser = () => AsyncStorage.getItem('user');
export const AsyncStorageGettoken = user => AsyncStorage.getItem('token');
export const AsyncStorageSetLanguage = user =>
  AsyncStorage.setItem('lang', user);
export const AsyncStorageGetLanguage = () => AsyncStorage.getItem('lang');

export const AsyncStorageSetFcmtoken = user =>
  AsyncStorage.setItem('fcmtoken', user);
export const AsyncStorageGetFcmtoken = () => AsyncStorage.getItem('fcmtoken');

export const AsyncStorageClear = () => AsyncStorage.clear();


export const AspectRatio = () =>
  Dimensions.get('window').width / Dimensions.get('window').height;
export const Height = Dimensions.get('window').height;
export const Width = Dimensions.get('window').width;

export const formatAmount = amount =>
  `\u20B9 ${parseInt(amount)
    .toFixed(0)
    .replace(/(\d)(?=(\d\d)+\d$)/g, '$1,')}`;

export const formatNumber = str => str.replace(/,/g, '').replace('\u20B9 ', '');

export const textInPrice = price => `\u20B9 ${price}`;
