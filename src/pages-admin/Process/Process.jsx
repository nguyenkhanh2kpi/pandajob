import { Box, Image, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
} from '@chakra-ui/react'
import { jobService } from '../../Service/job.service'

const Process = () => {
  const navigate = useNavigate()
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  // const jobData = useSelector((store) => store.job.data)
  const userId = JSON.parse(localStorage.getItem('data')).data.userInfo.id
  const [jobData, setJobs] = useState([])

  useEffect(()=> {
    jobService.getAllJob()
    .then(reponse => {
      setJobs(reponse)
    })
    .catch(er => console.log(er))
  },[])

  return (
    <Box minHeight={2000} overflow='auto' fontFamily={'Montserrat'} fontWeight={400} backgroundColor={'#e9f3f5'} p={30}>
      <VStack spacing={3}>
        <Box
          boxShadow={'lg'}
          minHeight={1000}
          overflow='auto'
          p={'3%'}
          borderRadius={20}
          backgroundColor={'#FFFFFF'}
          w={'100%'}
          mb={10}>
          <Text fontWeight={'bold'} fontSize={25}>
            Your available lists job here
          </Text>
          {jobData.map((job) => {
            return job.status === true && job.user_id === userId ? (
              <Box
                boxShadow='md'
                onClick={() => navigate(`/process/item/${job.id}`)}
                mt={10}
                borderRadius={20}
                _hover={{ borderWidth: '2px' }}
                h={200}
                w={'100%'}
                p={4}
                key={job.id}>
                <Box mt='4'>
                  <Text fontSize='xl' fontWeight='semibold'>
                    {job.name}
                  </Text>
                  <Text fontSize='md' mt='2'>
                    Location: {job.location}
                  </Text>
                  <Text fontSize='md' mt='2'>
                    Number: {job.number}
                  </Text>
                </Box>
              </Box>
            ) : null
          })}
        </Box>
      </VStack>
    </Box>
  )
}

export default Process
