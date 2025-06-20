import React, { useEffect, useRef, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Alert, 
  Linking, 
  TouchableOpacity, 
  Dimensions,
  ScrollView,
  Image
} from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import { Buffer } from 'buffer';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const LOCATION_INTERVAL = 15000;
const STATIONARY_LIMIT = 2 * 60 * 1000;
const DISTANCE_THRESHOLD = 10;

export default function PatientLocationInfo() {
  const [currentAddress, setCurrentAddress] = useState('Fetching address...');
  const [locationError, setLocationError] = useState('');
  const [location, setLocation] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const [status, setStatus] = useState('');

  const lastLocationRef = useRef(null);
  const stationaryStartRef = useRef(null);
  const hasCalledRef = useRef(false);
  const watchPositionRef = useRef(null);

  const patientPhoneNumber = '+917550270150';
  const caregiverPhone = '+918825924975';

  // Twilio Info
  const accountSid = 'AC7ebfc58b84935bc85998706049fec175';
  const authToken = '8f2993ae9b8aefb19e8a045fc9e2b768';
  const twilioFrom = '+14132236540';

  const triggerEmergencyCall = async () => {
    if (hasCalledRef.current) return;

    const twiml = `<Response><Say>Your patient may be missing. They have not moved for 2 minutes.</Say></Response>`;
    const authHeader = Buffer.from(`${accountSid}:${authToken}`).toString('base64');

    try {
      await axios.post(
        `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Calls.json`,
        new URLSearchParams({
          To: caregiverPhone,
          From: twilioFrom,
          Twiml: twiml,
        }),
        {
          headers: {
            Authorization: `Basic ${authHeader}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      hasCalledRef.current = true;
      Alert.alert('🚨 Emergency Call', 'Patient hasn\'t moved. Caregiver alerted.');
      setStatus('🚨 Emergency call triggered!');
    } catch (err) {
      console.error('Twilio call failed:', err);
      Alert.alert('Error', 'Failed to make emergency call.');
    }
  };

  const getAddressFromCoords = async (coords) => {
    try {
      const [addr] = await Location.reverseGeocodeAsync(coords);
      const formatted = `${addr.name || ''}, ${addr.street || ''}, ${addr.city || ''}, ${addr.region || ''}, ${addr.postalCode || ''}`;
      setCurrentAddress(formatted);
    } catch (err) {
      console.log('Error getting address:', err);
      setCurrentAddress('Unable to fetch address');
    }
  };

  const fetchLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setLocationError('❌ Location permission denied');
      return;
    }

    try {
      const loc = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = loc.coords;
      const coords = { latitude, longitude };
      setLocation(coords);
      await getAddressFromCoords(coords);
    } catch (err) {
      setLocationError('⚠️ Could not fetch location');
      console.log(err);
    }
  };

  const startTracking = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied');
      return;
    }

    setIsTracking(true);
    setStatus('📡 Tracking started...');

    watchPositionRef.current = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.Highest,
        timeInterval: LOCATION_INTERVAL,
        distanceInterval: 1,
      },
      async (loc) => {
        const now = Date.now();
        const { latitude, longitude } = loc.coords;
        const newLocation = { latitude, longitude };
        setLocation(newLocation);
        await getAddressFromCoords(newLocation);

        if (!lastLocationRef.current) {
          lastLocationRef.current = newLocation;
          stationaryStartRef.current = now;
          hasCalledRef.current = false;
          return;
        }

        const distance = getDistanceBetweenCoords(lastLocationRef.current, newLocation);
        if (distance < DISTANCE_THRESHOLD) {
          const stationaryDuration = now - (stationaryStartRef.current || now);
          setStatus(`Still for ${Math.round(stationaryDuration / 1000)} seconds`);

          if (stationaryDuration >= STATIONARY_LIMIT && !hasCalledRef.current) {
            triggerEmergencyCall();
          }
        } else {
          lastLocationRef.current = newLocation;
          stationaryStartRef.current = now;
          hasCalledRef.current = false;
          setStatus('Movement detected. Timer reset.');
        }
      }
    );
  };

  const stopTracking = () => {
    if (watchPositionRef.current) {
      watchPositionRef.current.remove();
      watchPositionRef.current = null;
    }
    setIsTracking(false);
    setStatus('Tracking stopped.');
    lastLocationRef.current = null;
    stationaryStartRef.current = null;
    hasCalledRef.current = false;
  };

  const handleCall = () => {
    Linking.openURL(`tel:${patientPhoneNumber}`);
  };

  useEffect(() => {
    fetchLocation();
    return () => {
      if (watchPositionRef.current) {
        watchPositionRef.current.remove();
      }
    };
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header matching the home screen */}
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
            <Text style={styles.headerTitle}>Patient Location</Text>
            <Text style={styles.headerSubTitle}>Real-time tracking</Text>
          </View>
          <View style={styles.headerWaveContainer}>
            <View style={styles.headerWave} />
          </View>
        </LinearGradient>
      </View>

      {/* Content section */}
      <View style={styles.section}>
        <View style={styles.card}>
          <View style={styles.statusContainer}>
            <Ionicons name="location" size={24} color="#ff7f50" />
            <Text style={styles.address}>{locationError || currentAddress}</Text>
          </View>
          
          <Text style={styles.status}>{status}</Text>

          {location && (
            <View style={styles.mapContainer}>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005,
                }}
              >
                <Marker coordinate={location} title="Patient Location">
                  <View style={styles.marker}>
                    <Ionicons name="person" size={24} color="white" />
                  </View>
                </Marker>
              </MapView>
            </View>
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.callButton]}
              onPress={handleCall}
            >
              <Ionicons name="call" size={20} color="white" />
              <Text style={styles.buttonText}>Contact Patient</Text>
            </TouchableOpacity>

            {!isTracking ? (
              <TouchableOpacity 
                style={[styles.button, styles.trackButton]} 
                onPress={startTracking}
              >
                <Ionicons name="play" size={20} color="white" />
                <Text style={styles.buttonText}>Start Tracking</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity 
                style={[styles.button, styles.stopButton]} 
                onPress={stopTracking}
              >
                <Ionicons name="stop" size={20} color="white" />
                <Text style={styles.buttonText}>Stop Tracking</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

function getDistanceBetweenCoords(loc1, loc2) {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371e3;
  const dLat = toRad(loc2.latitude - loc1.latitude);
  const dLon = toRad(loc2.longitude - loc1.longitude);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(loc1.latitude)) *
      Math.cos(toRad(loc2.latitude)) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff7f0',
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
  logoImage: {
    width: 100,
    height: 100,
    marginTop: 10,
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
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    elevation: 5,
    shadowColor: '#ff7f50',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ffe6dc',
  },
  address: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
    flex: 1,
  },
  status: {
    fontSize: 14,
    color: '#ff6347',
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: '500',
  },
  mapContainer: {
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
  },
  map: {
    width: '100%',
    height: 250,
  },
  marker: {
    backgroundColor: '#ff7f50',
    padding: 5,
    borderRadius: 20,
  },
  buttonContainer: {
    marginTop: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
  },
  callButton: {
    backgroundColor: '#ff7f50',
  },
  trackButton: {
    backgroundColor: '#4CAF50',
  },
  stopButton: {
    backgroundColor: '#ff6347',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});