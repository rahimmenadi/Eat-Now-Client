import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import icon from '../../assets/icon.png'; // Assuming the icon.png is in the assets folder

const { width, height } = Dimensions.get('window'); // Get the dimensions of the screen
import LocationComponent from './LocationComponent';

export default function SplashScreen() {
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
