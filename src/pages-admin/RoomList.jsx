import { Box, Flex, Text, Image, Button, HStack, VStack, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Card, CardBody, List, ListItem, ListIcon, Switch, Badge, AvatarGroup, Avatar, Select, Input, Icon, InputGroup, InputRightAddon, Grid, GridItem, Tag } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { BsBag } from 'react-icons/bs'
import { CiLocationOn } from 'react-icons/ci'
import { BsFillStarFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { loadRoom } from '../redux/Room/Action'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { hostName } from '../global'
import { CheckIcon, ChevronRightIcon, DeleteIcon, Search2Icon, SearchIcon, StarIcon, ViewIcon } from '@chakra-ui/icons'
import { MdSettings } from 'react-icons/md'
const RoomList = () => {
  const navigate = useNavigate()
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  // const submitHandler = async (e) => {
  //   e.preventDefault()
  //   const id = e.currentTarget.getAttribute('data-value')
  //   try {
  //     let data = ''
  //     let config = {
  //       method: 'delete',
  //       maxBodyLength: Infinity,
  //       url: `${hostName}/job-posting/${id}`,
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //       data: data,
  //     }

  //     axios
  //       .request(config)
  //       .then((response) => {})
  //       .catch((error) => {
  //         console.log(error)
  //         toast.error('Delete Failed', {
  //           position: 'top-center',
  //         })
  //       })

  //     toast.success('Delete Successfully', {
  //       position: 'top-center',
  //     })
  //     navigate('/allJob_Recruiter')
  //   } catch (error) {}
  // }
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadRoom())
  }, [])

  const roomList = useSelector((store) => store.room.data)
  const [displayRooms, setDisplayRooms] = useState(roomList)

  const roomdatas = displayRooms.map((job) => {
    return (
      <Box w={'100%'} bgColor={'white'} boxShadow={'md'} borderRadius={20} p='20px'>
        <HStack justifyContent={'space-between'}>
          <Text noOfLines={1} m={0} p={0} fontWeight={'bold'}>
            {job.roomName} - {job.jobName}
          </Text>
        </HStack>
        <AvatarGroup size='md' max={2}>
          {job.listCandidate.map((can) => (
            <Avatar name={can.name} src={can.avatar} />
          ))}
          {job.listInterviewer.map((intv) => (
            <Avatar name={intv.fullName} src={intv.avatar} />
          ))}
        </AvatarGroup>
        <Text mt={3}>
          Trạng thái <Tag colorScheme={getStatusColor(job.status)}>{job.status}</Tag>
        </Text>
        <Text>
          Thời gian <Tag colorScheme='blue'>{job.startDate}</Tag>
        </Text>
        <HStack justifyContent={'space-between'} w={'100%'}>
          <Box></Box>
          <Button onClick={() => navigate(`/roomList/addCandidate/${job.jobPostId}/${job.id}`)} rightIcon={<MdSettings />} colorScheme='gray' variant='outline'>
            Chỉnh sửa
          </Button>
        </HStack>
      </Box>
    )
  })

  // filter
  const [filter, setFilter] = useState('all')
  const handleFilterClick = (filt) => {
    setFilter(filt)
  }

  useEffect(() => {
    if (filter === 'all') {
      setDisplayRooms(roomList)
    } else if (filter === 'Created') {
      setDisplayRooms(roomList.filter((roomList) => roomList.status === 'Created'))
    } else if (filter === 'Processing') {
      setDisplayRooms(roomList.filter((roomList) => roomList.status === 'Processing'))
    } else if (filter === 'Ended') {
      setDisplayRooms(roomList.filter((roomList) => roomList.status === 'Ended'))
    }
  }, [filter])

  return (
    <>
      <Box minHeight={2000} overflow='auto' fontFamily={'Roboto'} fontWeight={400} backgroundColor={'#f5f9fa'}>
        <HStack justifyContent={'space-between'} w={'100%'}>
          <Breadcrumb separator={<ChevronRightIcon color='gray.500' />} fontStyle={'italic'} fontWeight={'bold'} pt={30}>
            <BreadcrumbItem>
              <BreadcrumbLink href='#'>Phòng họp</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Button size={'sm'} mr={30} color='white' backgroundColor='rgb(3, 201, 215)'>
            <Link to={`/roomList/roomAdd`}> + Thêm phòng họp</Link>
          </Button>
        </HStack>
        <VStack mb={10} align={'flex-start'} spacing={3} ml={30} mr={30}>
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
        </VStack>
        <VStack align={'flex-start'} pl={30} pr={30} spacing={3}>
          {/* <Flex gap={2} fontSize={'sm'}>
            <Select fontSize={'sm'} bgColor={'white'} placeholder='Tất cả'>
              <option value='Created'>Created</option>
              <option value='Processing'>Processing</option>
              <option value='Ended'>Ended</option>
            </Select>
            <Select fontSize={'sm'} bgColor={'white'} placeholder='Công việc'></Select>
          </Flex> */}

          <Box minHeight={1000} overflow='auto' backgroundColor={'#f5f9fa'} w={'100%'}>
            <VStack w={'100%'}>
              {roomdatas}
              {displayRooms.length == 0 ? <Text>Hiện chưa có phòng nào</Text> : <></>}
            </VStack>
          </Box>
        </VStack>
      </Box>
    </>
  )
}

export default RoomList

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
