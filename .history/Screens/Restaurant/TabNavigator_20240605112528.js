// TabNavigator.js

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import CheckoutScreen
import { View, Text } from 'react-native'; // Import this to create the tab icons

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
            <View>
              <Text style={{ color: color }}>🏠</Text>
            </View>
          ),
        }} 
      />
      <Tab.Screen 
        name="Checkout" 
        component={CheckoutScreen} 
        options={{ 
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <View>
              <Text style={{ color: color }}>🛒</Text>
            </View>
          ),
        }} 
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
