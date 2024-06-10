import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator 
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import SPACING from "../../config/SPACING";
const { height } = Dimensions.get("window");
import { Ionicons } from "@expo/vector-icons";
import colors from "../../config/Restaurant/colors";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import env from './.env'; // Adjust the path if necessary

const ipAddress = env.IP_ADDRESS;



const RecipeDetailScreen = ({ route }) => {
  const navigation = useNavigation();
  const { recipeId } = route.params;
  const [recipe, setRecipe] = useState(null);
  const [addedToWishlist, setAddedToWishlist] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await axios.get(`http://${ipAddress}:7777/product-service/api/product/${recipeId}`);
        setRecipe(response.data);
        setLoading(false); // Set loading to false after fetching the recipe details
      } catch (error) {
        console.error('Failed to fetch recipe details:', error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchRecipeDetails();
  }, [recipeId]);

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={colors.orange} />
      </SafeAreaView>
    );
  }
  const addToWishlist = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        showMessage({
          message: 'Error',
          description: 'You need to be logged in to add items to the wishlist.',
          type: 'danger',
        });
        return;
      }
  
      await axios.post(
        `http://${ipAddress}:7777/wishlist-service/api/wishlist/items?productId=${recipeId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAddedToWishlist(true);
  
      showMessage({
        message: 'Success',
        description: 'Item added to wishlist successfully.',
        type: 'success',
      });
  
      // Update the state to indicate that the item is added to the wishlist
     
    } catch (error) {
      showMessage({
        message: 'Error',
        description: 'Failed to add item to wishlist. Please try again.',
        type: 'danger',
      });
      console.error('Error adding to wishlist:', error);
    }
  };
  



  return (
    <>
      <ScrollView>
        <View>
          <ImageBackground
            style={{
              padding: SPACING * 2,
              height: height / 2.5,
              paddingTop: SPACING * 4,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
            source={{ uri: recipe.image || 'https://via.placeholder.com/300' }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate('Home')}
              style={{
                height: SPACING * 4.5,
                width: SPACING * 4.5,
                backgroundColor: colors.white,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: SPACING * 2.5,
              }}
            >
              <Ionicons
                name="arrow-back"
                size={SPACING * 2.5}
                color={colors.gray}
              />
            </TouchableOpacity>
            <TouchableOpacity
        onPress={addToWishlist}
        style={{
          height: SPACING * 4.5,
          width: SPACING * 4.5,
          backgroundColor: colors.white,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: SPACING * 2.5,
        }}
      >
        <Ionicons
          name="heart"
          size={SPACING * 2.5}
          color={addedToWishlist ? colors.orange : colors.gray} // Change color to red if added to wishlist
        />
      </TouchableOpacity>
          </ImageBackground>
          <View
            style={{
              padding: SPACING * 2,
              paddingTop: SPACING * 3,
              marginTop: -SPACING * 3,
              borderTopLeftRadius: SPACING * 3,
              borderTopRightRadius: SPACING * 3,
              backgroundColor: colors.white,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                marginBottom: SPACING * 3,
                alignItems: "center",
              }}
            >
              <View style={{ width: "70%" }}>
                <Text
                  style={{
                    fontSize: SPACING * 3,
                    color: colors.black,
                    fontWeight: "700",
                  }}
                >
                  {recipe.name}
                </Text>
              </View>
              <View
                style={{
                  padding: SPACING,
                  paddingHorizontal: SPACING * 3,
                  backgroundColor: colors.yellow,
                  flexDirection: "row",
                  borderRadius: SPACING,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="star"
                  color={colors.black}
                  size={SPACING * 1.7}
                />
                <Text
                  style={{
                    fontSize: SPACING * 1.6,
                    fontWeight: "600",
                    marginLeft: SPACING / 2,
                    color: colors.black,
                  }}
                >
                  {recipe.rating || 'N/A'}
                </Text>
              </View>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View
                style={{
                  padding: SPACING,
                  paddingHorizontal: SPACING * 2,
                  backgroundColor: colors.light,
                  flexDirection: "row",
                  borderRadius: SPACING,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="time"
                  color={colors.gray}
                  size={SPACING * 1.7}
                />
                <Text
                  style={{
                    fontSize: SPACING * 1.6,
                    fontWeight: "600",
                    marginLeft: SPACING / 2,
                    color: colors.gray,
                  }}
                >
                  {recipe.minTime || 'N/A'}
                </Text>
              </View>
              <View
                style={{
                  padding: SPACING,
                  paddingHorizontal: SPACING * 2,
                  backgroundColor: colors.light,
                  flexDirection: "row",
                  borderRadius: SPACING,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="bicycle"
                  color={colors.gray}
                  size={SPACING * 1.7}
                />
                <Text
                  style={{
                    fontSize: SPACING * 1.6,
                    fontWeight: "600",
                    marginLeft: SPACING / 2,
                    color: colors.gray,
                  }}
                >
                  {recipe.del_time || '20min'}
                </Text>
              </View>
              <View
                style={{
                  padding: SPACING,
                  paddingHorizontal: SPACING * 2,
                  backgroundColor: colors.light,
                  flexDirection: "row",
                  borderRadius: SPACING,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="restaurant"
                  color={colors.gray}
                  size={SPACING * 1.7}
                />
                <Text
                  style={{
                    fontSize: SPACING * 1.6,
                    fontWeight: "600",
                    marginLeft: SPACING / 2,
                    color: colors.gray,
                  }}
                >
                  {recipe.cooking_time || '10 min'}
                </Text>
              </View>
            </View>

            <Text
              style={{
                fontSize: SPACING * 2,
                fontWeight: "700",
                color: colors.dark,
                marginBottom: SPACING,
                marginTop: SPACING * 2,
              }}
            >
              Description
            </Text>
            <Text
              style={{
                fontSize: SPACING * 1.7,
                fontWeight: "500",
                color: colors.gray,
              }}
            >
              {recipe.description}
            </Text>
          </View>
        </View>
        
        <View style={styles.container}>
          <Text style={styles.heading}>Additional Information</Text>
          <View style={styles.infoRow}>
            <Ionicons name="flame-outline" size={SPACING * 1.6} color={colors.gray} />
            <Text style={styles.infoLabel}>Calories:</Text>
            <Text style={styles.infoValue}>{recipe.calories || 'N/A'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="time-outline" size={SPACING * 1.6} color={colors.gray} />
            <Text style={styles.infoLabel}>Maximum Time:</Text>
            <Text style={styles.infoValue}>{recipe.maxTime || 'N/A'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="cube-outline" size={SPACING * 1.6} color={colors.gray} />
            <Text style={styles.infoLabel}>Minimum Quantity:</Text>
            <Text style={styles.infoValue}>{recipe.minQuantity || 'N/A'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="cube-outline" size={SPACING * 1.6} color={colors.gray} />
            <Text style={styles.infoLabel}>Maximum Quantity:</Text>
            <Text style={styles.infoValue}>{recipe.maxQuantity || 'N/A'}</Text>
          </View>
          
         
        </View>
        
      </ScrollView>
      
      <View style={{ padding: SPACING * 2 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Checkout')}
          style={{
            width: "100%",
            padding: SPACING * 2,
            backgroundColor: colors.black,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: SPACING * 2,
          }}
        >
          <Text
            style={{
              fontSize: SPACING * 2,
              color: colors.white,
              fontWeight: "700",
            }}
          >
            Choose this for
          </Text>

          <Text
            style={{
              fontSize: SPACING * 2,
              color: colors.yellow,
              fontWeight: "700",
              marginLeft: SPACING / 2,
            }}
          >
            $ {recipe.price}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default RecipeDetailScreen;

const styles = StyleSheet.create({
  container: {
    padding: SPACING * 2,
    backgroundColor: colors.white,
    borderRadius: SPACING,
    marginBottom: SPACING * 2,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: SPACING,
    elevation: 4,
  },
  heading: {
    fontSize: SPACING * 2,
    fontWeight: "700",
    color: colors.dark,
    marginBottom: SPACING,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING,
    paddingVertical: SPACING / 2,
    borderBottomWidth: 1,
    borderBottomColor: colors.yellow,
  },
  infoLabel: {
    fontSize: SPACING * 1.6,
    fontWeight: "600",
    color: colors.gray,
    marginLeft: SPACING,
    flex: 1,
  },
  infoValue: {
    fontSize: SPACING * 1.6,
    fontWeight: "600",
    color: colors.dark,
    flex: 1,
    textAlign: "right",
  },
})
