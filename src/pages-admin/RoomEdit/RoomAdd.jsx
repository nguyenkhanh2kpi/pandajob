import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './style3.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { loadJob } from '../../redux/Job-posting/Action'
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, FormControl, FormLabel, HStack, Heading, Image, Input, Link, Select, Text, VStack } from '@chakra-ui/react'
import { hostName } from '../../global'
import { ChevronRightIcon } from '@chakra-ui/icons'
const meetLinkPattern = /^https:\/\/meet\.google\.com\/[a-zA-Z0-9-]+$/
const RoomAdd = () => {
  const userId = JSON.parse(localStorage.getItem('data')).data.userInfo.id
  const dispatch = useDispatch()
  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(loadJob())
  }, [])
  const data = useSelector((store) => store.job.data)
  const navigate = useNavigate()
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const [jobName, setJObName] = useState('')
  const [roomName, setRoomName] = useState('')
  const [roomSkill, setRoomSkill] = useState('')
  const [roomDescription, setRoomDescription] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [linkmeet, setLinkmeet] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (jobName === '') {
      toast.warning('Job is required!', {
        position: 'top-center',
      })
    } else if (roomName === '') {
      toast.warning('room Name is required!', {
        position: 'top-center',
      })
    } else if (roomDescription === '') {
      toast.error('room Description is required!', {
        position: 'top-center',
      })
    } else if (startDate === '') {
      toast.error('start Date is required!', {
        position: 'top-center',
      })
    } else if (endDate === '') {
      toast.error('end Date is required!', {
        position: 'top-center',
      })
    } 
    // else if (!meetLinkPattern.test(linkmeet)) {
    //   toast.error('link không hợp lệ!', {
    //     position: 'top-center',
    //   })
    // } 
    else if (startDate >= endDate) {
      toast.error('Start date should be before the end date', {
        position: 'top-center',
      })
    } else {
      try {
        let data = JSON.stringify({
          jobPostId: jobName,
          roomName: roomName,
          roomSkill: '',
          roomDescription: roomDescription,
          startDate: startDate,
          endDate: endDate,
          linkmeet: linkmeet,
        })

        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: `${hostName}/interview/create-interview`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          data: data,
        }

        axios
          .request(config)
          .then((response) => {
            console.log('haha')
          })
          .catch((error) => {
            console.log(error)
            toast.error('Upload Room Failed', {
              position: 'top-center',
            })
          })

        toast.success('Upload Room Successfuly', {
          position: 'top-center',
        })
        navigate('/roomList')
      } catch (error) {}
    }
  }

  return (
    <Box minHeight={2000} overflow='auto' fontFamily='Roboto' fontWeight={400} backgroundColor='#f5f9fa'>
      <Breadcrumb separator={<ChevronRightIcon color='gray.500' />} fontStyle={'italic'} fontWeight={'bold'} pt={30}>
        <BreadcrumbItem>
          <BreadcrumbLink href='/roomList'>Phòng họp</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href='#'>Thêm phòng họp</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <VStack align={'flex-start'} ml={30} mr={30} spacing={3}>
        <Box bgColor={'white'} w={'50%'} p={'30px'} boxShadow={'md'} borderRadius={20}>
          <FormLabel htmlFor='name'>Công việc</FormLabel>
          <Select
            borderColor='#8292b4'
            placeholder='Tên công việc'
            backgroundColor='#ffffff'
            mt='10px'
            mb='10px'
            onChange={(e) => {
              setJObName(e.target.value)
            }}>
            {data
              .filter((job) => job.status === true && job.user_id === userId)
              .map((i) => {
                return (
                  <option key={i.id} value={i.id}>
                    {i.name}
                  </option>
                )
              })}
          </Select>

          <FormLabel htmlFor='position'>Meeting name</FormLabel>
          <Input type='text' onChange={(e) => setRoomName(e.target.value)} name='position' id='position' />

          <FormLabel htmlFor='position'>Mô tả</FormLabel>
          <Input type='text' onChange={(e) => setRoomDescription(e.target.value)} name='position' id='position' />

          <FormLabel htmlFor='position'>Thời gian</FormLabel>
          <HStack>
            <Input onChange={(e) => setStartDate(e.target.value)} name='startDate' backgroundColor='#FFFFFF' type='datetime-local' />
            <Text> {'  '}to </Text>
            <Input onChange={(e) => setEndDate(e.target.value)} name='endDate' backgroundColor='#FFFFFF' type='datetime-local' />
          </HStack>

          <FormLabel hidden htmlFor='position'>Meet Link</FormLabel>
          <Input hidden type='text' onChange={(e) => setLinkmeet(e.target.value)} name='position' id='position' />

          <HStack justifyContent={'space-between'}>
            <Box></Box>
            <Button w={200} mt={30} color='white' mb={10} backgroundColor='rgb(3, 201, 215)' type='submit' onClick={handleSubmit}>
              <Link>Lưu</Link>
            </Button>
          </HStack>

          <ToastContainer />
        </Box>
      </VStack>
    </Box>
  )
}

export default RoomAdd
