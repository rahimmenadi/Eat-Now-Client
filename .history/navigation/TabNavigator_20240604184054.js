import { View, Text, StyleSheet, Platform } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Chats from '../screens/Chats';
import Settings from '../screens/Settings';
import Account from '../screens/Account';
import { AntDesign } from '@expo/vector-icons';
import { regular } from '../utils/fonts';
import RecipeDetailScreen from '../Screens/Restaurant/RecipeDetailScreen';
import HomeScreen from '../Screens/Restaurant/HomeScreen';

const BottomTabNavigator = createBottomTabNavigator();

export default function TabNavigator() {
  //   const tabBarHeight = useBottomTabBarHeight();
  