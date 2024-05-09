import axios, { AxiosError } from 'axios'
import { hostName } from '../../global'
const API_URL = hostName

const postMessage = async (message) => {
    try {
      const data = {
        message: message
      };
      const response = await axios.post(`http://localhost:8000/chatbot/chat`, data);
      return response.data;
    } catch (error) {
      console.error('Error posting local calendar:', error);
      throw error;
    }
  }
  

export const chatBotService = {
    postMessage,
}
