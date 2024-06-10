import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ImageBackground } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import SPACING from "../../config/SPACING";
import colors from "../../config/Restaurant/colors";
import { useNavigation } from "@react-navigation/native";
import Spinner from 'react-native-spinkit';

const RecipeDetailScreen = ({ route }) => {
  const navigation = useNavigation();
  const { recipeId } = route.params;
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
      <SafeAreaView style={styles.loadingContainer}>
        <Spinner isVisible={true} size={48} type="Plane" color={colors.black} />
      </SafeAreaView>
    );
  }

  return (
    <>
      <ScrollView>
        <View>
          <ImageBackground
            style={styles.imageBackground}
            source={{ uri: recipe.img || 'https://via.placeholder.com/300' }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate('Home')}
              style={styles.backButton}
            >
              <Ionicons
                name="arrow-back"
                size={SPACING * 2.5}
                color={colors.gray}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.heartButton}
            >
              <Ionicons name="heart" size={SPACING * 2.5} color={colors.gray} />
            </TouchableOpacity>
          </ImageBackground>
          <View style={styles.detailsContainer}>
            <View style={styles.nameRatingContainer}>
              <Text style={styles.recipeName}>{recipe.name}</Text>
              <View style={styles.ratingContainer}>
                <Ionicons
                  name="star"
                  color={colors.black}
                  size={SPACING * 1.7}
                />
                <Text style={styles.ratingText}>{recipe.rating || 'N/A'}</Text>
              </View>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>Time: {recipe.minTime} - {recipe.maxTime}</Text>
              <Text style={styles.infoText}>Promo Price: {recipe.promoPrice || 'N/A'}</Text>
              <Text style={styles.infoText}>Min Quantity: {recipe.minQuantity}</Text>
              <Text style={styles.infoText}>Max Quantity: {recipe.maxQuantity}</Text>
              <Text style={styles.infoText}>Calories: {recipe.calories}</Text>
            </View>
            <Text style={styles.description}>{recipe.description}</Text>
          </View>
        </View>
      </ScrollView>
      <SafeAreaView>
        <View style={styles.chooseButtonContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Checkout')}
            style={styles.chooseButton}
          >
            <Text style={styles.chooseButtonText}>Choose this for ${recipe.price}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default RecipeDetailScreen;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBackground: {
    padding: SPACING * 2,
    height: 300,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  backButton: {
    height: SPACING * 4.5,
    width: SPACING * 4.5,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SPACING * 2.5,
  },
  heartButton: {
    height: SPACING * 4.5,
    width: SPACING * 4.5,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SPACING * 2.5,
  },
  detailsContainer: {
    padding: SPACING * 2,
    paddingTop: SPACING * 3,
    marginTop: -SPACING * 3,
    borderTopLeftRadius: SPACING * 3,
    borderTopRightRadius: SPACING * 3,
    backgroundColor: colors.white,
  },
  nameRatingContainer: {
    flexDirection: "row",
    marginBottom: SPACING * 3,
    alignItems: "center",
  },
  recipeName: {
    fontSize: SPACING * 3,
    color: colors.black,
    fontWeight: "700",
    width: "70%",
  },
  ratingContainer: {
    padding: SPACING,
    paddingHorizontal: SPACING * 3,
    backgroundColor: colors.yellow,
    flexDirection: "row",
    borderRadius: SPACING,
    justifyContent: "center",
    alignItems: "center",
  },
  ratingText: {
    fontSize: SPACING * 1.6,
    fontWeight: "600",
    marginLeft: SPACING / 2,
    color: colors.black,
  },
  infoContainer: {
    flexDirection: "column",
    marginBottom: SPACING * 3,
  },
  infoText: {
    fontSize: SPACING * 1.6,
    fontWeight: "600",
    color: colors.gray,
    marginBottom: SPACING / 2,
  },
  description: {
    fontSize: SPACING * 1.7,
    fontWeight: "500",
    color: colors.gray,
    marginBottom: SPACING,
  },
  chooseButtonContainer: {
    padding: SPACING * 2,
  },
  chooseButton: {
    width: "100%",
    padding: SPACING * 2,
    backgroundColor: colors.black,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: SPACING * 2,
  },
  chooseButtonText: {
    fontSize: SPACING * 2,
    color:
