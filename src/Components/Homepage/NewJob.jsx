import { Badge, Box, Button, Card, CardBody, CardFooter, Center, Grid, GridItem, HStack, Heading, Icon, Image, Skeleton, Stack, Tag, Text, Tooltip, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { AiOutlineAlert, AiOutlineFolderOpen } from 'react-icons/ai'
import { jobService } from '../../Service/job.service'
import ReactPaginate from 'react-paginate'
import { dataService } from '../../Service/data.service'
import { useNavigate } from 'react-router-dom'
import { resumeService } from '../../Service/resume.service'
import { JobItemInList } from '../Jobs/JobItemInList'

export default function NewJob() {
  const accessToken = localStorage.getItem('data') ? localStorage.getItem('data').access_token : null
  const [resume, setResume] = useState(null)

  if (accessToken) {
    resumeService
      .getMyResume(accessToken)
      .then((response) => setResume(response))
      .catch((er) => console.log(er.message))
  }

  const navigate = useNavigate()
  const [jobs, setjobs] = useState([])
  useEffect(() => {
    if (resume != null && accessToken != null) {
      console.log('das', resume.applicationPosition)
      jobService
        .getAllJob()
        .then((response) => {
          setjobs(response)
          dataService
            .postRelationJob(resume.applicationPosition, response)
            .then((res) => setFilterJob(res))
            .catch((er) => console.log(er))
        })
        .then()
    } else {
      jobService
        .getAllJob()
        .then((response) => {
          setjobs(response)
          dataService
            .postRelationJob(keyWords, response)
            .then((res) => setFilterJob(res))
            .catch((er) => console.log(er))
        })
        .then()
    }
  }, [resume, accessToken])

  let storedData = localStorage.getItem('keyw')
  const keyWords = JSON.parse(storedData).keyw

  const [filterJob, setFilterJob] = useState([])

  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 12
  const pageCount = Math.ceil(filterJob.length / itemsPerPage)
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected)
  }

  const displayItems = filterJob.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)

  return (
    <VStack p={5} fontFamily={'Roboto'} w={'100%'}>
      <Box w={'100%'}>
        <HStack alignItems='center' spacing={4}>
          <Icon as={AiOutlineAlert} boxSize={7} p={1} bgColor='#ddeff0' borderRadius='full' />
          <Text fontWeight={'bold'} m={0} fontSize={['xl', '2xl']}>
            Công việc gợi ý
          </Text>
          <ReactPaginate
            className='question-panigate'
            pageCount={pageCount}
            onPageChange={handlePageChange}
            previousLabel='<'
            nextLabel='>'
            breakLabel='...'
            breakClassName='page-item'
            breakLinkClassName='page-link'
            containerClassName='pagination'
            pageClassName='page-item'
            pageLinkClassName='page-link'
            previousClassName='page-item'
            previousLinkClassName='page-link'
            nextClassName='page-item'
            nextLinkClassName='page-link'
            activeClassName='active'
          />
        </HStack>

        <Grid w={'100%'} mt={5} templateColumns={['repeat(1, 1fr)', 'repeat(3, 1fr)']} gap={6}>
          {displayItems.length > 0 ? (
            <>
              {displayItems.map((job) => (
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
