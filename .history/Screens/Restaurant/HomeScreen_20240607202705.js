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
} from "react-native";
import React, { useEffect,useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import SPACING from "../../config/SPACING";
import colors from "../../config/Restaurant/colors";
import DATA from "../../config/Restaurant/DATA";
import recipes from "../../config/Restaurant/Recipes";
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';





const { width } = Dimensions.get("window");

const ITEM_WIDTH = width / 2 - SPACING * 3;


const HomeScreen = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState(''); // State to hold the user's name

  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // State for search input
  const [categories, setCategories] = useState([]);


  const [activeCategory, setActiveCategory] = useState(0);
  useEffect(() => {
    // Fetch user data
    const fetchUserData = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (userId) {
          const response = await axios.get(`http://192.168.113.110:7777/user-service/api/v1/user/${userId}`);
          setUserName(response.data.data.name);
          console.log(response.data.data.name) ;// Update state with the user's name
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };
  
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://192.168.113.110:7777/category-service/api/category');
        setCategories(response.data);
        console.log
       
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };
    // const handleCategorySelection = async (categoryId) => {
    //   setActiveCategory(categoryId);
    //   try {
    //     // Fetch items based on selected category
    //     const response = await axios.get(`http://192.168.113.110:8081/api/category/${categoryId}/items`);
    //     setRecipes(response.data);
    //   } catch (error) {
    //     console.error('Failed to fetch items by category:', error);
    //   }
    // };

    // Fetch recipes data
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://192.168.113.110:7777/product-service/api/product');
        setRecipes(response.data); // Update state with the fetched recipes
      } catch (error) {
        console.error('Failed to fetch recipes:', error);
      }
    };

    fetchUserData();
    fetchRecipes();
  }, []);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    try {
      if (query) {
        const response = await axios.get(`http://192.168.113.110:7777/product-service/api/product/search?name=${query}`);
        setRecipes(response.data);
      } else {
        const response = await axios.get('http://192.168.113.110:7777/product-service/api/product');
        setRecipes(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch search results:', error);
    }
  };
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
              What would you like to order?
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
                onPress={() => setActiveCategory(category.id)}
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
                  <Text style={{ color: colors.gray }}>No Image</Text>
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