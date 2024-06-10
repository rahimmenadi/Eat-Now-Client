import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, SafeAreaView, Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios'; // Import axios

const WishlistScreen = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) return;

        const response = await axios.get('http://192.168.113.110:7777/wishlist-service/api/wishlist/items', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setWishlist(response.data.items);
      } catch (error) {
        console.error('Failed to fetch wishlist:', error);
      }
    };

    fetchWishlist();
  }, []);

  const handleDelete = async (itemId) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) return;

      await axios.delete(`http://localhost:7777/wishlist-service/api/wishlist/items/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setWishlist(wishlist.filter(item => item.productId !== itemId));
    } catch (error) {
      console.error('Failed to delete item from wishlist:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemCalories}>{item.description}</Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
      </View>
      <TouchableOpacity style={styles.deleteIcon} onPress={() => handleDelete(item.productId)}>
        <Icon name="delete" size={24} color="#ff6200" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>My Wishlist</Text>
      <FlatList
        data={wishlist}
        renderItem={renderItem}
        keyExtractor={item => item.productId}
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
    justifyContent: 'space-between', // Add this line
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
  deleteIcon: {
    marginLeft: 'auto', // Ensure the delete icon stays on the right
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
    alignSelf: 'center',
  },
});

export default WishlistScreen;
