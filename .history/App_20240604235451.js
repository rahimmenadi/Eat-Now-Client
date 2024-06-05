import React, { useState, useEffect } from "react";
import { StatusBar } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SplashScreen from "./Screens/Restaurant/SplashScreen";
import OnboardingScreen from "./Screens/Restaurant/OnboardingScreen";
import SignInSignUpScreen from "./Screens/Restaurant/SignInSignUpScreen";
import WelcomeScreen from "./Screens/Restaurant/WelcomeScreen";
import HomeScreen from "./Screens/Restaurant/HomeScreen";
import RecipeDetailScreen from "./Screens/Restaurant/RecipeDetailScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreen} />
    {/* Add more screens for the bottom tab navigator here */}
  </Tab.Navigator>
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
      <StatusBar hidden={true} />
      <Stack.Navigator>
        
        <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignInSignUp" component={SignInSignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={MainTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
