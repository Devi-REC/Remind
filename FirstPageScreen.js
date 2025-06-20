import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const FirstPageScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('./Remind.png')} // Replace with your image URL
        style={styles.image}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.patientButton]} onPress={() => navigation.navigate('First')}>
          <Text style={styles.buttonText}>Patient</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.caregiverButton]} onPress={() => navigation.navigate('Second')}>
          <Text style={styles.buttonText}>Caregiver</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F8FF', // Light background
  },
  image: {
    width: 300,
    height: 210,
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    borderWidth: 2,
    borderColor: '#73CECB', // Updated border color to match theme
    borderRadius: 10,
    padding: 15,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    marginVertical: 10,
    elevation: 3, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  patientButton: {
    backgroundColor: '#73CECB', // Updated to requested color
  },
  caregiverButton: {
    backgroundColor: '#FF8C00', // Orange for Caregiver
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default FirstPageScreen;
