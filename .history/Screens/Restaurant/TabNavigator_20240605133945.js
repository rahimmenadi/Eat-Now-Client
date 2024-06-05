import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import CheckoutScreen from './CheckoutScreen';
import ProfileScreen from './ProfileScreen'; // Import ProfileScreen
import { Image, View } from 'react-native';

// Import your custom icons
import HomeIcon from '../../assets/Home-icon.png';
import CheckoutIcon from '../../assets/sh';
import ProfileIcon from '../../assets/Home-icon.png'';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Image
              source={HomeIcon}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Image
              source={CheckoutIcon}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Image
              source={ProfileIcon}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
