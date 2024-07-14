import axios from 'axios'
import { hostName } from '../global'

const API_URL = `${hostName}/proposal`

const getMyProposals = (token) => {
  return axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

const getAllMyProposals = (token) => {
  return axios.get(`${API_URL}/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

const updateProposalState = (proposalId, state, token) => {
  return axios.put(`${API_URL}/${proposalId}/${state}`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

const addNewProposal = (proposalData, token) => {
  return axios.post(API_URL, proposalData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
}

export default {
  getMyProposals,
  getAllMyProposals,
  updateProposalState,
  addNewProposal,
}
