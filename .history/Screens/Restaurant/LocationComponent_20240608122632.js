import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';

const LocationComponent = () => {
  const [wilaya, setWilaya] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserWilaya = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          throw new Error('Permission to access location was denied');
        }

        let location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=YOUR_MAPBOX_ACCESS_TOKEN`);
        const data = await response.json();
        const wilaya = data.features[0].place_name;
        
        setWilaya(wilaya);
        setLoading(false);
      } catch (error) {
        console.error('Error getting user location:', error);
        setLoading(false);
      }
    };

    getUserWilaya();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Text>{wilaya ? `Your Wilaya: ${wilaya}` : 'Unable to get wilaya'}</Text>
      )}
    </View>
  );
};

export default LocationComponent;
