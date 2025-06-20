import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  ScrollView, 
  Image,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { auth, database } from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const { width } = Dimensions.get('window');

const CaregiverSignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(database, 'caregivers', user.uid), {
        name: name,
        email: email,
      });

      Alert.alert('Success', 'Welcome to the Caregiver Program!');
      navigation.navigate('CaregiverLogin');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

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
              source={require('./re1.png')} 
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.headerTitle}>Caregiver Sign Up</Text>
            <Text style={styles.headerSubTitle}>Join our caregiver network</Text>
          </View>
          <View style={styles.headerWaveContainer}>
            <View style={styles.headerWave} />
          </View>
        </LinearGradient>
      </View>

      {/* Form content */}
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Ionicons name="person" size={24} color="#ff7f50" />
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#888"
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="mail" size={24} color="#ff7f50" />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#888"
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed" size={24} color="#ff7f50" />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#888"
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed" size={24} color="#ff7f50" />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            placeholderTextColor="#888"
          />
        </View>

        <TouchableOpacity 
          style={styles.signUpButton}
          onPress={handleSignUp}
        >
          <Text style={styles.buttonText}>Create Account</Text>
          <Ionicons name="arrow-forward" size={20} color="white" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.loginLink}
          onPress={() => navigation.navigate('CaregiverLogin')}
        >
          <Text style={styles.loginText}>Already have an account? <Text style={styles.loginLinkText}>Log In</Text></Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff7f0',
  },
  // Header styles matching home screen
  headerContainer: {
    height: 200,
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
  logo: {
    width: 120,
    height: 100,
    marginBottom: 10,
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
  formContainer: {
    paddingHorizontal: 30,
    paddingBottom: 40,
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    paddingHorizontal: 15,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#ff7f50',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  input: {
    flex: 1,
    padding: 15,
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  signUpButton: {
    backgroundColor: '#ff7f50',
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  loginLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  loginText: {
    color: '#666',
    fontSize: 14,
  },
  loginLinkText: {
    color: '#ff7f50',
    fontWeight: 'bold',
  },
});

export default CaregiverSignUpScreen;