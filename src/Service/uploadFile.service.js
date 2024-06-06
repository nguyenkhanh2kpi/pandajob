import axios, { AxiosError } from 'axios'
import { hostName } from '../global'
const API_URL = hostName

const uploadFile = async (token, form) => {
  try {
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    }
    const resp = await axios.post(`${hostName}/file/upload`, form, config)
    return resp.data
  } catch (error) {
    throw error
  }
}

export const upLoadService = {
  uploadFile,
}
