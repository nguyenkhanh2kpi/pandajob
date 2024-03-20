import axios, { AxiosError } from 'axios'
import { hostName } from '../global'
const API_URL = hostName

const addBlacklist = async (token, form) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }

    const res = await axios.post(`${API_URL}/blacklist`, form, config)
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

const removeBlacklist = async (token, id) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
    const res = await axios.post(`${API_URL}/blacklist/remove/${id}`,null, config)
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


const getAllUser = async (token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
    const res = await axios.get(`${API_URL}/user`,config)
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

export const userService = {
  addBlacklist,
  removeBlacklist,
  getAllUser,
}
