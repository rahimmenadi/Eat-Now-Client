import React, { useState } from 'react';
import {  Dimensions, 
  ImageBackground, 
  SafeAreaView, 
  ScrollView, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View, 
  ActivityIndicator  } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Plane } from 'react-native-animated-spinkit';
import SPACING from "../../config/SPACING";
import colors from "../../config/Restaurant/colors";
import recipes from "../../config/Restaurant/Recipes";
import { useNavigation } from "@react-navigation/native";

const RecipeDetailScreen = ({ route }) => {
  const navigation = useNavigation();
  const { recipeId } = route.params;
  const recipe = recipes.find((item) => item.id === recipeId);
  const [loading, setLoading] = useState(false);

  // Function to simulate asynchronous task
  const simulateAsyncTask = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000); // Simulate async task completion after 3 seconds
  };

  return (
    <>
      {loading && (
        <View style={styles.spinnerContainer}>
          <Plane size={48} color="#FFF" />
        </View>
      )}
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
                  {recipe.time || 'N/A'}
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
                  {recipe.del_time || 'N/A'}
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
                  {recipe.cooking_time || 'N/A'}
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
      </ScrollView>
      <SafeAreaView>
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
                fontSize: SPACING
                * 2,
                color: colors.yellow,
                fontWeight: "700",
                marginLeft: SPACING / 2,
              }}
            >
              $ {recipe.price || 'N/A'}
            </Text>
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
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },

});
