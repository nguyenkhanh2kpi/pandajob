import axios from 'axios'
import { hostName } from '../global'

const API_URL = hostName + '/feedback'

const getAllFeedback = async () => {
  try {
    const response = await axios.get(API_URL)
    return response.data
  } catch (error) {
    console.error('Error fetching feedback:', error)
    throw error
  }
}

const getFeedbackById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching feedback by ID:', error)
    throw error
  }
}

const createFeedback = async (feedback) => {
  try {
    const response = await axios.post(API_URL, feedback)
    return response.data
  } catch (error) {
    console.error('Error creating feedback:', error)
    throw error
  }
}

const updateFeedback = async (id, feedback) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, feedback)
    return response.data
  } catch (error) {
    console.error('Error updating feedback:', error)
    throw error
  }
}

const deleteFeedback = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`)
  } catch (error) {
    console.error('Error deleting feedback:', error)
    throw error
  }
}

const markAsViewed = async (id) => {
  try {
    const response = await axios.put(`${API_URL}/${id}/view`)
    return response.data
  } catch (error) {
    console.error('Error marking feedback as viewed:', error)
    throw error
  }
}

const pinFeedback = async (id) => {
  try {
    const response = await axios.put(`${API_URL}/${id}/pin`)
    return response.data
  } catch (error) {
    console.error('Error pinning feedback:', error)
    throw error
  }
}

export const feedbackService = {
  getAllFeedback,
  getFeedbackById,
  createFeedback,
  updateFeedback,
  deleteFeedback,
  markAsViewed,
  pinFeedback,
}
