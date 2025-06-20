import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const FirstScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('./alz1.png')} // Replace with your image URL
        style={styles.image}
      />
      
      {/* Remind Quote with Dark Blue Color */}
      <Text style={styles.quote}>"Remind - Bringing Memories Closer"</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignUp')}>
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
    backgroundColor: '#F0F8FF', // Light background to complement the theme
  },
  image: {
    width: 329,
    height: 200,
    marginBottom: 0,
  },
  quote: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#0A3D62', // Dark blue text color
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    borderWidth: 2,
    borderColor: '#73CECB', // Updated border color
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#edf1f5', // White background for contrast
  },
  button: {
    backgroundColor: '#73CECB', // Updated to requested color
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
    color: '#73CECB', // Updated theme color
    fontWeight: 'bold',
  },
});

export default FirstScreen;
