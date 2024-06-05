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

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ToastProvider } from 'react-native-toast-message'; 
import FlashMessage from 'react-native-flash-message';
import { showMessage } from 'react-native-flash-message';
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
    <>
      <NavigationContainer>
        <Stack.Navigator>
          {isLoading ? (
            <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
          ) : (
            <>
            <Stack.Screen
          name="Tab"
          component={TabNavigator}
          options={{animation: 'slide_from_bottom'}}></Stack.Screen>
        <Stack.Screen
              
           
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
