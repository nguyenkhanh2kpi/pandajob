import { ChevronRightIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import { Avatar, Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Card, CardBody, Collapse, Fade, Flex, HStack, Image, Img, Link, Select, Spinner, Stack, Tag, Text, VStack, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { companyService } from '../../Service/company.service'
import { jobService } from '../../Service/job.service'
import { labelService } from '../../Service/label.service'
import { IoPricetagsOutline } from 'react-icons/io5'
import { interviewDetailService } from '../../Service/interviewDetail.service'
import { MdOutlineWorkOutline } from 'react-icons/md'
import * as XLSX from 'xlsx'

export const InterviewResult = () => {
  const toast = useToast()
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const [expandedBoxes, setExpandedBoxes] = useState({})

  const [jobs, setJobs] = useState([])

  const [interviewDetails, setInterviewDetail] = useState(null)
  const [loading, setLoading] = useState(false)
  const [change, setChange] = useState(false)

  useEffect(() => {
    interviewDetailService
      .getAll(accessToken)
      .then((res) => {
        setInterviewDetail(res)
        setFilteredDetail(res)
      })
      .catch((err) => console.log(err.message))
  }, [change])

  useEffect(() => {
    window.scrollTo(0, 0)
    jobService
      .getMyJob(accessToken)
      .then((response) => setJobs(response.data))
      .catch((er) => console.log(er))
  }, [])

  //   label
  const [labels, setLabels] = useState(null)
  useEffect(() => {
    labelService
      .getMyLabel(accessToken)
      .then((response) => setLabels(response))
      .catch((er) => console.log(er))
  }, [])

  // filter
  const [filteredDetail, setFilteredDetail] = useState(interviewDetails)
  const [filter, setFilter] = useState({
    job: 0,
    label: 0,
    state: 'all',
  })

  // handle filter job
  const handleJobClick = (jobId) => {
    if (jobId === 0) {
      setFilter((prevFilter) => ({
        ...prevFilter,
        job: 0,
      }))
      setFilteredDetail(interviewDetails)
    } else {
      setFilter((prevFilter) => ({
        ...prevFilter,
        job: jobId,
      }))
      const newFilteredDetails = interviewDetails.filter((detail) => detail.jobPosting.id === jobId)
      setFilteredDetail(newFilteredDetails)
    }
  }

  // handle filter state
  const handleFilterState = (state) => {
    if (state === 'all') {
      setFilter((prevFilter) => ({
        ...prevFilter,
        state: 'all',
      }))
      setFilteredDetail(interviewDetails)
    } else {
      setFilter((prevFilter) => ({
        ...prevFilter,
        state: state,
      }))
      const newFilteredDetails = interviewDetails.filter((detail) => detail.cv.state === state)
      setFilteredDetail(newFilteredDetails)
    }
  }

  // handle label click
  const handleLabelClick = (labelId) => {
    if (labelId === 0) {
      setFilter((prevFilter) => ({
        ...prevFilter,
        label: 0,
      }))
      setFilteredDetail(interviewDetails)
    } else {
      setFilter((prevFilter) => ({
        ...prevFilter,
        label: labelId,
      }))
      const newFilteredDetails = interviewDetails.filter((detail) => {
        const labelObj = JSON.parse(detail.cv.labels)
        return labelObj[labelId] === true
      })
      setFilteredDetail(newFilteredDetails)
    }
  }

  // expand
  const toggleExpand = (id) => {
    setExpandedBoxes((prevExpandedBoxes) => ({
      ...prevExpandedBoxes,
      [id]: !prevExpandedBoxes[id],
    }))
  }

  // excel
  const handleExportToExcel = () => {
    const dataToExport = filteredDetail.map((detail) => ({
      Name: detail.candidate.name,
      Email: detail.candidate.email,
      CV_Url: detail.cv.url,
      Comment: detail.comment,
      Interviewer: detail.interviewer,
      Job_Name: detail.jobPosting.name,
    }))
    const worksheet = XLSX.utils.json_to_sheet(dataToExport)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Interview Details')
    XLSX.writeFile(workbook, 'InterviewDetails.xlsx')
  }

  return (
    <Box minHeight={2000} overflow='auto' fontFamily={'Roboto'} backgroundColor={'#f5f9fa'}>
      <HStack justifyContent={'space-between'} w={'100%'}>
        <Breadcrumb separator={<ChevronRightIcon color='gray.500' />} fontStyle={'italic'} fontWeight={'bold'} pt={30}>
          <BreadcrumbItem>
            <BreadcrumbLink href='#'>Bản ghi phỏng vấn</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </HStack>
      {/* filter */}
      <VStack mb={5} w={'100%'} pl={30} pr={30} spacing={2}>
        <HStack justifyContent={'space-between'} m={0} p={0} w={'100%'} align={'flex-start'}>
          <Flex gap={3} wrap='wrap'>
            <Button value={0} onClick={() => handleJobClick(0)} size={'sm'} bgColor={filter.job === 0 ? 'black' : 'grey.200'} color={filter.job === 0 ? 'white' : 'black'} leftIcon={<MdOutlineWorkOutline />}>
              Tất cả
            </Button>
            {jobs.map((job) => (
              <Button value={job.id} onClick={() => handleJobClick(job.id)} size={'sm'} bgColor={filter.job === job.id ? 'black' : 'grey.200'} color={filter.job === job.id ? 'white' : 'black'} leftIcon={<MdOutlineWorkOutline />}>
                {job.name}
              </Button>
            ))}
          </Flex>
        </HStack>
        <HStack justifyContent={'space-between'} m={0} p={0} w={'100%'} align={'flex-start'}>
          <Flex gap={3} wrap='wrap'>
            <Button onClick={() => handleLabelClick(0)} size={'sm'} bgColor={filter.label === 0 ? 'black' : 'grey.200'} color={filter.label === 0 ? 'white' : 'black'} leftIcon={<IoPricetagsOutline />}>
              Tất cả
            </Button>
            {labels?.map((label) => (
              <Button onClick={() => handleLabelClick(label.id)} size={'sm'} bgColor={filter.label === label.id ? 'black' : 'grey.200'} color={filter.label === label.id ? 'white' : 'black'} leftIcon={<IoPricetagsOutline />}>
                {label.name}
              </Button>
            ))}
          </Flex>
        </HStack>
        <HStack justifyContent={'space-between'} m={0} p={0} w={'100%'} align={'flex-start'}>
          <Flex gap={2}>
            <Button onClick={() => handleFilterState('all')} bgColor={filter.state === 'all' ? 'black' : 'grey.200'} color={filter.state === 'all' ? 'white' : 'black'} size={'sm'}>
              Tất cả
            </Button>
            <Button onClick={() => handleFilterState('SCHEDULE_INTERVIEW')} bgColor={filter.state === 'SCHEDULE_INTERVIEW' ? 'black' : 'grey.200'} color={filter.state === 'SCHEDULE_INTERVIEW' ? 'white' : 'black'} size={'sm'}>
              Đã phỏng vấn(Trạng thái)
            </Button>
          </Flex>
          <Button onClick={handleExportToExcel} size={'sm'} colorScheme='green' variant='outline'>
            Xuất file
          </Button>
        </HStack>
      </VStack>
      {/* end -filter */}
      <VStack mb={5} w={'100%'} pl={30} pr={30} spacing={2}>
        {filteredDetail?.map((detail) => (
          <Box w={'100%'} borderRadius={20} bgColor={'white'} boxShadow={'lg'} p={5} key={detail.detailId}>
            <HStack w={'100%'} align={'flex-start'}>
              <HStack w={'50%'}>
                <Avatar src={detail.candidate.avatar} name={detail.candidate.name} />
                <Box>
                  <Text m={0} p={0} fontWeight={'bold'}>
                    {detail.candidate.name}
                  </Text>
                  <Text m={0} p={0} fontStyle={'italic'}>
                    {detail.candidate.email}
                  </Text>
                  <Link color={'blue'} isExternal href={detail.cv.url}>
                    Xem CV
                  </Link>
                </Box>
              </HStack>
              <VStack w={'100%'} align={'flex-end'}>
                <HStack justifyContent={'flex-end'} align={'flex-end'} w={'50%'}>
                  {labels?.map((label) => (
                    <>
                      {JSON.parse(detail.cv.labels)[label.id] ? (
                        <Button variant='solid' size={'xs'} leftIcon={<IoPricetagsOutline />}>
                          {label.name}
                        </Button>
                      ) : (
                        <></>
                      )}
                    </>
                  ))}
                </HStack>
                <Flex>
                  <Text size={'xs'} m={0} p={0} mr={4}>
                    CV
                  </Text>
                  <Button size={'xs'}>{detail.cv.state}</Button>
                </Flex>
                <Flex>
                  <Text size={'xs'} m={0} p={0} mr={4}>
                    Trạng thái phỏng vấn
                  </Text>
                  <Button size={'xs'} colorScheme={detail.candidate.status == 'Đã chấm' ? 'green' : 'red'}>
                    {detail.candidate.status}
                  </Button>
                </Flex>
              </VStack>
            </HStack>
            <Collapse in={expandedBoxes[detail.id]} animateOpacity>
              <Box>
                <Text m={0} p={0} fontWeight={'bold'}>
                  Ghi chú phỏng vấn:{' '}
                </Text>
                <Box p={3} borderRadius={10} borderWidth={1} borderColor={'grey'}>
                  <Text m={0} p={0}>
                    {detail.comment}
                  </Text>
                </Box>
                {detail.englishQuestion != '' ? (
                  <>
                    <Text m={0} p={0} fontWeight={'bold'}>
                      Câu hỏi tiếng Anh:
                    </Text>
                    <Box p={3} borderRadius={10} borderWidth={1} borderColor={'grey'}>
                      {JSON.parse(detail.englishQuestion).map((q) => (
                        <Text key={q.id} m={0} p={0}>
                          {q.question} (Điểm: {q.mark})
                        </Text>
                      ))}
                    </Box>
                  </>
                ) : null}
                {detail.technicalQuestion != '' ? (
                  <>
                    <Text m={0} p={0} fontWeight={'bold'}>
                      Câu hỏi kỹ thuật:
                    </Text>
                    <Box p={3} borderRadius={10} borderWidth={1} borderColor={'grey'}>
                      {JSON.parse(detail.technicalQuestion).map((q) => (
                        <Text key={q.id} m={0} p={0}>
                          {q.question} (Điểm: {q.mark})
                        </Text>
                      ))}
                    </Box>
                  </>
                ) : null}
                {detail.softSkillQuestion != '' ? (
                  <>
                    <Text m={0} p={0} fontWeight={'bold'}>
                      Câu hỏi kỹ năng mềm:
                    </Text>
                    <Box p={3} borderRadius={10} borderWidth={1} borderColor={'grey'}>
                      {JSON.parse(detail.softSkillQuestion).map((q) => (
                        <Text key={q.id} m={0} p={0}>
                          {q.question} (Điểm: {q.mark})
                        </Text>
                      ))}
                    </Box>
                  </>
                ) : null}
              </Box>
            </Collapse>
            <Button size='xs' onClick={() => toggleExpand(detail.id)}>
              {expandedBoxes[detail.id] ? 'thu gọn' : 'xem thêm'}
            </Button>
          </Box>
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
