import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Center, Flex, FormLabel, Heading, HStack, IconButton, Image, Link, SlideFade, Spinner, Text, VStack } from '@chakra-ui/react'
import { EmailIcon, InfoOutlineIcon, SearchIcon } from '@chakra-ui/icons'
import { companyService } from '../../Service/company.service'
import { ItemJobInCompany } from './ItemJobInCompany'
import { IoLocationOutline } from 'react-icons/io5'

const CompanyProfile = () => {
  const params = useParams()
  const [company, setCompany] = useState()
  const [listJob, setListJob] = useState([])
  useEffect(() => {
    companyService.getCompanyById(params.id).then((res) => setCompany(res))
    companyService.getJobByCompany(params.id).then((res) => setListJob(res))
  }, [])
  if (!company) {
    return (
      <HStack minH={800} w='100%' justifyContent='center' alignItems='center'>
        <Spinner thickness='8px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='4xl' />
      </HStack>
    )
  } else {
    return (
      <>
        <VStack bgColor={'#f0f4f5'} fontFamily={'Roboto'}>
          <SlideFade in={true} offsetY={20}>
            <Heading size={'lg'} mt={24}></Heading>
          </SlideFade>
          <HStack align={'flex-start'} w={'70vw'}>
            <Box borderRadius={20} overflow='hidden' boxShadow='md' align={'flex-start'} w={'100vw'} backgroundColor={'#FFFFFF'}>
              <Image src={company.avatar} alt={company.name} width='100%' height='200px' objectFit='cover' />
              <Box p={4}>
                <Text m={0} p={0} fontWeight='bold' mt='2'>
                  {company.name}
                </Text>
                <Flex w={'60%'}>
                  <Text m={0} p={0} flex='1'>
                    <Link href={company.website} isExternal color='blue.500'>
                      <IconButton m={2} aria-label='Search database' icon={<SearchIcon />} />
                      {company.website}
                    </Link>
                  </Text>
                  <Text m={0} p={0}>
                    <IconButton aria-label='Send email' m={2} icon={<EmailIcon />} />
                    {company.phone}
                  </Text>
                </Flex>
              </Box>
            </Box>
          </HStack>

          <HStack mb={100} align={'flex-start'} w={'70vw'}>
            <VStack w={'70%'} pr={3}>
              <Box bgColor={'white'} w={'100%'} borderWidth='1px' borderRadius={20} overflow='hidden' boxShadow='md' align={'flex-start'}>
                <FormLabel fontWeight={'bold'} fontSize={18} w={'100%'} p={4}>
                  Thông tin cơ bản
                </FormLabel>
                <Text p={4}>{company.info}</Text>
              </Box>
              <Box bgColor={'white'} w={'100%'} borderRadius={20} overflow='hidden' boxShadow='md' align={'flex-start'}>
                <FormLabel fontWeight={'bold'} fontSize={18} w={'100%'} p={4}>
                  Công việc
                </FormLabel>
                {listJob.map((job) => (
                  <ItemJobInCompany {...job} />
                ))}
              </Box>
            </VStack>

            <Box bgColor={'white'} w={'30%'} borderRadius={20} overflow='hidden' boxShadow='md' align={'flex-start'}>
              <FormLabel fontWeight={'bold'} fontSize={18} w={'100%'} p={4}>
                Thông tin liên hệ
              </FormLabel>

              <VStack p={3} w={'100%'} m={2}>
                <HStack w={'100%'}>
                  <IoLocationOutline />
                  <Text>
                    Company Address <br />
                  </Text>
                </HStack>
                <VStack>
                  <Text>{company.address}</Text>
                </VStack>
              </VStack>
            </Box>
          </HStack>
        </VStack>
      </>
    )
  }
}

export default CompanyProfile
