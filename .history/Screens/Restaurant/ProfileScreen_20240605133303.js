import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

// Import your custom icons
import WalletIcon from '../../assets/wallet-icon.png';
import OrdersIcon from '../../assets/Order.png';
import WishlistIcon from '../../assets/wish-icon.png';
import OffersIcon from '../../assets/offers-icon.png';
import SettingsIcon from '../../assets/settings-icon.png';
import JoinUsIcon from '../../assets//Join us.png';
import ContactUsIcon from '../../assets/Order.png';

const ProfileScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: 'https://cdn3d.iconscout.com/3d/premium/thumb/man-4928309-4107685.png' }} // Replace with actual image URL or local asset
            style={styles.profileImage}
          />
        </View>
        <Text style={styles.profileName}>Ilias Soltani</Text>
        <Text style={styles.profileEmail}>xm7zl234@gmail.com</Text>
      </View>
      <View style={styles.optionList}>
        <OptionItem icon={WalletIcon} label="My Wallet" info="$200" />
        <OptionItem icon={OrdersIcon} label="My Orders" info="2 orders" />
        <OptionItem icon={WishlistIcon} label="My Wish List" info="8 meals" />
        <OptionItem icon={OffersIcon} label="Offers" />
        <OptionItem icon={SettingsIcon} label="Settings" />
        <OptionItem icon={JoinUsIcon} label="Join Us" />
        <OptionItem icon={ContactUsIcon} label="Contact Us" />
      </View>
      <TouchableOpacity style={styles.signOutButton}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const OptionItem = ({ icon, label, info }) => (
  <TouchableOpacity style={styles.optionItem}>
    <Image source={icon} style={styles.optionIcon} />
    <View style={styles.optionTextContainer}>
      <Text style={styles.optionLabel}>{label}</Text>
      {info && <Text style={styles.optionInfo}>{info}</Text>}
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Light background color
  },
  profileContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ff6600',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // For Android shadow
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fff', // White background for the circle
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // For Android shadow
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileEmail: {
    fontSize: 14,
    color: '#fff',
  },
  optionList: {
    marginTop: 20,
    marginHorizontal: 10,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // For Android shadow
  },
  optionIcon: {
    width: 24,
    height: 24,
    marginRight: 15,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 16,
  },
  optionInfo: {
    fontSize: 14,
    color: '#888',
  },
  signOutButton: {
    margin: 20,
    padding: 15,
    backgroundColor: '#ff6600',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // For Android shadow
  },
  signOutText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ProfileScreen;
