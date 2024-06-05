import React, { useState, useEffect } from "react";
import { StatusBar, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RecipeDetailScreen from "./Screens/Restaurant/RecipeDetailScreen";
import HomeScreen from "./Screens/Restaurant/HomeScreen";
import WelcomeScreen from "./Screens/Restaurant/WelcomeScreen";
import OnboardingScreen from "./Screens/Restaurant/OnboardingScreen";
import SplashScreen from "./Screens/Restaurant/SplashScreen";
import SignInSignUpScreen from "./Screens/Restaurant/SignInSignUpScreen";
import CheckoutScreen from "./Screens/Restaurant/CheckoutScreen";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    <HomeStack.Screen name="RecipeDetail" component={RecipeDetailScreen} options={{ headerShown: false }} />
  </HomeStack.Navigator>
);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading time with setTimeout
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Change this value to your desired loading time
  }, []);
  
  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Checkout') {
              iconName = focused ? 'cart' : 'cart-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Checkout" component={CheckoutScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
