import {
  createBottomTabNavigator,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import React from 'react';
import Movies from '../screen/Movies';
import Searchs from '../screen/Search';
import TVs from '../screen/Tv';
import { Ionicons } from '@expo/vector-icons';
import { Text, View, Image, useColorScheme } from 'react-native';
import { NavigatorScreenParams } from '@react-navigation/native';
import type { CompositeScreenProps } from '@react-navigation/native';
const Tab = createBottomTabNavigator();
const Tabs = () => {
  const isdark: boolean = useColorScheme() === 'dark';

  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: !isdark ? 'black' : 'white',
      }}
      initialRouteName="Searchs"
      //screen & Tab 통합스타일
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: 'black',
        },
        tabBarActiveTintColor: !isdark ? 'white' : '#ffa801',
        tabBarStyle: {
          backgroundColor: !isdark ? 'black' : 'white',
        },
        tabBarLabelStyle: {
          backgroundColor: !isdark ? 'black' : 'white',
        },
        headerTitleStyle: {
          color: 'white',
        },
        headerRight: () => (
          <View>
            <Text>go home</Text>
          </View>
        ),
      }}
    >
      <Tab.Screen
        name="Movies"
        component={Movies}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name="film" color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="Searchs"
        component={Searchs}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="search" color={color} size={size} />;
          },
        }}
      />
      <Tab.Screen
        name="TV"
        component={TVs}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="tv" color={color} size={size} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
