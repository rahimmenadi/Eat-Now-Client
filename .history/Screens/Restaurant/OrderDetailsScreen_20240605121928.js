// OrderDetailsScreen.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

const orderItems = [
  { id: '1', name: 'Cheeseburger with fries', calories: '250 Calories', price: 12.80, image: require('./assets/cheeseburger.png') },
  { id: '2', name: 'Pizza with veggies', calories: '350 Calories', price: 9.99, image: require('./assets/pizza.png') },
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
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
      <View style={styles.shippingContainer}>
        <Text style={styles.shippingHeader}>Shipping</Text>
        <Text style={styles.shippingText}>Home - Suzy Queue 4455</Text>
        {/* Add functionality to edit shipping address */}
      </View>
      <View style={styles.cardContainer}>
        <Text style={styles.cardHeader}>Card</Text>
        <Text style={styles.cardText}>**** **** **** 1234</Text>
        <Text style={styles.cardExpiry}>Expire 10/2026</Text>
        {/* Add functionality to edit card details */}
      </View>
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total</Text>
        <Text style={styles.totalAmount}>$51.78</Text>
      </View>
      <TouchableOpacity style={styles.payButton} onPress={() => navigation.navigate('OrderConfirmation')}>
        <Text style={styles.payButtonText}>Pay now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  listContainer: { paddingBottom: 16 },
  itemContainer: { flexDirection: 'row', marginBottom: 16 },
  itemImage: { width: 80, height: 80, borderRadius: 8 },
  itemDetails: { flex: 1, marginLeft: 16 },
  itemName: { fontSize: 18, fontWeight: 'bold' },
  itemCalories: { color: '#888', marginTop: 4 },
  itemPrice: { marginTop: 8, fontSize: 16, fontWeight: 'bold' },
  shippingContainer: { marginVertical: 16 },
  shippingHeader: { fontSize: 18, fontWeight: 'bold' },
  shippingText: { marginTop: 4, fontSize: 16 },
  cardContainer: { marginVertical: 16 },
  cardHeader: { fontSize: 18, fontWeight: 'bold' },
  cardText: { marginTop: 4, fontSize: 16 },
  cardExpiry: { color: '#888' },
  totalContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16, marginBottom: 32 },
  totalText: { fontSize: 18, fontWeight: 'bold' },
  totalAmount: { fontSize: 18, fontWeight: 'bold' },
  payButton: { backgroundColor: '#ff6200', padding: 16, borderRadius: 8, alignItems: 'center' },
  payButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});

export default OrderDetailsScreen;
