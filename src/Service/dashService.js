import axios, { AxiosError } from 'axios'
import { hostName } from '../global'
const API_URL = hostName

const getReccerDash = async (token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
    const res = await axios.get(`${API_URL}/dash/reccer`, config)
    return res.data
  } catch (error) {
    const axiosError = error
    if (axiosError && axiosError.response && axiosError.response.status === 403) {
      throw new Error('no_permistion')
    } else {
      throw error
    }
  }
}

export const dashService = {
  getReccerDash,
}
