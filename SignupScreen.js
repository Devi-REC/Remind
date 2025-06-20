import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  Alert, 
  Linking, 
  ScrollView,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { auth, database, storage } from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';

const { width } = Dimensions.get('window');
const remindImage = require('./R1.png');

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Patient');
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (image) {
        setUploading(true);
        const imageUrl = await uploadImageToFirebase(image, user.uid);
        await saveUserDataToFirestore(user.uid, email, role, imageUrl);
        setUploading(false);
      } else {
        await saveUserDataToFirestore(user.uid, email, role, null);
      }

      Alert.alert('Success', 'Account created successfully!');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Sign Up Error', error.message);
    }
  };

  const saveUserDataToFirestore = async (userId, email, role, imageUrl) => {
    try {
      await addDoc(collection(database, 'users'), {
        userId,
        email,
        role,
        imageUrl,
        createdAt: new Date()
      });
    } catch (error) {
      console.error('Error saving data to Firestore:', error);
    }
  };

  const uploadImageToFirebase = async (uri, userId) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const storageRef = ref(storage, `profilePictures/${userId}.jpg`);
    await uploadBytes(storageRef, blob);
    return await getDownloadURL(storageRef);
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission Required", "Enable photo access in settings.", [
        { text: "Cancel", style: "cancel" },
        { text: "Open Settings", onPress: () => Linking.openURL('app-settings:') },
      ]);
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.cancelled) setImage(result.uri);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header matching the login screen */}
      <View style={styles.headerContainer}>
        <LinearGradient
          colors={['#73CECB', '#5ab6b3']}
          style={styles.headerGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <View style={styles.headerContent}>
            <Image 
              source={remindImage} 
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.headerTitle}>Create Account</Text>
            <Text style={styles.headerSubTitle}>Join ReMind today</Text>
          </View>
          <View style={styles.headerWaveContainer}>
            <View style={styles.headerWave} />
          </View>
        </LinearGradient>
      </View>

      {/* Form content */}
      <View style={styles.formContainer}>
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

        <View style={styles.roleContainer}>
          <Text style={styles.roleLabel}>I am a:</Text>
          <View style={styles.roleButtons}>
            <TouchableOpacity 
              style={[styles.roleButton, role === 'Patient' && styles.roleButtonActive]}
              onPress={() => setRole('Patient')}
            >
              <Text style={[styles.roleButtonText, role === 'Patient' && styles.roleButtonTextActive]}>Patient</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.roleButton, role === 'Caregiver' && styles.roleButtonActive]}
              onPress={() => setRole('Caregiver')}
            >
              <Text style={[styles.roleButtonText, role === 'Caregiver' && styles.roleButtonTextActive]}>Caregiver</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.uploadButton}
          onPress={pickImage}
        >
          <Ionicons name="cloud-upload" size={24} color="#73CECB" />
          <Text style={styles.uploadButtonText}>
            {image ? 'Change Profile Picture' : 'Upload Profile Picture'}
          </Text>
        </TouchableOpacity>

        {image && (
          <View style={styles.imagePreviewContainer}>
            <Image source={{ uri: image }} style={styles.uploadedImage} />
          </View>
        )}

        <TouchableOpacity 
          style={styles.signupButton}
          onPress={handleSignUp}
          disabled={uploading}
          activeOpacity={0.8}
        >
          {uploading ? (
            <ActivityIndicator color="white" />
          ) : (
            <>
              <Text style={styles.buttonText}>Sign Up</Text>
              <Ionicons name="arrow-forward" size={20} color="white" />
            </>
          )}
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Sign In</Text>
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
  // Header styles matching login screen
  headerContainer: {
    height: 240,
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
  logo: {
    width: 200,
    height: 180,
    marginBottom: 0,
  },
  headerTitle: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginTop: -30,
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
  roleContainer: {
    marginBottom: 20,
  },
  roleLabel: {
    color: '#666',
    fontSize: 16,
    marginBottom: 10,
  },
  roleButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  roleButton: {
    flex: 1,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#73CECB',
    marginHorizontal: 5,
    alignItems: 'center',
  },
  roleButtonActive: {
    backgroundColor: '#73CECB',
  },
  roleButtonText: {
    color: '#73CECB',
    fontWeight: 'bold',
  },
  roleButtonTextActive: {
    color: 'white',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#73CECB',
    marginBottom: 20,
  },
  uploadButtonText: {
    color: '#73CECB',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  imagePreviewContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadedImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#73CECB',
  },
  signupButton: {
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
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginText: {
    color: '#666',
    fontSize: 14,
  },
  loginLink: {
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