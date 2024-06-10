import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions, AsyncStorage } from 'react-native';
import icon from '../../assets/icon.png'; // Assuming the icon.png is in the assets folder
import LocationComponent from './LocationComponent'; // Import the LocationComponent

const { width, height } = Dimensions.get('window'); // Get the dimensions of the screen

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const fetchWilayaAndNavigate = async () => {
      try {
        // Fetch wilaya using LocationComponent
        const wilaya = await LocationComponent.getWilaya();
        
        // Store wilaya in AsyncStorage
        await AsyncStorage.setItem('userWilaya', wilaya);
        
        // Navigate to the next screen
        navigation.navigate('NextScreen'); // Replace 'NextScreen' with the name of the screen you want to navigate to after fetching the wilaya
      } catch (error) {
        console.error('Error fetching wilaya:', error);
        // Handle error or navigate to an error screen
      }
    };

    fetchWilayaAndNavigate();
  }, []);

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
