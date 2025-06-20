import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getDatabase, ref, onValue } from 'firebase/database';
import { app } from './firebase';

const { width } = Dimensions.get('window');

export default function AlertScreen() {
  const [data, setData] = useState({ pressure: '', temp: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const database = getDatabase(app);
    const dataRef = ref(database, '/');

    const unsubscribe = onValue(dataRef, (snapshot) => {
      const fetchedData = snapshot.val();
      console.log('Fetched Data:', fetchedData);

      if (fetchedData) {
        const pressure = fetchedData.pressure || fetchedData.Example?.pressure || 'No pressure data';
        const temp = fetchedData.temp || fetchedData.Example?.temp || 'No temperature data';

        setData({ pressure, temp });
        setLoading(false);
      } else {
        console.log('No data available');
        setLoading(false);
      }
    }, (error) => {
      console.error('Error fetching data:', error);
      setError('Failed to load data. Please try again later.');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

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
            <Text style={styles.headerTitle}>Sensor Data</Text>
            <Text style={styles.headerSubTitle}>Realtime monitoring</Text>
          </View>
          <View style={styles.headerWaveContainer}>
            <View style={styles.headerWave} />
          </View>
        </LinearGradient>
      </View>

      {/* Data content */}
      <View style={styles.contentContainer}>
        <View style={styles.card}>
          {loading ? (
            <Text style={styles.text}>Loading...</Text>
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : (
            <>
              <View style={styles.dataRow}>
                <Text style={styles.dataLabel}>Pressure:</Text>
                <Text style={styles.dataValue}>{data.pressure}</Text>
              </View>
              <View style={styles.dataRow}>
                <Text style={styles.dataLabel}>Temperature:</Text>
                <Text style={styles.dataValue}>{data.temp}</Text>
              </View>
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f8fdfd',
  },
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
    paddingBottom: 40,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    elevation: 5,
    shadowColor: '#73CECB',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f9f9',
  },
  dataLabel: {
    fontSize: 16,
    color: '#2c786c',
    fontWeight: '600',
  },
  dataValue: {
    fontSize: 16,
    color: '#555',
  },
  text: {
    fontSize: 16,
    color: '#2c786c',
    textAlign: 'center',
    paddingVertical: 20,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    paddingVertical: 20,
  },
});