import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from "./Screens/Restaurant/SplashScreen";
import OnboardingScreen from "./Screens/Restaurant/OnboardingScreen";
import SignInSignUpScreen from "./Screens/Restaurant/SignInSignUpScreen";
import WelcomeScreen from "./Screens/Restaurant/WelcomeScreen";
import TabNavigator from "./Screens/Restaurant/TabNavigator";
import RecipeDetailScreen from "./Screens/Restaurant/RecipeDetailScreen";
import ShippingAddressScreen from "./Screens/Restaurant/ShippingAddressScreen";
import OrderDetailsScreen from "./Screens/Restaurant/OrderDetailsScreen"; 
import OrderConfirmation from "./Screens/Restaurant/OrderConfirmation";
import NotificationScreen from "./Screens/Restaurant/NotificationScreen";
import WishlistScreen from "./Screens/Restaurant/WishlistScreen";
import BigOrdersScreen from "./Screens/Restaurant/BigOrdersScreen";
import Toast from 'react-native-toast-message';
import { useFonts } from 'expo-font';
import { Provider } from "react-redux";
import { store } from './redux/store';
import OrdersScreen from "./Screens/Restaurant/OrdersScreen";
import HomeScreen from './Screens/Restaurant/HomeScreen';

const Stack = createStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (userId) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.log("Error checking user login status:", error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1600); // Adjust the delay time here (in milliseconds)
      }
    };
  
    checkUserLoggedIn();
  }, []);

  const [loaded] = useFonts({
    Poppins: require('./assets/fonts/Poppins-Regular.ttf'),
  });

  if (!loaded || isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="RecipeDetailScreen" component={RecipeDetailScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ShippingAddressScreen" component={ShippingAddressScreen} options={{ headerShown: false }} />
            <Stack.Screen name="OrderDetailsScreen" component={OrderDetailsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="OrderConfirmation" component={OrderConfirmation} options={{ headerShown: false }} />
            <Stack.Screen name="NotificationScreen" component={NotificationScreen} options={{ headerShown: false }} />
            <Stack.Screen name="WishlistScreen" component={WishlistScreen} options={{ headerShown: false }} />
            <Stack.Screen name="BigOrdersScreen" component={BigOrdersScreen} options={{ headerShown: false }} />
            <Stack.Screen name="OrdersScreen" component={OrdersScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SignInSignUpScreen" component={SignInSignUpScreen} options={{ headerShown: false }} />
            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
            
            {/* Add more authenticated screens here */}
          </>
        ) : (
          <>
            <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SignInSignUpScreen" component={SignInSignUpScreen} options={{ headerShown: false }} />
            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="RecipeDetailScreen" component={RecipeDetailScreen} options={{ headerShown: false }} />
            <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="WishlistScreen" component={WishlistScreen} options={{ headerShown: false }} />
            {/* Add more screens for authentication flow here */}
          </>
        )}
      </Stack.Navigator>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </NavigationContainer>
  );
};

export default App;
