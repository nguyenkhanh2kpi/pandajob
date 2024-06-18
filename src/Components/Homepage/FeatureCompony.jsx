import { Box, Container, Flex, Text, Image, Heading, Button, HStack, Icon, VStack, Link, Card, Stack, CardBody, CardFooter, Avatar } from '@chakra-ui/react'
import { ChevronRightIcon, StarIcon } from '@chakra-ui/icons'

import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom'
import { companyService } from '../../Service/company.service'
import { AiOutlineAlert } from 'react-icons/ai'

const FeatureCompony = () => {
  const navigate = useNavigate()
  const [companies, setCompanies] = useState([])
  useEffect(() => {
    companyService
      .getAllCompany()
      .then((res) => setCompanies(res))
      .catch((er) => console.log(er.message))
  }, [])
  return (
    <VStack p={5} fontFamily={'Roboto'} w={'100%'}>
      <Box overflow={'hidden'} position='relative' w={'100%'} borderRadius={8}>
        <HStack w={'100%'} justifyContent={'space-between'}>
          <HStack alignItems='center' spacing={4}>
            <Icon as={AiOutlineAlert} boxSize={7} p={1} borderRadius='full' />
            <Text fontWeight={'bold'} m={0}>
              Công ty
            </Text>
          </HStack>
          <Link>Xem tất cả</Link>
        </HStack>

        <Box>
          <Swiper slidesPerView={3} spaceBetween={30} freeMode={true} modules={[FreeMode]} className='mySwiper'>
            {companies.map((company, index) => (
              <SwiperSlide key={index}>
                <Card onClick={() => navigate(`/companies/${company.id}`)} h={'100%'} direction={{ base: 'column', sm: 'row' }} overflow='hidden' variant='outline'>
                  <Avatar m={3} size='xl' name={company.name} src={company.avatar} />
                  <Stack>
                    <CardBody>
                      <Text noOfLines={1} fontWeight={'bold'}>{company.name}</Text>
                      <Text>{company.website}</Text>
                    </CardBody>
                  </Stack>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Box>
    </VStack>
  )
}

export default FeatureCompony
