import axios, { AxiosError } from 'axios'
import { chatHost, hostName } from '../global'
const API_URL = hostName

const getMyResume = async (token) => {
  try {
    let config = { headers: { Authorization: `Bearer ${token}` } }
    const res = await axios.get(`${API_URL}/resume`, config)
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

const postResume = async (token, form) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }

    const res = await axios.post(`${API_URL}/resume`, form, config)
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

const putResume = async (token, form) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }

    const res = await axios.put(`${API_URL}/resume`, form, config)
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

const postResumeWorkEx = async (token, form) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }

    const res = await axios.post(`${API_URL}/resume/work-ex/add-or-update`, form, config)
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

const deleteResumeWorkEx = async (token, form) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }

    const res = await axios.post(`${API_URL}/resume/delete-work-ex`, form, config)
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

const deleteResumeWorkProject = async (token, form) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }

    const res = await axios.post(`${API_URL}/resume/delete-work-project`, form, config)
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

const postResumeProject = async (token, form) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }

    const res = await axios.post(`${API_URL}/resume/project/add-or-update`, form, config)
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

const findRelatedResume = async (form) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const res = await axios.post(`${chatHost}/find-related-resume`, form, config)
    return res.data
  } catch (error) {
    throw error
  }
}

const findRelatedResumeByUser = async (accessToken) => {
  try {
    let config = { headers: { Authorization: `Bearer ${accessToken}` } }
    const res = await axios.get(`${API_URL}/find-related`, config)
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

export const resumeService = {
  getMyResume,
  postResume,
  postResumeWorkEx,
  postResumeProject,
  deleteResumeWorkEx,
  deleteResumeWorkProject,
  putResume,
  findRelatedResume,
  findRelatedResumeByUser,
}
