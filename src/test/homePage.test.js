import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import { locationService } from '../Service/location.service'
import HomePage from '../Components/Homepage/HomePage'
import { mock2Jobs, mockACompany, mockAllCompany, mockFaviriteServices, mockPostRelationJobResponse, mockProvinces } from './mockdata'
import { companyService } from '../Service/company.service'
import { ChakraProvider, theme } from '@chakra-ui/react'
import { dataService } from '../Service/data.service'
import '@testing-library/jest-dom'

jest.mock('../Service/company.service', () => ({
  companyService: {
    getCompanyById: jest.fn(() => Promise.resolve(mockACompany)),
    getAllCompany: jest.fn(() => Promise.resolve(mockAllCompany)),
    getJobByCompany: jest.fn(() => Promise.resolve(mock2Jobs)),
  },
}))

jest.mock('../Service/location.service', () => ({
  locationService: {
    getAllProvince: jest.fn(() => Promise.resolve(mockProvinces)),
  },
}))

jest.mock('../Service/data.service', () => ({
  dataService: {
    postRelationJobJava: jest.fn(() => Promise.resolve(mockPostRelationJobResponse)),
  },
}))

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    }
  }

jest.mock('../Service/favorite.service', () => ({
  favoriteService: {
    getMyWishlist: jest.fn(() => Promise.resolve(mockFaviriteServices)),
  },
}))

describe('HomePage Component', () => {
  beforeEach(async () => {
    render(
      <ChakraProvider theme={theme}>
        <Router>
          <HomePage />
        </Router>
      </ChakraProvider>
    )
  })

  test('renders HomePage and checks if elements exist', async () => {
    await waitFor(() => {
      expect(locationService.getAllProvince).toHaveBeenCalled()
    })
    expect(screen.getByPlaceholderText('vị trí tuyển dụng')).toBeInTheDocument()
    expect(screen.getByText('Địa điểm')).toBeInTheDocument()
    expect(screen.getByText('Kinh nghiệm')).toBeInTheDocument()
    expect(screen.getByText('Mức lương')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Tìm/i })).toBeInTheDocument()
  })

  test('fetches and displays provinces in the dropdown', async () => {
    await waitFor(() => {
      expect(locationService.getAllProvince).toHaveBeenCalled()
    })
    expect(screen.getByText('Địa điểm')).toBeInTheDocument()
  })

  test('tải job trong trang home thành công', async () => {
    await waitFor(() => {
      expect(dataService.postRelationJobJava).toHaveBeenCalled()
    })
    expect(screen.getByText('Công việc gợi ý')).toBeInTheDocument()
  })
})
