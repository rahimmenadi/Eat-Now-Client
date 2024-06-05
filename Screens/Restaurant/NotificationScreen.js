import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const NotificationScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>
      {Array(4).fill().map((_, index) => (
        <View key={index} style={styles.notificationContainer}>
          <View style={styles.notificationIcon} />
          <Text style={styles.notificationText}>
            Action required: Verify your email address to save your progress
          </Text>
          <TouchableOpacity style={styles.closeButton}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff6600',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  headerTitle: {
    flex: 1,
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  notificationIcon: {
    width: 5,
    height: '100%',
    backgroundColor: '#ff6600',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    marginRight: 10,
  },
  notificationText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    color: '#ff6600',
    fontSize: 18,
  },
});

export default NotificationScreen;
