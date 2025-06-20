import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity,
  ScrollView,
  Dimensions
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signOut } from 'firebase/auth';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const ProfileScreen = () => {
  const navigation = useNavigation();
  const auth = getAuth();
  const user = auth.currentUser;

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigation.replace('Login');
      })
      .catch((error) => {
        console.error('Logout Error:', error);
      });
  };

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
            <Text style={styles.headerTitle}>Profile</Text>
            <Text style={styles.headerSubTitle}>Your Account Details</Text>
          </View>
          <View style={styles.headerWaveContainer}>
            <View style={styles.headerWave} />
          </View>
        </LinearGradient>
      </View>

      {/* Profile content */}
      <View style={styles.contentContainer}>
        <View style={styles.profileCard}>
          <Image
            source={require('./r2.png')}
            style={styles.profileImage}
            resizeMode="contain"
          />
          
          {user && (
            <View style={styles.userInfoContainer}>
              <View style={styles.infoItem}>
                <Ionicons name="mail" size={24} color="#73CECB" />
                <Text style={styles.infoText}>{user.email}</Text>
              </View>
            </View>
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.backButton]}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={20} color="white" />
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.button, styles.logoutButton]}
              onPress={handleLogout}
            >
              <Ionicons name="log-out" size={20} color="white" />
              <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
          </View>
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
  profileCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    width: '100%',
    elevation: 5,
    shadowColor: '#73CECB',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    alignItems: 'center',
  },
  profileImage: {
    width: width * 0.5,
    height: 150,
    marginBottom: 30,
  },
  userInfoContainer: {
    width: '100%',
    marginBottom: 30,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0f7fa',
  },
  infoText: {
    fontSize: 16,
    color: '#2c786c',
    marginLeft: 10,
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
  },
  backButton: {
    backgroundColor: '#73CECB',
  },
  logoutButton: {
    backgroundColor: '#5ab6b3',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default ProfileScreen;