import React, { useEffect, useState } from 'react'
import { favoriteService } from '../../Service/favorite.service'
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, HStack, Icon, Image, Link, Tag, Text, Tooltip, VStack } from '@chakra-ui/react'
import { MdAttachMoney, MdEvent, MdFavorite, MdFavoriteBorder, MdLocationOn, MdVideoCall } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadJob } from '../../redux/Job-posting/Action'
import { format } from 'date-fns'
import { calendarService } from '../../Service/calendar.service'

export const JobItemInList = ({ job, wishLists, handleLike }) => {
  const navigate = useNavigate()
  const isJobInWishlist = (jobId) => {
    try {
      return wishLists.some((w) => w.jobId === jobId)
    } catch {
      return false
    }
  }
  return (
    <Box fontFamily={'Roboto'} key={job.id} borderWidth='1px' borderRadius='lg' overflow='hidden' p={2} bg='white' boxShadow='sm' _hover={{ boxShadow: 'lg' }} display='flex' alignItems='center' width='100%'>
      <Image onClick={() => navigate(`/jobDetail/${job.id}`)} src={job.image} alt={job.name} boxSize='80px' objectFit='cover' borderRadius='md' flexShrink={0} marginRight={3} />
      <VStack align='start' spacing={2} flex={1} overflow='hidden'>
        <Tooltip label={job.name} hasArrow>
          <Text name={job.id} onClick={() => navigate(`/jobDetail/${job.id}`)} m={0} p={0} fontSize='md' fontWeight='bold' isTruncated w={'190px'} whiteSpace='nowrap'>
            {job.name}
          </Text>
        </Tooltip>
        <VStack align='start' spacing={0}>
          <HStack spacing={1}>
            <Icon m={0} p={0} as={MdLocationOn} color='gray.500' />
            <Text m={0} p={0} fontSize='sm'>
              {job.location}
            </Text>
          </HStack>
          <HStack spacing={1}>
            <Icon m={0} p={0} as={MdAttachMoney} color='gray.500' />
            <Text m={0} p={0} fontSize='sm'>
              {job.salary}
            </Text>
          </HStack>
        </VStack>
        <HStack w={'100%'} spacing={1} justifyContent={'space-between'}>
          <HStack>
            <Tag colorScheme='blue'>{job.position}</Tag>
            <Tag colorScheme='green'>{job.workingForm}</Tag>
          </HStack>
          <Icon boxSize={6} onClick={() => handleLike(job.id)} as={isJobInWishlist(job.id) ? MdFavorite : MdFavoriteBorder} color='red.300' />
        </HStack>
      </VStack>
    </Box>
  )
}

export const JobItemInWishList = ({ jobId, wishLists, handleLike }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const jobList = useSelector((store) => store.job.data)
  useEffect(() => {
    dispatch(loadJob())
  }, [])
  const job = jobList.find((job) => job.id === jobId)

  //whish list
  const isJobInWishlist = (jobId) => {
    try {
      return wishLists.some((w) => w.jobId === jobId)
    } catch {
      return false
    }
  }

  if (job)
    return (
      <Box fontFamily={'Roboto'} key={job.id} borderWidth='1px' borderRadius='lg' overflow='hidden' p={2} bg='white' boxShadow='sm' _hover={{ boxShadow: 'lg' }} display='flex' alignItems='center' width='100%'>
        <Image onClick={() => navigate(`/jobDetail/${job.id}`)} src={job.image} alt={job.name} boxSize='80px' objectFit='cover' borderRadius='md' flexShrink={0} marginRight={3} />
        <VStack align='start' spacing={2} flex={1} overflow='hidden'>
          <Tooltip label={job.name} hasArrow>
            <Text onClick={() => navigate(`/jobDetail/${job.id}`)} m={0} p={0} fontSize='md' fontWeight='bold' whiteSpace='nowrap'>
              {job.name}
            </Text>
          </Tooltip>
          <VStack align='start' spacing={0}>
            <HStack spacing={1}>
              <Icon m={0} p={0} as={MdLocationOn} color='gray.500' />
              <Text m={0} p={0} fontSize='sm'>
                {job.location}
              </Text>
            </HStack>
            <HStack spacing={1}>
              <Icon m={0} p={0} as={MdAttachMoney} color='gray.500' />
              <Text m={0} p={0} fontSize='sm'>
                {job.salary}
              </Text>
            </HStack>
            <HStack spacing={1}>
              <Text m={0} p={0} fontSize='sm'>
                Đã tạo vào: {job.createDate}
              </Text>
            </HStack>
          </VStack>
          <HStack w={'100%'} spacing={1} justifyContent={'space-between'}>
            <HStack>
              <Tag colorScheme='blue'>{job.position}</Tag>
              <Tag colorScheme='green'>{job.workingForm}</Tag>
              <Tag colorScheme='yellow'>Đã cập nhật vào: {job.updateAt}</Tag>
            </HStack>
            <Icon boxSize={6} onClick={() => handleLike(job.id)} as={isJobInWishlist(job.id) ? MdFavorite : MdFavoriteBorder} color='red.300' />
          </HStack>
        </VStack>
      </Box>
    )
  else {
    return <></>
  }
}

const State = {
  RECEIVE_CV: 'RECEIVE_CV',
  SUITABLE: 'SUITABLE',
  SCHEDULE_INTERVIEW: 'SCHEDULE_INTERVIEW',
  SEND_PROPOSAL: 'SEND_PROPOSAL',
  ACCEPT: 'ACCEPT',
  REJECT: 'REJECT',
}

export const JobItemInAppliedJob = ({ jobId, appliedHistory, accessToken }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const jobList = useSelector((store) => store.job.data)
  useEffect(() => {
    dispatch(loadJob())
  }, [])
  const job = jobList.find((job) => job.id === jobId)

  const getColorSchemeForState = (state) => {
    switch (state) {
      case State.RECEIVE_CV:
        return 'gray'
      case State.SUITABLE:
        return 'blue'
      case State.SCHEDULE_INTERVIEW:
        return 'purple'
      case State.SEND_PROPOSAL:
        return 'orange'
      case State.ACCEPT:
        return 'green'
      case State.REJECT:
        return 'red'
      default:
        return 'gray'
    }
  }

  // const [calenderLocal, setcalenderLocal] = useState([])
  // useEffect(() => {
  //   calendarService
  //     .getMyCalendar(accessToken)
  //     .then((response) => {
  //       setcalenderLocal(response)
  //     })
  //     .catch((er) => console.log(er))
  // }, [])

  if (job)
    return (
      <Box fontFamily={'Roboto'} key={job.id} borderWidth='1px' borderRadius='lg' overflow='hidden' p={2} bg='white' boxShadow='sm' _hover={{ boxShadow: 'lg' }} display='flex' alignItems='center' width='100%'>
        <VStack align='start' spacing={2} flex={1} overflow='hidden'>
          <Tooltip label={job.name} hasArrow>
            <Text onClick={() => navigate(`/jobDetail/${job.id}`)} m={0} p={0} fontSize='md' fontWeight='bold' whiteSpace='nowrap'>
              {job.name}
            </Text>
          </Tooltip>
          <VStack align='start' spacing={0}>
            <HStack spacing={1}>
              <Icon m={0} p={0} as={MdLocationOn} color='gray.500' />
              <Text m={0} p={0} fontSize='sm'>
                {job.location}
              </Text>
            </HStack>
            <HStack spacing={1}>
              <Icon m={0} p={0} as={MdAttachMoney} color='gray.500' />
              <Text m={0} p={0} fontSize='sm'>
                {job.salary}
              </Text>
            </HStack>
            <HStack spacing={1}>
              <Text m={0} p={0} fontSize='sm'>
                Đã tạo vào: {job.createDate}
              </Text>
            </HStack>
          </VStack>
          <HStack w={'100%'} spacing={1} justifyContent={'space-between'}>
            <HStack>
              <Tag colorScheme='blue'>{job.position}</Tag>
              <Tag colorScheme='green'>{job.workingForm}</Tag>
              <Tag colorScheme='yellow'>Đã cập nhật vào: {job.updateAt}</Tag>
            </HStack>
          </HStack>
          <Accordion w={'100%'} allowToggle>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as='span' flex='1' textAlign='left'>
                    CV bạn đã ứng tuyển
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <HStack w={'100%'}>
                  <Box h={'300px'} w={'50%'}>
                    <iframe src={appliedHistory.cvurl} width='100%' height='600px'></iframe>
                  </Box>
                  <VStack align='flex-start' w='50%'>
                    <Text>Ngày ứng tuyển: {appliedHistory.dateApply}</Text>
                    <Text>
                      Nhà tuyển dụng xem CV: <Tag colorScheme={appliedHistory.view ? 'green' : 'red'}>{appliedHistory.view ? 'Đã xem' : 'Chưa xem'}</Tag>
                    </Text>
                    <Text>
                      Trạng thái CV: <Tag colorScheme={getColorSchemeForState(appliedHistory.state)}>{appliedHistory.state}</Tag>
                    </Text>
                  </VStack>
                </HStack>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as='span' flex='1' textAlign='left'>
                    Bài test sàng lọc
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <TestList tests={appliedHistory.testList} />
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as='span' flex='1' textAlign='left'>
                    Thông báo
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {appliedHistory.relatedNotify.length > 0 ? (
                  appliedHistory.relatedNotify
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .map((notification) => (
                      <Box w={'100%'} key={notification.id} p={1} mb={1} border='1px' borderColor='gray.200' borderRadius='md'>
                        <VStack w={'100%'} align='flex-start'>
                          <HStack w={'100%'} justifyContent={'space-between'}>
                            <Text m={0} p={0} fontWeight='bold'>
                              {notification.title}
                            </Text>
                            <Text m={0} p={0} color='gray.500'>
                              Time: {new Date(notification.createdAt).toLocaleDateString('vi-VN')}
                            </Text>
                          </HStack>
                          <Text>{notification.message}</Text>
                        </VStack>
                      </Box>
                    ))
                ) : (
                  <Text>Không có thông báo</Text>
                )}
              </AccordionPanel>
            </AccordionItem>
            {/* <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as='span' flex='1' textAlign='left'>
                    Thông tin phỏng vấn - sự kiện
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {calenderLocal?.map((item, index) => (
                  <Box key={index} p={4} mb={4} border='1px' borderColor='gray.200' borderRadius='md'>
                    <VStack align='flex-start'>
                      <HStack w={'100%'} justifyContent={'space-between'}>
                        <HStack key={index} alignItems='center' justifyContent='center'>
                          <Tag variant='subtle' colorScheme={item.type === 'EVENT' ? 'blue' : 'green'}>
                            {item.type === 'EVENT' ? 'Sự kiện' : 'Phỏng vấn'}
                          </Tag>
                          <Text m={0} p={0} fontWeight='bold'>
                            {item.title}
                          </Text>
                        </HStack>
                        <Tag>Ngày: {new Date(item.date).toLocaleDateString('vi-VN')}</Tag>
                      </HStack>

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
              </AccordionPanel>
            </AccordionItem>{' '} */}
          </Accordion>
        </VStack>
      </Box>
    )
  else {
    return <></>
  }
}

// hiện t
const getColorSchemeForType = (type) => {
  switch (type) {
    case 'MULTIPLE_CHOICE':
      return 'blue'
    case 'ESSAY':
      return 'green'
    case 'CODE':
      return 'purple'
    default:
      return 'gray'
  }
}
// Helper function to format date
const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return format(new Date(dateString), 'dd/MM/yyyy HH:mm')
}

const TestList = ({ tests }) => {
  return (
    <VStack align='flex-start' spacing={4}>
      {tests.map((test) => (
        <Box key={test.id} borderWidth='1px' borderRadius='md' p={4} w='100%'>
          <HStack w={'100%'}>
            <VStack align='flex-start' w={'60%'}>
              <Text fontWeight='bold'>
                {test.summary}(Thời gian làm bài: {test.time} phút)
              </Text>
              <Text>
                Loại bài kiểm tra: <Tag colorScheme={getColorSchemeForType(test.type)}>{test.type === 'MULTIPLE_CHOICE' ? 'Trắc nghiệm' : test.type === 'ESSAY' ? 'Tự luận' : test.type === 'CODE' ? 'Kiểm tra code' : 'Khác'}</Tag>
              </Text>
            </VStack>
            <VStack align='flex-start' w={'40%'}>
              {test.record ? (
                <Text>Đã làm vào lúc: {test.startTime}</Text>
              ) : (
                <Button colorScheme='teal' onClick={() => (window.location.href = `/code-essay/${test.id}`)}>
                  Đi đến làm bài
                </Button>
              )}
            </VStack>
          </HStack>
        </Box>
      ))}
    </VStack>
  )
}
