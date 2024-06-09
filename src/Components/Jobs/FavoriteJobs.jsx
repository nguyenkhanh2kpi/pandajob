import { Box, Center, Grid, HStack, Heading, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { favoriteService } from '../../Service/favorite.service'
import { JobItemInWishList } from './JobItemInList'

export const FavoriteJobs = () => {
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const recommendedJobs = [
    // Dummy recommended jobs data
    { id: 3, name: 'Job 3' },
    { id: 4, name: 'Job 4' },
    // Add more recommended jobs as needed
  ]

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
              <div key={job.id}>{job.name}</div>
            ))}
          </Box>
        </Grid>
      </Box>
    </HStack>
  )
}
