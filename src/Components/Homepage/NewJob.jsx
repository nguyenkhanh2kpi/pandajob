import { Badge, Box, Button, Card, CardBody, CardFooter, Center, Grid, GridItem, HStack, Heading, Icon, Image, Link, Skeleton, Stack, Tag, Text, Tooltip, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { AiOutlineAlert, AiOutlineFolderOpen } from 'react-icons/ai'
import { dataService } from '../../Service/data.service'
import { useNavigate } from 'react-router-dom'
import { resumeService } from '../../Service/resume.service'
import { JobItemInList } from '../Jobs/JobItemInList'
import { favoriteService } from '../../Service/favorite.service'

export default function NewJob() {
  const navigate = useNavigate()
  const accessToken = localStorage.getItem('data') ? localStorage.getItem('data').access_token : null
  const [resume, setResume] = useState(null)

  if (accessToken) {
    resumeService
      .getMyResume(accessToken)
      .then((response) => setResume(response))
      .catch((er) => console.log(er.message))
  }

  useEffect(() => {
    dataService
      .postRelationJobJava(keyWords ? keyWords : '')
      .then((response) => setFilterJob(response.data))
      .catch((er) => console.log('new job', er))
  }, [resume, accessToken])

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
