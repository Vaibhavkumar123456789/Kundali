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
import ProductList from '../Screens/ProductList';
import ReportDetails from '../Screens/ReportDetails';
import Wallet from '../Screens/Wallet';
import GenerateReport from '../Screens/GenerateReport';
import MyOrders from '../Screens/MyOrders';
import NetalReportDetail from '../Screens/NetalReportDetail';
import NaamJane from '../Screens/NaamJane';
import NaamJaneReport from '../Screens/NaamJaneReport';
import Kundli from '../Screens/Kundli';
import ResetPassword from '../Screens/ResetPassword';


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
                    name="ProductList"
                    component={ProductList}
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



            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigator

const styles = StyleSheet.create({})