import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For the back arrow icon

const orderItems = [
  { id: '1', name: 'Cheeseburger with fries', calories: '250 Calories', price: 12.80, image: require('../../assets/5-2-burger-png.png') },
  { id: '2', name: 'Pizza with veggies', calories: '350 Calories', price: 9.99, image: require('../../assets/46-pizza-png-image.png') },
  // Add other items similarly
];

const shippingDetails = {
  address: 'Suzy Queue 4455',
};

const totalAmount = 51.78; // Total amount to pay

const OrderDetailsScreen = ({ navigation }) => {
  const renderOrderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemCalories}>{item.calories} 🔥</Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Order Details</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Items</Text>
        <FlatList
          data={orderItems}
          renderItem={renderOrderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContentContainer} // to avoid flatlist covering the top bar
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Shipping</Text>
        <View style={styles.shippingContainer}>
          <Text style={styles.shippingText}>Home</Text>
          <Text style={styles.shippingText}>{shippingDetails.address}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Total</Text>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>${totalAmount.toFixed(2)}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.confirmButton} onPress={() => navigation.navigate('OrderConfirmation')}>
        <Text style={styles.confirmButtonText}>Proceed to Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
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
  section: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listContentContainer: {
    paddingBottom: 20,
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
  shippingContainer: {
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
  shippingText: {
    fontSize: 16,
    color: '#000',
  },
  totalContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  confirmButton: {
    backgroundColor: '#ff6200',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    margin: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OrderDetailsScreen;
