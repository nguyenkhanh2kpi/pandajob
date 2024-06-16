import React, { useEffect, useState } from 'react'
import { eventService } from '../../Service/event.service'
import { ToastContainer, toast } from 'react-toastify'

import { Center, HStack, Heading, SimpleGrid, SlideFade, Spinner, VStack } from '@chakra-ui/react'
import { EventCard } from './EventCard'

export const EventContainer = () => {
  const [events, setEvent] = useState(null)
  useEffect(() => {
    eventService
      .getEvent()
      .then((res) => setEvent(res))
      .catch((er) => console.log(er))
  })
  if (!events) {
    return (
      <HStack minH={800} w='100%' justifyContent='center' alignItems='center'>
        <Spinner thickness='8px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='4xl' />
      </HStack>
    )
  } else
    return (
      <VStack width={'100vw'} align={'flex-start'} m={2} p={2}>
        {!events ? (
          <HStack minH={500} w='100%' justifyContent='center' alignItems='center'>
            <Spinner thickness='8px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='4xl' />
          </HStack>
        ) : (
          <SimpleGrid columns={3} spacing={5}>
            {events
              .filter((event) => event.status === true)
              .map((event) => (
                <EventCard key={event.id} {...event} />
              ))}
          </SimpleGrid>
        )}

        <ToastContainer position='bottom-right' autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme='light' />
      </VStack>
    )
}
