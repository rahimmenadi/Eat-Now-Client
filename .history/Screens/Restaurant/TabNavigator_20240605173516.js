import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import CheckoutScreen from './CheckoutScreen';
import ProfileScreen from './ProfileScreen';
import OrdersScreen from './OrdersScreen'; // Import OrdersScreen
import { Image } from 'react-native';

// Import your custom icons
import HomeIcon from '../../assets/Home-icon.png';
import CheckoutIcon from '../../assets/fi-rr-shopping-bag.png';
import ProfileIcon from '../../assets/fi-rr-user.png';
import OrdersIcon from '../../assets/or'; // Placeholder icon for Orders

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconColor = focused ? '#ff6600' : '#808080'; // Define your colors here

          if (route.name === 'Home') {
            iconName = HomeIcon;
          } else if (route.name === 'Checkout') {
            iconName = CheckoutIcon;
          } else if (route.name === 'Profile') {
            iconName = ProfileIcon;
          } else if (route.name === 'Orders') {
            iconName = OrdersIcon; // Placeholder icon for Orders
          }

          // Return the icon component
          return (
            <Image
              source={iconName}
              style={{ width: size, height: size, tintColor: iconColor }}
            />
          );
        },
        tabBarActiveTintColor: '#ff6600', // Active icon color
        tabBarInactiveTintColor: '#808080', // Inactive icon color
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
