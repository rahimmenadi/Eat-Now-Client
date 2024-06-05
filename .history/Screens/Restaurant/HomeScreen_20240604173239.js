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
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import SPACING from "../../config/SPACING";
import colors from "../../config/Restaurant/colors";
import DATA from "../../config/Restaurant/DATA";
import recipes from "../../config/Restaurant/Recipes";
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";


const { width } = Dimensions.get("window");

const ITEM_WIDTH = width / 2 - SPACING * 3;

const Tabs = AnimatedTabBarNavigator();
const HomeScreen = () => {
  const navigation = useNavigation();
  const Tabs = AnimatedTabBarNavigator();

  const [activeCategory, setActiveCategory] = useState(0);
  return (
    
    <SafeAreaView>
      <StatusBar hidden={true} />
      <ScrollView>
        <View style={{ padding: SPACING * 2 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
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
                Abderrahim
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity style={{ marginRight: SPACING }}>
                <Ionicons
                  name="notifications-outline"
                  size={SPACING * 3.5}
                  color={colors.dark}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons
                  name="menu"
                  size={SPACING * 3.5}
                  color={colors.dark}
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
              backgroundColor: colors.light,
              marginVertical: SPACING * 3,
              padding: SPACING * 1.5,
              borderRadius: SPACING,
            }}
          >
            <Ionicons name="search" color={colors.gray} size={SPACING * 2.7} />
            <TextInput
              placeholder="Want to .."
              placeholderTextColor={colors.gray}
              style={{
                color: colors.gray,
                fontSize: SPACING * 2,
                marginLeft: SPACING,
              }}
            />
          </View>
          <ScrollView horizontal>
            {DATA.map((category, index) => (
              <TouchableOpacity
                style={{ marginRight: SPACING * 3 }}
                key={index}
                onPress={() => setActiveCategory(index)}
              >
                <Text
                  style={[
                    {
                      fontSize: SPACING * 1.7,
                      fontWeight: "600",
                      color: colors.gray,
                    },
                    activeCategory === index && {
                      color: colors.black,
                      fontWeight: "700",
                      fontSize: SPACING * 1.8,
                    },
                  ]}
                >
                  {category.title}
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
            {DATA[activeCategory].recipes.map((item) => (
              <TouchableOpacity
  style={{ width: ITEM_WIDTH, marginBottom: SPACING * 2 }}
  onPress={() => navigation.navigate('RecipeDetailScreen', { recipeId: item.id })}

  
>
                <Image
                  style={{
                    width: "100%",
                    height: ITEM_WIDTH + SPACING * 3,
                    borderRadius: SPACING * 2,
                  }}
                  source={item.image}
                />
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
                    color: colors.gray,
                    marginVertical: SPACING / 2,
                  }}
                >
                  Today discount {item.discount}
                </Text>
                <Text style={{ fontSize: SPACING * 2, fontWeight: "700" }}>
                  $ {item.price}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: "#2F7C6E",
                inactiveTintColor: "#222222"
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home} // Replace 'Home' with your actual home screen component
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Icon // Replace 'Icon' with your icon component
                            name="Home"
                            size={size ? size : 24}
                            color={focused ? color : "#222222"}
                            focused={focused}
                            color={color}
                        />
                    )
                }}
            />
            {/* Add more tabs here, following the same structure */}
        </Tab.Navigator>
      </ScrollView>
    </SafeAreaView>
  );
};
console.log(DATA[1].recipes[2])
export default HomeScreen;


const styles = StyleSheet.create({});