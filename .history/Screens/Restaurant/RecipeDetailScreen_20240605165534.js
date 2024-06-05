import React from "react";
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
import { Ionicons } from "@expo/vector-icons";
import SPACING from "../../config/SPACING";
import colors from "../../config/Restaurant/colors";
import recipes from "../../config/Restaurant/Recipes";
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get("window");


const RecipeDetailScreen = ({ route }) => {
  const { recipeId, posterPath } = route.params;

  const navigation = useNavigation();

  const recipe = recipes.find((item) => item.id === recipeId); // Find the recipe object from recipes array

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
            source={{ uri: recipe.image }} // Corrected this line
          >
            <TouchableOpacity
              onPress={() => navigation.goBack()} // Corrected navigation to go back
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
                  {recipe.rating}
                </Text>
              </View>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              {/* Rest of your code */}
            </View>
          </View>
        </View>
      </ScrollView>
      <SafeAreaView>
        <View style={{ padding: SPACING * 2 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('TabNavigator', { screen: 'Checkout' })}
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
      </SafeAreaView>
    </>
  );
};

export default RecipeDetailScreen;

const styles = StyleSheet.create({});
