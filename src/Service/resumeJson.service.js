import axios, { AxiosError } from 'axios'
import { chatHost, hostName } from '../global'
const API_URL = hostName

const getMyResumeJson = async (token) => {
  try {
    let config = { headers: { Authorization: `Bearer ${token}` } }
    const res = await axios.get(`${API_URL}/resume-json`, config)
    return res.data.data
  } catch (error) {
    const axiosError = error
    if (axiosError && axiosError.response && axiosError.response.status === 403) {
      throw new Error('no_permistion')
    } else {
      throw error
    }
  }
}

const putResumeJson = async (token, form) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }

    const res = await axios.put(`${API_URL}/resume-json`, form, config)
    return res.data
  } catch (error) {
    const axiosError = error
    if (axiosError && axiosError.response && axiosError.response.status === 403) {
      throw new Error('no_permission')
    } else {
      throw error
    }
  }
}

export const resumeJsonService = {
  getMyResumeJson,
  putResumeJson,
}
