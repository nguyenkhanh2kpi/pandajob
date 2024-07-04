import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom' // Import BrowserRouter
import CompaniesContainer from '../Components/Companies/CompaniesContainer'
import { companyService } from '../Service/company.service'

jest.mock('../Service/company.service', () => ({
  companyService: {
    getAllCompany: jest.fn(() =>
      Promise.resolve([
        {
          id: 1,
          name: 'CÔNG TY TNHH BUYMED',
          avatar: 'https://firebasestorage.googleapis.com/v0/b/upload2-23381.appspot.com/o/files%2FCloudCfo-Financial-Ratios.png?alt=media&token=f456c667-f27c-459f-a246-9ab5ffa86f67',
          website: 'https://thuocsi.vn/',
          address: 'Tầng 8, Tòa nhà Vincom Center Đồng Khởi, 72 Lê Thánh Tôn - Phường Bến Nghé - Quận 1 - TP Hồ Chí Minh. ',
          phone: '0123456776',
          info: 'thuocsi.vn được thành lập từ năm 2018, là một trong những startup thành công trong lĩnh vực công nghệ về y tế',
          userId: 2,
        },
        {
          id: 2,
          name: 'CÔNG TY TNHH KIN LONG VIỆT NAM',
          avatar: 'https://static.topcv.vn/company_covers/cong-ty-tnhh-kin-long-viet-nam-211e12c68ebec40e7a3395b793500466-65421fc34c31c.jpg',
          website: 'https://kinlong.vn/',
          address: 'Tầng 3 TTTM, tòa nhà CTM Complex, số 139 Cầu Giấy, Phường Quan Hoa, Quận Cầu Giấy, Hà Nội',
          phone: '0987654321',
          info: 'Kin Long là một doanh nghiệp quy mô lớn trong ngành ngũ kim Trung Quốc, là công ty chuyên nghiệp tham gia vào lĩnh vực nghiên cứu, chế tạo và phân phối các sản phẩm ngũ kim chất lượng cao.',
          userId: 3,
        },
      ])
    ),
  },
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}))

describe('CompaniesContainer Component', () => {
  beforeEach(async () => {
    render(
      <Router>
        <CompaniesContainer />
      </Router>
    )
    await waitFor(() => expect(companyService.getAllCompany).toHaveBeenCalled())
  })

  test('renders search input and button', () => {
    const searchInput = screen.getByPlaceholderText('Tìm kiếm công ty...')
    const searchButton = screen.getByRole('button', { name: /Tìm kiếm/i })

    expect(searchInput).toBeInTheDocument()
    expect(searchButton).toBeInTheDocument()
  })

  test('renders company list', async () => {
    await waitFor(() => {
      expect(screen.getByText('CÔNG TY TNHH BUYMED')).toBeInTheDocument()
      expect(screen.getByText('CÔNG TY TNHH KIN LONG VIỆT NAM')).toBeInTheDocument()
    })
  })

  test('filters companies based on search input', async () => {
    const searchInput = screen.getByPlaceholderText('Tìm kiếm công ty...')
    fireEvent.change(searchInput, { target: { value: 'BUYMED' } })

    const searchButton = screen.getByRole('button', { name: /Tìm kiếm/i })
    fireEvent.click(searchButton)

    await waitFor(() => {
      expect(screen.getByText('CÔNG TY TNHH BUYMED')).toBeInTheDocument()
      expect(screen.queryByText('CÔNG TY TNHH KIN LONG VIỆT NAM')).not.toBeInTheDocument()
    })
  })
})
