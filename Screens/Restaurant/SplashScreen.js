import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import icon from '../../assets/icon.png'; // Assuming the icon.png is in the assets folder
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const { width, height } = Dimensions.get('window'); // Get the dimensions of the screen

const SplashScreen = ({ navigation }) => {

  useEffect(() => {
    const fetchWilayaAndNavigate = async () => {
      try {
        // Request location permission
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          throw new Error('Permission to access location was denied');
        }

        // Get current location
        let location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        // Fetch wilaya based on current location
        const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=sk.eyJ1IjoicmFoaW1tZW5hZGkiLCJhIjoiY2x4NjBiM2RuMXR0djJrcXhlZHZrOXFmaiJ9.L9if3KF562OfFczymLfdgA`);
        const data = await response.json();
        const placeName = data.features[0].place_name;
        const parts = placeName.split(',');
        const wilaya = parts[2].trim(); // Adjust this index based on the structure of your response

        // Store wilaya in AsyncStorage
        await AsyncStorage.setItem('userWilaya', wilaya);

        console.log(wilaya);
        
        // Check if user is logged in
      
      } catch (error) {
        console.error('Error fetching wilaya:', error);
        // Handle error or navigate to an error screen
      }
    };

    fetchWilayaAndNavigate();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={icon} style={styles.image} resizeMode="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FB5607',
  },
  image: {
    width: 100 * 0.8, // Set the width to 80% of the screen width
    height: 100 * 0.8, // Set the height to 80% of the screen height
  },
});

export default SplashScreen;
