import { Avatar, AvatarGroup, Badge, Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Card, CardBody, CardFooter, Flex, Grid, GridItem, HStack, Heading, Icon, Image, Link, List, ListIcon, ListItem, SimpleGrid, Skeleton, Stack, Tag, Text, VStack, Wrap, WrapItem } from '@chakra-ui/react'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { MdCheckCircle } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { interviewService } from '../../Service/interview.service'
import { AiOutlineUsergroupAdd } from 'react-icons/ai'
import { ChevronRightIcon } from '@chakra-ui/icons'

function formatDateTime(isoString) {
  const date = new Date(isoString)
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }
  return date.toLocaleString('vi-VN', options)
}

export default function InterviewerListRoom() {
  const navigate = useNavigate()
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const [listRooms, setListRoom] = useState()

  useEffect(() => {
    interviewService
      .getAllRooms(accessToken)
      .then((res) => setListRoom(res))
      .catch((error) => console.log(error))
  }, [])

  const countCandidates = listRooms
    ? listRooms.reduce((acc, interview) => {
        return acc + interview.listCandidate.length
      }, 0)
    : 0
  const countInterviewedCandidates = listRooms
    ? listRooms.reduce((acc, interview) => {
        const interviewedCandidates = interview.listCandidate.filter((candidate) => candidate.status === 'Đã chấm').length
        return acc + interviewedCandidates
      }, 0)
    : 0
  const candidates = listRooms ? listRooms.flatMap((interview) => interview.listCandidate) : 0

  const [filter, setFilter] = useState('all')
  const handleFilterClick = () => {}

  if (listRooms === undefined) {
    return (
      <>
        <Box backgroundColor={'#e9f3f5'} p={30} overflow='hidden'>
          <VStack spacing={10}>
            <Skeleton w={'70%'}>
              <div>contents wrapped</div>
              <div>won't be visible</div>
            </Skeleton>
            <Skeleton h={300} w={'70%'}>
              <div>contents wrapped</div>
              <div>won't be visible</div>
            </Skeleton>
            <Skeleton w={'70%'}>
              <div>contents wrapped</div>
              <div>won't be visible</div>
            </Skeleton>
            <Skeleton h={300} w={'70%'}>
              <div>contents wrapped</div>
              <div>won't be visible</div>
            </Skeleton>
            <Skeleton w={'70%'}>
              <div>contents wrapped</div>
              <div>won't be visible</div>
            </Skeleton>
          </VStack>
        </Box>
      </>
    )
  }
  if (listRooms.length === 0) {
    return (
      <>
        <Box backgroundColor={'#e9f3f5'} p={30} overflow='hidden'>
          <VStack spacing={10}>
            <Text>No interview room</Text>
          </VStack>
        </Box>
      </>
    )
  } else
    return (
      <>
        <Box minH={'1000px'} overflow='auto' fontFamily={'Roboto'} fontWeight={400} backgroundColor={'#f5f9fa'}>
          <Breadcrumb separator={<ChevronRightIcon color='gray.500' />} fontStyle={'italic'} fontWeight={'bold'} pt={30}>
            <BreadcrumbItem>
              <BreadcrumbLink href='#'>Phòng phỏng vấn</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <VStack align={'flex-start'} spacing={3} ml={30} mr={30}>
            <Box w={'50%'} bgColor={'white'} borderRadius={20} boxShadow={'md'} p={10}>
              <Text fontWeight='bold'>{countInterviewedCandidates} Đã phỏng vấn</Text>
              <Text fontWeight='bold'>{countCandidates - countInterviewedCandidates} Chưa phỏng vấn</Text>
              <Text fontWeight='bold'>{listRooms.length} buổi phỏng vấn</Text>
              <Text fontWeight='bold'>{countCandidates} ứng viên</Text>
              <AvatarGroup size='md' max={5}>
                {candidates.map((candidate) => (
                  <Avatar key={candidate.candidateId} name={candidate.name} src={candidate.avatar} />
                ))}
              </AvatarGroup>
            </Box>
            <Flex mt={10} gap={2}>
              <Button bgColor={filter === 'all' ? 'black' : 'gray.200'} color={filter === 'all' ? 'white' : 'black'} size={'sm'} onClick={() => handleFilterClick('all')}>
                Tất cả
              </Button>
              <Button size={'sm'} onClick={() => handleFilterClick('not-viewed')} bgColor={filter === 'not-viewed' ? 'black' : 'gray.200'} color={filter === 'not-viewed' ? 'white' : 'black'}>
                Đang mở
              </Button>
              <Button size={'sm'} onClick={() => handleFilterClick('viewed')} bgColor={filter === 'viewed' ? 'black' : 'gray.200'} color={filter === 'viewed' ? 'white' : 'black'}>
                Đã kết thúc
              </Button>
            </Flex>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
              {listRooms.map((room) => (
                <Box bgColor={'white'} borderRadius={20} boxShadow={'md'} p={10} key={room.id} direction={{ base: 'column', sm: 'row' }} overflow='hidden' variant='outline'>
                  <Stack>
                    <Text m={0} p={0} fontWeight={'bold'}>
                      Tên phòng :{room.roomName}
                    </Text>
                    <Text m={0} p={0}>
                      Tên công việc: {room.jobName}
                    </Text>
                    <Text m={0} p={0}>
                      Trạng thái: <Badge>{room.status}</Badge>
                    </Text>
                    <Text m={0} p={0}>
                      <Badge colorScheme='purple'> {formatDateTime(room.startDate)}</Badge>
                    </Text>
                    <Text m={0} p={0}>
                      Số ứng viên: {room.listCandidate.length}
                    </Text>

                    <Button
                      color='white'
                      onClick={() => {
                        navigate(`/mark-candidate/${room.id}`)
                      }}
                      w={'100%'}
                      backgroundColor={'rgb(3, 201, 215)'}>
                      Đi đến phòng
                    </Button>
                  </Stack>
                </Box>
              ))}
            </SimpleGrid>
          </VStack>
        </Box>
      </>
    )
}
