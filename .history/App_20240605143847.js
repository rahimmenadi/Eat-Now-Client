import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RecipeDetailScreen from "./Screens/Restaurant/RecipeDetailScreen";
import WelcomeScreen from "./Screens/Restaurant/WelcomeScreen";
import OnboardingScreen from "./Screens/Restaurant/OnboardingScreen";
import SplashScreen from "./Screens/Restaurant/SplashScreen";
import SignInSignUpScreen from "./Screens/Restaurant/SignInSignUpScreen";
import TabNavigator from "./Screens/Restaurant/TabNavigator";
import ShippingAddressScreen from "./Screens/Restaurant/ShippingAddressScreen";
import OrderDetailsScreen from "./Screens/Restaurant/OrderDetailsScreen"; 
import OrderConfirmation from "./Screens/Restaurant/OrderConfirmation";
import NotificationScreen from "./Screens/Restaurant/NotificationScreen";
import { useFonts } from 'expo-font';

const Stack = createStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading time with setTimeout
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Change this value to your desired loading time
  }, []);
  
  const [loaded] = useFonts({
    Poppins: require('./assets/fonts/Poppins-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <Provide
  );
};

export default App;
