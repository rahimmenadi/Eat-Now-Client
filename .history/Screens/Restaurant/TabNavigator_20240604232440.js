import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './HomeScreen';
import CheckoutScreen from './CheckoutScreen';
import { TabBar } from "react-native-animated-nav-tab-bar";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={props => (
        <TabBar
          {...props}
          barColor="#000"
          activeColors={['#fff', '#fff']}
          inactiveColor="#333"
          iconSize={24}
          stateFunc={(tabIndex) => console.log('Tab index:', tabIndex)}
          duration={400}
        />
      )}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CheckoutScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'cart' : 'cart-outline'} size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
