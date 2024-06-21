import React from 'react'
import { render } from '@testing-library/react'
import { AboutUs } from '../Components/AboutUs/AboutUs'

test('renders AboutUs component', () => {
  const { getByText } = render(<AboutUs />)
  expect(getByText(/về chúng tôi/i)).toBeInTheDocument()
})

test('renders AboutUs component1', () => {
  const { getByText } = render(<AboutUs />)
  expect(getByText(/Về chúng tôi/i)).toBeInTheDocument()
  expect(getByText(/Chào mừng bạn đến với Panda Job!/i)).toBeInTheDocument()
})
