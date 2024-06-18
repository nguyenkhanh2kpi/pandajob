import React from 'react'
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, VStack, Heading, Text, SimpleGrid, Stat, StatLabel, StatNumber, StatHelpText, StatGroup, Grid, GridItem, Card, CardBody, HStack, Icon, Table, Thead, Tr, Th, Tbody, Td, Flex, IconButton, Button, Link, Tag } from '@chakra-ui/react'
import { BellIcon } from '@chakra-ui/icons'
import { AiOutlineHome, AiOutlineNotification } from 'react-icons/ai'
import { IoDocumentTextOutline } from 'react-icons/io5'
import { BsFillDoorOpenFill, BsFillDoorClosedFill } from 'react-icons/bs'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { useNavigate } from 'react-router-dom'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const data = {
  labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
  datasets: [
    {
      label: 'CV Ứng Tuyển',
      data: [12, 19, 3, 5, 2, 3, 9, 7, 4, 5, 6, 8],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    },
    {
      label: 'CV Chấp Nhận',
      data: [5, 10, 2, 3, 1, 1, 4, 5, 3, 4, 2, 4],
      backgroundColor: 'rgba(153, 102, 255, 0.2)',
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 1,
    },
  ],
}

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Biểu Đồ CV Ứng Tuyển và Được nhận trong Năm',
    },
  },
}

// Dữ liệu giả lập cho ứng viên nộp CV hôm nay
const candidatesToday = [
  { id: 1, name: 'Nguyễn Văn A', position: 'Frontend Developer', submittedTime: '08:30 AM' },
  { id: 2, name: 'Trần Thị B', position: 'Backend Developer', submittedTime: '09:45 AM' },
  { id: 3, name: 'Lê Văn C', position: 'UI/UX Designer', submittedTime: '11:20 AM' },
  { id: 4, name: 'Phạm Thị D', position: 'Project Manager', submittedTime: '01:15 PM' },
  { id: 4, name: 'Phạm Thị D', position: 'Project Manager', submittedTime: '01:15 PM' },
  { id: 4, name: 'Phạm Thị D', position: 'Project Manager', submittedTime: '01:15 PM' },
  { id: 4, name: 'Phạm Thị D', position: 'Project Manager', submittedTime: '01:15 PM' },
  { id: 4, name: 'Phạm Thị D', position: 'Project Manager', submittedTime: '01:15 PM' },
  { id: 4, name: 'Phạm Thị D', position: 'Project Manager', submittedTime: '01:15 PM' },
  { id: 4, name: 'Phạm Thị D', position: 'Project Manager', submittedTime: '01:15 PM' },
]

const interviewRooms = 5
const openRooms = 3
const closedRooms = interviewRooms - openRooms

export const MainReccerDashBoard = () => {
  const navigate = useNavigate()
  return (
    <Box minHeight={1000} fontFamily={'Roboto'} backgroundColor={'#e9f3f5'} overflow='hidden'>
      <Breadcrumb pt={30}>
        <BreadcrumbItem>
          <BreadcrumbLink href='#'>Dashboard</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <VStack mb={100} spacing={6} align='stretch' px={8}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} width='100%'>
          <Box p={6} boxShadow='md' borderRadius='lg' bg='white'>
            <Text fontWeight={'bold'}>Bài đăng tuyển dụng</Text>
            <Grid templateColumns='repeat(2, 1fr)' gap={6}>
              <GridItem w='100%' h='100'>
                <Box onClick={() => navigate('/allJob_Recruiter')} p={5} bgColor={'#a9daf5'} color={'#28678a'} borderWidth={1} borderRadius={10} w={'100%'}>
                  <HStack w={'100%'} justifyContent={'space-between'}>
                    <VStack alignItems={'flex-start'}>
                      <Text fontWeight={'bold'} m={0} p={0}>
                        1
                      </Text>
                      <Text m={0} p={0}>
                        Tin đang mở
                      </Text>
                    </VStack>
                    <Icon as={AiOutlineNotification} w={8} h={8} />
                  </HStack>
                </Box>
              </GridItem>
              <GridItem w='100%' h='100'>
                <Box onClick={() => navigate('/process')} p={5} bgColor={'#cef2e1'} color={'#23593f'} borderWidth={1} borderRadius={10} w={'100%'}>
                  <HStack w={'100%'} justifyContent={'space-between'}>
                    <VStack alignItems={'flex-start'}>
                      <Text fontWeight={'bold'} m={0} p={0}>
                        1
                      </Text>
                      <Text m={0} p={0}>
                        CV tiếp nhận
                      </Text>
                    </VStack>
                    <Icon as={IoDocumentTextOutline} w={8} h={8} />
                  </HStack>
                </Box>
              </GridItem>
              <GridItem w='100%' h='100'>
                <Box onClick={() => navigate('/process')} p={5} bgColor={'#edc5da'} color={'#6e3050'} borderWidth={1} borderRadius={10} w={'100%'}>
                  <HStack w={'100%'} justifyContent={'space-between'}>
                    <VStack alignItems={'flex-start'}>
                      <Text fontWeight={'bold'} m={0} p={0}>
                        1
                      </Text>
                      <Text m={0} p={0}>
                        CV mới cập nhật
                      </Text>
                    </VStack>
                    <Icon as={IoDocumentTextOutline} w={8} h={8} />
                  </HStack>
                </Box>
              </GridItem>
            </Grid>
            <Box mt={6} p={5} borderWidth={1} borderRadius={10} bgColor='white'>
              <Bar data={data} options={options} />
            </Box>
          </Box>
          <Box p={6} boxShadow='md' borderRadius='lg' bg='white'>
            <Text fontWeight={'bold'}>Phỏng vấn ứng viên</Text>
            <Grid templateColumns='repeat(2, 1fr)' gap={6} mt={4}>
              <GridItem w='100%' h='100'>
                <Box p={5} bgColor={'#f0e68c'} color={'#8b4513'} borderWidth={1} borderRadius={10} w={'100%'}>
                  <HStack w={'100%'} justifyContent={'space-between'}>
                    <VStack alignItems={'flex-start'}>
                      <Text fontWeight={'bold'} m={0} p={0}>
                        {interviewRooms}
                      </Text>
                      <Text m={0} p={0}>
                        Tổng số phòng
                      </Text>
                    </VStack>
                    <Icon as={AiOutlineHome} w={8} h={8} />
                  </HStack>
                </Box>
              </GridItem>
              <GridItem w='100%' h='100'>
                <Box p={5} bgColor={'#98fb98'} color={'#006400'} borderWidth={1} borderRadius={10} w={'100%'}>
                  <HStack w={'100%'} justifyContent={'space-between'}>
                    <VStack alignItems={'flex-start'}>
                      <Text fontWeight={'bold'} m={0} p={0}>
                        {openRooms}
                      </Text>
                      <Text m={0} p={0}>
                        Phòng đang mở
                      </Text>
                    </VStack>
                    <Icon as={BsFillDoorOpenFill} w={8} h={8} />
                  </HStack>
                </Box>
              </GridItem>
              <GridItem w='100%' h='100'>
                <Box p={5} bgColor={'#ffcccb'} color={'#8b0000'} borderWidth={1} borderRadius={10} w={'100%'}>
                  <HStack w={'100%'} justifyContent={'space-between'}>
                    <VStack alignItems={'flex-start'}>
                      <Text fontWeight={'bold'} m={0} p={0}>
                        {closedRooms}
                      </Text>
                      <Text m={0} p={0}>
                        Phòng đã đóng
                      </Text>
                    </VStack>
                    <Icon as={BsFillDoorClosedFill} w={8} h={8} />
                  </HStack>
                </Box>
              </GridItem>
            </Grid>
          </Box>

          <Box p={6} boxShadow='md' borderRadius='lg' bg='white'>
            <HStack mb={4} w={'100%'} justifyContent={'space-between'}>
              <Text m={0} p={0} fontWeight={'bold'}>
                CV hôm nay (không qua test sàng lọc)
              </Text>
              <Button size={'xs'} bgColor={'#2cccc7'} color='white'>
                <Link>Xem chi tiết CV</Link>
              </Button>
            </HStack>
            <Box h={500} overflowY={'auto'}>
              {candidatesToday.map((candidate) => (
                <Box key={candidate.id} p={4} mb={4} borderWidth={1} borderRadius={10} boxShadow='sm' bg='gray.50' _hover={{ boxShadow: 'md', bg: 'gray.100' }} transition='all 0.2s'>
                  <VStack w={'100%'} alignItems='start'>
                    <HStack justifyContent={'space-between'} w={'100%'}>
                      <Text m={0} p={0} fontWeight={'bold'}>
                        {candidate.name}
                      </Text>
                      <Text m={0} p={0} fontSize={'sm'} fontStyle={'italic'}>
                        Thời gian nộp:<Tag colorScheme='blue'>{candidate.submittedTime}</Tag>
                      </Text>
                    </HStack>
                    <HStack justifyContent={'space-between'} w={'100%'}>
                      <Text m={0} p={0} fontSize={'sm'}>
                        Job: {candidate.position}
                      </Text>
                    </HStack>
                  </VStack>
                </Box>
              ))}
            </Box>
          </Box>
          <Box p={6} boxShadow='md' borderRadius='lg' bg='white'>
            <HStack mb={4} w={'100%'} justifyContent={'space-between'}>
              <Text m={0} p={0} fontWeight={'bold'}>
                CV hôm nay (Két quả bài test)
              </Text>
              <Button size={'xs'} bgColor={'#2cccc7'} color='white'>
                <Link>Xem chi tiết CV</Link>
              </Button>
            </HStack>

            <Box h={500} overflowY={'auto'}>
              {candidatesToday.map((candidate) => (
                <Box key={candidate.id} p={4} mb={4} borderWidth={1} borderRadius={10} boxShadow='sm' bg='gray.50' _hover={{ boxShadow: 'md', bg: 'gray.100' }} transition='all 0.2s'>
                  <VStack w={'100%'} alignItems='start'>
                    <HStack justifyContent={'space-between'} w={'100%'}>
                      <Text m={0} p={0} fontWeight={'bold'}>
                        {candidate.name}
                      </Text>
                      <Text m={0} p={0} fontSize={'sm'} fontStyle={'italic'}>
                      Thời gian nộp:<Tag colorScheme='blue'>{candidate.submittedTime}</Tag>
                      </Text>
                    </HStack>
                    <HStack justifyContent={'space-between'} w={'100%'}>
                      <Text m={0} p={0} fontSize={'sm'}>
                        Job: {candidate.position}
                      </Text>
                    </HStack>
                  </VStack>
                </Box>
              ))}
            </Box>
          </Box>
        </SimpleGrid>
      </VStack>
    </Box>
  )
}
