import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const ProfileScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: '' }} // Replace with actual image URL or local asset
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Ilias Soltani</Text>
        <Text style={styles.profileEmail}>xm7zl234@gmail.com</Text>
      </View>
      <View style={styles.optionList}>
        <OptionItem icon="👜" label="My Wallet" info="$200" />
        <OptionItem icon="📦" label="My Orders" info="2 orders" />
        <OptionItem icon="❤️" label="My Wish List" info="8 meals" />
        <OptionItem icon="🎁" label="Offers" />
        <OptionItem icon="⚙️" label="Settings" />
        <OptionItem icon="👥" label="Join Us" />
        <OptionItem icon="📞" label="Contact Us" />
      </View>
      <TouchableOpacity style={styles.signOutButton}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const OptionItem = ({ icon, label, info }) => (
  <TouchableOpacity style={styles.optionItem}>
    <Text style={styles.optionIcon}>{icon}</Text>
    <View style={styles.optionTextContainer}>
      <Text style={styles.optionLabel}>{label}</Text>
      {info && <Text style={styles.optionInfo}>{info}</Text>}
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ff6600',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
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
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionIcon: {
    fontSize: 24,
    width: 40,
    textAlign: 'center',
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
  },
  signOutText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ProfileScreen;
