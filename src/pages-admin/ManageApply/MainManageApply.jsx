import { ChevronRightIcon } from '@chakra-ui/icons'
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Flex, HStack, Spinner, Table, TableContainer, Tbody, Th, Thead, Tr, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { MdOutlineWorkOutline } from 'react-icons/md'
import { jobService } from '../../Service/job.service'
import { interviewService } from '../../Service/interview.service'
import { CandidateApplyItem } from './CandidateApplyItem'
import { labelService } from '../../Service/label.service'
import { IoPricetagsOutline } from 'react-icons/io5'
export const MainManageApply = () => {
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const [load, setLoad] = useState(false)
  const [jobs, setJobs] = useState([])
  const [candidates, setCandidates] = useState(null)
  const [filteredCandidates, setFilteredCandidate] = useState(null)
  const [filter, setFilter] = useState(0)
  //   const [labelFilter, setLabelFilter] = useState(0)

  useEffect(() => {
    jobService
      .getMyJob(accessToken)
      .then((response) => setJobs(response.data))
      .catch((er) => console.log(er))
    interviewService
      .getCandidates(accessToken)
      .then((response) => {
        setCandidates(response)
        setFilteredCandidate(response)
      })
      .catch((er) => console.log(er))
  }, [load])

  const handleOnFilter = (value) => {
    setFilter(value)
  }

  //   label filter
  //   const handleOnLabelFilter = (labelId) => {
  //     if (labelId === 0) {
  //       setLabelFilter(0)
  //       setFilteredCandidate(candidates)
  //     } else {
  //       setLabelFilter(labelId)
  //       let fakes = candidates
  //       const newCandidates = fakes.filter((detail) => {
  //         const labelObj = JSON.parse(detail.labels)
  //         return labelObj[labelId] === true
  //       })
  //       setFilteredCandidate(newCandidates)
  //     }
  //   }

  useEffect(() => {
    if (filter === 0) {
      interviewService
        .getCandidates(accessToken)
        .then((response) => setFilteredCandidate(response))
        .catch((er) => console.log(er))
    } else {
      interviewService
        .getCandidatesByJob(accessToken, filter)
        .then((response) => setFilteredCandidate(response))
        .catch((er) => console.log(er))
    }
  }, [filter])

  //   label
  const [labels, setLabels] = useState(null)
  useEffect(() => {
    labelService
      .getMyLabel(accessToken)
      .then((response) => setLabels(response))
      .catch((er) => console.log(er))
  }, [])

  //   state
  const [stateFilter, setStateFilter] = useState('all')
  useEffect(() => {
    if (stateFilter === 'all') {
      setFilteredCandidate(candidates)
    } else {
      let fakes = candidates
      setFilteredCandidate(fakes.filter((candidate) => candidate.cvStatus === stateFilter))
    }
  }, [stateFilter])

  const handleOnStateFilter = (state) => {
    setStateFilter(state)
  }

  // view filter
  const [view, setView] = useState(false)
  const handleChangeView = (view) => {
    setView(view)
  }

  if (filteredCandidates === null) {
    return (
      <HStack minH={500} w='100%' justifyContent='center' alignItems='center'>
        <Spinner thickness='8px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='4xl' />
      </HStack>
    )
  } else
    return (
      <Box minHeight={2000} overflow='auto' fontFamily={'Roboto'} fontWeight={400} backgroundColor={'#f5f9fa'}>
        <Breadcrumb pt={30} separator={<ChevronRightIcon color='gray.500' />} fontStyle={'italic'} fontWeight={'bold'}>
          <BreadcrumbItem>
            <BreadcrumbLink href='/manage-apply'>CV ứng tuyển</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <VStack mb={5} w={'100%'} pl={30} pr={30} spacing={2}>
          <HStack justifyContent={'space-between'} m={0} p={0} w={'100%'} align={'flex-start'}>
            <Flex gap={3} wrap='wrap'>
              <Button value={0} onClick={() => handleOnFilter(0)} size={'sm'} bgColor={filter === 0 ? 'black' : 'grey.200'} color={filter === 0 ? 'white' : 'black'} leftIcon={<MdOutlineWorkOutline />}>
                Tất cả
              </Button>
              {jobs.map((job) => (
                <Button onClick={() => handleOnFilter(job.id)} size={'sm'} value={job.id} bgColor={filter === job.id ? 'black' : 'grey.200'} color={filter === job.id ? 'white' : 'black'} leftIcon={<MdOutlineWorkOutline />}>
                  {job.name}
                </Button>
              ))}
            </Flex>
          </HStack>
          <HStack justifyContent={'space-between'} m={0} p={0} w={'100%'} align={'flex-start'}>
            <Flex gap={3} wrap='wrap'>
              <Button value={0} onClick={() => handleOnStateFilter('all')} size={'sm'} bgColor={stateFilter === 'all' ? 'black' : 'grey.200'} color={stateFilter === 'all' ? 'white' : 'black'}>
                Tất cả
              </Button>
              {Object.entries(State).map(([key, value]) => (
                <Button key={key} value={key} onClick={() => handleOnStateFilter(key)} size='sm' bgColor={stateFilter === key ? 'black' : 'grey.200'} color={stateFilter === key ? 'white' : 'black'}>
                  {value}
                </Button>
              ))}
            </Flex>
          </HStack>

          {/* <HStack justifyContent={'space-between'} m={0} p={0} w={'100%'} align={'flex-start'}>
            <Flex gap={3} wrap='wrap'>
              <Button onClick={() => handleOnLabelFilter(0)} size={'sm'} bgColor={labelFilter === 0 ? 'black' : 'grey.200'} color={labelFilter === 0 ? 'white' : 'black'} leftIcon={<IoPricetagsOutline />}>
                Tất cả
              </Button>
              {labels?.map((label) => (
                <Button onClick={() => handleOnLabelFilter(label.id)} size={'sm'} bgColor={labelFilter === label.id ? 'black' : 'grey.200'} color={labelFilter === label.id ? 'white' : 'black'} leftIcon={<IoPricetagsOutline />}>
                  {label.name}
                </Button>
              ))}
            </Flex>
          </HStack> */}
          <HStack justifyContent={'space-between'} m={0} p={0} w={'100%'} align={'flex-start'}>
            <Flex gap={3} wrap='wrap'>
              <Button onClick={() => handleChangeView(false)} size={'sm'} bgColor={view === false ? 'black' : 'grey.200'} color={view === false ? 'white' : 'black'}>
                Chưa xem
              </Button>
              <Button onClick={() => handleChangeView(true)} size={'sm'} bgColor={view === true ? 'black' : 'grey.200'} color={view === true ? 'white' : 'black'}>
                Đã xem
              </Button>
            </Flex>
          </HStack>

          {filteredCandidates?.map((candidate) => (
            <CandidateApplyItem key={candidate} load={load} setLoad={setLoad} candidate={candidate} />
          ))}
        </VStack>
      </Box>
    )
}

const State = {
  RECEIVE_CV: 'Tiếp nhận CV',
  SUITABLE: 'Phù hợp yêu cầu',
  SCHEDULE_INTERVIEW: 'Lên lịch phỏng vấn',
  SEND_PROPOSAL: 'Gửi đề nghị',
  ACCEPT: 'Nhận việc',
  REJECT: 'Từ chối',
}
