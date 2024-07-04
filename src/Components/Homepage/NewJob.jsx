import { Badge, Box, Button, Card, CardBody, CardFooter, Center, Grid, GridItem, HStack, Heading, Icon, Image, Link, Skeleton, Stack, Tag, Text, Tooltip, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { AiOutlineAlert } from 'react-icons/ai'
import { dataService } from '../../Service/data.service'
import { useNavigate } from 'react-router-dom'
import { MdAttachMoney, MdEvent, MdFavorite, MdFavoriteBorder, MdLocationOn, MdVideoCall } from 'react-icons/md'

export default function NewJob() {
  const navigate = useNavigate()
  const accessToken = localStorage.getItem('data') ? localStorage.getItem('data').access_token : null

  useEffect(() => {
    dataService
      .postRelationJobJava(keyWords ? keyWords : '')
      .then((response) => setFilterJob(response.data))
      .catch((er) => console.log('new job', er))
  }, [accessToken])

  let storedData = localStorage.getItem('keyw')
  const keyWords = JSON.parse(storedData).keyw

  const [filterJob, setFilterJob] = useState([])

  return (
    <VStack p={5} fontFamily={'Roboto'} w={'100%'}>
      <Box w={'100%'}>
        <HStack w={'100%'} justifyContent={'space-between'}>
          <HStack alignItems='center' spacing={4}>
            <Icon as={AiOutlineAlert} boxSize={7} p={1} borderRadius='full' />
            <Text fontWeight={'bold'} m={0}>
              Công việc gợi ý
            </Text>
          </HStack>

          <Link onClick={() => navigate('/jobpage')}>Xem tất cả</Link>
        </HStack>

        <Grid w={'100%'} templateColumns={['repeat(1, 1fr)', 'repeat(3, 1fr)']} gap={6}>
          {filterJob.length > 0 ? (
            <>
              {filterJob.map((job) => (
                <JobItemInList job={job} wishLists={[]} handleLike={() => {}} />
              ))}
            </>
          ) : (
            <SkeletonCard />
          )}
        </Grid>
      </Box>
    </VStack>
  )
}

const SkeletonCard = () => {
  const skeletonArray = Array.from({ length: 12 })

  return (
    <>
      {skeletonArray.map((_, index) => (
        <Card key={index} p={2} h={[150, 100]} direction={{ base: 'column', sm: 'row' }} overflow='hidden' variant='outline' mb={4}>
          <Skeleton borderWidth={1} borderRadius={10} w={[120, 90]} />
          <Stack>
            <CardBody>
              <Text isTruncated maxW='220px'>
                <Skeleton w={300} height='20px' />
              </Text>
              <HStack>
                <Skeleton w={100} height='20px' />
                <Skeleton w={100} height='20px' />
              </HStack>
            </CardBody>
          </Stack>
        </Card>
      ))}
    </>
  )
}

export const JobItemInList = ({ job, wishLists, handleLike }) => {
  const navigate = useNavigate()
  const isJobInWishlist = (jobId) => {
    try {
      return wishLists.some((w) => w.jobId === jobId)
    } catch {
      return false
    }
  }
  return (
    <Box fontFamily={'Roboto'} key={job.id} borderWidth='1px' borderRadius='lg' overflow='hidden' p={2} bg='white' boxShadow='sm' _hover={{ boxShadow: 'lg' }} display='flex' alignItems='center' width='100%'>
      <Image onClick={() => navigate(`/jobDetail/${job.id}`)} src={job.image} alt={job.name} boxSize='80px' objectFit='cover' borderRadius='md' flexShrink={0} marginRight={3} />
      <VStack align='start' spacing={2} flex={1} overflow='hidden'>
        <Tooltip label={job.name} hasArrow>
          <Text name={job.id} onClick={() => navigate(`/jobDetail/${job.id}`)} m={0} p={0} fontSize='md' fontWeight='bold' isTruncated w={'190px'} whiteSpace='nowrap'>
            {job.name}
          </Text>
        </Tooltip>
        <VStack align='start' spacing={0}>
          <HStack spacing={1}>
            <Icon m={0} p={0} as={MdLocationOn} color='gray.500' />
            <Text m={0} p={0} fontSize='sm'>
              {job.location}
            </Text>
          </HStack>
          <HStack spacing={1}>
            <Icon m={0} p={0} as={MdAttachMoney} color='gray.500' />
            <Text m={0} p={0} fontSize='sm'>
              {job.salary}
            </Text>
          </HStack>
        </VStack>
        <HStack w={'100%'} spacing={1} justifyContent={'space-between'}>
          <HStack>
            <Tag colorScheme='blue'>{job.position}</Tag>
            <Tag colorScheme='green'>{job.workingForm}</Tag>
          </HStack>
          <Icon boxSize={6} onClick={() => handleLike(job.id)} as={isJobInWishlist(job.id) ? MdFavorite : MdFavoriteBorder} color='red.300' />
        </HStack>
      </VStack>
    </Box>
  )
}
