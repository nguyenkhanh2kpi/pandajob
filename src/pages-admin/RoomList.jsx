import { Box, Flex, Text, Image, Button, HStack, VStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { BsBag } from 'react-icons/bs'
import { CiLocationOn } from 'react-icons/ci'
import { BsFillStarFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { loadRoom } from '../redux/Room/Action'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { hostName } from '../global'
const RoomList = () => {
  const navigate = useNavigate()
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const submitHandler = async (e) => {
    e.preventDefault()
    const id = e.currentTarget.getAttribute('data-value')
    try {
      let data = ''
      let config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: `${hostName}/job-posting/${id}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        data: data,
      }

      axios
        .request(config)
        .then((response) => {})
        .catch((error) => {
          console.log(error)
          toast.error('Delete Failed', {
            position: 'top-center',
          })
        })

      toast.success('Delete Successfully', {
        position: 'top-center',
      })
      navigate('/allJob_Recruiter')
    } catch (error) {}
  }
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadRoom())
  }, [])

  const format = (endDateString) => {
    const endDate = new Date(endDateString)

    if (isNaN(endDate)) {
      return 'Invalid date'
    }

    const formattedEndDate = endDate.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    })

    return formattedEndDate
  }
  const roomList = useSelector((store) => store.room.data)
  const roomdatas = roomList.map((job) => {
    return (
      <Link to={`/addCandidate/${job.jobPostId}/${job.id}`}>
        <HStack fontFamily={'Montserrat'} fontWeight={400} mb='30px' mt='20px' w={'100%'} backgroundColor={'#FFFFFF'} borderRadius={20}>
          <Box borderRadius={20} h='100%' key={job.id} w='100%' boxShadow={'lg'} p='20px 20px 0 20px'>
            <Box pt='10px' fontWeight='semibold' as='h4' lineHeight='tight' noOfLines={1} pb='10px' fontSize='20px' borderRadius='lg' pl='10px' mb='10px'>
              Tên phòng : {job.roomName} - {job.jobName}
            </Box>
            <Image style={{ width: '80px' }} src='https://cdn-icons-png.flaticon.com/512/5961/5961660.png' />
            <br></br>
            <Flex>
              <Box display='flex' mr='50px' mb='15px'>
                <Text ml='10px'> Mô tả : {job.roomDescription}</Text>
              </Box>
            </Flex>
            <Button> {format(job.endDate)} </Button>
            <Button ml={2} style={{ backgroundColor: '#00FF00' }}>
              {job.listCandidate.length} người tham gia{' '}
            </Button>
            <Button ml={2} style={{ backgroundColor: '#FFFF00' }}>
              {job.listInterviewer.length} người phỏng vấn{' '}
            </Button>
            <Button ml={2} color={'white'} backgroundColor={'green'}>
              {job.status}
            </Button>
            {/* <Button data-value={job.id}>delete</Button> */}

            <Flex style={{ marginTop: '40px' }}>
              <Box display='flex' mr='50px'></Box>
              {/* <Button >  <Link to={`/addCandidate/${job.jobPostId}/${job.id}`}>Thêm</Link> </Button> */}
            </Flex>
            <ToastContainer />
          </Box>
        </HStack>
      </Link>
    )
  })

  return (
    <>
      <Box minHeight={2000} overflow='auto' fontFamily={'Montserrat'} fontWeight={400} backgroundColor={'#e9f3f5'} p={30}>
        <VStack spacing={3}>
          <Box minHeight={1000} overflow='auto' p={'3%'} borderRadius={20} backgroundColor={'#FFFFFF'} w={'100%'} mb={10}>
            <Button mt={10} ml={'5%'} color='white' backgroundColor='rgb(3, 201, 215)'>
              <Link to={`/roomAdd`}> + Thêm phòng họp</Link>
            </Button>

            <Box borderRadius={20} boxShadow={'lg'} justifyContent='space-between' ml='5%' width='90%' mr={'10%'}>
              {roomdatas}
            </Box>
          </Box>
        </VStack>
      </Box>
    </>
  )
}

export default RoomList
