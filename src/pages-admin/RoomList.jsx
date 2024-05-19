import { Box, Flex, Text, Image, Button, HStack, VStack, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Card, CardBody } from '@chakra-ui/react'
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
          <Card w={'100%'}>
            <CardBody>
              <Box key={job.id}>
                <Box fontWeight='semibold' as='h4' lineHeight='tight' noOfLines={1} fontSize='20px' borderRadius='lg' pl='10px' mb='10px'>
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
            </CardBody>
          </Card>
        </HStack>
      </Link>
    )
  })

  return (
    <>
      <Box minHeight={2000} overflow='auto' fontFamily={'Montserrat'} fontWeight={400} backgroundColor={'#e9f3f5'}>
        <HStack justifyContent={'space-between'} w={'100%'}>
          <Breadcrumb pt={30}>
            <BreadcrumbItem>
              <BreadcrumbLink href='#'>Phòng họp</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Button mr={30} color='white' backgroundColor='rgb(3, 201, 215)'>
            <Link to={`/roomAdd`}> + Thêm phòng họp</Link>
          </Button>
        </HStack>
        <VStack pl={30} pr={30} spacing={3}>
          <Flex w={'100%'}>
            <Button mr={5} colorScheme='blue' variant='outline'>
              Hôm nay
            </Button>
            <Button mr={5} colorScheme='green' variant='outline'>
              Mới tạo
            </Button>
            <Button mr={5} colorScheme='yellow' variant='outline'>
              Đang tiến hành
            </Button>
            <Button mr={5} colorScheme='purple' variant='outline'>
              Kết thúc
            </Button>
            <Button mr={5} colorScheme='red' variant='outline'>
              Đã hủy
            </Button>
          </Flex>
          <Box minHeight={1000} overflow='auto' borderRadius={20} backgroundColor={'#e9f3f5'} w={'100%'}>
            {roomdatas}
          </Box>
        </VStack>
      </Box>
    </>
  )
}

export default RoomList
