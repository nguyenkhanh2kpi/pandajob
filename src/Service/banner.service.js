import axios from 'axios'
import { hostName } from '../global'

const API_URL = `${hostName}/banners`

const getAllBanners = async () => {
  try {
    const response = await axios.get(API_URL)
    return response.data
  } catch (error) {
    console.error('Error fetching banners:', error)
    throw error
  }
}

const getBannerById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching banner by ID:', error)
    throw error
  }
}

const createBanner = async (banner) => {
  try {
    const response = await axios.post(API_URL, banner)
    return response.data
  } catch (error) {
    console.error('Error creating banner:', error)
    throw error
  }
}

const updateBanner = async (id, banner) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, banner)
    return response.data
  } catch (error) {
    console.error('Error updating banner:', error)
    throw error
  }
}

const deleteBanner = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`)
  } catch (error) {
    console.error('Error deleting banner:', error)
    throw error
  }
}

export const bannerService = {
  getAllBanners,
  getBannerById,
  createBanner,
  updateBanner,
  deleteBanner,
}
