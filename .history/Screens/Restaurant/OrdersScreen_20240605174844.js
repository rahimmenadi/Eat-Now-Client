import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, SafeAreaView } from 'react-native';

const orders = [
  {
    id: '1',
    name: 'Pizza with ham and vegetables',
    calories: '350 Calories',
    price: 9.99,
    status: 'Delivered',
    image: 'https://freepngimg.com/thumb/pizza/46-pizza-png-image.png', // Placeholder image URL
  },
  {
    id: '2',
    name: 'Grilled beef steak and potatoes',
    calories: '450 Calories',
    price: 24.99,
    status: 'In Transit',
    image: 'https://freepngimg.com/thumb/burger/5-2-burger-png.png', // Placeholder image URL
  },
  {
    id: '3',
    name: 'Cheeseburger with fries',
    calories: '250 Calories',
    price: 12.80,
    status: 'Preparing',
    image: 'https://freepngimg.com/thumb/burger/5-2-burger-png.png', // Placeholder image URL
  },
];

const OrdersScreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemCalories}>{item.calories} 🔥</Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
        <View style={[styles.orderStatus, styles[`status${item.status.replace(' ', '')}`]]}>
          <Text style={styles.orderStatusText}>{item.status}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>My Orders</Text>
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        style={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff6200',
    textAlign: 'center',
    marginVertical: 10,
  },
  listContainer: {
    flex: 1,
  },
  list: {
    paddingHorizontal: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  itemDetails: {
    flex: 1,
    marginHorizontal: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemCalories: {
    color: '#ff6200',
    marginTop: 5,
  },
  itemPrice: {
    marginTop: 5,
  },
  orderStatus: {
    marginTop: 5,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  orderStatusText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  statusDelivered: {
    backgroundColor: '#32CD32', // Green
  },
  statusInTransit: {
    backgroundColor: '#1E90FF', // Blue
  },
  statusPreparing: {
    backgroundColor: '#FFA500', // Orange
  },
});

export default OrdersScreen;
