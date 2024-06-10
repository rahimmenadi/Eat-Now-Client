import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import SPACING from "../../config/SPACING";
const { height } = Dimensions.get("window");
import { Ionicons } from "@expo/vector-icons";
import colors from "../../config/Restaurant/colors";
import { useNavigation } from "@react-navigation/native";
import Spinner from 'react-native-spinkit';

const RecipeDetailScreen = ({ route }) => {
  const navigation = useNavigation();
  const { recipeId } = route.params; // Extract recipeId from the route params
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await axios.get(`http://192.168.113.110:7777/product-service/api/product/${recipeId}`);
        setRecipe(response.data);
      } catch (error) {
        console.error('Failed to fetch recipe details:', error);
      }
    };

    fetchRecipeDetails();
  }, [recipeId]);

  if (!recipe) {
    return (
      <SafeAreaView>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <>
      <ScrollView>
        <View>
          <ImageBackground
            style={{
              padding: SPACING * 2,
              height: height / 2.5,
              padding: SPACING * 2,
              paddingTop: SPACING * 4,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
            source={{ uri: recipe.img || 'https://via.placeholder.com/300' }}
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
              style={{
                height: SPACING * 4.5,
                width: SPACING * 4.5,
                backgroundColor: colors.white,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: SPACING * 2.5,
              }}
            >
              <Ionicons name="heart" size={SPACING * 2.5} color={colors.gray} />
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
            <View style={{ marginVertical: SPACING * 3 }}>
              <Text
                style={{
                  fontSize: SPACING * 2,
                  fontWeight: "700",
                  color: colors.dark,
                }}
              >
                Ingredients
              </Text>
              {(recipe.ingredients || []).map((ingredient, index) => (
                <View
                  style={{
                    marginVertical: SPACING,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                  key={index}
                >
                  <View
                    style={{
                      width: SPACING,
                      height: SPACING,
                      backgroundColor: colors.light,
                      borderRadius: SPACING,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: SPACING * 1.7,
                      fontWeight: "600",
                      color: colors.gray,
                      marginLeft: SPACING,
                    }}
                  >
                    {ingredient}
                  </Text>
                </View>
              ))}
            </View>
            <Text
              style={{
                fontSize: SPACING * 2,
                fontWeight: "700",
                color: colors.dark,
                marginBottom: SPACING,
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
         <View style={{ padding: SPACING * 2 ,color:colors.white}}>
          <Text style={{ fontSize: SPACING * 2, fontWeight: "700", color: colors.dark, marginBottom: SPACING }}>
            Additional Information
          </Text>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: SPACING }}>
            <Text style={{ fontSize: SPACING * 1.6, fontWeight: "600", color: colors.gray }}>Minimum Time: {recipe.minTime || 'N/A'}</Text>
            <Text style={{ fontSize: SPACING * 1.6, fontWeight: "600", color: colors.gray }}>Maximum Time: {recipe.maxTime || 'N/A'}</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: SPACING }}>
            <Text style={{ fontSize: SPACING * 1.6, fontWeight: "600", color: colors.gray }}>Minimum Quantity: {recipe.minQuantity || 'N/A'}</Text>
            <Text style={{ fontSize: SPACING * 1.6, fontWeight: "600", color: colors.gray }}>Maximum Quantity: {recipe.maxQuantity || 'N/A'}</Text>
          </View>
          <Text style={{ fontSize: SPACING * 1.6, fontWeight: "600", color: colors.gray }}>Promo Price: {recipe.promoPrice || 'N/A'}</Text>
          <Text style={{ fontSize: SPACING * 1.6, fontWeight: "600", color: colors.gray }}>Calories: {recipe.calories || 'N/A'}</Text>
        </View>
      </ScrollView>
      <ScrollView>
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
       
      
        
      </ScrollView>
    </>
  );
};

export default RecipeDetailScreen;

const styles = StyleSheet.create({});
