import { Box, Button, Image, Skeleton, Spinner, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { companyService } from '../../Service/company.service'
import { UpdateCompany } from './UpdateCompany'

export const MyCompany = () => {
  const [company, setCompany] = useState()
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  useEffect(() => {
    companyService
      .getMyCompany(accessToken)
      .then((res) => setCompany(res))
      .catch((error) => console.log(error.message))
  }, [])

  if (company === undefined) {
    return (
      <>
        <Box fontFamily={'Montserrat'} fontWeight={400} backgroundColor={'#e9f3f5'} p={30} overflow='hidden'>
          <VStack spacing={3}>
            <Box p={'20%'} borderRadius={20} backgroundColor={'#FFFFFF'} w={'100%'} mb={10}>
              <Skeleton>
                <div>contents wrapped</div>
                <div>won't be visible</div>
              </Skeleton>
            </Box>
          </VStack>
        </Box>
      </>
    )
  } else
    return (
      <>
        <Box fontFamily={'Montserrat'} fontWeight={400} backgroundColor={'#e9f3f5'} p={30} overflow='hidden'>
          <VStack spacing={3}>
            <Box p={'8%'} borderRadius={20} backgroundColor={'#FFFFFF'} w={'100%'} mb={10}>
              <Image w='90%' h={300} borderRadius={20} src={company.avatar} alt="Company" />
              <Text pt={20} fontWeight={'black'} fontSize='xl'>
                {company.name}
              </Text>
              <Text mt={4}>Địa chỉ: {company.address}</Text>
              <Text mt={4}>Phone: {company.phone}</Text>
              <Text mt={4}>Des: {company.info}</Text>
              <Text mt={4}>Website: {company.website}</Text>
              <UpdateCompany data={company} />
            </Box>
          </VStack>
        </Box>
      </>
    )
}
