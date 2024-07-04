import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'
import { EventCard } from '../Components/Events/EventCard'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}))

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
  },
}))

test('renders EventCard with correct props', () => {
  const { getByText } = render(
    <BrowserRouter>
      <EventCard id='1' title='Test Event' article='This is a test article.' time='2024-06-23' author='John Doe' image='https://bit.ly/2Z4KKcF' content='Some content' status='active' />
    </BrowserRouter>
  )

  expect(getByText('Test Event')).toBeInTheDocument()
  expect(getByText('This is a test article.')).toBeInTheDocument()
})

test('navigates to event page on button click', () => {
  const navigate = jest.fn()
  require('react-router-dom').useNavigate.mockReturnValue(navigate)

  const { getByText } = render(
    <BrowserRouter>
      <EventCard id='1' title='Test Event' article='This is a test article.' time='2024-06-23' author='John Doe' image='https://bit.ly/2Z4KKcF' content='Some content' status='active' />
    </BrowserRouter>
  )

  fireEvent.click(getByText('Xem thêm'))
  expect(navigate).toHaveBeenCalledWith('/event/1')
})

test('matches snapshot', () => {
  const { asFragment } = render(
    <BrowserRouter>
      <EventCard id='1' title='Test Event' article='This is a test article.' time='2024-06-23' author='John Doe' image='https://bit.ly/2Z4KKcF' content='Some content' status='active' />
    </BrowserRouter>
  )

  expect(asFragment()).toMatchSnapshot()
})
