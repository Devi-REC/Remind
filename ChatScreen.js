import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import { Buffer } from 'buffer';
import axios from 'axios';

const AZURE_TTS_KEY = '608ePpZ3dO5We0KVf71mt7ANWwo1T2PEpwQ6bpAO4Fue1r52Ljl5JQQJ99BCACYeBjFXJ3w3AAAYACOGUbQK';
const AZURE_TTS_ENDPOINT = "https://eastus.tts.speech.microsoft.com/cognitiveservices/v1";

const ChatScreen = () => {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hello! How can I assist you today?', sender: 'bot' },
  ]);
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const predefinedResponses = {
    "What should I eat during pregnancy?": "A healthy pregnancy diet includes protein, iron, folic acid, and calcium-rich foods. Eat leafy greens, dairy, lean meats, whole grains, and fruits.",
    "Is it normal to feel tired during pregnancy?": "Yes! Fatigue is common due to hormonal changes. Rest often, drink water, and eat iron-rich foods.",
    "How can I manage morning sickness?": "Eat small, frequent meals, stay hydrated, and avoid spicy or greasy foods.",
  };

  const getBotResponse = async (query) => {
    if (predefinedResponses[query]) return predefinedResponses[query];

    const apiKey = 'r6H0r9mAApORRZgBIUJqgMT4I3EwYYpZtqOtyEKI';
    const url = 'https://api.cohere.ai/v1/chat';

    try {
      const response = await axios.post(url, { message: query, model: 'command', temperature: 0.7, max_tokens: 500 }, {
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      });
      return response.data.text;
    } catch (error) {
      console.error("Error fetching bot response:", error);
      return "I'm sorry, I couldn't fetch the response.";
    }
  };

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

      if (!response.ok) throw new Error("Azure TTS API request failed");

      const audioData = await response.arrayBuffer();
      return Buffer.from(audioData).toString("base64");
    } catch (error) {
      console.error("TTS Error:", error);
      return null;
    }
  };

  const playTTS = async (text) => {
    const audioBase64 = await getTTS(text);
    if (!audioBase64) {
      setIsProcessing(false);
      return;
    }

    const sound = new Audio.Sound();
    try {
      await sound.loadAsync({ uri: `data:audio/mp3;base64,${audioBase64}` });
      await sound.playAsync();

      await new Promise(resolve => {
        sound.setOnPlaybackStatusUpdate(status => {
          if (status.didJustFinish) resolve();
        });
      });

      await sound.unloadAsync();
    } catch (error) {
      console.error("Audio Playback Error:", error);
    }
  };

  const sendMessage = async () => {
    if (inputText.trim() && !isProcessing) {
      setIsProcessing(true);

      const userMessage = { id: Date.now().toString(), text: inputText, sender: 'user' };
      setMessages(prevMessages => [...prevMessages, userMessage]);
      const query = inputText;
      setInputText('');

      try {
        const botResponse = await getBotResponse(query);
        const botMessage = { id: Date.now().toString(), text: botResponse, sender: 'bot' };
        setMessages(prevMessages => [...prevMessages, botMessage]);

        await playTTS(botResponse);
      } catch (error) {
        console.error('Error fetching bot response:', error.message);
        const errorMessage = { id: Date.now().toString(), text: 'Sorry, something went wrong.', sender: 'bot' };
        setMessages(prevMessages => [...prevMessages, errorMessage]);
      }

      setIsProcessing(false);
    }
  };

  const renderMessage = ({ item }) => (
    <View style={[styles.messageContainer, item.sender === 'user' ? styles.userMessage : styles.botMessage]}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your question..."
          value={inputText}
          onChangeText={setInputText}
          editable={!isProcessing}
        />
        <TouchableOpacity style={[styles.sendButton, isProcessing && { opacity: 0.5 }]} onPress={sendMessage} disabled={isProcessing}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8E1',
  },
  messagesList: {
    padding: 15,
  },
  messageContainer: {
    maxWidth: '80%',
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#FFD54F',
    borderRadius: 20,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFB74D',
    borderRadius: 20,
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  sendButton: {
    backgroundColor: '#FF6F00',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ChatScreen;
