import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, FlatList, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import env from './.env';
import Toast from 'react-native-toast-message'; // Import Toast from the library
const ipAddress = env.IP_ADDRESS;

const CheckoutScreen = ({ navigation }) => {
  const [basketItems, setBasketItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [totalPriceCart, setTotalPriceCart] = useState(0);
  const [address, setAddress] = useState('');
  const [isAddressSaved, setIsAddressSaved] = useState(false);
  const [errorFetchingCart, setErrorFetchingCart] = useState(false); // New state variable for error fetching cart


  useFocusEffect(
    React.useCallback(() => {
      const fetchCart = async () => {
        try {
          const token = await AsyncStorage.getItem('token');
          const response = await axios.get(`http://${ipAddress}:7777/order-service/api/carts`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          setBasketItems(response.data.products);
          setTotalPriceCart(response.data.totalPriceCart);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching cart:', error);
          setErrorFetchingCart(true);
          setIsLoading(false);
        }
      };

      const checkLoginStatus = async () => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          setIsLoggedIn(true);
        }
      };
      
      fetchCart();
      checkLoginStatus();

      return () => {
        // Clean up function if needed
      };
    }, [])
  );

  const handleCheckout = async () => {
    // Perform address validation
    if (!address.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter your address.',
        position: 'bottom',
        visibilityTime: 3000,
        autoHide: true,
      });
    } else {
      await AsyncStorage.setItem('address',address)
      // Save the total price to AsyncStorage
      await AsyncStorage.setItem('totalPrice', totalPriceCart.toString());
      navigation.navigate('OrderDetailsScreen');
    }
  };

  const deleteItem = async (itemId) => {
    try {
      const token = await AsyncStorage.getItem('token');
      await axios.delete(`http://${ipAddress}:7777/order-service/api/carts/products/${itemId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      // Remove item from local state after successful deletion
      const updatedItems = basketItems.filter(item => item.id !== itemId);
      setBasketItems(updatedItems);
      // Optionally, update the total price cart state if needed
      const newTotalPrice = updatedItems.reduce((total, item) => total + item.totalPrice, 0);
      setTotalPriceCart(newTotalPrice);
    } catch (error) {
      console.error('Error deleting item:', error);
      Alert.alert('Error', 'Failed to delete the item.');
    }
  };

  const confirmDelete = (itemId) => {
    Alert.alert(
      'Delete Item',
      'Are you sure you want to delete this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => deleteItem(itemId) },
      ],
      { cancelable: false }
    );
  };

  const updateItemQuantity = async (itemId, newQuantity) => {
    try {
      const token = await AsyncStorage.getItem('token');
      await axios.put(`http://${ipAddress}:7777/order-service/api/carts/products/${itemId}`, {
        quantity: newQuantity
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      // Update local state after successful update
      const updatedItems = basketItems.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity, totalPrice: item.price * newQuantity } : item
      );
      setBasketItems(updatedItems);
      // Update the total price cart state if needed
      const newTotalPrice = updatedItems.reduce((total, item) => total + item.totalPrice, 0);
      setTotalPriceCart(newTotalPrice);
    } catch (error) {
      console.error('Error updating quantity:', error);
      Alert.alert('Error', 'Failed to update the quantity.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemCalories}>{item.quantity} x ${item.price} = ${item.totalPrice}</Text>
      </View>
      <View style={styles.actionsContainer}>
        <View style={styles.itemQuantity}>
          <TouchableOpacity 
            style={styles.quantityButton}          onPress={() => updateItemQuantity(item.id, item.quantity - 1)} 
            disabled={item.quantity <= 1}
          >
            <Icon name="remove" size={16} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.quantityValue}>{item.quantity}</Text>
          <TouchableOpacity 
            style={styles.quantityButton} 
            onPress={() => updateItemQuantity(item.id, item.quantity + 1)}
          >
            <Icon name="add" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.deleteIcon} onPress={() => confirmDelete(item.id)}>
          <Icon name="trash" size={24} color="#ff6200" />
        </TouchableOpacity>
      </View>
    </View>
  );
  

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ff6200" />
      </View>
    );
  }

  if (!isLoggedIn) {
    return (
      <View style={styles.container}>
        <Icon name="person-circle-outline" size={50} color="#ff6200" />
        <Text>Please log in to view your cart.</Text>
        {/* You can also render a login button here */}
      </View>
    );
  }

  if (basketItems.length === 0) {
    return (
      <View style={styles.emptyCartContainer}>
        <Icon name="cart-outline" size={100} color="#ff6200" />
        <Text style={styles.emptyCartText}>Your cart is empty</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Order Details</Text>
      <FlatList
        data={basketItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        style={styles.listContainer}
      />
    <View style={styles.bottomContainer}>
        <View style={styles.addressContainer}>
        <Icon name="location-outline" size={24} color="#ff6200" style={styles.addressIcon} />
          <TextInput 
            style={styles.addressInput} 
            placeholder="Enter your address" 
            value={address} 
            onChangeText={setAddress} />
          
        </View>
        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Subtotal</Text>
            <Text style={styles.summaryText}>${totalPriceCart}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Delivery</Text>
            <Text style={styles.summaryText}>$4.00</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalText}>${totalPriceCart + 4}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <Text style={styles.checkoutButtonText}>Checkout</Text>
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
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  deleteIcon: {
    marginLeft: 10,
  },
  bottomContainer: {
    paddingHorizontal: 10,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginVertical: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addressInput: {
    flex: 1,
    paddingVertical: 10,
    paddingLeft: 10,
  },
  addressIcon: {
    margin: 5,
  },
  summaryContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
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
    marginBottom: 10,
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
    paddingVertical: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: 20,
    color: '#ff6200',
    marginTop: 10,
  },
});

export default CheckoutScreen;

