import { Badge, Box, Button, Center, HStack, Heading, IconButton, Image, SlideFade, Spinner, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { eventService } from '../../Service/event.service'
import { ArrowForwardIcon, CopyIcon } from '@chakra-ui/icons'

export const EventDetailHome = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [event, setEvent] = useState({
    id: 0,
    title: '',
    article: '',
    time: '',
    status: true,
    image: '',
    content: '',
  })

  useEffect(() => {
    eventService.getEventById(params.id).then((res) => {
      setEvent(res)
    })
  }, [])

  if (event.id === 0) {
    return (
      <HStack minH={800} w='100%' justifyContent='center' alignItems='center'>
        <Spinner thickness='8px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='4xl' />
      </HStack>
    )
  } else
    return (
      <VStack minH={1000} bgColor={'#f0f4f5'} fontFamily={'Roboto'} p={2}>
        <SlideFade in={true} offsetY={20}>
          <Heading size={'lg'} m={'6'} mt={24} ml={2} textAlign={'left'} marginRight='auto'></Heading>
        </SlideFade>
        <HStack align={'flex-start'} w={'70vw'} alignItems={'center'} display={'flex'} justifyContent={'center'}>
          <Box bgColor={'white'} maxW='960px' borderWidth='1px' borderRadius='lg' overflow='hidden' w={'100%'}>
            <Image src={event.image} alt='Image' />

            <Box p='6'>
              <Box display='flex' mt={2} alignItems='baseline'>
                <Badge borderRadius='full' px='2' colorScheme='teal'>
                  Author
                </Badge>
                <Box color='gray.500' fontWeight='semibold' letterSpacing='wide' fontSize='xs' textTransform='uppercase' ml='2'>
                  {event.author}
                </Box>
              </Box>
              <Box display='flex' mt={2} alignItems='baseline'>
                <Badge borderRadius='full' px='2' colorScheme='teal'>
                  Time
                </Badge>
                <Box color='gray.500' fontWeight='semibold' letterSpacing='wide' fontSize='xs' textTransform='uppercase' ml='2'>
                  {event.time}
                </Box>
              </Box>

              <Box mt='1' fontWeight='semibold' as='h4' lineHeight='tight' noOfLines={1}>
                {event.title}
              </Box>

              <Box>{event.article}</Box>
            </Box>
          </Box>
        </HStack>
        <HStack align={'flex-start'} w={'70vw'} alignItems={'center'} display={'flex'} justifyContent={'center'}>
          <Box bgColor={'white'} maxW='960px' borderWidth='1px' borderRadius='lg' overflow='hidden' w={'100vw'}>
            <Box m={5}>{event.content}</Box>
          </Box>
        </HStack>
      </VStack>
    )
}
