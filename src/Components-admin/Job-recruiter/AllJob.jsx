import { Box, Flex, Text, Image, Button, VStack, Grid, GridItem, List, Breadcrumb, BreadcrumbItem, BreadcrumbLink, HStack, CardBody, Card, ListItem, ListIcon, Switch, Select, Icon, Spinner, Tag, useToast, SimpleGrid, Avatar } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { BsBag } from 'react-icons/bs'
import { CiLocationOn } from 'react-icons/ci'
import { BsFillStarFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { loadJob } from '../../redux/Job-posting/Action'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { hostName, webHost } from '../../global'
import { FcFlashOn } from 'react-icons/fc'
import { MdCheckCircle, MdSettings } from 'react-icons/md'
import { ArrowUpIcon, CheckIcon, ChevronRightIcon, DeleteIcon, Search2Icon, StarIcon, ViewIcon } from '@chakra-ui/icons'
import { ConfirmDeleteAJob } from './ConfirmDeleteAJob'
import { jobService } from '../../Service/job.service'

export const State = {
  CREATE: 'Tạo',
  ON: 'Mở nhận CV',
  PAUSE: 'Tạm dừng',
  END: 'Kết thúc',
}

const AllJob = () => {
  const toast = useToast()
  const navigate = useNavigate()
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const [load, setLoad] = useState(false)
  const submitHandler = async (jobId) => {
    try {
      let data = ''
      let config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: `${hostName}/job-posting/${jobId}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        data: data,
      }

      await axios
        .request(config)
        .then((response) => {
          toast({
            title: 'Job',
            description: response.data.message,
            status: 'info',
            duration: 3000,
            isClosable: true,
          })
        })
        .catch((error) => {
          console.log(error)
          toast({
            title: 'Job',
            description: 'Đã có lỗi xảy ra',
            status: 'eror',
            duration: 3000,
            isClosable: true,
          })
        })
        .finally(() => setLoad(!load))
    } catch (error) {
      toast({
        title: 'Job',
        description: 'Đã có lỗi xảy ra',
        status: 'eror',
        duration: 3000,
        isClosable: true,
      })
    }
  }
  const dispatch = useDispatch()
  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(loadJob())
  }, [load])

  const userId = JSON.parse(localStorage.getItem('data')).data.userInfo.id
  const jobData = useSelector((store) => store.job.data)
  const jobdatas = jobData?.map((job) => {
    return job.status === true && job.user_id === userId ? (
      <Box w='100%' key={job.id} mb={5}>
        <Box w='100%' bgColor={'white'} borderRadius={20} boxShadow={'md'} p={8}>
          <HStack w={'100%'}>
            <VStack alignItems={'flex-start'} w={'70%'}>
              <Text noOfLines={1} m={0} p={0} fontWeight={'bold'}>
                {job.name}
              </Text>
              <Text m={0} p={0}>
                Trạng thái<Tag colorScheme='blue'>{State[job.state]}</Tag>
              </Text>
              <Text m={0} p={0}>
                Áp dụng vip: {job.isVip ? <Tag colorScheme='green'>Áp dụng vip</Tag> : <Tag colorScheme='yellow'>No Vip</Tag>}{' '}
              </Text>
              <Text noOfLines={1} m={0} p={0} size={'xs'} fontStyle={'italic'}>
                Ngày đăng: <Tag>{job.createDate}</Tag>
              </Text>
              <Text noOfLines={1} m={0} p={0} size={'xs'} fontStyle={'italic'}>
                Cập nhật:<Tag>{job.updateAt}</Tag>
              </Text>
            </VStack>
            <Avatar borderRadius={20} size='xl' name={job.nam} src={job.image} />{' '}
          </HStack>

          <HStack mt={5} w={'100%'} justifyContent={'flex-end'}>
            <Button size='sm' onClick={() => navigate(`/allJob_Recruiter/jobDetail_Recruiter/${job.id}`)} rightIcon={<MdSettings />} colorScheme='gray' variant='outline'>
              Cập nhật
            </Button>

            <ConfirmDeleteAJob job={job} onComfirm={submitHandler} />
          </HStack>
        </Box>
      </Box>
    ) : (
      <></>
    )
  })

  if (jobData === undefined || jobData === null) {
    return (
      <HStack minH={500} w='100%' justifyContent='center' alignItems='center'>
        <Spinner thickness='8px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='4xl' />
      </HStack>
    )
  }

  if (jobData.length === 0) {
    return (
      <Box minHeight={2000} overflow='auto' fontFamily={'Roboto'} fontWeight={400} backgroundColor={'#f5f9fa'}>
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

        <Box w={'97%'} fontFamily={'Roboto'} display='flex' justifyContent='space-between'>
          <Text ml={30}>Bạn hiện chưa có bài đăng nào</Text>
        </Box>
      </Box>
    )
  } else {
    return (
      <>
        <Box minHeight={2000} overflow='auto' fontFamily={'Roboto'} fontWeight={400} backgroundColor={'#f5f9fa'}>
          <HStack w={'97%'} justifyContent={'space-between'}>
            <Breadcrumb separator={<ChevronRightIcon color='gray.500' />} fontStyle={'italic'} fontWeight={'bold'} pt={30}>
              <BreadcrumbItem>
                <BreadcrumbLink href='/allJob_Recruiter'>Công việc của tôi</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
            <Button size={'sm'} ml={30} borderRadius={10} color='white' backgroundColor='rgb(3, 201, 215)'>
              <Link to={`/allJob_Recruiter/job-posting`}> + Đăng tuyển dụng</Link>
            </Button>
          </HStack>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={5} p={8}>
            {jobdatas}
          </SimpleGrid>
        </Box>
      </>
    )
  }
}

export default AllJob
