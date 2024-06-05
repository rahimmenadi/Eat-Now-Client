import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, SafeAreaView, Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const initialWishlist = [
  {
    id: '1',
    name: 'Pizza with ham and vegetables',
    calories: '350 Calories',
    price: 9.99,
    image: 'https://freepngimg.com/thumb/pizza/46-pizza-png-image.png', // Placeholder image URL
  },
  {
    id: '2',
    name: 'Grilled beef steak and potatoes',
    calories: '450 Calories',
    price: 24.99,
    image: 'https://freepngimg.com/thumb/burger/5-2-burger-png.png', // Placeholder image URL
  },
  {
    id: '3',
    name: 'Cheeseburger with fries',
    calories: '250 Calories',
    price: 12.80,
    image: 'https://freepngimg.com/thumb/burger/5-2-burger-png.png', // Placeholder image URL
  },
];

const WishlistScreen = () => {
  const [wishlist, setWishlist] = useState(initialWishlist);

  const handleDelete = (itemId) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to remove this item from your wishlist?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: () => setWishlist(wishlist.filter(item => item.id !== itemId))
        }
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemCalories}>{item.calories} 🔥</Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
      </View>
      <TouchableOpacity style={styles.deleteIcon} onPress={() => handleDelete(item.id)}>
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
