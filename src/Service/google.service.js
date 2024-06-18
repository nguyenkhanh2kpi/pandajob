import axios from 'axios'
import { hostName } from '../global'

const API_URL = `${hostName}/tokens`

const saveOrUpdateToken = async (token, authHeader) => {
  try {
    const response = await axios.post(API_URL, token, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authHeader}`,
      },
    })
    return response.data
  } catch (error) {
    console.error('Lỗi khi lưu hoặc cập nhật token:', error)
    throw error
  }
}

const getToken = async (authHeader) => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${authHeader}`,
      },
    })
    return response.data
  } catch (error) {
    console.error('Lỗi khi lấy token:', error)
    throw error
  }
}

export const googleTokenManageService = {
  getToken,
  saveOrUpdateToken,
}
