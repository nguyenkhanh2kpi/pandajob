import React, { useEffect, useState } from 'react'
import { IoIosMore } from 'react-icons/io'
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns'
import { Box, Button, IconButton, Skeleton, Spinner, Stack, Text } from '@chakra-ui/react'
import { dropdownData } from '../../data/dummy'
import { useStateContext } from '../../contexts/ContextProvider'
import product9 from '../../data/product9.jpg'
import { eventService } from '../../Service/event.service'
import { ToastContainer, toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { DeleteIcon, EditIcon, SearchIcon } from '@chakra-ui/icons'
import { Header } from '../../Components-admin'

const DropDown = ({ currentMode }) => (
  <div className='w-28 border-1 border-color px-2 py-1 rounded-md'>
    <DropDownListComponent
      id='time'
      fields={{ text: 'Time', value: 'Id' }}
      style={{ border: 'none', color: currentMode === 'Dark' && 'white' }}
      value='1'
      dataSource={dropdownData}
      popupHeight='220px'
      popupWidth='120px'
    />
  </div>
)

export const K_Event = () => {
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token

  const [events, setEvents] = useState()
  const naigate = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await eventService.getMyEvent(accessToken)
        setEvents(response)
      } catch (error) {
        toast.error("something went wrong")
      }
    }
    fetchData()
  }, [events])

  const handleDelete = async (e) => {
    eventService
      .DeleteEvent(e, accessToken)
      .then((response) => toast.info(response.message))
      .catch((error) => toast.error("something went wrong"))
  }

  function formatDate(inputDate) {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]

    const date = new Date(inputDate)
    const year = date.getFullYear()
    const month = months[date.getMonth()]
    const day = date.getDate()
    return `${month} ${day}, ${year}`
  }

  if (events === undefined) {
    return (
      <div className='m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl'>
        <Header category='App' title='Event' />
        <Stack>
          <Skeleton height='50px' />
          <Skeleton height='50px' />
          <Skeleton height='50px' />
        </Stack>
      </div>
    )
  } else if (events.length === 0) {
    return (
      <Box
        fontFamily={'Montserrat'}
        fontWeight={400}
        className='m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl'>
        <Header category='App' title='Event' />
        <Button
          mb={10}
          height='50px'
          color='white'
          bgColor='#03C9D7'
          text='Xem chi tiết'
          borderRadius='10px'>
          <Link to='/event/add'>Add</Link>
        </Button>
        <Text>You don't have any event</Text>
      </Box>
    )
  } else
    return (
      <>
        <ToastContainer
          position='bottom-right'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
        />

        <Box
          fontFamily={'Montserrat'}
          fontWeight={400}
          className='m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl'>
          <Header title='Event' />

          <Button color='white' bgColor='#03C9D7' text='Xem chi tiết' borderRadius='10px'>
            <Link to='/event/add'>+ Add event</Link>
          </Button>

          <div className='mt-5'>
            <div className='flex flex-wrap'>
              {events
                .filter((event) => event.status)
                .map((event) => (
                  <Box
                    borderWidth={1}
                    key={event.id}
                    className='w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3'>
                    <div className='flex justify-between'>
                      <p className='text-xl font-semibold'>{event.title}</p>
                      <button type='button' className='text-xl font-semibold text-gray-500'>
                        <IoIosMore />
                      </button>
                    </div>
                    <div className='mt-10'>
                      <img className='md:w-96 h-50 ' src={event.image} alt={product9} />
                      <div className='mt-8'>
                        <p className='font-semibold text-lg'>{event.author}</p>
                        <p className='text-gray-400 '>{formatDate(event.time)}</p>
                        <p className='mt-8 text-sm text-gray-400'>{event.article}</p>
                        <div className='mt-3'>
                          <IconButton
                            color='#03C9D7'
                            backgroundColor='#f7f7f7'
                            aria-label='Search database'
                            icon={<EditIcon />}
                            onClick={() => naigate(`/event/edit/${event.id}`)}
                          />
                          <IconButton
                            color='#e85f76'
                            backgroundColor='#f7f7f7'
                            aria-label='Search database'
                            icon={<DeleteIcon />}
                            value={event.id}
                            onClick={() => handleDelete(event.id)}
                          />
                        </div>
                      </div>
                    </div>
                  </Box>
                ))}
            </div>
          </div>
        </Box>
      </>
    )
}
