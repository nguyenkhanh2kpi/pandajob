import React, { useEffect, useState } from 'react'
import { IoIosMore } from 'react-icons/io'
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns'
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, Divider, Grid, GridItem, HStack, Heading, IconButton, Image, SimpleGrid, Skeleton, Spinner, Stack, Text, VStack } from '@chakra-ui/react'
import { dropdownData } from '../../data/dummy'
import { useStateContext } from '../../contexts/ContextProvider'
import product9 from '../../data/product9.jpg'
import { eventService } from '../../Service/event.service'
import { ToastContainer, toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronRightIcon, DeleteIcon, EditIcon, SearchIcon } from '@chakra-ui/icons'
import { Header } from '../../Components-admin'

const DropDown = ({ currentMode }) => (
  <div className='w-28 border-1 border-color px-2 py-1 rounded-md'>
    <DropDownListComponent id='time' fields={{ text: 'Time', value: 'Id' }} style={{ border: 'none', color: currentMode === 'Dark' && 'white' }} value='1' dataSource={dropdownData} popupHeight='220px' popupWidth='120px' />
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
        toast.error('something went wrong')
      }
    }
    fetchData()
  }, [events])

  const handleDelete = async (e) => {
    eventService
      .DeleteEvent(e, accessToken)
      .then((response) => toast.info(response.message))
      .catch((error) => toast.error('something went wrong'))
  }

  function formatDate(inputDate) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

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
      <Box minHeight={2000} overflow='auto' fontFamily={'Roboto'} fontWeight={400} backgroundColor={'#f5f9fa'}>
        <HStack justifyContent={'space-between'} w={'100%'}>
          <Breadcrumb separator={<ChevronRightIcon color='gray.500' />} fontStyle={'italic'} fontWeight={'bold'} pt={30}>
            <BreadcrumbItem>
              <BreadcrumbLink href='#'>Events</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Button size={'sm'} mr={30} color='white' bgColor='#03C9D7' text='Xem chi tiết' borderRadius='10px'>
            <Link to='/event/add'>+ Thêm sự kiện</Link>
          </Button>
        </HStack>
        <VStack spacing={3} pl={30} pr={30}>
          <Text>Bạn chưa có sự kiện nào</Text>
        </VStack>
      </Box>
    )
  } else
    return (
      <>
        <Box minHeight={2000} overflow='auto' fontFamily={'Roboto'} fontWeight={400} backgroundColor={'#f5f9fa'}>
          <HStack justifyContent={'space-between'} w={'100%'}>
            <Breadcrumb separator={<ChevronRightIcon color='gray.500' />} fontStyle={'italic'} fontWeight={'bold'} pt={30}>
              <BreadcrumbItem>
                <BreadcrumbLink href='#'>Events</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
            <Button size={'sm'} mr={30} color='white' bgColor='#03C9D7' text='Xem chi tiết' borderRadius='10px'>
              <Link to='/event/add'>+ Thêm sự kiện</Link>
            </Button>
          </HStack>
          <VStack spacing={3} pl={30} pr={30}>
            <Box minHeight={1000} overflow='auto' w={'100%'} mb={10}>
              <SimpleGrid p={10} maxW='100%' w='100%' spacing={10} templateColumns='repeat(auto-fill, minmax(300px, 1fr))'>
                {events
                  .filter((event) => event.status)
                  .map((event) => (
                    <>
                      <Box overflow={'hidden'} bgColor={'white'} borderRadius={20} boxShadow={'md'}>
                        <Image src={event.image} alt={event.title} />
                        <Box p={5}>
                          <Text noOfLines={1} fontWeight={'bold'}>
                            {event.title}
                          </Text>
                          <HStack w={'100%'} justifyContent={'space-between'}>
                            <Text fontStyle={'italic'} fontSize={'sm'}>
                              {formatDate(event.time)}
                            </Text>
                            <HStack>
                              <Button size={'sm'} onClick={() => handleDelete(event.id)} variant='ghost'>
                                Xóa
                              </Button>
                              <Button size={'sm'} onClick={() => naigate(`/event/edit/${event.id}`)}>
                                Sửa
                              </Button>
                            </HStack>
                          </HStack>
                        </Box>
                      </Box>
                    </>
                  ))}
              </SimpleGrid>
            </Box>
          </VStack>
        </Box>
        <ToastContainer />
      </>
    )
}
