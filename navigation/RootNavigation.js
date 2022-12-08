import React from 'react';
import {
  Text,
  View,
  Image,
  useColorScheme,
  TouchableOpacity,
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './Tabs';
import Stack from './Stack';
const Nav = createNativeStackNavigator();
const option = {
  headerShown: false,
};

const Root = () => (
  <Nav.Navigator screenOptions={option}>
    <Nav.Screen name="Tabs" component={Tabs} />
    <Nav.Screen name="Stack" component={Stack} />
  </Nav.Navigator>
);

export default Root;
