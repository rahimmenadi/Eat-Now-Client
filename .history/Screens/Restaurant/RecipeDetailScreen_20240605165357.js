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
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get("window");

const RecipeDetailScreen = ({ route }) => {
  const navigation = useNavigation();
  const { recipeId, posterPath, data } = route.params;
  console.log("Data:", data);
  // Check if data is defined and it's an array
  if (!Array.isArray(data)) {
    // If data is not an array, handle the error or return a default view
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Data is not available</Text>
      </View>
    );
  }

  // Find the selected item from the data
  const selectedItem = data.find((item) => item.id === recipeId);

  // If selectedItem is undefined, handle the error or return a default view
  if (!selectedItem) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Item not found</Text>
      </View>
    );
  }

  return (
    <>
    <SafeAreaView style={styles.container}>
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
              source={{ uri: "https://image.tmdb.org/t/p/w780" + selectedMovie.poster_path }}
            >
              {/* Your existing code here */}
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
                    {selectedMovie.title}
                  </Text>
                </View>
                {/* Your existing code here */}
              </View>
              <View
                style={{ flexDirection: "row", justifyContent: "space-between" }}
              >
                {/* Rest of your code */}
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default RecipeDetailScreen;

const styles = StyleSheet.create({});
