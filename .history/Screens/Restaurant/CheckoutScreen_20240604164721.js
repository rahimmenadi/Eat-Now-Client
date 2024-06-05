import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, FlatList, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const navigation = useNavigation();

const basketItems = [
  {
    id: '1',
    name: 'Pizza with ham and vegetables',
    calories: '350 Calories',
    price: 9.99,
    quantity: 1,
    image: 'https://via.placeholder.com/60', // Placeholder image URL
  },
  {
    id: '2',
    name: 'Grilled beef steak and potatoes',
    calories: '450 Calories',
    price: 24.99,
    quantity: 1,
    image: 'https://via.placeholder.com/60', // Placeholder image URL
  },
  {
    id: '3',
    name: 'Cheeseburger with fries',
    calories: '250 Calories',
    price: 12.80,
    quantity: 1,
    image: 'https://via.placeholder.com/60', // Placeholder image URL
  },
];

const CheckoutScreen = () => {

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemCalories}>{item.calories} 🔥</Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
      </View>
      <View style={styles.itemQuantity}>
        <TouchableOpacity style={styles.quantityButton}>
          <Text style={styles.quantityText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityValue}>{item.quantity}</Text>
        <TouchableOpacity style={styles.quantityButton}>
          <Text style={styles.quantityText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Basket Details</Text>
      <FlatList
        data={basketItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        style={styles.listContainer}
      />
      <View style={styles.bottomContainer}>
        <View style={styles.promoContainer}>
          <TextInput style={styles.promoInput} placeholder="Promo Code" />
          <TouchableOpacity style={styles.promoButton}>
            <Text style={styles.promoButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Subtotal</Text>
            <Text style={styles.summaryText}>$47.78</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Delivery</Text>
            <Text style={styles.summaryText}>$4.00</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalText}>$51.78</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navButtonText}>Categories</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navButtonText}>Basket</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navButtonText}>Profile</Text>
        </TouchableOpacity>
      </View>
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
  itemQuantity: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ff6200',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  quantityValue: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  bottomContainer: {
    paddingHorizontal: 10,
  },
  promoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginVertical: 10,
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
  promoInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
  },
  promoButton: {
    marginLeft: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ff6200',
    borderRadius: 5,
  },
  promoButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  summaryContainer: {
    backgroundColor: '#fff',
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
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  summaryText: {
    fontSize: 16,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#ff6200',
    marginVertical: 10,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
  navButton: {
    alignItems: 'center',
  },
  navButtonText: {
    color: '#ff6200',
    fontWeight: 'bold',
  },
});

export default CheckoutScreen;
