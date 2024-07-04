import React, { useEffect, useState } from 'react'
import { Badge, Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Grid, GridItem, HStack, Image, SkeletonCircle, SkeletonText, VStack } from '@chakra-ui/react'
import { companyService } from '../../Service/company.service'
import { AddCompany } from './AddCompany'
import { ChevronRightIcon } from '@chakra-ui/icons'

export const Companies = () => {
  const [companies, setCompanies] = useState([])

  useEffect(() => {
    companyService
      .getAllCompany()
      .then((res) => setCompanies(res))
      .catch((er) => console.log(er))
  }, [])

  if (companies.length === 0) {
    return (
      <>
        <Box padding='6' boxShadow='lg' bg='white'>
          <SkeletonCircle size='10' />
          <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
        </Box>
      </>
    )
  } else
    return (
      <>
        <Box minHeight={2000} overflow='auto' fontFamily={'Roboto'} fontWeight={400} backgroundColor={'#f5f9fa'}>
          <HStack justifyContent={'space-between'} w={'100%'}>
            <Breadcrumb separator={<ChevronRightIcon color='gray.500' />} fontStyle={'italic'} fontWeight={'bold'} pt={30}>
              <BreadcrumbItem>
                <BreadcrumbLink href='#'>Công ty</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </HStack>
          <VStack mb={5} w={'100%'} pl={30} pr={30} spacing={2}>
            <AddCompany />
            <Grid fontFamily={'Roboto'} fontWeight={400} templateColumns='repeat(3, 1fr)' gap={6}>
              {companies.map((property) => (
                <Box bgColor={'white'} maxW='sm' borderRadius={20} boxShadow={'lg'} overflow='hidden'>
                  <Image w={500} h={200} src={property.avatar} alt={property.avatar} />

                  <Box p='6'>
                    <Box display='flex' alignItems='baseline'>
                      <Box color='gray.500' fontWeight='semibold' letterSpacing='wide' fontSize='xs' textTransform='uppercase'>
                        {property.website}
                      </Box>
                    </Box>

                    <Box mt='1' fontWeight='semibold' as='h4' lineHeight='tight' noOfLines={1}>
                      {property.name}
                    </Box>

                    <Box>
                      {property.phone}
                      <Box as='span' color='gray.600' fontSize='sm'></Box>
                    </Box>

                    <Box display='flex' mt='2' alignItems='center'>
                      <Box as='span' color='gray.600' fontSize='sm'>
                        address: {property.address}
                      </Box>
                    </Box>
                    <Box display='flex' mt='2' alignItems='center'>
                      <Box as='span' color='gray.600' fontSize='sm'>
                        userID: {property.userId}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Grid>
          </VStack>
        </Box>
      </>
    )
}
