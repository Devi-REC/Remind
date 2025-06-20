import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  // Example data
  const tips = [
    "Use labels around the house for easy navigation.",
    "Stick to a daily routine to reduce confusion.",
    "Keep important contacts written and accessible.",
    "Use a digital assistant for reminders.",
    "Engage in memory-strengthening activities daily."
  ];

  const images = [
    { source: require('./im1.jpeg'), quote: "Familiar faces bring comfort." },
    { source: require('./im2.jpeg'), quote: "A place filled with cherished memories." },
    { source: require('./im3.jpeg'), quote: "Remember to take a break and breathe." },
  ];

  // State for cycling through tips and images
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const tipInterval = setInterval(() => {
      setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tips.length);
    }, 3000);
    return () => clearInterval(tipInterval);
  }, []);

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(imageInterval);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>ReMind - Memory Assistant</Text>
      </View>
      
      <View style={styles.autoplayImageContainer}>
        <Image 
          source={images[currentImageIndex].source} 
          style={styles.memoryImage} 
          resizeMode="cover"
        />
        <View style={styles.quoteContainer}>
          <Text style={styles.quoteText}>{images[currentImageIndex].quote}</Text>
        </View>
      </View>

      <View style={styles.subContainer}>
        <Text style={styles.subTitle}>Daily Tip:</Text>
        <Text style={styles.tip}>• {tips[currentTipIndex]}</Text>
      </View>

      <TouchableOpacity 
        style={styles.assistButton}
        onPress={() => navigation.navigate('Assistant')}
      >
        <Text style={styles.assistButtonText}>Memory Assistant</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1c300e',
  },
  autoplayImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  memoryImage: {
    width: '94%',
    height: 200,
    borderRadius: 5,
  },
  quoteContainer: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  quoteText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  subContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#73CECB',
    width: '100%',
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#73CECB',
    marginBottom: 10,
  },
  tip: {
    fontSize: 18,
    color: '#333',
  },
  assistButton: {
    marginTop: 20,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#73CECB',
    alignItems: 'center',
  },
  assistButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
