import { Box, Flex, Text, Image, Button, VStack } from '@chakra-ui/react'
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
const AllJob = () => {
  const navigate = useNavigate()
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const submitHandler = async (e) => {
    e.preventDefault()
    const id = e.currentTarget.getAttribute('data-value')

    console.log('bam dung r', accessToken)

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
      <Box borderRadius={20} key={job.id} mt='50px' h={300} boxShadow={'lg'} mb='30px' p='20px'>
        <Link to={`/allJob_Recruiter/jobDetail_Recruiter/${job.id}`}>
          <Text fontSize='20px'>{job.name}</Text>
          <Image maxH={120} src={`${job.image}`} />
          <Flex mt={10}>
            <Box display='flex' mr='20px'>
              <Button>Kinh nghiệm: {job.experience}</Button>
            </Box>
            <Box mr='20px' color='blue.400'>
              {job.status ? <Button>Active</Button> : <Button>Delete</Button>}
            </Box>
            <Box mr='20px' color='blue.400'>
              <Button>Số lượng tuyển: {job.number}</Button>
            </Box>

            <Button data-value={job.id} onClick={submitHandler}>
              delete
            </Button>
          </Flex>
        </Link>

        <ToastContainer />
      </Box>
    ) : (
      <div></div>
    )
  })

  return (
    <>
      <Box minHeight={2000} overflow='auto' fontFamily={'Montserrat'} fontWeight={400} backgroundColor={'#e9f3f5'} p={30}>
        <VStack spacing={3}>
          <Box minHeight={1000} overflow='auto' p={'3%'} borderRadius={20} backgroundColor={'#FFFFFF'} w={'100%'} mb={10}>
            <Box fontFamily={'Montserrat'} fontWeight={400} ml='10' mt='20px' width='60%' fontSize='20px' mb='-35px'>
              <Button borderRadius={10} mt={10} color='white' backgroundColor='rgb(3, 201, 215)'>
                <Link to={`/job-posting`}> + Đăng tuyển dụng</Link>
              </Button>
            </Box>
            <Box fontFamily={'Montserrat'} fontWeight={400} display='flex' justifyContent='space-between'>
              <Box ml='10' width='60%'>
                {jobdatas}
              </Box>
            </Box>
          </Box>
        </VStack>
      </Box>
    </>
  )
}

export default AllJob
