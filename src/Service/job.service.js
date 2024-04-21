import axios, { AxiosError } from 'axios'
import { hostName } from '../global'
const API_URL = hostName

const getById = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/job-posting/${id}`)
    return res.data.data
  } catch (error) {
    throw error
  }
}

export const jobService = {
  getById,
}
