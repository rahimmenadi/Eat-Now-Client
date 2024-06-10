import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import env from './.env';
const ipAddress = env.IP_ADDRESS;

const BigOrdersScreen = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorFetchingOrders, setErrorFetchingOrders] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          setIsLoggedIn(false);
          setIsLoading(false);
          return;
        }
        setIsLoggedIn(true);

        const response = await axios.get(`http://${ipAddress}:7777/payment-service/api/orders/user/non-grouped`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setOrders(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setErrorFetchingOrders(true);
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#ff6200" style={{ flex: 1, justifyContent: 'center' }} />;
  }

  if (!isLoggedIn || errorFetchingOrders || orders.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Icon name="cart-outline" size={100} color="#ff6200" />
        <Text style={styles.emptyText}>No orders available</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('OrdersScreen', { orders: item.products, name: `Order ${item.id}` })}
    >
      <Text style={styles.itemDate}>{new Date(item.createdAt).toLocaleDateString()}</Text>
      <Text style={styles.itemAddress}>{item.adresse}</Text>
      <Text style={styles.itemCount}>{item.products.length} items</Text>
      <Text style={styles.itemStatus}>{item.statusOfOrder}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Big Orders</Text>
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
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
  list: {
    paddingHorizontal: 10,
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 5,
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
  itemDate: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemAddress: {
    fontSize: 16,
    color: '#555',
  },
  itemCount: {
    fontSize: 14,
    color: '#555',
  },
  itemStatus: {
    fontSize: 14,
    color: '#555',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 10,
    fontSize: 18,
    color: '#555',
  },
});

export default BigOrdersScreen;
 