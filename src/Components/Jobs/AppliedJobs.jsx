import React, { useEffect, useState } from 'react'
import { Box, Heading, VStack, HStack, Grid, Text, Link } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { cvService } from '../../Service/cv.service'
import { JobItemInAppliedJob } from './JobItemInList'

export const AppliedJobs = () => {
  const navigate = useNavigate()
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const recommendedJobs = [
    { id: 3, name: 'Job 3' },
    { id: 4, name: 'Job 4' },
    // Thêm nhiều công việc đề xuất nếu cần
  ]

  const [appliedJobs, setAppliedJobs] = useState([])

  useEffect(() => {
    cvService
      .getAllMyAppliedJobs(accessToken)
      .then((response) => setAppliedJobs(response.data))
      .catch((er) => console.log(er))
  }, [])

  return (
    <HStack alignItems='flex-start' justifyContent='center' minH={1000} bgColor={'#f0f4f5'} w={'100%'}>
      <Box fontFamily={'Roboto'} w={'85%'} mt={'60px'} p={5}>
        <Grid templateColumns='7fr 3fr' gap={4}>
          {/* Việc làm đã ứng tuyển */}
          <Box boxShadow={'md'} borderRadius={5} bgColor={'white'} p={4}>
            <Heading size={'md'} fontFamily={'Roboto'}>
              Việc làm bạn đã ứng tuyển
            </Heading>
            <VStack spacing={3} mt={3}>
              {appliedJobs.map((job) => (
                <Box key={job.jobPostingId} w='100%'>
                  <JobItemInAppliedJob jobId={job.jobPostingId} appliedHistory={job} accessToken={accessToken} />
                </Box>
              ))}
            </VStack>
          </Box>

          {/* Công việc có thể quan tâm */}
          <Box boxShadow={'md'} borderRadius={5} bgColor={'white'} p={4}>
            <Heading size={'md'} fontFamily={'Roboto'}>
              Bạn có thể quan tâm
            </Heading>
            <VStack spacing={3} mt={3}>
              {recommendedJobs.map((job) => (
                <Box key={job.id} borderWidth={1} borderRadius={5} p={4} w='100%'>
                  <Heading size={'sm'}>{job.name}</Heading>
                  <Link href={`/jobDetail/${job.id}`} color='blue.500'>
                    Xem chi tiết
                  </Link>
                </Box>
              ))}
            </VStack>
          </Box>
        </Grid>
      </Box>
    </HStack>
  )
}
