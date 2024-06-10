import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  ActivityIndicator
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import SPACING from "../../config/SPACING";
import colors from "../../config/Restaurant/colors";
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import env from './.env';

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width / 2 - SPACING * 3;
const ipAddress = env.IP_ADDRESS;

const HomeScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true); // Add loading state
  const [userName, setUserName] = useState(''); // State to hold the user's name
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // State for search input
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [userWilaya, setUserWilaya] = useState('');

  useEffect(() => {
    //loading
  

    const fetchData = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (userId) {
          const response = await axios.get(`http://${ipAddress}:7777/user-service/api/v1/user/${userId}`);
          setUserName(response.data.data.name);
          
        }

        const categoriesResponse = await axios.get(`http://${ipAddress}:7777/category-service/api/category`);
        setCategories(categoriesResponse.data);

        const wilaya = await AsyncStorage.getItem('userWilaya');
        const recipesResponse = await axios.get(`http://${ipAddress}:7777/product-service/api/product/searchByWilaya?wilaya=${wilaya}`);
        setRecipes(recipesResponse.data);
        setUserWilaya(wilaya);
        
        setLoading(false); // Update loading state when data is fetched
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Update loading state even if there's an error
      }
    };

    fetchData();
  }, []);

  


  

  const handleSearch = async (query) => {
    setSearchQuery(query);
    try {
      if (query) {
        const response = await axios.get(`http://${ipAddress}:7777/product-service/api/product/search?name=${query}`);
        setRecipes(response.data);
      } else {
        const response = await axios.get(`http://${ipAddress}:7777/product-service/api/product`);
        setRecipes(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch search results:', error);
    }
  };

  const handleCategorySelection = async (categoryId) => {
    setActiveCategory(categoryId);
    try {
      const response = await axios.get(`http://${ipAddress}:7777/product-service/api/product/searchByIdCategory?idCategory=${categoryId}`);
      setRecipes(response.data);
    } catch (error) {
      console.error('Failed to fetch items by category:', error);
    }
  };
  if (loading) {
    // Show activity indicator while loading
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.orange} />
      </View>
    );
  }
  


  return (
    <SafeAreaView>
      <StatusBar hidden={true} />
      <ScrollView>
        <View style={{ padding: SPACING * 2 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                style={{
                  width: SPACING * 4.5,
                  height: SPACING * 4.5,
                  borderRadius: SPACING * 3,
                  marginRight: SPACING,
                }}
                source={require("../../assets/restaurant/photo_5972080114906806758_y.jpg")}
              />
              <Text
                style={{
                  fontSize: SPACING * 1.7,
                  fontWeight: "800",
                  color: colors.dark,
                }}
              >
                {userName || 'Loading...'}
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity style={{ marginRight: SPACING }}
                onPress={() => navigation.navigate('NotificationScreen')}>
                <Ionicons
                  name="notifications-outline"
                  size={SPACING * 3.5}
                  color={colors.dark}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('WishlistScreen')}>
                <Ionicons
                  name="heart-outline"
                  size={SPACING * 3.5}
                  color={colors.orange}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ width: "60%", marginTop: SPACING * 2 }}>
            <Text style={{ fontSize: SPACING * 3, fontWeight: "700" }}>
              What would you like to order
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: '#D3D3D3',
              marginVertical: SPACING * 3,
              padding: SPACING * 1.5,
              borderRadius: SPACING,
            }}
          >
            <Ionicons name="search" color={colors.orange} size={SPACING * 2.7} />
            <TextInput
              placeholder="Want to .."
              placeholderTextColor={colors.gray}
              style={{
                color: colors.gray,
                fontSize: SPACING * 2,
                marginLeft: SPACING,
              }}
              value={searchQuery}
              onChangeText={handleSearch}
            />
          </View>
     
          <ScrollView horizontal>
            {categories.map((category) => (
              <TouchableOpacity
                style={{ marginRight: SPACING * 3 }}
                key={category.id}
                onPress={() => handleCategorySelection(category.id)}
              >
                <Text
                  style={[
                    {
                      fontSize: SPACING * 1.7,
                      fontWeight: "600",
                      color: colors.gray,
                    },
                    activeCategory === category.id && {
                      color: colors.black,
                      fontWeight: "700",
                      fontSize: SPACING * 1.8,
                    },
                  ]}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: SPACING * 2, paddingRight:80 }}>
  <Ionicons name="location" color={colors.orange} size={SPACING * 2.7} />
  <Text
    style={{
      color: colors.gray,
      fontSize: SPACING * 2,
      marginLeft: SPACING / 2, // Adjust the margin as needed
    }}
  >
    {userWilaya}
  </Text>
</View>

          </ScrollView>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              marginVertical: SPACING * 2,
            }}
          >
            {recipes.map((item) => (
              <TouchableOpacity
                style={{ width: ITEM_WIDTH, marginBottom: SPACING * 2 }}
                key={item.id}
                onPress={() => navigation.navigate('RecipeDetailScreen', { recipeId: item.id })}
              >
                <View
                  style={{
                    width: "100%",
                    height: ITEM_WIDTH + SPACING * 3,
                    borderRadius: SPACING * 2,
                    backgroundColor: colors.light,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {item.imageUrl ? (
                    <Image
                      source={{ uri: item.imageUrl }}
                      style={{ width: "100%", height: "100%", borderRadius: SPACING * 2 }}
                      resizeMode="cover"
                    />
                  ) : (
                    <Text style={{ color: colors.gray }}>No Image</Text>
                  )}
                </View>
                <Text
                  style={{
                    fontSize: SPACING * 2,
                    fontWeight: "700",
                    marginTop: SPACING,
                  }}
                >
                  {item.name}
                </Text>
                <Text
                  style={{
                    fontSize: SPACING * 1.5,
                    color: colors.orange,
                    marginVertical: SPACING / 2,
                  }}
                >
                  {item.calories ? `Calories: ${item.calories} 🔥` : 'Calories not available'}
                </Text>
                <Text style={{ fontSize: SPACING * 2, fontWeight: "700" }}>
                  $ {item.price}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
