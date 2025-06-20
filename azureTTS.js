import Constants from "expo-constants";
import { Audio } from "expo-av";

const AZURE_SPEECH_KEY = Constants.expoConfig.extra.AZURE_SPEECH_KEY;
const AZURE_SPEECH_REGION = Constants.expoConfig.extra.AZURE_SPEECH_REGION; // Use region instead of endpoint

export const textToSpeech = async (text) => {
  try {
    const endpoint = `https://${AZURE_SPEECH_REGION}.tts.speech.microsoft.com/cognitiveservices/v1`;

    const headers = {
      "Content-Type": "application/ssml+xml",
      "Ocp-Apim-Subscription-Key": AZURE_SPEECH_KEY,
      "X-Microsoft-OutputFormat": "audio-16khz-32kbitrate-mono-mp3",
    };

    const body = `
      <speak version='1.0' xml:lang='en-US'>
        <voice xml:lang='en-US' xml:gender='Female' name='en-US-JennyNeural'>
          ${text}
        </voice>
      </speak>`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers,
      body,
    });

    if (!response.ok) {
      throw new Error(`Azure TTS Error: ${response.status} - ${response.statusText}`);
    }

    const audioData = await response.blob();
    const uri = URL.createObjectURL(audioData);

    // Play audio using Expo AV
    const sound = new Audio.Sound();
    await sound.loadAsync({ uri });
    await sound.playAsync();

    return uri;
  } catch (error) {
    console.error("Azure TTS Error:", error);
    return null;
  }
};
