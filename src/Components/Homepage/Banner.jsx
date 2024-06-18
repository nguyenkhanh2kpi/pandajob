import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Box, VStack, HStack, Button, Flex, Avatar, Heading, Text, IconButton, Image } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'

export default function SliderBanner() {
  const slides = [
    { id: 1, content: '', imageUrl: 'https://firebasestorage.googleapis.com/v0/b/upload2-23381.appspot.com/o/1718649773127_td1banner.png?alt=media' },
    { id: 2, content: '', imageUrl: 'https://firebasestorage.googleapis.com/v0/b/upload2-23381.appspot.com/o/1718649833253_pngtree-recruitment-flat-red-poster-banner-background-picture-image_1130444.jpg?alt=media' },
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
    <VStack p={0} className='slider-banner' fontFamily={'Roboto'} w={'80%'}>
      <Box overflow={'hidden'} position='relative' w='100%'>
        {slides.map((slide, index) => (
          <Box key={slide.id} display={index === currentSlide ? 'block' : 'none'}>
            <Image w={'100%'} h={'350px'} src={slide.imageUrl} />
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
