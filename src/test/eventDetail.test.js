import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import { eventService } from '../Service/event.service'
import '@testing-library/jest-dom'
import { EventDetailHome } from '../Components/Events/EventDetailHome'

jest.mock('../Service/event.service', () => ({
  eventService: {
    getEventById: jest.fn(() =>
      Promise.resolve({
        id: 1,
        title: 'How To Shift From Being A Crap Magnet Into Being A Miracle Magnet',
        article: 'How To Shift From Being A Crap Magnet Into Being A Miracle Magnet',
        time: '2024-06-20T01:51',
        author: 'Nguyễn Reccer1',
        status: true,
        image: 'https://firebasestorage.googleapis.com/v0/b/upload2-23381.appspot.com/o/files%2Fblackpink-07424148.jpg?alt=media&token=53551918-7a0b-4d85-a7b9-9cf4142c62b0',
        content: '? Welcoming all heart-centred midlife humans here in #LinkedInLand, wishing to make the REST of their life, the BEST of their life, by shifting from being a Crap Magnet into being a Miracle Magnet ?',
      })
    ),
  },
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: '1' }),
}))

describe('EventDetailHome Component', () => {
  beforeEach(async () => {
    render(
      <Router>
        <EventDetailHome />
      </Router>
    )
    await waitFor(() => expect(eventService.getEventById).toHaveBeenCalled())
  })

  test('renders event details', async () => {
    await waitFor(() => {
      const titleElements = screen.queryAllByText('How To Shift From Being A Crap Magnet Into Being A Miracle Magnet')
      expect(titleElements[0]).toBeInTheDocument() 
      expect(screen.getByText('Nguyễn Reccer1')).toBeInTheDocument()
      expect(screen.getByText('2024-06-20T01:51')).toBeInTheDocument()
    })
  })

  test('renders event image', async () => {
    await waitFor(() => {
      const img = screen.getByAltText('Image')
      expect(img).toHaveAttribute('src', 'https://firebasestorage.googleapis.com/v0/b/upload2-23381.appspot.com/o/files%2Fblackpink-07424148.jpg?alt=media&token=53551918-7a0b-4d85-a7b9-9cf4142c62b0')
    })
  })
})
