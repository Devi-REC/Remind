import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
  Linking,
  Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, MaterialIcons, FontAwesome5, Entypo } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const CaregiverDashboardScreen = () => {
  const navigation = useNavigation();
  const [showPatientDetails, setShowPatientDetails] = useState(false);

  const handleOpenCameraFeed = () => {
    const ipAddress = 'http://172.20.10.10';
    Linking.openURL(ipAddress).catch(() =>
      Alert.alert('Error', 'Unable to open camera feed.')
    );
  };

  const handleOpenWhatsApp = () => {
    const phoneNumber = '9042248181';
    const message = 'Hello pavi, how are you feeling today?';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    Linking.openURL(url).catch(() =>
      Alert.alert('Error', 'Unable to open WhatsApp.')
    );
  };

  const patient = {
    name: 'John Doe',
    age: 74,
    condition: 'Alzheimer\'s Stage 2',
    lastKnownLocation: 'Home - Bedroom',
    assignedDoctor: 'Dr. Smith',
    status: 'Stable',
    lastActivity: 'Took medication at 9:00 AM'
  };

  const tips = [
    "Maintain a consistent daily routine for the patient.",
    "Use simple, clear communication when speaking.",
    "Keep frequently used items in visible, accessible locations.",
    "Play memory-stimulating games regularly.",
    "Ensure the environment is calm and free of clutter."
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Enhanced Header with decorative elements */}
      <View style={styles.headerContainer}>
        <LinearGradient
          colors={['#ff7f50', '#ff6347']}
          style={styles.headerGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <View style={styles.headerContent}>
            <Image 
              source={require('./ca2.png')} 
              style={styles.logoImage}
              resizeMode="contain"
            />
            <Text style={styles.title}>Hello, Caregiver!</Text>
            <Text style={styles.subTitle}>Caring for {patient.name}</Text>
          </View>
          
          {/* Wave design */}
          <View style={styles.headerWaveContainer}>
            <View style={styles.headerWave} />
          </View>
        </LinearGradient>
      </View>

      <View style={styles.section}>
        {/* Profile section with enhanced design */}
        <View style={styles.profileBox}>
          <View style={styles.profileImageContainer}>
            <Image
              source={require('./alz_pat.jpg')}
              style={styles.profileImage}
            />
            <View style={styles.statusIndicator} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{patient.name}</Text>
            <Text style={styles.profileCondition}>{patient.condition}</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>🟢 {patient.status}</Text>
            </View>
          </View>
        </View>

        {/* Tip box with decorative elements */}
        <View style={styles.tipBoxContainer}>
          <View style={styles.tipBox}>
            <View style={styles.tipRibbon}>
              <Text style={styles.tipTitle}>Caregiver Tip</Text>
            </View>
            <Text style={styles.tipText}>{tips[Math.floor(Math.random() * tips.length)]}</Text>
          </View>
        </View>

        {/* Action Cards in single column layout */}
        <View style={styles.actionsColumn}>
          <TouchableOpacity 
            style={styles.fullWidthCardButton}
            onPress={handleOpenCameraFeed}
          >
            <View style={styles.buttonIconCircle}>
              <Ionicons name="videocam" size={24} color="#ff7f50" />
            </View>
            <Text style={styles.cardText}>Live Monitoring</Text>
            <View style={styles.buttonArrow}>
              <Ionicons name="chevron-forward" size={20} color="white" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.fullWidthCardButton}
            onPress={() => navigation.navigate('PatientLocation')}
          >
            <View style={styles.buttonIconCircle}>
              <Ionicons name="location" size={24} color="#ff7f50" />
            </View>
            <Text style={styles.cardText}>Real-Time Location</Text>
            <View style={styles.buttonArrow}>
              <Ionicons name="chevron-forward" size={20} color="white" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.fullWidthCardButton}
            onPress={() => navigation.navigate('UploadMemory')}
          >
            <View style={styles.buttonIconCircle}>
              <FontAwesome5 name="images" size={20} color="#ff7f50" />
            </View>
            <Text style={styles.cardText}>Memory Bank</Text>
            <View style={styles.buttonArrow}>
              <Ionicons name="chevron-forward" size={20} color="white" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.fullWidthCardButton}
            onPress={handleOpenWhatsApp}
          >
            <View style={styles.buttonIconCircle}>
              <Ionicons name="chatbox" size={20} color="#ff7f50" />
            </View>
            <Text style={styles.cardText}>Chat with Patient</Text>
            <View style={styles.buttonArrow}>
              <Ionicons name="chevron-forward" size={20} color="white" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Patient Details Dropdown */}
        <TouchableOpacity
          style={styles.detailsToggleButton}
          onPress={() => setShowPatientDetails(!showPatientDetails)}
        >
          <View style={styles.toggleButtonContent}>
            <Ionicons name="information-circle" size={24} color="#ff7f50" />
            <Text style={styles.toggleButtonText}>Patient Details</Text>
          </View>
          <Ionicons
            name={showPatientDetails ? 'chevron-up' : 'chevron-down'}
            size={24}
            color="#ff7f50"
          />
        </TouchableOpacity>

        {showPatientDetails && (
          <View style={styles.detailsBox}>
            <View style={styles.detailItem}>
              <Ionicons name="calendar" size={18} color="#ff7f50" />
              <Text style={styles.detailsText}>Age: {patient.age}</Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="location" size={18} color="#ff7f50" />
              <Text style={styles.detailsText}>Last Seen: {patient.lastKnownLocation}</Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="medical" size={18} color="#ff7f50" />
              <Text style={styles.detailsText}>Doctor: {patient.assignedDoctor}</Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="time" size={18} color="#ff7f50" />
              <Text style={styles.detailsText}>Last Activity: {patient.lastActivity}</Text>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
    backgroundColor: '#fff7f0',
    flexGrow: 1,
  },
  headerContainer: {
    height: 200,
    marginBottom: 10,
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
    paddingTop: 20,
  },
  logoImage: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 5,
    textShadowColor: 'rgba(0,0,0,0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subTitle: {
    fontSize: 16,
    color: '#ffe6dc',
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
    backgroundColor: '#fff7f0',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  section: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  profileBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 20,
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#ff7f50',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#ffe6dc',
  },
  statusIndicator: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 15,
    height: 15,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: 'white',
  },
  profileInfo: {
    marginLeft: 15,
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  profileCondition: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  statusBadge: {
    marginTop: 8,
    backgroundColor: '#e8f5e9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 12,
    color: '#2e7d32',
  },
  tipBoxContainer: {
    marginBottom: 25,
    position: 'relative',
  },
  tipBox: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 18,
    paddingTop: 30,
    borderWidth: 1,
    borderColor: '#ffe6dc',
    elevation: 3,
  },
  tipRibbon: {
    position: 'absolute',
    top: -15,
    left: 20,
    backgroundColor: '#ff7f50',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 12,
    elevation: 3,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  tipText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  // Updated styles for single column layout
  actionsColumn: {
    marginBottom: 20,
  },
  fullWidthCardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ffe6dc',
    elevation: 3,
    shadowColor: '#ff7f50',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    width: '100%',
  },
  buttonIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffe6dc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  cardText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  buttonArrow: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ff7f50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsToggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
  },
  toggleButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleButtonText: {
    fontSize: 16,
    color: '#ff7f50',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  detailsBox: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailsText: {
    fontSize: 15,
    color: '#333',
    marginLeft: 10,
  },
});

export default CaregiverDashboardScreen;