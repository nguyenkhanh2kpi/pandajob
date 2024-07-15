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
  Spinner,
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
import { CheckIcon, ChevronRightIcon, EmailIcon, PhoneIcon, Search2Icon, SearchIcon, StarIcon, ViewIcon } from '@chakra-ui/icons'
import { CandidateDetailInProces } from './CandidateDetailInProcess'
import { ManageLabel } from './ManageLabel'
import { labelService } from '../../Service/label.service'
import * as XLSX from 'xlsx'
import ExcelJS from 'exceljs'

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
    <Box minHeight={2000} overflow='auto' fontFamily={'Roboto'} fontWeight={400} backgroundColor={'#f5f9fa'}>
      <Breadcrumb pt={30} separator={<ChevronRightIcon color='gray.500' />} fontStyle={'italic'} fontWeight={'bold'}>
        <BreadcrumbItem>
          <BreadcrumbLink href='/process'>Quản lý ứng tuyển</BreadcrumbLink>
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
  const [candidates, setCandidates] = useState(null)
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
  const [filteredCandidates, setFilteredCandidates] = useState(null)
  const [filter, setFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [labelFilter, setLabelFilter] = useState('')
  const [keyWord, setKeyWord] = useState('')

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
      if (keyWord) {
        filtered = filtered.filter((candidate) => candidate.fullName.includes(keyWord))
      }
      setFilteredCandidates(filtered)
    }

    applyFilters()
  }, [candidates, filter, statusFilter, labelFilter, keyWord])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleFilterStatusChange = (event) => {
    setStatusFilter(event.target.value)
  }

  const handleLabelFilterChange = (event) => {
    setLabelFilter(event.target.value)
  }

  //
  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('CV')

    // Define headers
    worksheet.columns = [
      { header: 'Full Name', key: 'fullName', width: 30 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Apply Date', key: 'applyDate', width: 15 },
      { header: 'CV Status', key: 'cvStatus', width: 20 },
      { header: 'CV Link', key: 'cvLink', width: 50 },
      { header: 'Phone', key: 'phone', width: 15 },
    ]

    // Add rows
    filteredCandidates.forEach((candidate) => {
      worksheet.addRow({
        fullName: candidate.fullName,
        email: candidate.email,
        applyDate: candidate.applyDate,
        cvStatus: states[candidate.cvStatus],
        cvLink: candidate.cv,
        phone: candidate.phone,
      })
    })

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return
      const statusCell = row.getCell(4)

      switch (statusCell.value) {
        case 'Tiếp nhận CV':
          statusCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' } } // Yellow
          break
        case 'Phù hợp yêu cầu':
          statusCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '00FF00' } } // Green
          break
        case 'Lên lịch phỏng vấn':
          statusCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFA500' } } // Orange
          break
        case 'Gửi đề nghị':
          statusCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '0000FF' } } // Blue
          break
        case 'Nhận việc':
          statusCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '008000' } } // Dark Green
          break
        case 'Từ chối':
          statusCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0000' } } // Red
          break
        default:
          break
      }
    })

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return
      const cvLinkCell = row.getCell(5)
      cvLinkCell.value = { text: 'CVLink', hyperlink: row.getCell(5).value }
    })

    const buffer = await workbook.xlsx.writeBuffer()
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'cv_.xlsx'
    link.click()
  }

  if (filteredCandidates === null) {
    return (
      <HStack minH={500} w='100%' justifyContent='center' alignItems='center'>
        <Spinner thickness='8px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='4xl' />
      </HStack>
    )
  } else
    return (
      <>
        <HStack w={'100%'} mb={5} spacing={1}>
          <InputGroup>
            <InputLeftElement pointerEvents='none'>
              <SearchIcon color='gray.300' />
            </InputLeftElement>
            <Input value={keyWord} onChange={(event) => setKeyWord(event.target.value)} type='text' placeholder='Tìm ứng viên' />
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
          <Button onClick={exportToExcel} size={'sm'}>
            Xuất danh sách
          </Button>
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
      </>
    )
}
