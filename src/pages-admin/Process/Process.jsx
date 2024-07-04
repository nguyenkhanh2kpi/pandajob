import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Card, CardBody, Flex, Grid, GridItem, HStack, Image, Link, SimpleGrid, Spinner, Tab, Tag, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Step, StepDescription, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, Stepper, useSteps } from '@chakra-ui/react'
import { jobService } from '../../Service/job.service'
import { CheckIcon, ChevronRightIcon, Search2Icon } from '@chakra-ui/icons'

const stateColorMapping = {
  CREATE: 'blue',
  ON: 'green',
  PAUSE: 'orange',
  END: 'red',
}

const Process = () => {
  const navigate = useNavigate()
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const userId = JSON.parse(localStorage.getItem('data')).data.userInfo.id
  const [jobData, setJobs] = useState(null)

  useEffect(() => {
    jobService
      .getAllJob()
      .then((reponse) => {
        setJobs(reponse)
      })
      .catch((er) => console.log(er))
  }, [])

  if (!jobData) {
    return (
      <HStack minH={500} w='100%' justifyContent='center' alignItems='center'>
        <Spinner thickness='8px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='4xl' />
      </HStack>
    )
  } else
    return (
      <Box minHeight={2000} overflow='auto' fontFamily={'Roboto'} fontWeight={400} backgroundColor={'#f5f9fa'}>
        <HStack pt={30} justifyContent={'space-between'} w={'100%'}>
          <Breadcrumb separator={<ChevronRightIcon color='gray.500' />} fontStyle={'italic'} fontWeight={'bold'}>
            <BreadcrumbItem>
              <BreadcrumbLink href='#'>Quản lý ứng tuyển</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </HStack>
        <HStack mb={10} w={'100%'} pr={30} pl={30}>
          <Box m={0} bgColor={'#FEEBC8'} w={'100%'} as='blockquote' borderRadius={3} borderLeft='4px solid' borderColor='blue.400' pl={4} py={2}>
            Với những công việc không yêu cầu làm bài test sàng lọc hãy lựa chọn ứng viên từ trang kết quả test sàng lọc
          </Box>
          <Button color='white' backgroundColor='rgb(3, 201, 215)' onClick={() => navigate('/manage-apply')}>
            Xem tất cả công việc
          </Button>
        </HStack>

        <SimpleGrid w={'80%'} ml={30} mr={30} columns={{ base: 1, md: 2 }} spacing={10}>
          {jobData.map((job) => {
            return job.status === true && job.user_id === userId ? (
              <Box w={'100%'} bgColor={'white'} borderRadius={20} p={30} boxShadow={'md'}>
                <HStack w={'100%'} justifyContent={'space-between'}>
                  <Text m={0} p={0} onClick={() => navigate(`/process/item/${job.id}`)} fontWeight='bold'>
                    <Link>JOB: {job.name}</Link>
                  </Text>
                </HStack>
                <HStack mt={3}>
                  <Text fontStyle={'italic'} m={0} p={0}>
                    Ngày đăng: <Tag>{job.createDate}</Tag>
                  </Text>
                  <Text fontStyle={'italic'} m={0} p={0}>
                    Trạng thái: <JobStateTag state={job.state} />
                  </Text>
                </HStack>
                <HStack mt={3}>
                  <Button size='sm' onClick={() => navigate(`/process/item/${job.id}`)} variant='outline'>
                    Xem CV đã ứng tuyển
                  </Button>

                  {job.requireTest ? (
                    <Button size='sm' onClick={() => navigate(`/process/screening/${job.id}`)} rightIcon={<CheckIcon />} variant='outline'>
                      Quản lý Test sàng lọc
                    </Button>
                  ) : (
                    <></>
                  )}
                </HStack>
              </Box>
            ) : null
          })}
        </SimpleGrid>
      </Box>
    )
}

const JobStateTag = ({ state }) => {
  const colorScheme = stateColorMapping[state] || 'gray'
  return <Tag colorScheme={colorScheme}>{state}</Tag>
}

export default Process
