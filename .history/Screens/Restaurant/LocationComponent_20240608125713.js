import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';

const LocationComponent = () => {
    const [wilaya, setWilaya] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      import * as Location from 'expo-location';

const getUserWilaya = async () => {
  try {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      throw new Error('Permission to access location was denied');
    }

    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=sk.eyJ1IjoicmFoaW1tZW5hZGkiLCJhIjoiY2x4NjBiM2RuMXR0djJrcXhlZHZrOXFmaiJ9.L9if3KF562OfFczymLfdgA`);
    const data = await response.json();
    
    // Extract the relevant part of the place name
    const placeName = data.features[0].place_name;
    const parts = placeName.split(',');
    const wilaya = parts[1].trim(); // Assuming 'Sidi Bel Abbès' is the first part
    
    return wilaya;
  } catch (error) {
    console.error('Error getting user location:', error);
    return null;
  }
};

export { getUserWilaya };

  
  export default LocationComponent;