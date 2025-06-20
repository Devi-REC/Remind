import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image,
  Dimensions 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const AboutScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header matching the home screen */}
      <View style={styles.headerContainer}>
        <LinearGradient
          colors={['#73CECB', '#5ab6b3']}
          style={styles.headerGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>About ReMind</Text>
            <Text style={styles.headerSubTitle}>Your Memory Companion</Text>
          </View>
          <View style={styles.headerWaveContainer}>
            <View style={styles.headerWave} />
          </View>
        </LinearGradient>
      </View>

      {/* Content section */}
      <View style={styles.contentContainer}>
        <Image
          source={require('./Remind.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.card}>
          <Text style={styles.description}>
            ReMind is a smart wearable device designed to assist individuals with Alzheimer's by providing real-time support and memory reinforcement. By integrating AI-driven facial recognition, location tracking, and voice assistance, ReMind helps users navigate daily life with confidence.
          </Text>
          
          <View style={styles.featuresHeader}>
            <Ionicons name="star" size={24} color="#73CECB" />
            <Text style={styles.featuresTitle}>Key Features</Text>
          </View>
          
          <View style={styles.featureItem}>
            <Ionicons name="glasses" size={20} color="#73CECB" />
            <Text style={styles.featureText}>
              Smart glasses with built-in camera to recognize familiar faces and provide personalized information
            </Text>
          </View>
          
          <View style={styles.featureItem}>
            <Ionicons name="navigate" size={20} color="#73CECB" />
            <Text style={styles.featureText}>
              Real-time guidance for daily activities with location-based reminders
            </Text>
          </View>
          
          <View style={styles.featureItem}>
            <Ionicons name="alert-circle" size={20} color="#73CECB" />
            <Text style={styles.featureText}>
              Emergency alert system that notifies caregivers if needed
            </Text>
          </View>
          
          <View style={styles.featureItem}>
            <Ionicons name="phone-portrait" size={20} color="#73CECB" />
            <Text style={styles.featureText}>
              Automatic call feature if device is not worn for extended periods
            </Text>
          </View>
          
          <View style={styles.featureItem}>
            <Ionicons name="phone-portrait" size={20} color="#73CECB" />
            <Text style={styles.featureText}>
              Mobile app for caregivers to update and store memories
            </Text>
          </View>
          
          <Text style={styles.finalNote}>
            ReMind empowers individuals with Alzheimer's by fostering independence, enhancing memory recall, and ensuring safety through intelligent assistance.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f8fdfd',
  },
  // Header styles matching home screen
  headerContainer: {
    height: 160,
    marginBottom: 20,
    position: 'relative',
  },
  headerGradient: {
    flex: 1,
    paddingTop: 0,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    overflow: 'hidden',
  },
  headerContent: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 5,
    textShadowColor: 'rgba(0,0,0,0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  headerSubTitle: {
    fontSize: 16,
    color: '#e0f7fa',
    marginTop: 4,
  },
  headerWaveContainer: {
    position: 'absolute',
    bottom: -30,
    width: '100%',
    height: 40,
  },
  headerWave: {
    height: 30,
    backgroundColor: '#f8fdfd',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  contentContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingBottom: 40,
  },
  logo: {
    width: width * 0.6,
    height: 150,
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    width: '100%',
    elevation: 5,
    shadowColor: '#73CECB',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  description: {
    fontSize: 16,
    color: '#2c786c',
    lineHeight: 24,
    marginBottom: 20,
  },
  featuresHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0f7fa',
    paddingBottom: 10,
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c786c',
    marginLeft: 10,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  featureText: {
    fontSize: 15,
    color: '#2c786c',
    marginLeft: 10,
    flex: 1,
    lineHeight: 22,
  },
  finalNote: {
    fontSize: 16,
    color: '#2c786c',
    fontStyle: 'italic',
    fontWeight: '500',
    marginTop: 20,
    lineHeight: 24,
    textAlign: 'center',
  },
});

export default AboutScreen;