import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  ScrollView,
  Image,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const TabletRemindersScreen = () => {
  const [tablets, setTablets] = useState([]);

  useEffect(() => {
    fetch('http://172.16.56.114:5000/reminders')
      .then(res => res.json())
      .then(data => {
        const tabletOnly = data.filter(item => item.type === 'tablet');
        setTablets(tabletOnly);
      })
      .catch(err => console.error('Error:', err));
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <LinearGradient
        colors={['#f8fdfd', '#e6f9f9']}
        style={styles.card}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.cardContent}>
          <View style={styles.medicationInfo}>
            <FontAwesome5 name="pills" size={24} color="#73CECB" />
            <Text style={styles.title}>{item.name}</Text>
          </View>
          <View style={styles.medicationDetails}>
            <View style={styles.detailItem}>
              <Ionicons name="time" size={18} color="#73CECB" />
              <Text style={styles.detailText}>{item.time}</Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="call" size={18} color="#73CECB" />
              <Text style={styles.detailText}>{item.phone}</Text>
            </View>
          </View>
        </View>
        <View style={styles.cardDecoration} />
      </LinearGradient>
    </View>
  );

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
            <Text style={styles.headerTitle}>Medication Reminders</Text>
            <Text style={styles.headerSubTitle}>Scheduled prescriptions</Text>
          </View>
          <View style={styles.headerWaveContainer}>
            <View style={styles.headerWave} />
          </View>
        </LinearGradient>
      </View>

      {/* Medication list */}
      <View style={styles.section}>
        {tablets.length > 0 ? (
          <FlatList
            data={tablets}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            scrollEnabled={false}
            contentContainerStyle={styles.listContent}
          />
        ) : (
          <View style={styles.emptyState}>
            <Image 
              source={require('./empty-meds.png')} 
              style={styles.emptyImage}
              resizeMode="contain"
            />
            <Text style={styles.emptyText}>No medications scheduled</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f8fdfd',
    paddingBottom: 30,
  },
  // Header styles matching home screen
  headerContainer: {
    height: 160,
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
  section: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  cardContainer: {
    marginBottom: 15,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#73CECB',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  card: {
    width: '100%',
    padding: 20,
    position: 'relative',
  },
  cardContent: {
    zIndex: 2,
  },
  medicationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    color: '#2c786c',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  medicationDetails: {
    marginLeft: 34, // Match icon width + margin
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 16,
    color: '#2c786c',
    marginLeft: 10,
  },
  cardDecoration: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 60,
    height: 60,
    backgroundColor: 'rgba(115, 206, 203, 0.1)',
    borderBottomLeftRadius: 60,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyImage: {
    width: 150,
    height: 150,
    opacity: 0.6,
  },
  emptyText: {
    fontSize: 16,
    color: '#73CECB',
    marginTop: 10,
    fontWeight: '500',
  },
});

export default TabletRemindersScreen;