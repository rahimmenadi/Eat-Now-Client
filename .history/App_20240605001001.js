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
import CheckoutScreen from "./Screens/Restaurant/CheckoutScreen";
import { Ionicons } from '@expo/vector-icons'; // Add this import
import { TabBar } from 'react-native-animated-nav-tab-bar'; // Add this import

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabNavigator = () => (
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
    name="HomeScreen"
    component={HomeScreen}
    options={{
      tabBarIcon: ({ focused, color, size }) => (
        <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
      ),
    }}
  />
  <Tab.Screen
    name="CheckoutScreen"
    component={CheckoutScreen}
    options={{
      tabBarIcon: ({ focused, color, size }) => (
        <Ionicons name={focused ? 'cart' : 'cart-outline'} size={size} color={color} />
      ),
    }}
  />
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

        <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignInSignUpScreen" component={SignInSignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HomeScreen" component={MainTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="RecipeDetailScreen" component={RecipeDetailScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} options={{ headerShown: false }} />


      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
