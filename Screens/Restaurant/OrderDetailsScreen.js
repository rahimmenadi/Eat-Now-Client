import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For the back arrow icon
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import env from './.env';
const ipAddress = env.IP_ADDRESS;

const OrderDetailsScreen = ({ navigation }) => {
  const [address, setAddress] = useState('');


  const [totalAmount, setTotalAmount] = useState(0);
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    // Function to retrieve the address from AsyncStorage
    const retrieveAddress = async () => {
      try {
        const savedAddress = await AsyncStorage.getItem('address');
        

        if (savedAddress) {
          setAddress(savedAddress);
          
        } else {
          setAddress('No address saved');
        }
      } catch (error) {
        console.error('Error retrieving address:', error);
      }
    };

    // Call the function to retrieve the address when the component mounts
    retrieveAddress();

    // Fetch cart details
    const fetchCartDetails = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get(`http://${ipAddress}:7777/order-service/api/carts`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        // Set order items and total amount
        setOrderItems(response.data.products);
        setTotalAmount(response.data.totalPriceCart);
      } catch (error) {
        console.error('Error fetching cart details:', error);
      }
    };

    fetchCartDetails();

    // Clean-up function
    return () => {
      // Cleanup if needed
    };
  }, []);

  const handlePayment = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.post(`http://${ipAddress}:7777/order-service/api/carts/checkout/${address}`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(address)

navigation.navigate("OrderConfirmation")    } catch (error) {
      console.log(address)
      console.error('Error processing payment:', error);
    }
  };

  const renderOrderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemCalories}>{item.quantity} x ${item.price} = ${item.totalPrice}</Text>
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

      <View style={styles.content}>
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
          <Ionicons name="location" size={24} color="#ff6200" />
          <View style={{ marginLeft: 10 }}>

            <Text style={styles.shippingText}>Home</Text>
            <Text style={styles.shippingText}>{address}</Text>
            </View>

          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total: ${totalAmount}</Text>
        </View>

        <TouchableOpacity style={styles.confirmButton} onPress={handlePayment}>
          <Text style={styles.confirmButtonText}>Proceed to Payment</Text>
        </TouchableOpacity>
      </View>
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  section: {
    marginBottom: 20,
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
    borderRadius: 10,
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
  shippingText: {
    fontSize: 16,
    color: '#000',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  totalContainer: {
    alignItems: 'center', // Center the total amount text
    marginBottom: 10,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OrderDetailsScreen;