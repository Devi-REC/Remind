import React, { useState } from 'react';
import { 
  View, 
  Image, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  Text,
  Dimensions
} from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { Buffer } from 'buffer';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import memories from '../data/memories';

const { width } = Dimensions.get('window');

const AZURE_TTS_KEY = '608ePpZ3dO5We0KVf71mt7ANWwo1T2PEpwQ6bpAO4Fue1r52Ljl5JQQJ99BCACYeBjFXJ3w3AAAYACOGUbQK';
const AZURE_TTS_ENDPOINT = "https://eastus.tts.speech.microsoft.com/cognitiveservices/v1";

const MemoryBankScreen = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlayingId, setCurrentPlayingId] = useState(null);

  const getTTS = async (text) => {
    try {
      const response = await fetch(AZURE_TTS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/ssml+xml",
          "Ocp-Apim-Subscription-Key": AZURE_TTS_KEY,
          "X-Microsoft-OutputFormat": "audio-16khz-32kbitrate-mono-mp3",
        },
        body: `<speak version='1.0' xml:lang='en-US'><voice xml:lang='en-US' xml:gender='Female' name='en-US-JennyNeural'>${text}</voice></speak>`,
      });

      const audioData = await response.arrayBuffer();
      return Buffer.from(audioData).toString("base64");
    } catch (error) {
      console.error("TTS Error:", error);
      return null;
    }
  };

  const playTTS = async (text, id) => {
    if (isPlaying) return;
    setIsPlaying(true);
    setCurrentPlayingId(id);

    const base64Audio = await getTTS(text);
    if (!base64Audio) {
      setIsPlaying(false);
      setCurrentPlayingId(null);
      return;
    }

    const fileUri = FileSystem.cacheDirectory + 'memory.mp3';
    await FileSystem.writeAsStringAsync(fileUri, base64Audio, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const { sound } = await Audio.Sound.createAsync({ uri: fileUri });
    await sound.playAsync();

    sound.setOnPlaybackStatusUpdate(async (status) => {
      if (status.didJustFinish) {
        await sound.unloadAsync();
        setIsPlaying(false);
        setCurrentPlayingId(null);
      }
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <LinearGradient
        colors={['#f8fdfd', '#e6f9f9']}
        style={styles.card}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Image source={item.image} style={styles.image} />
        <LinearGradient
          colors={['transparent', 'rgba(115, 206, 203, 0.7)']}
          style={styles.imageOverlay}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        />
        <View style={styles.textContainer}>
          <Text style={styles.description}>{item.description}</Text>
        </View>
        <TouchableOpacity
          style={[
            styles.playButton,
            currentPlayingId === item.id && styles.playingButton
          ]}
          onPress={() => playTTS(item.description, item.id)}
          disabled={isPlaying && currentPlayingId !== item.id}
        >
          <Ionicons 
            name={currentPlayingId === item.id ? "pause" : "play"} 
            size={24} 
            color="white" 
          />
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header with teal theme */}
      <View style={styles.headerContainer}>
        <LinearGradient
          colors={['#73CECB', '#5ab6b3']}
          style={styles.headerGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <View style={styles.headerContent}>
            <Text style={styles.title}>Memory Bank</Text>
            <Text style={styles.subTitle}>Cherished moments</Text>
          </View>
          <View style={styles.headerWaveContainer}>
            <View style={styles.headerWave} />
          </View>
        </LinearGradient>
      </View>

      {/* Memory cards list */}
      <FlatList
        data={memories}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fdfd',
  },
  // Header styles with teal theme
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
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  cardContainer: {
    marginBottom: 20,
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
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
  },
  textContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 70,
  },
  description: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  playButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#73CECB',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  playingButton: {
    backgroundColor: '#5ab6b3',
  },
});

export default MemoryBankScreen;