import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { TransitionPresets } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import React, { useRef } from 'react'
import Splash from '../Screens/Splash';
import SelectType from '../Screens/SelectType';
import AstrologerRegister from '../Screens/AstrologerRegister';
import Package from '../Screens/Package';
import SignUp from '../Screens/SignUp';
import SignIn from '../Screens/SignIn';
import ForgotPassword from '../Screens/ForgotPassword';
import Otp from '../Screens/Otp';
import Payment from '../Screens/Payment';
import PaymentSuccessfully from '../Screens/PaymentSuccessfully';
import Home from '../Screens/Home';
import DrawerNavigator from './DrawerNavigator';
import SelectLanguage from '../Screens/SelectLanguage';
import TabNavigator from './TabNavigator';
import Reports from '../Screens/Reports';
import Astromart from '../Screens/Astromart';
import Members from '../Screens/Members';
import Prashna from '../Screens/Prashna';
import UpcomingEvent from '../Screens/UpcomingEvent';
import MessageCenter from '../Screens/MessageCenter';
import MessageCenterDetail from '../Screens/MessageCenterDetail';
import KundaliForm from '../Screens/KundaliForm';
import MembershipForm from '../Screens/MembershipForm';
import MyInvoice from '../Screens/MyInvoice';
import ManageHeaderFooter from '../Screens/ManageHeaderFooter';
import HeaderFooterPreview from '../Screens/HeaderFooterPreview';
import Settings from '../Screens/Settings';
import ContactSupport from '../Screens/ContactSupport';
import Profile from '../Screens/Profile';
import AddMember from '../Screens/AddMember';
import Search from '../Screens/Search';
import AddAddress from '../Screens/AddAddress';
import SelectAddress from '../Screens/SelectAddress';
import Cart from '../Screens/Cart';
import OnlineJyotish from '../Screens/OnlineJyotish';
import PremiumKundliDetailReport from '../Screens/PremiumKundliDetailReport';
import ReportDetails from '../Screens/ReportDetails';
import Wallet from '../Screens/Wallet';
import GenerateReport from '../Screens/GenerateReport';
import MyOrders from '../Screens/MyOrders';
import NetalReportDetail from '../Screens/NetalReportDetail';
import NaamJane from '../Screens/NaamJane';
import NaamJaneReport from '../Screens/NaamJaneReport';
import Kundli from '../Screens/Kundli';
import ResetPassword from '../Screens/ResetPassword';
import VarshKundli from '../Screens/VarshKundli';
import VarshKundliDetail from '../Screens/VarshKundliDetail';
import LalKitab from '../Screens/LalKitab';
import LalKitabDetail from '../Screens/LalKitabDetail';
import AstrologerForm from '../Screens/AstrologerForm';
import HeaderFooterPreviewDetails from '../Screens/HeaderFooterPreviewDetails';
import AstrologerLogin from '../Screens/AstrologerLogin';
import ForgotOtp from '../Screens/ForgotOtp';
import ViewSample from '../Screens/ViewSample';
import UpdateMember from '../Screens/UpdateMember';
import EditAddress from '../Screens/EditAddress';
import ProductDetail from '../Screens/ProductDetail';
import PlaceOrder from '../Screens/PlaceOrder';
import ProductPaymentSuccessful from '../Screens/ProductPaymentSuccessful';
import MyOrderProductDetail from '../Screens/MyOrderProductDetail';
import MySubscriptions from '../Screens/MySubscriptions';


const Stack = createStackNavigator();

const StackNavigator = () => {
    const forFade = ({ current }) => ({
        cardStyle: {
            opacity: current.progress,
        },
    });

    const screenOptionStyle = {
        // headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
    };

    const navigationRef = useRef();

    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator
                initialRouteName={'Splash'}
                screenOptions={screenOptionStyle}>

                <Stack.Screen
                    name="Splash"
                    component={Splash}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="SelectType"
                    component={SelectType}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="AstrologerRegister"
                    component={AstrologerRegister}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Package"
                    component={Package}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="SignUp"
                    component={SignUp}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="SignIn"
                    component={SignIn}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ForgotPassword"
                    component={ForgotPassword}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Otp"
                    component={Otp}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Payment"
                    component={Payment}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="PaymentSuccessfully"
                    component={PaymentSuccessfully}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="DrawerNavigator"
                    component={DrawerNavigator}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="SelectLanguage"
                    component={SelectLanguage}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="TabNavigator"
                    component={TabNavigator}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Reports"
                    component={Reports}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Astromart"
                    component={Astromart}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Members"
                    component={Members}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Prashna"
                    component={Prashna}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="UpcomingEvent"
                    component={UpcomingEvent}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="MessageCenter"
                    component={MessageCenter}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="MessageCenterDetail"
                    component={MessageCenterDetail}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="KundaliForm"
                    component={KundaliForm}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="MembershipForm"
                    component={MembershipForm}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="MyInvoice"
                    component={MyInvoice}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ManageHeaderFooter"
                    component={ManageHeaderFooter}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="HeaderFooterPreview"
                    component={HeaderFooterPreview}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Settings"
                    component={Settings}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ContactSupport"
                    component={ContactSupport}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Profile"
                    component={Profile}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="AddMember"
                    component={AddMember}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Search"
                    component={Search}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="AddAddress"
                    component={AddAddress}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="SelectAddress"
                    component={SelectAddress}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Cart"
                    component={Cart}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="OnlineJyotish"
                    component={OnlineJyotish}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="PremiumKundliDetailReport"
                    component={PremiumKundliDetailReport}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ReportDetails"
                    component={ReportDetails}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Wallet"
                    component={Wallet}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="GenerateReport"
                    component={GenerateReport}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="MyOrders"
                    component={MyOrders}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="NaamJane"
                    component={NaamJane}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="NaamJaneReport"
                    component={NaamJaneReport}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="NetalReportDetail"
                    component={NetalReportDetail}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Kundli"
                    component={Kundli}
                    options={{
                        title: 'Kundli',
                        headerStyle: {
                            backgroundColor: '#FEBD57',
                        },
                        headerTintColor: 'black',
                        headerTitleStyle: {
                            fontFamily: 'AvenirLTStd-Medium',
                        },
                    }}
                />
                <Stack.Screen
                    name="ResetPassword"
                    component={ResetPassword}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="VarshKundli"
                    component={VarshKundli}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="VarshKundliDetail"
                    component={VarshKundliDetail}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="LalKitab"
                    component={LalKitab}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="LalKitabDetail"
                    component={LalKitabDetail}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="AstrologerForm"
                    component={AstrologerForm}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="AstrologerLogin"
                    component={AstrologerLogin}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="HeaderFooterPreviewDetails"
                    component={HeaderFooterPreviewDetails}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ForgotOtp"
                    component={ForgotOtp}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ViewSample"
                    component={ViewSample}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="UpdateMember"
                    component={UpdateMember}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="EditAddress"
                    component={EditAddress}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ProductDetail"
                    component={ProductDetail}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="PlaceOrder"
                    component={PlaceOrder}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ProductPaymentSuccessful"
                    component={ProductPaymentSuccessful}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="MyOrderProductDetail"
                    component={MyOrderProductDetail}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="MySubscriptions"
                    component={MySubscriptions}
                    options={{ headerShown: false }}
                />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigator

const styles = StyleSheet.create({})