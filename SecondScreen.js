import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const SecondScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('./ca.png')} // Replace with your image URL
        style={styles.image}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CaregiverLogin')}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>


        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CaregiverSignUp')}>
          <Text style={styles.buttonText}>Signup</Text>
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
    backgroundColor: '#FFF3E0', // Light orange background
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    borderWidth: 2,
    borderColor: '#FF9800', // Themed border color
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#FFFFFF', // White background for contrast
  },
  button: {
    backgroundColor: '#FF9800', // Themed button color
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
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  middleText: {
    marginVertical: 5, // Space between buttons
    fontSize: 16,
    color: '#FF9800', // Theme color
    fontWeight: 'bold',
  },
});

export default SecondScreen;
