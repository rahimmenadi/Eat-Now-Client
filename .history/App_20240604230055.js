import React, { useState, useEffect } from "react";
import { StatusBar, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ToastProvider } from 'react-native-toast-message'; 
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { useFonts } from 'expo-font';

import CheckoutScreen from "./Screens/Restaurant/CheckoutScreen";
import HomeScreen from "./Screens/Restaurant/HomeScreen";
import OnboardingScreen from "./Screens/Restaurant/OnboardingScreen";
import RecipeDetailScreen from "./Screens/Restaurant/RecipeDetailScreen";
import SignInSignUpScreen from "./Screens/Restaurant/SignInSignUpScreen";
import SplashScreen from "./Screens/Restaurant/SplashScreen";
import TabNavigator from "./Screens/Restaurant/TabNavigator";
import WelcomeScreen from "./Screens/Restaurant/WelcomeScreen";
impo

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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator>
          {isLoading ? (
            <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
          ) : (
            <>
              <Stack.Screen
                name="Tab"
                component={TabNavigator}
                options={{ animation: 'slide_from_bottom' }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <FlashMessage position="top" />
      <ToastProvider ref={(ref) => ToastProvider.setToastRef(ref)} />
    </GestureHandlerRootView>
  );
};

export default gestureHandlerRootHOC(App);
