import axios, { AxiosError } from "axios";
const { hostName } = require('../global')

const baseURL = hostName

const addToFavorites = async (jobPostingId,  token) => {
    try {
        let config = { headers: { Authorization: `Bearer ${token}`}};
        const res = await axios.post(`${hostName}/favorites/add?jobPostingId=${jobPostingId}`, null ,config );
        return res.data;
    } catch(error) {
        const axiosError = error;
        if (axiosError && axiosError.response && axiosError.response.status === 403) {
            throw new Error("no_permistion");
        }
        else   {
            throw error;
        }

    }
}


async function getMyWishlist(token) {
  try {
    const response = await axios.get(`${baseURL}/favorites/my-wishlist`, {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: '*/*',
      },
    })
    return response.data
  } catch (error) {
    console.error('Error getting wishlist:', error)
    throw error
  }
}

// async function deleteFromFavorites(jobPostingId, token) {
//   try {
//     const response = await axios.delete(`${baseURL}/favorites/delete?jobPostingId=${jobPostingId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         accept: '*/*',
//       },
//     })
//     return response.data
//   } catch (error) {
//     console.error('Error deleting from favorites:', error)
//     throw error
//   }
// }

export const favoriteService = {
  addToFavorites,
  getMyWishlist,
}
