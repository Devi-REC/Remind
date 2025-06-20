import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  ScrollView,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { auth } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const { width } = Dimensions.get('window');

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('Main');
    } catch (error) {
      setErrorMessage(error.message);
    }
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
            <Image 
              source={require('./R1.png')} 
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.headerTitle}>Welcome Back</Text>
            <Text style={styles.headerSubTitle}>Sign in to continue</Text>
          </View>
          <View style={styles.headerWaveContainer}>
            <View style={styles.headerWave} />
          </View>
        </LinearGradient>
      </View>

      {/* Form content */}
      <View style={styles.formContainer}>
        {errorMessage ? (
          <View style={styles.errorContainer}>
            <Ionicons name="warning" size={20} color="#ff6347" />
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        ) : null}

        <View style={styles.inputContainer}>
          <Ionicons name="mail" size={24} color="#73CECB" />
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
          <Ionicons name="lock-closed" size={24} color="#73CECB" />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#888"
          />
        </View>

        <TouchableOpacity 
          style={styles.forgotButton}
          onPress={() => navigation.navigate('ForgotPassword')}
        >
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.loginButton}
          onPress={handleLogin}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Sign In</Text>
          <Ionicons name="arrow-forward" size={20} color="white" />
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>New to ReMind? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signupLink}>Create Account</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.navigate('First')}
        >
          <Text style={styles.backButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f8fdfd',
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
    width: 200,
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
  formContainer: {
    paddingHorizontal: 30,
    paddingBottom: 40,
    width: '100%',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0f7fa',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  errorText: {
    color: '#ff6347',
    fontSize: 14,
    marginLeft: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    paddingHorizontal: 15,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#73CECB',
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
  forgotButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotText: {
    color: '#73CECB',
    fontSize: 14,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#73CECB',
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signupText: {
    color: '#666',
    fontSize: 14,
  },
  signupLink: {
    color: '#73CECB',
    fontWeight: 'bold',
  },
  backButton: {
    marginTop: 30,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#73CECB',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#73CECB',
    fontWeight: 'bold',
  },
});