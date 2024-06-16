import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Box, VStack, HStack, Button, Flex, Avatar, Heading, Text, IconButton } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'

export default function SliderBanner() {
  const slides = [
    { id: 1, content: 'dd', imageUrl: 'https://firebasestorage.googleapis.com/v0/b/upload2-23381.appspot.com/o/1717931976105_newban1111.png?alt=media' },
    { id: 2, content: 'ss', imageUrl: 'https://firebasestorage.googleapis.com/v0/b/upload2-23381.appspot.com/o/1717934503641_ban22222.png?alt=media' },
    // { id: 3, content: 'Slide 3 Content', imageUrl: 'https://static.topcv.vn/img/T1%201100x220.png' },
  ]

  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 3000)
    return () => clearInterval(slideInterval)
  }, [])

  return (
    <VStack className='slider-banner' fontFamily={'Roboto'} mt={10} w={'80%'}>
      <Box borderRadius={10} overflow={'hidden'} position='relative' w='100%' bgColor={'white'}>
        {slides.map((slide, index) => (
          <Box key={slide.id} display={index === currentSlide ? 'block' : 'none'}>
            <Box h='300px' w='100%' bgImage={`url(${slide.imageUrl})`} bgSize='cover' bgPosition='center' textAlign='center' lineHeight='200px' fontSize='2xl' color='white'>
              <Text color={'black'}>{slide.content}</Text>
            </Box>
          </Box>
        ))}
        <HStack position='absolute' top='50%' w='100%' justifyContent='space-between' px={4}>
          <Button borderRadius={'50%'} onClick={prevSlide}>
            <ChevronLeftIcon />
          </Button>
          <Button borderRadius={'50%'} onClick={nextSlide}>
            <ChevronRightIcon />
          </Button>
        </HStack>
      </Box>
    </VStack>
  )
}
