import React, { useEffect, useState } from 'react'
import { ArrowForwardIcon, CopyIcon, StarIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'
import { Box, CardHeader, Heading, Container, FormControl, VStack, FormErrorMessage, FormLabel, SlideFade, Stack, Input, HStack, CardBody, Card, Text, Radio, RadioGroup, StackDivider, Button, GridItem, Grid, Image, Icon, Spinner } from '@chakra-ui/react'
import { testService } from '../../Service/test.service'
import { AiOutlineUser } from 'react-icons/ai'
import { FaCode, FaPencilAlt, FaRegQuestionCircle } from 'react-icons/fa'

export const TestList = () => {
  const [tests, setTest] = useState(null)
  const navigate = useNavigate()
  // const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  let accessToken = ''
  try {
    accessToken = JSON.parse(localStorage.getItem('data')).access_token
  } catch (error) {
    navigate('/login')
  }

  useEffect(() => {
    testService
      .getMyTest(accessToken)
      .then((response) => setTest(response))
      .catch((er) => console.log(er))
  }, [])
  if (!tests)
    return (
      <HStack minH={800} w='100%' justifyContent='center' alignItems='center'>
        <Spinner thickness='8px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='4xl' />
      </HStack>
    )
  else
    return (
      <>
        <VStack bgColor={'#f0f4f5'} fontFamily={'Roboto'}>
          <SlideFade offsetY={20}>
            <Heading size={'lg'} m={'6'} mt={24}></Heading>
          </SlideFade>

          <HStack h={1000} align={'flex-start'} w={'80vw'}>
            <Grid templateColumns='repeat(3, 1fr)' gap={6}>
              {tests.length > 0 ? (
                tests.map((test) => (
                  <GridItem key={test.id}>
                    <TestItem test={test} />
                  </GridItem>
                ))
              ) : (
                <Box w='100%' h={200} borderRadius='md' p={4}>
                  <Text fontSize='xl' fontWeight='bold' textAlign='center'>
                    Hiện tại không có bài test nào
                  </Text>
                </Box>
              )}
            </Grid>
          </HStack>
        </VStack>
      </>
    )
}

const TestItem = ({ test }) => {
  const navigate = useNavigate()
  const handleOnTestClick = (test) => {
    if (test.type === 'MULTIPLE_CHOICE') {
      navigate('/test-record/' + test.id)
    } else if (test.type === 'ESSAY') {
      navigate('/essay/' + test.id)
    } else if (test.type === 'CODE') {
      navigate('/code-essay/' + test.id)
    }
  }
  let icon
  if (test.type === 'MULTIPLE_CHOICE') {
    icon = FaRegQuestionCircle
  } else if (test.type === 'ESSAY') {
    icon = FaCode
  } else if (test.type === 'CODE') {
    icon = FaCode
  } else {
    icon = FaPencilAlt
  }

  return (
    <Box p={10} backgroundColor='#ffffff' maxW='sm' borderRadius={10} overflow='hidden' fontFamily={'Roboto'}>
      <HStack alignItems='center' spacing={4}>
        <Icon as={icon} boxSize={7} p={1} bgColor='#ddeff0' borderRadius='full' />
        <Text noOfLines={1} m={0} fontSize='xl'>
          {test.summary}
        </Text>
      </HStack>
      {test.record ? (
        <Button size='xs' mt={1} colorScheme='green'>
          Đã làm
        </Button>
      ) : (
        <Button size='xs' mt={1} colorScheme='red'>
          Chưa làm
        </Button>
      )}

      <Box noOfLines={3} mt='2'>
        Thời gian thực hiện: {test.time} phút
      </Box>

      <Box display='flex' mt='4' alignItems='center'>
        <Button rightIcon={<ArrowForwardIcon />} colorScheme='teal' variant='outline' flex='1' onClick={() => handleOnTestClick(test)}>
          Làm bài
        </Button>
      </Box>
    </Box>
  )
}
