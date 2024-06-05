// OrderConfirmation.js
import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Image } from 'react-native';

const OrderConfirmation = ({ navigation }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={() => {
        navigation.goBack();
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Image source={require('../../assets/Frame 1932.png')} style={styles.emojiImage} />
          <Text style={styles.modalText}>Congratulations</Text>
          <Text style={styles.modalSubText}>Your order has been confirmed successfully</Text>
          <TouchableOpacity style={styles.trackButton} onPress={() => navigation.navigate('TrackOrder')}>
            <Text style={styles.trackButtonText}>Track your order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalView: { width: 300, backgroundColor: 'white', borderRadius: 20, padding: 35, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5 },
  emojiImage: { width: 200, height: 200, marginBottom: 16 },
  modalText: { fontSize: 24, fontWeight: 'bold' },
  modalSubText: { fontSize: 16, marginVertical: 8, textAlign: 'center' },
  trackButton: { backgroundColor: '#ff6200', borderRadius: 8, padding: 10, marginTop: 16 },
  trackButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});

export default OrderConfirmation;
