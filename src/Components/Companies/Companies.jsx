import React from 'react'
import { Heading, HStack, SlideFade, VStack } from '@chakra-ui/react'
import CompaniesContainer from './CompaniesContainer'

const Companies = () => {
  return (
    <VStack bgColor={'#f0f4f5'} fontFamily={'Roboto'}>
      <SlideFade offsetY={20}>
        <Heading size={'lg'} m={'6'} mt={24}></Heading>
      </SlideFade>

      <HStack minH={1000} align={'flex-start'} w={'80vw'}>
        <CompaniesContainer />
      </HStack>
    </VStack>
  )
}

export default Companies
