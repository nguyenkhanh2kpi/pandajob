import React, { useEffect, useState } from 'react'
import { interviewService } from '../../Service/interview.service'
import { useParams } from 'react-router-dom'
import {
  Heading,
  HStack,
  SlideFade,
  VStack,
  Image,
  Text,
  Button,
  Wrap,
  WrapItem,
  Avatar,
  FormLabel,
  Input,
  Select,
  Box,
  SimpleGrid,
  Link,
  Spacer,
  Skeleton,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Card,
  CardBody,
  Icon,
  IconButton,
  Menu,
  MenuList,
  MenuItem,
  Flex,
  MenuButton,
  Badge,
  useToast,
  Tag,
  Spinner,
} from '@chakra-ui/react'
import { MarkItem } from './MarkItem'
import { interviewDetailService } from '../../Service/interviewDetail.service'
import { AiOutlineEdit, AiOutlineUsergroupAdd } from 'react-icons/ai'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { ArrowForwardIcon, ChevronRightIcon } from '@chakra-ui/icons'

export const MarkCandidate = () => {
  const toast = useToast()
  const [room, setRoom] = useState()
  const params = useParams()
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const [selected, setIdSelected] = useState(0)
  const [interviewDetail, setInterviewDetail] = useState(null)
  const [clickBox, setClockBox] = useState(false)
  const [load, setLoad] = useState(false)

  useEffect(() => {
    interviewService.getInterviewByID(accessToken, params.roomId).then((res) => setRoom(res))
  }, [params])

  useEffect(() => {
    if (selected === 0) {
      setInterviewDetail(null)
      setClockBox(false)
    } else {
      interviewDetailService.getInterviewDetailById(accessToken, selected).then((response) => {
        setInterviewDetail(response)
        setClockBox(false)
      })
    }
  }, [load, selected])

  const handleEndInterview = (roomId) => {
    interviewService
      .endInterviewById(accessToken, roomId)
      .then((response) => {
        toast({
          title: response.message,
          status: 'info',
          duration: 3000,
          isClosable: true,
        })
      })
      .catch((er) => console.log(er))
  }

  if (room === undefined) {
    return (
      <HStack minH={500} w='100%' justifyContent='center' alignItems='center'>
        <Spinner thickness='8px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='4xl' />
      </HStack>
    )
  } else
    return (
      <>
        <Box pb={100} minH={1000} overflow='auto' fontFamily={'Roboto'} fontWeight={400} backgroundColor={'#f5f9fa'}>
          <Breadcrumb separator={<ChevronRightIcon color='gray.500' />} fontStyle={'italic'} fontWeight={'bold'} pt={30}>
            <BreadcrumbItem>
              <BreadcrumbLink href='#'>Phòng phỏng vấn</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href='#'>Chi tiết</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <VStack spacing={0} ml={30} mr={30}>
            <HStack spacing={0} align={'flex-start'} w={'100%'}>
              <VStack mr={5} align={'flex-start'} w={'30%'} spacing={1}>
                <Text size={'md'} fontWeight={'bold'} m={0} p={0}>
                  Ứng viên
                </Text>
                {room.listCandidate.map((candidate) => (
                  <Box w={'100%'} key={candidate} bgColor={'white'} borderRadius={20} boxShadow={'md'} p={1}>
                    <Flex spacing='4'>
                      <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                        <Avatar name={candidate.name} src={candidate.avatar} />
                        <Box>
                          <Text m={0} p={0} fontWeight={'bold'} isTruncated maxW='275px'>
                            {candidate.name}
                          </Text>
                          <Text m={0} p={0} isTruncated maxW='230px'>
                            {candidate.email}
                          </Text>
                          <Flex>
                            <Tag m={0} colorScheme={candidate.status === 'Đã chấm' ? 'green' : 'purple'}>
                              {candidate.status}
                            </Tag>
                          </Flex>
                        </Box>
                      </Flex>
                    </Flex>
                    <VStack w={'100%'}>
                      <Button
                        onClick={() => {
                          setIdSelected(candidate.itemId)
                          setClockBox(true)
                        }}>
                        <ArrowForwardIcon />
                      </Button>
                    </VStack>
                  </Box>
                ))}
                <Button onClick={() => handleEndInterview(room.id)}>Kết thúc phỏng vấn</Button>
              </VStack>
              <VStack spacing={1} align={'flex-start'} w={'70%'}>
                <Text size={'md'} fontWeight={'bold'} m={0} p={0}>
                  Chi tiết
                </Text>
                {interviewDetail ? <MarkItem isClick={clickBox} roomId={selected} loadDetail={interviewDetail} load={load} setLoad={setLoad} /> : <></>}
              </VStack>
            </HStack>
          </VStack>
        </Box>
      </>
    )
}
