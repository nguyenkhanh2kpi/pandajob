import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import CompanyProfile from '../Components/Companies/CompanyProfile'
import { companyService } from '../Service/company.service'
import '@testing-library/jest-dom'

jest.mock('../Service/company.service', () => ({
  companyService: {
    getCompanyById: jest.fn(() =>
      Promise.resolve({
        id: 1,
        name: 'Công ty ABC',
        avatar: 'https://example.com/avatar.png',
        website: 'https://example.com',
        phone: '0123456789',
        info: 'Thông tin công ty ABC',
        address: '123 Đường ABC, Quận XYZ, TP HCM',
      })
    ),
    getJobByCompany: jest.fn(() =>
      Promise.resolve([
        {
          id: 1,
          name: 'Developer',
          position: 'TP HCM',
          salary: 'Negotiable',
          detailLocation: 'Job description for Developer',
        },
        {
          id: 2,
          name: 'Designer',
          position: 'Hà Nội',
          salary: 'Competitive',
          detailLocation: 'Job description for Designer',
        },
      ])
    ),
  },
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: '1' }), 
}))

describe('CompanyProfile Component', () => {
  beforeEach(async () => {
    render(
      <Router>
        <CompanyProfile />
      </Router>
    )
    await waitFor(() => expect(companyService.getCompanyById).toHaveBeenCalled())
  })

  test('renders company details', async () => {
    await waitFor(() => {
      expect(screen.getByText('Công ty ABC')).toBeInTheDocument()
      expect(screen.getByText('Thông tin công ty ABC')).toBeInTheDocument()
      expect(screen.getByText('0123456789')).toBeInTheDocument()
      expect(screen.getByText('123 Đường ABC, Quận XYZ, TP HCM')).toBeInTheDocument()
    })
  })

  test('renders job list', async () => {
    await waitFor(() => {
      expect(screen.getByText('Developer')).toBeInTheDocument()
      expect(screen.getByText('Designer')).toBeInTheDocument()
    })
  })

  test('renders company avatar', async () => {
    await waitFor(() => {
      const img = screen.getByRole('img', { name: 'Công ty ABC' })
      expect(img).toHaveAttribute('src', 'https://example.com/avatar.png')
    })
  })
})
