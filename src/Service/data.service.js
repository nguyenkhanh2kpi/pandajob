import axios, { AxiosError } from 'axios'
import { hostName } from '../global'
import { chatHost } from '../global'
const API_URL = hostName
const CHAT_HOST = chatHost

const postRelationJob = async (keyword, jobs) => {
  try {
    const data = {
      query: keyword,
      data: jobs,
    };

    const response = await axios.post(`${CHAT_HOST}/find-related-strings`, data);
    return response.data;
  } catch (error) {
    console.error('Error posting local calendar:', error);
    throw error;
  }
};


const postRelationJobJava = async (keyword, jobs) => {
  try {
    const data = {
      keyword: keyword,
    };

    const response = await axios.post(`${hostName}/find-related/find-related-job`, data);
    return response.data;
  } catch (error) {
    console.error('Error posting local calendar:', error);
    throw error;
  }
};

export const dataService = {
  postRelationJob,
  postRelationJobJava
}
