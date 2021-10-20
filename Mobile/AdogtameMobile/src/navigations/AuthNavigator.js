import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { View, Text, StyleSheet, Button, Switch, Image, TouchableOpacity, ScrollView } from "react-native";


import SignIn from '../screens/Login/index'
import Register from '../screens/Register/index'

const Login = () => {
    return (<View><Text>Hola</Text></View>)
}

const AuthNavigator = () => {
  const AuthStack = createStackNavigator();
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name="Login" component={SignIn} />
      <AuthStack.Screen name="Register" component={Register} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
