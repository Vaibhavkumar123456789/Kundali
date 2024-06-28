
export const BASE_URL = 'http://zedcredit.zedfinance.com/Kundali/api/';
// export const BASE_URL = 'http://13.244.146.8/api/';
export const BASE_URL_EXTERNAL = 'https://api.astrovedicapi.com/api/v1/';         // third party api url


export const GOOGLE_MAPS_APIKEY = 'AIzaSyA_23OZbQeEKQeLfMBTJ6xd3-hCa33tK4A';

export const PATH_URL = {

  signUp: 'astrologer/authUser',
  checkmobile: 'astrologer/check-mobile',
  package: 'packages',
  astrologersignup: 'astrologer/signup',
  homebanner: 'astrologer/home',
  consultant1: 'consultant',
  skill1: 'skill',
  specialization: 'main_specialization',
  language: 'languages',
  country1: 'country',
  state1: 'state',
  city1: 'city',
  drawerprofile: 'astrologer/get-profile',
  astroreport: 'astro-report',
  reportdetail: 'astro-report-detail',
  updateProfile: 'astrologer-user/edit-profile',
  astrologeruserlogin: 'astrologer/login',
  skip: 'guest-user',
  forgot: 'astrologer/forget-password',
  changepassword: 'astrologer/password-change',
  headerpreview: 'header-preview',
  messagecentera: 'meessage-center',
  headerColor: "header-color",

  reporthistory: 'astrologer/kundali-report-history',
  membershipplan: 'membershipplans',
  consultancy: 'consultancyfor',
  addmembership: 'astrologer/add-membership',
  memberlist: 'astrologer/membershipuser',
  kundlireport: 'astrologer/add-kundali-report',
  removemember: 'astrologer/remove-membershipuser',
  updatemember: 'astrologer/edit-membershipuser',
  plan: 'WalletPlans',
  addwallet: 'astrologer/add-wallet',
  address: 'astrologer/address-get',
  addaddress: 'astrologer/address-store',
  deleteaddress: 'astrologer/address-delete',
  update: 'astrologer/address-update',
  productlist: 'Astroshopcategory',
  list: 'productdetail',
  addtocart: 'astrologer/cart',
  getcart: 'astrologer/getcart',
  addorder: 'astrologer/add-order',
  oederhistory: 'astrologer/order_history',
  orderdetail: 'astrologer/order_history_details',





  //third party  api end point 
  lalkitab: 'Lalkitab/Chart/Lagan',

};

export const ApiSauceJson = {
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};
export const ApiSauceJsonExternal = {
  baseURL: BASE_URL_EXTERNAL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

export const ApiSauceMultipart = {
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  },
};
export const latitudeDelta = 0.0922;
