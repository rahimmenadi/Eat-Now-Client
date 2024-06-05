// OrderDetailsScreen.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

const orderItems = [
  { id: '1', name: 'Cheeseburger with fries', calories: '250 Calories', price: 12.80, image: require('../../') },
  { id: '2', name: 'Pizza with veggies', calories: '350 Calories', price: 9.99, image: require('../../assets/pizza.png') },
  // Add other items similarly
];

const OrderDetailsScreen = ({ navigation }) => {
  const renderOrderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemCalories}>{item.calories}</Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Order Details</Text>
      <FlatList
        data={orderItems}
        renderItem={renderOrderItem}
        keyExtractor={item => item.id}
      />
      <TouchableOpacity style={styles.confirmButton} onPress={() => navigation.navigate('SomeOtherScreen')}>
        <Text style={styles.confirmButtonText}>Proceed to Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  itemDetails: {
    marginLeft: 10,
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemCalories: {
    fontSize: 14,
    color: '#888',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  confirmButton: {
    backgroundColor: '#ff6200',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OrderDetailsScreen;