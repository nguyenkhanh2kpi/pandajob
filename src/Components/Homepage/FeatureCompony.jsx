import { Box, Container, Flex, Text, Heading, Button, HStack, Icon, VStack, Link, Avatar, useBreakpointValue } from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'

import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { companyService } from '../../Service/company.service'
import { AiOutlineAlert } from 'react-icons/ai'

const FeatureCompony = () => {
  const navigate = useNavigate()
  const [companies, setCompanies] = useState([])
  const scrollRef = useRef(null)
  const cardWidth = useBreakpointValue({ base: 300, md: 400 }) 

  useEffect(() => {
    companyService
      .getAllCompany()
      .then((res) => setCompanies(res))
      .catch((er) => console.log(er.message))
  }, [])

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -cardWidth : cardWidth,
        behavior: 'smooth',
      })
    }
  }

  return (
    <VStack p={5} fontFamily={'Roboto'} w={'100%'}>
      <Box overflow={'hidden'} position='relative' w={'100%'} borderRadius={8}>
        <HStack w={'100%'} justifyContent={'space-between'} mb={4}>
          <HStack alignItems='center' spacing={4}>
            <Icon as={AiOutlineAlert} boxSize={7} p={1} borderRadius='full' />
            <Text fontWeight={'bold'} m={0}>
              Công ty
            </Text>
          </HStack>
          <Link>Xem tất cả</Link>
        </HStack>

        <Box display='flex' alignItems='center'>
          <Button onClick={() => scroll('left')} variant='ghost' disabled={false}>
            <ChevronLeftIcon boxSize={6} />
          </Button>
          <Box
            ref={scrollRef}
            display='flex'
            overflowX='auto'
            flexWrap='nowrap'
            css={{
              '&::-webkit-scrollbar': { display: 'none' },
              '-ms-overflow-style': 'none',
              'scrollbar-width': 'none',
            }}>
            {companies.map((company, index) => (
              <Box key={index} minW={cardWidth} maxW={cardWidth} flex='0 0 auto' onClick={() => navigate(`/companies/${company.id}`)} p={4} boxShadow='base' borderRadius='md' cursor='pointer' mx={2} bg='white' _hover={{ boxShadow: 'md' }}>
                <VStack alignItems='flex-start'>
                  <Avatar size='xl' name={company.name} src={company.avatar} mb={2} />
                  <Text noOfLines={1} fontWeight={'bold'}>
                    {company.name}
                  </Text>
                  <Text noOfLines={1}>{company.website}</Text>
                </VStack>
              </Box>
            ))}
          </Box>
          <Button onClick={() => scroll('right')} variant='ghost' disabled={false}>
            <ChevronRightIcon boxSize={6} />
          </Button>
        </Box>
      </Box>
    </VStack>
  )
}

export default FeatureCompony
