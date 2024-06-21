import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Card, CardBody, Flex, Grid, GridItem, HStack, Image, Link, SimpleGrid, Tab, Tag, Text, VStack } from '@chakra-ui/react'
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
  const [jobData, setJobs] = useState([])

  useEffect(() => {
    jobService
      .getAllJob()
      .then((reponse) => {
        setJobs(reponse)
      })
      .catch((er) => console.log(er))
  }, [])

  return (
    <Box minHeight={2000} overflow='auto' fontFamily={'Roboto'} fontWeight={400} backgroundColor={'#f5f9fa'}>
      <HStack pt={30} justifyContent={'space-between'} w={'100%'}>
        <Breadcrumb separator={<ChevronRightIcon color='gray.500' />} fontStyle={'italic'} fontWeight={'bold'}>
          <BreadcrumbItem>
            <BreadcrumbLink href='#'>Quản lý ứng tuyển</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </HStack>
      <SimpleGrid w={'95%'} m={30} columns={{ base: 1, md: 2 }} spacing={6}>
        {jobData.map((job) => {
          return job.status === true && job.user_id === userId ? (
            <Box w={'100%'} bgColor={'white'} borderRadius={20} p={30} boxShadow={'md'}>
              <HStack w={'100%'} justifyContent={'space-between'}>
                <Text m={0} p={0} onClick={() => navigate(`/process/item/${job.id}`)} fontWeight='bold'>
                  <Link>JOB: {job.name}</Link>
                </Text>
              </HStack>
              <HStack mt={3}>
                <Text m={0} p={0}>
                  Ngày đăng: <Tag>{job.createDate}</Tag>
                </Text>
                <Text m={0} p={0}>
                  Trạng thái: <JobStateTag state={job.state} />
                </Text>
              </HStack>
              <HStack mt={3}>
                <Button size='sm' onClick={() => navigate(`/process/item/${job.id}`)} variant='outline'>
                  Chi tiết
                </Button>
                {!job.requireTest ? (
                  <Button size='sm' onClick={() => navigate(`/process/item/${job.id}/0`)} rightIcon={<Search2Icon />} variant='outline'>
                    Xem CV ứng tuyển
                  </Button>
                ) : (
                  <></>
                )}

                {job.requireTest ? (
                  <Button size='sm' onClick={() => navigate(`/process/screening/${job.id}`)} rightIcon={<CheckIcon />} variant='outline'>
                    Bài test sàng lọc
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
