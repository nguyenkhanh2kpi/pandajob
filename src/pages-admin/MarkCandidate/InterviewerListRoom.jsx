import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  HStack,
  Image,
  Link,
  SimpleGrid,
  Skeleton,
  Stack,
  Tag,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { MdOutlineSupervisorAccount } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { interviewService } from '../../Service/interview.service'
import { Pie } from '../../Components-admin'

export default function InterviewerListRoom() {
  const navigate = useNavigate()
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const [listRooms, setListRoom] = useState()
  // const [listCandidate, setLiscandidate] = useState([]);

  const ecomPieChartData = [
    { x: 'chưa phỏng vấn', y: 18, text: '60%' },
    { x: 'đã phỏng vấn', y: 15, text: '40%' },
  ]

  useEffect(() => {
    interviewService
      .getAllRooms(accessToken)
      .then((res) => setListRoom(res))
      .catch((error) => console.log(error))
  }, [])

  const convertDateTime = (dateString) => {
    const dateObj = new Date(dateString)
    const formattedTime = `${String(dateObj.getHours()).padStart(2, '0')}h${String(
      dateObj.getMinutes()
    ).padStart(2, '0')}`
    const formattedDate = `${String(dateObj.getDate()).padStart(2, '0')}/${String(
      dateObj.getMonth() + 1
    ).padStart(2, '0')}/${dateObj.getFullYear()}`
    return formattedDate
  }

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
        <Box
          fontFamily={'Montserrat'}
          fontWeight={400}
          backgroundColor={'#e9f3f5'}
          p={30}
          overflow='hidden'>
          <VStack spacing={10}>
            <HStack w={'100%'} spacing={10}>
              <Box
                overflow={'hidden'}
                p={5}
                borderRadius='lg'
                backgroundColor={'#FFFFFF'}
                w={'33%'}
                h={'190px'}>
                <Text fontFamily={''} fontWeight={'black'}>
                  10 Buổi phỏng vấn
                </Text>
                <Pie
                  id='pie-chart'
                  data={ecomPieChartData}
                  legendVisiblity={false}
                  height='160px'
                />
              </Box>
              <Box p={5} borderRadius='lg' backgroundColor={'#FFFFFF'} w={'33%'} h={'190px'}>
                <Text fontWeight={'black'}>30 ứng viên</Text>
              </Box>
              <Box p={5} borderRadius='lg' backgroundColor={'#FFFFFF'} w={'33%'} h={'190px'}>
                <Text fontWeight={'black'}>10 Đã phỏng vấn</Text>
                <Text>Các ứng viên</Text>
                <AvatarGroup m={1} size='md' max={4}>
                  {listRooms.map((room) => (
                    <div key={room.id}>
                      {room.listCandidate.map((candidate) => (
                        <Avatar
                          key={candidate.itemId}
                          name={candidate.name ? candidate.name : candidate.email}
                          src={candidate.avatar}
                        />
                      ))}
                    </div>
                  ))}
                </AvatarGroup>
                <Button h={10} color={'white'} backgroundColor={'rgb(3, 201, 215)'} m={1}>
                  Xem tất cả
                </Button>
              </Box>
            </HStack>

            <Text pl={5} fontWeight={'black'} w={'100%'}>
              Các buổi phỏng vấn
            </Text>

            <Box
              borderRadius='lg'
              backgroundColor={'#e9f3f5'}
              w={'100%'}
              h={'500px'}
              overflow={'auto'}>
              <SimpleGrid columns={3} spacing={10}>
                {/* box */}
                {listRooms.map((room) => (
                  <Box
                    p={4}
                    overflow={'hidden'}
                    borderRadius={10}
                    backgroundColor={'#ffffff'}
                    height='250px'>
                    <HStack justifyContent={'space-between'}>
                      <HStack>
                        <Image
                          boxSize='100px'
                          borderRadius={10}
                          src='https://www.peninsulapersonnel.com.au/wp-content/uploads/2020/09/Best-HR-Interview-1.png'
                          alt='Dan Abramov'
                        />
                        <VStack>
                          <Text w={'100%'} fontWeight={'black'} m={2}>
                            {room.roomName}
                          </Text>
                          <Text w={'100%'} m={2}>
                            {room.roomDescription}
                          </Text>
                        </VStack>
                      </HStack>
                      <Button variant='outline' colorScheme='teal' size='xs'>
                        {room.status}
                      </Button>
                    </HStack>
                    <HStack mt={5} justifyContent={'space-between'}>
                      <Tag p={2} w={'50%'}>
                        Start Date
                        <br />
                        {convertDateTime(room.startDate)}
                      </Tag>
                      <Tag p={2} w={'50%'}>
                        Candidates
                        <br />
                        {room.listCandidate.length}
                      </Tag>
                    </HStack>
                    <Button
                      color='white'
                      onClick={() => {
                        navigate(`/mark-candidate/${room.id}`)
                      }}
                      w={'100%'}
                      mt={2}
                      backgroundColor={'rgb(3, 201, 215)'}>
                      Xem thông tin
                    </Button>
                  </Box>
                ))}
                {/*end box */}
              </SimpleGrid>
            </Box>
          </VStack>
        </Box>
      </>
    )
}
