// ShippingAddressScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For the back arrow icon and input icons

const ShippingAddressScreen = ({ navigation }) => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');

  const handleConfirm = () => {
    // Handle address confirmation logic here
    console.log('Address confirmed:', { address, city, state, zip });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Shipping Address</Text>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.headerText}>Enter Your Address</Text>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Ionicons name="home-outline" size={24} color="gray" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Address"
              value={address}
              onChangeText={setAddress}
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="location-outline" size={24} color="gray" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="City"
              value={city}
              onChangeText={setCity}
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="flag-outline" size={24} color="gray" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="State"
              value={state}
              onChangeText={setState}
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={24} color="gray" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Zip Code"
              value={zip}
              onChangeText={setZip}
              keyboardType="numeric"
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleConfirm}>
            <Text style={styles.buttonText}>Confirm Address</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff6200',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  topBarTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  formContainer: {
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  form: {
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    height: 50,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
  },
  button: {
    backgroundColor: '#ff6200',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ShippingAddressScreen;
