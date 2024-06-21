import { Box, Button, Center, Flex, Grid, HStack, Heading, Image, Spinner, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { favoriteService } from '../../Service/favorite.service'
import { JobItemInWishList } from './JobItemInList'
import { resumeService } from '../../Service/resume.service'
import { useNavigate } from 'react-router-dom'

export const FavoriteJobs = () => {
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const [recommendedJobs, setRecommendedJobs] = useState([])

  const [wishLists, setWhishList] = useState(null)
  const handleLike = (jobId) => {
    favoriteService
      .addToFavorites(jobId, accessToken)
      .then((response) => setWhishList(response.data))
      .catch((er) => console.log(er))
  }
  useEffect(() => {
    favoriteService
      .getMyWishlist(accessToken)
      .then((response) => setWhishList(response.data))
      .catch((er) => console.log(er))
  }, [])

  useEffect(() => {
    resumeService
      .findRelatedResumeByUser(accessToken)
      .then((response) => setRecommendedJobs(response.data))
      .catch((er) => console.log(er))
  }, [])

  if (!wishLists) {
    return (
      <HStack minH={800} w='100%' justifyContent='center' alignItems='center'>
        <Spinner thickness='8px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='4xl' />
      </HStack>
    )
  } else
    return (
      <HStack alignItems='flex-start' justifyContent='center' minH={1000} bgColor={'#f0f4f5'} w={'100%'}>
        <Box fontFamily={'Roboto'} w={'85%'} mt={'60px'} p={5}>
          <Grid templateColumns='7fr 3fr' gap={4}>
            <Box boxShadow={'md'} borderRadius={5} bgColor={'white'} p={4}>
              <Heading size={'md'} fontFamily={'Roboto'}>
                Việc làm đã lưu của bạn (<b>{wishLists?.length}</b> việc làm)
              </Heading>
              <Text>Xem lại danh sách những việc làm mà bạn đã lưu trước đó. Ứng tuyển ngay để không bỏ lỡ cơ hội nghề nghiệp dành cho bạn.</Text>
              <VStack spacing={3}>
                {wishLists?.map((job) => (
                  <JobItemInWishList jobId={job.jobId} wishLists={wishLists} handleLike={handleLike} />
                ))}
              </VStack>
            </Box>
            <Box boxShadow={'md'} borderRadius={5} bgColor={'white'} p={4}>
              <Heading size={'md'} fontFamily={'Roboto'}>
                Bạn có thể quan tâm
              </Heading>
              {recommendedJobs.map((job) => (
                <JobItemRecommed key={job.id} job={job} />
              ))}
            </Box>
          </Grid>
        </Box>
      </HStack>
    )
}

const JobItemRecommed = ({ job }) => {
  const navigate = useNavigate()
  const { name, position, language, location, salary, number, workingForm, sex, experience, detailLocation, image } = job
  return (
    <Box onClick={() => navigate(`/jobDetail/${job.id}`)} borderWidth='1px' borderRadius='lg' overflow='hidden' mb={4}>
      <Flex>
        <Box p={4} flex='1'>
          <Text m={0} p={0} fontWeight='bold'>
            {name}
          </Text>
          <Text m={0} p={0} color='gray.500'>
            <strong>Địa chỉ chi tiết: </strong>
            {detailLocation}
          </Text>
        </Box>
      </Flex>
    </Box>
  )
}
