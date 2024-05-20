import { Box, Flex, Text, Image, Button, VStack, Grid, GridItem, List, Breadcrumb, BreadcrumbItem, BreadcrumbLink, HStack, CardBody, Card, ListItem, ListIcon, Switch } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { BsBag } from 'react-icons/bs'
import { CiLocationOn } from 'react-icons/ci'
import { BsFillStarFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { loadJob } from '../../redux/Job-posting/Action'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { hostName, webHost } from '../../global'
import { FcFlashOn } from 'react-icons/fc'
import { MdCheckCircle, MdSettings } from 'react-icons/md'
import { ArrowUpIcon, CheckIcon, DeleteIcon, Search2Icon, StarIcon, ViewIcon } from '@chakra-ui/icons'
const AllJob = () => {
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
    // getData(typeOfProduct).then((res) => setProductArr(res));
    dispatch(loadJob())
  }, [])
  const userId = JSON.parse(localStorage.getItem('data')).data.userInfo.id
  const jobData = useSelector((store) => store.job.data)
  const jobdatas = jobData.map((job) => {
    return job.status === true && job.user_id === userId ? (
      <Box w='100%' key={job.id} mb={5}>
        <Card>
          <CardBody>
            <HStack>
              <Text fontSize='20px'>{job.name}</Text>
            </HStack>

            <List spacing={3}>
              <ListItem>
                <ListIcon as={ViewIcon} color='green.500' />
                Hiển thị <Switch size='lg' />
              </ListItem>
              <ListItem>
                <ListIcon as={StarIcon} color='green.500' />
                Chưa kích hoạt dịch vụ
              </ListItem>
              <ListItem>
                {/* <ListIcon as={MdSettings} color='green.500' />
                <Link to={`/allJob_Recruiter/jobDetail_Recruiter/${job.id}`}>Chỉnh sửa</Link> */}
                <HStack>
                  <Button rightIcon={<Search2Icon />} colorScheme='blue' variant='outline'>
                    Xem CV ứng tuyển
                  </Button>
                  <Button onClick={() => navigate(`/allJob_Recruiter/jobDetail_Recruiter/${job.id}`)} rightIcon={<MdSettings />} colorScheme='gray' variant='outline'>
                    Chỉnh sửa
                  </Button>
                  <Button onClick={() => navigate(`/process/screening/${job.id}`)} rightIcon={<CheckIcon />} colorScheme='yellow' variant='outline'>
                    Bài test sàng lọc
                  </Button>
                  <Button rightIcon={<DeleteIcon />} colorScheme='red' variant='outline' data-value={job.id} onClick={submitHandler}>
                    Xóa
                  </Button>
                </HStack>
              </ListItem>
            </List>

            {/* <Flex>
                <Box m={2} display='flex'>
                  <Button>Kinh nghiệm: {job.experience}</Button>
                </Box>
                <Box m={2} olor='blue.400'>
                  {job.status ? <Button>Active</Button> : <Button>Delete</Button>}
                </Box>
                <Box m={2} color='blue.400'>
                  <Button>Số lượng tuyển: {job.number}</Button>
                </Box>
                <Button color={'white'} bgColor={'#f280d0'} m={2} data-value={job.id} onClick={submitHandler}>
                  xóa
                </Button>
                <Button color={'white'} bgColor={'#76d6c0'} m={2} data-value={job.id}>
                  Đẩy top
                </Button>
              </Flex> */}

            <ToastContainer />
          </CardBody>
        </Card>
      </Box>
    ) : (
      <div></div>
    )
  })

  return (
    <>
      <Box minHeight={2000} overflow='auto' fontFamily={'Montserrat'} fontWeight={400} backgroundColor={'#e9f3f5'}>
        <HStack w={'97%'} justifyContent={'space-between'}>
          <Breadcrumb pt={30}>
            <BreadcrumbItem>
              <BreadcrumbLink href='/allJob_Recruiter'>Công việc của tôi</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Button ml={30} borderRadius={10} color='white' backgroundColor='rgb(3, 201, 215)'>
            <Link to={`/allJob_Recruiter/job-posting`}> + Đăng tuyển dụng</Link>
          </Button>
        </HStack>

        <Box w={'97%'} fontFamily={'Montserrat'} display='flex' justifyContent='space-between'>
          <List w={'100%'}>{jobdatas}</List>
        </Box>
      </Box>
    </>
  )
}

export default AllJob
