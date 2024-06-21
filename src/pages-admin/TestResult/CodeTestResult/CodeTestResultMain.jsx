import { Avatar, Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Card, CardHeader, Center, Checkbox, Flex, HStack, Heading, Icon, SimpleGrid, Spinner, Tag, Text, VStack, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { testService } from '../../../Service/test.service'
import { ViewCVTestResult } from './ViewCVTestResult'
import { ViewACodeTestResult } from './ViewACodeTestResult'
import { executeCode } from '../../../Components/CodeEditor/api'
import { VscPassFilled } from 'react-icons/vsc'
import { MdCancel } from 'react-icons/md'
import { IoPricetagsOutline } from 'react-icons/io5'
import { ChevronRightIcon } from '@chakra-ui/icons'

export const CodeTestResultMain = () => {
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const params = useParams()
  const [records, setRecords] = useState([])
  const [filterdRecords, setFilteredRecords] = useState(null)
  const [loading, setLoading] = useState(false)
  const [load, setLoad] = useState(false)

  useEffect(() => {
    testService
      .getAllRecordCodeByTestId(accessToken, params.testId)
      .then((response) => {
        setRecords(response.data)
      })
      .catch((er) => console.log(er))
  }, [accessToken, params.testId, load])

  // filter
  const [filter, setFilter] = useState('all')
  const handleFilterClick = (newFilter) => {
    setFilter(newFilter)
  }

  useEffect(() => {
    if (records) {
      let filtered = [...records]

      switch (filter) {
        case 'not-viewed':
          filtered = records.filter((record) => !record.cvDTO.view)
          break
        case 'viewed':
          filtered = records.filter((record) => record.cvDTO.view)
          break
        case 'today':
          const today = new Date()
          const todayDateString = today.toLocaleDateString('en-GB')

          filtered = records.filter((record) => {
            const startTime = record.startTime
            const datePart = startTime.split(' ')[1]
            const formattedDate = datePart.split('/').reverse().join('-')
            const recordDate = new Date(formattedDate)
            const recordDateString = recordDate.toLocaleDateString('en-GB')

            return recordDateString === todayDateString
          })
          break
        case 'new-cv':
          filtered = records.filter((record) => record.cvDTO.state === 'RECEIVE_CV')
          break
        case 'interview':
          filtered = records.filter((record) => record.cvDTO.state === 'SCHEDULE_INTERVIEW')
          break

        default:
          break
      }
      setFilteredRecords(filtered)
    }
  }, [filter, records])

  return (
    <Box fontFamily={'Roboto'} fontWeight={400} backgroundColor={'#f5f9fa'} overflow='hidden'>
      <Breadcrumb separator={<ChevronRightIcon color='gray.500' />} fontStyle={'italic'} fontWeight={'bold'} pt={30}>
        <BreadcrumbItem>
          <BreadcrumbLink href='#'>Kết quả Code Test</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      {filterdRecords && !loading ? (
        <VStack mb={30} w={'100%'} minH={800} pl={30} pr={30} spacing={5}>
          <HStack justifyContent={'space-between'} m={0} p={0} w={'100%'} align={'flex-start'}>
            <Flex gap={2}>
              <Button bgColor={filter === 'all' ? 'black' : 'gray.200'} color={filter === 'all' ? 'white' : 'black'} size={'sm'} onClick={() => handleFilterClick('all')}>
                Tất cả
              </Button>
              <Button size={'sm'} onClick={() => handleFilterClick('not-viewed')} bgColor={filter === 'not-viewed' ? 'black' : 'gray.200'} color={filter === 'not-viewed' ? 'white' : 'black'}>
                Chưa xem
              </Button>
              <Button size={'sm'} onClick={() => handleFilterClick('viewed')} bgColor={filter === 'viewed' ? 'black' : 'gray.200'} color={filter === 'viewed' ? 'white' : 'black'}>
                Đã xem
              </Button>
              <Button size={'sm'} onClick={() => handleFilterClick('today')} bgColor={filter === 'today' ? 'black' : 'gray.200'} color={filter === 'today' ? 'white' : 'black'}>
                Hôm nay
              </Button>
              <Button size={'sm'} onClick={() => handleFilterClick('new-cv')} bgColor={filter === 'new-cv' ? 'black' : 'gray.200'} color={filter === 'new-cv' ? 'white' : 'black'}>
                CV mới tiếp nhận (trạng thái)
              </Button>
              <Button size={'sm'} onClick={() => handleFilterClick('interview')} bgColor={filter === 'interview' ? 'black' : 'gray.200'} color={filter === 'interview' ? 'white' : 'black'}>
                Lên lịch phỏng vấn (trạng thái)
              </Button>
            </Flex>
          </HStack>
          <HStack w={'100%'}>
            <SimpleGrid w={'100%'} columns={{ base: 1, md: 2 }} spacing={6}>
              {filterdRecords.length > 0 ? (
                <>
                  {filterdRecords.map((record, index) => (
                    <Box key={index} w={'100%'} bgColor={'white'} borderRadius={20} boxShadow={'md'} p={5}>
                      <HStack justifyContent={'space-between'} spacing={4} mb={4}>
                        <HStack m={0} p={0} justifyContent={'flex-start'}>
                          <Avatar borderRadius='full' boxSize='50px' src={record.user.avatar} alt={record.user.fullName} />
                          <VStack spacing={0} align='start'>
                            <Text m={0} p={0} fontWeight='bold'>
                              {record.user.fullName}
                            </Text>
                            <Text fontStyle={'italic'} m={0} p={0}>
                              {record.user.email}
                            </Text>
                            {record.cvDTO.view ? <Tag colorScheme='yellow'>Đã xem</Tag> : <Tag colorScheme='green'>Chưa xem</Tag>}
                          </VStack>
                        </HStack>

                        <VStack align='end' spacing={0}>
                          <Text m={0} p={0} fontSize={'xs'} fontStyle={'italic'}>
                            Thời gian làm bài: <Tag>{record.startTime}</Tag>
                          </Text>
                          <ViewACodeTestResult record={record} load={load} setLoad={setLoad} />
                        </VStack>
                      </HStack>
                    </Box>
                  ))}
                </>
              ) : (
                <>
                  <Text m={30}>Không có bản ghi nào</Text>
                </>
              )}
            </SimpleGrid>
          </HStack>
        </VStack>
      ) : (
        <>
          <VStack mb={30} w={'100%'} minH={800} pl={30} pr={30} spacing={5}>
            <Center>
              <Text>Chưa có kết quả</Text>
            </Center>
          </VStack>
        </>
      )}
    </Box>
  )
}
