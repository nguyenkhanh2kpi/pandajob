import {
  Avatar,
  Badge,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Card,
  CardBody,
  ChakraProvider,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  HStack,
  Heading,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  List,
  ListIcon,
  ListItem,
  Radio,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Table,
  TableContainer,
  Tabs,
  Tag,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { loadJobDetail } from '../../redux/JobDetail/Action'
import { Step, StepDescription, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, Stepper, useSteps } from '@chakra-ui/react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react'
import { interviewService } from '../../Service/interview.service'
import { testService } from '../../Service/test.service'
import { AiOutlinePlayCircle } from 'react-icons/ai'
import { jobService } from '../../Service/job.service'
import { locationService } from '../../Service/location.service'
import { Stack } from 'react-bootstrap'
import { CheckIcon, EmailIcon, PhoneIcon, Search2Icon, SearchIcon, StarIcon, ViewIcon } from '@chakra-ui/icons'
import { CandidateDetailInProces } from './CandidateDetailInProcess'
import { ManageLabel } from './ManageLabel'
import { labelService } from '../../Service/label.service'
import { MdSettings } from 'react-icons/md'

export const ProcessItem = () => {
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [job, setJob] = useState({})

  useEffect(() => {
    jobService.getById(params.jobId).then((response) => setJob(response))
  }, [params.jobId])

  const tabIndex = parseInt(params.tab, 10) || 0

  return (
    <Box minHeight={2000} overflow='auto' fontFamily={'Roboto'} fontWeight={400} backgroundColor={'#e9f3f5'}>
      <Breadcrumb pt={30}>
        <BreadcrumbItem>
          <BreadcrumbLink href='/process'>Chiến dịch tuyển dụng</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href='#'>{job.name}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <VStack pl={30} pr={30} spacing={3}>
        <Box minHeight={1000} overflow='auto' backgroundColor={'#FFFFFF'} w={'100%'} mb={10}>
          <Tabs borderRadius={10} defaultIndex={tabIndex}>
            <TabList>
              <Tab>CV ứng tuyển</Tab>
              <Tab>Quản lý nhãn</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <ListCVTab job={job} />
              </TabPanel>
              <TabPanel>
                <ManageLabel />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </VStack>
    </Box>
  )
}

/// tab danh sách CV ứng tuyển
const ListCVTab = ({ job, setTabIndex }) => {
  let states = {
    RECEIVE_CV: 'Tiếp nhận CV',
    SUITABLE: 'Phù hợp yêu cầu',
    SCHEDULE_INTERVIEW: 'Lên lịch phỏng vấn',
    SEND_PROPOSAL: 'Gửi đề nghị',
    ACCEPT: 'Nhận việc',
    REJECT: 'Từ chối',
  }
  const [candidates, setCandidates] = useState([])
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const [labels, setLabels] = useState([])
  const [load, setLoad] = useState(false)
  useEffect(() => {
    interviewService
      .getCandidatesByJob(accessToken, job.id)
      .then((response) => setCandidates(response))
      .catch((er) => console.log(er))
  }, [job, load])

  useEffect(() => {
    labelService
      .getMyLabel(accessToken)
      .then((response) => setLabels(response))
      .catch((er) => console.log(er))
  }, [])

  // bộ lọc
  const [filteredCandidates, setFilteredCandidates] = useState([])
  const [filter, setFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [labelFilter, setLabelFilter] = useState('')

  useEffect(() => {
    const applyFilters = () => {
      let filtered = candidates
      if (filter) {
        filtered = filtered.filter((candidate) => (filter === 'viewed' ? candidate.view === true : candidate.view === false))
      }
      if (statusFilter) {
        filtered = filtered.filter((candidate) => candidate.cvStatus === statusFilter)
      }
      if (labelFilter) {
        // filtered = filtered.filter((candidate) => {
        //   const candidateLabels = JSON.parse(candidate.labels)
        //   return candidateLabels[labelFilter] === true
        // })
        filtered = filtered.filter((candidate) => {
          try {
            const candidateLabels = candidate.labels ? JSON.parse(candidate.labels) : {}
            return candidateLabels[labelFilter] === true
          } catch (error) {
            console.error('Error parsing labels:', error)
            return false
          }
        })
      }
      setFilteredCandidates(filtered)
    }

    applyFilters()
  }, [candidates, filter, statusFilter, labelFilter])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleFilterStatusChange = (event) => {
    setStatusFilter(event.target.value)
  }

  const handleLabelFilterChange = (event) => {
    setLabelFilter(event.target.value)
  }

  return (
    <>
      <HStack w={'100%'} mb={5} spacing={1}>
        <InputGroup>
          <InputLeftElement pointerEvents='none'>
            <SearchIcon color='gray.300' />
          </InputLeftElement>
          <Input type='text' placeholder='Tìm ứng viên' />
        </InputGroup>
        <Select placeholder='Tất cả trạng thái' onChange={handleFilterStatusChange}>
          {Object.entries(states).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </Select>
        <Select placeholder='Hiện tất cả CV' onChange={handleFilterChange}>
          <option value='viewed'>Đã xem</option>
          <option value='notViewed'>Chưa xem</option>
        </Select>
        <Select placeholder='Tất cả nhãn' onChange={handleLabelFilterChange}>
          {labels.map((label) => (
            <option key={label.id} value={label.id}>
              {label.name}
            </option>
          ))}
        </Select>
      </HStack>

      <TableContainer fontFamily={'Roboto'}>
        <Table mb={5} borderWidth={1} variant='simple'>
          <Thead>
            <Tr>
              <Th>Ứng viên</Th>
              <Th>CV</Th>
              <Th>Thông tin liên hệ</Th>
              <Th>Ngày ứng tuyển</Th>
              <Th>Trạng thái</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredCandidates.map((candidate) => (
              <CandidateDetailInProces key={candidate.id} load={load} setLoad={setLoad} candidate={candidate} setTabIndex={setTabIndex} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <HStack w={'100%'} mb={5} spacing={1} justifyContent='flex-end'>
        <Radio value='1'>Chỉ xem ứng viên pro</Radio>
        <Button size={'sm'}>Xuất danh sách</Button>
      </HStack>
    </>
  )
}
