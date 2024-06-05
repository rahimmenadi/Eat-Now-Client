import React from 'react';
import {StyleSheet} from 'react-native';
import {createAnimatedTabNavigator} from '@gorhom/animated-tabbar';
import {BlurView} from '@react-native-community/blur';
import COLORS from './theme';
import HomeScreen from './HomeScreen';
import CheckoutScreen from './CheckoutScreen';
import CustomIcon from './CustomIcon';  // Ensure CustomIcon is correctly imported

import 'react-native-reanimated';

const Tabs = createAnimatedTabNavigator();

const TabNavigator = () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarBackground: () => (
          <BlurView
            overlayColor=""
            blurAmount={15}
            style={styles.BlurViewStyles}
          />
        ),
      }}>
      <Tabs.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <CustomIcon
              name="home"
              size={25}
              color={focused ? COLORS.yellow : COLORS.primaryLightGreyHex}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Cart"
        component={CheckoutScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <CustomIcon
              name="cart"
              size={25}
              color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 80,
    position: 'absolute',
    backgroundColor: COLORS.primaryBlackRGBA,
    borderTopWidth: 0,
    elevation: 0,
    borderTopColor: 'transparent',
  },
  BlurViewStyles: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default TabNavigator;
