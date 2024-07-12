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
  const [disPlayListRooms, setDisplayRooms] = useState(listRooms)

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

  // filter
  const [filter, setFilter] = useState('all')
  const handleFilterClick = (filt) => {
    setFilter(filt)
  }

  useEffect(() => {
    if (filter === 'all') {
      setDisplayRooms(listRooms)
    } else if (filter === 'Created') {
      setDisplayRooms(listRooms.filter((roomList) => roomList.status === 'Created'))
    } else if (filter === 'Processing') {
      setDisplayRooms(listRooms.filter((roomList) => roomList.status === 'Processing'))
    } else if (filter === 'Ended') {
      setDisplayRooms(listRooms.filter((roomList) => roomList.status === 'Ended'))
    }
  }, [filter, listRooms])

  if (disPlayListRooms === undefined) {
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
  if (disPlayListRooms.length === 0) {
    return (
      <>
        <Box minH={'1000px'} overflow='auto' fontFamily={'Roboto'} fontWeight={400} backgroundColor={'#f5f9fa'}>
          <Breadcrumb separator={<ChevronRightIcon color='gray.500' />} fontStyle={'italic'} fontWeight={'bold'} pt={30}>
            <BreadcrumbItem>
              <BreadcrumbLink href='#'>Phòng phỏng vấn</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <VStack align={'flex-start'} spacing={3} ml={30} mr={30}>
            <Flex gap={2}>
              <Button bgColor={filter === 'all' ? 'black' : 'gray.200'} color={filter === 'all' ? 'white' : 'black'} size={'sm'} onClick={() => handleFilterClick('all')}>
                Tất cả
              </Button>
              <Button size={'sm'} onClick={() => handleFilterClick('Created')} bgColor={filter === 'Created' ? 'black' : 'gray.200'} color={filter === 'Created' ? 'white' : 'black'}>
                Mới tạo
              </Button>
              <Button size={'sm'} onClick={() => handleFilterClick('Processing')} bgColor={filter === 'Processing' ? 'black' : 'gray.200'} color={filter === 'Processing' ? 'white' : 'black'}>
                Đang tiến hành
              </Button>
              <Button size={'sm'} onClick={() => handleFilterClick('Ended')} bgColor={filter === 'Ended' ? 'black' : 'gray.200'} color={filter === 'Ended' ? 'white' : 'black'}>
                Đã kết thúc
              </Button>
            </Flex>
            <Text>chưa có phòng</Text>
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
            <Flex gap={2}>
              <Button bgColor={filter === 'all' ? 'black' : 'gray.200'} color={filter === 'all' ? 'white' : 'black'} size={'sm'} onClick={() => handleFilterClick('all')}>
                Tất cả
              </Button>
              <Button size={'sm'} onClick={() => handleFilterClick('Created')} bgColor={filter === 'Created' ? 'black' : 'gray.200'} color={filter === 'Created' ? 'white' : 'black'}>
                Mới tạo
              </Button>
              <Button size={'sm'} onClick={() => handleFilterClick('Processing')} bgColor={filter === 'Processing' ? 'black' : 'gray.200'} color={filter === 'Processing' ? 'white' : 'black'}>
                Đang tiến hành
              </Button>
              <Button size={'sm'} onClick={() => handleFilterClick('Ended')} bgColor={filter === 'Ended' ? 'black' : 'gray.200'} color={filter === 'Ended' ? 'white' : 'black'}>
                Đã kết thúc
              </Button>
            </Flex>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
              {disPlayListRooms.map((room) => (
                <Box bgColor={'white'} borderRadius={20} boxShadow={'md'} p={10} key={room.id} direction={{ base: 'column', sm: 'row' }} overflow='hidden' variant='outline'>
                  <Stack>
                    <Text m={0} p={0} fontWeight={'bold'}>
                      Tên phòng :{room.roomName}
                    </Text>
                    <Text fontSize={'xs'} fontStyle={'italic'} m={0} p={0}>
                      Tên công việc: {room.jobName}
                    </Text>
                    <Text fontStyle={'italic'} m={0} p={0}>
                      Trạng thái: <Tag colorScheme={getStatusColor(room.status)}>{room.status}</Tag>
                    </Text>
                    <Text fontStyle={'italic'} m={0} p={0}>
                      <Badge colorScheme='purple'> {formatDateTime(room.startDate)}</Badge>
                    </Text>
                    <Text fontStyle={'italic'} m={0} p={0}>
                      Số ứng viên: {room.listCandidate.length}
                    </Text>

                    <Button
                      onClick={() => {
                        navigate(`/mark-candidate/${room.id}`)
                      }}
                      w={'100%'}>
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

const getStatusColor = (status) => {
  switch (status) {
    case 'Created':
      return 'yellow'
    case 'Processing':
      return 'blue'
    case 'Ended':
      return 'green'
    default:
      return 'gray'
  }
}
