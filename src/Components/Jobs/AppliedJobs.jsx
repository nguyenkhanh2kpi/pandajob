import React, { useEffect, useState } from 'react'
import { Box, Heading, VStack, HStack, Grid, Text, Link, Spinner, Tag, Button, useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { cvService } from '../../Service/cv.service'
import { JobItemInAppliedJob } from './JobItemInList'
import { calendarService } from '../../Service/calendar.service'
import proposalService from '../../Service/proposal.service'

export const AppliedJobs = () => {
  const toast = useToast()
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const [appliedJobs, setAppliedJobs] = useState(null)

  useEffect(() => {
    cvService
      .getAllMyAppliedJobs(accessToken)
      .then((response) => setAppliedJobs(response.data))
      .catch((er) => console.log(er))
  }, [])

  //lịc sự kiện
  const [calenderLocal, setcalenderLocal] = useState([])
  useEffect(() => {
    calendarService
      .getMyCalendar(accessToken)
      .then((response) => {
        setcalenderLocal(response)
      })
      .catch((er) => console.log(er))
  }, [])

  //
  const [proposal, setProposal] = useState(null)
  useEffect(() => {
    proposalService
      .getMyProposals(accessToken)
      .then((response) => setProposal(response.data.data))
      .catch((er) => console.log(er))
  }, [])

  const handleAcceptProposal = (proposalId, state) => {
    proposalService
      .updateProposalState(proposalId, state, accessToken)
      .then((response) => {
        toast({
          title: response.data.message,
          status: 'info',
          duration: 3000,
          isClosable: true,
        })
      })
      .catch((er) => console.log(er))
  }

  if (!appliedJobs) {
    return (
      <HStack minH={800} w='100%' justifyContent='center' alignItems='center'>
        <Spinner thickness='8px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='4xl' />
      </HStack>
    )
  } else console.log(proposal)
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
              {appliedJobs.length > 0 ? (
                <></>
              ) : (
                <Box>
                  <Text>Bạn hiện chưa ứng tuyển công việc nào</Text>
                </Box>
              )}
            </VStack>
            <Heading mt={5} size={'md'} fontFamily={'Roboto'}>
              Đề nghị công việc
            </Heading>
            {proposal ? (
              proposal.map((p) => (
                <Box borderRadius={10} w={'100%'} borderWidth={1} p={5}>
                  <HStack w={'100%'} justifyContent={'space-between'}>
                    <VStack align={'flex-start'}>
                      <Text>Bạn có một yêu cầu công việc </Text>
                      <Text>Job: {p.jobName} </Text>
                      <Text>Lời nhắn: {p.message}</Text>
                      <Text>Ứng viên trả lời: {p.status}</Text>
                    </VStack>
                    <HStack>
                      <Button onClick={() => handleAcceptProposal(p.id, 'ACCEPT')} size='sm' colorScheme='blue'>
                        Nhận việc{' '}
                      </Button>
                      <Button onClick={() => handleAcceptProposal(p.id, 'REJECT')} size='sm'>
                        Từ chối
                      </Button>
                    </HStack>
                  </HStack>
                </Box>
              ))
            ) : (
              <Text>Bạn chưa có đề nghị nào</Text>
            )}
          </Box>

          {/* Công việc có thể quan tâm */}
          <Box boxShadow={'md'} borderRadius={5} bgColor={'white'} p={4}>
            <Heading size={'md'} fontFamily={'Roboto'}>
              Phỏng vấn và sự kiện
            </Heading>
            <VStack w={'100%'} spacing={3} mt={3}>
              {calenderLocal?.map((item, index) => (
                <Box w={'100%'} key={index} p={4} mb={4} border='1px' borderColor='gray.200' borderRadius='md'>
                  <VStack align='flex-start'>
                    <VStack align={'flex-start'} w={'100%'} justifyContent={'space-between'}>
                      <HStack key={index} alignItems='center' justifyContent='center'>
                        <Tag variant='subtle' colorScheme={item.type === 'EVENT' ? 'blue' : 'green'}>
                          {item.type === 'EVENT' ? 'Sự kiện' : 'Phỏng vấn'}
                        </Tag>
                        <Tag>Ngày: {new Date(item.date).toLocaleDateString('vi-VN')}</Tag>
                      </HStack>
                      <Text m={0} p={0} fontWeight='bold'>
                        {item.title}
                      </Text>
                    </VStack>

                    {item.time && <Text fontWeight='bold'>Thời gian cụ thể: {item.time}</Text>}
                    <Text m={0} p={0}>
                      Mô tả: {item.description}
                    </Text>
                    {item.type === 'INTERVIEW' && (
                      <Text m={0} p={0}>
                        Link Meet:{' '}
                        <Link href={item.detail.linkMeet} target='_blank'>
                          {item.detail.linkMeet}
                        </Link>
                      </Text>
                    )}
                  </VStack>
                </Box>
              ))}
            </VStack>
          </Box>
        </Grid>
      </Box>
    </HStack>
  )
}
