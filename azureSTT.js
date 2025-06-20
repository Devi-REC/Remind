import Constants from "expo-constants";

const AZURE_SPEECH_KEY = Constants.expoConfig.extra.AZURE_SPEECH_KEY;
const AZURE_SPEECH_ENDPOINT = Constants.expoConfig.extra.AZURE_SPEECH_ENDPOINT;

export const speechToText = async (audioData) => {
  try {
    const response = await fetch(`${AZURE_SPEECH_ENDPOINT}/speech/recognition/conversation/cognitiveservices/v1?language=en-US`, {
      method: "POST",
      headers: {
        "Content-Type": "audio/wav",
        "Ocp-Apim-Subscription-Key": AZURE_SPEECH_KEY,
      },
      body: audioData,
    });

    const data = await response.json();
    return data.DisplayText || "Could not recognize speech.";
  } catch (error) {
    console.error("Azure STT Error:", error);
    return "Error recognizing speech.";
  }
};
