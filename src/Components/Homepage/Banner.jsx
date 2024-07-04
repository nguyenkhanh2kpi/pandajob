import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Box, VStack, HStack, Button, Flex, Avatar, Heading, Text, IconButton, Image } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { bannerService } from '../../Service/banner.service'

export default function SliderBanner() {
  const [banners, setBanners] = useState([])
  useEffect(() => {
    bannerService
      .getAllBanners()
      .then((response) => setBanners(response))
      .catch((er) => console.log(er))
  }, [])

  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? banners.length - 1 : prev - 1))
  }

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 3000)
    return () => clearInterval(slideInterval)
  }, [])

  return (
    <VStack p={0} className='slider-banner' fontFamily={'Roboto'} w={'80%'}>
      <Box overflow={'hidden'} position='relative' w='100%'>
        {banners.map((slide, index) => (
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
