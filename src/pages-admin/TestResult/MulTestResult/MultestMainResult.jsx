import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, HStack, SimpleGrid, Text, Image, Link, VStack, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Tag, Flex, Select, Input, Avatar, Spinner, Tab } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { testService } from '../../../Service/test.service'
import { ViewDetailUserMultest } from './ViewDetailUserMultest'

export const MultestMainResult = () => {
  const params = useParams()
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const [records, setRecords] = useState(null)
  const [filterdRecords, setFilteredRecords] = useState(null)
  const [load, setLoad] = useState(false)

  useEffect(() => {
    testService
      .getAllRecordCodeByTestId(accessToken, params.testId)
      .then((response) => {
        setRecords(response.data)
        setFilteredRecords(response.data)
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

  const totalQuestions = (record) => Object.keys(record).length

  if (!filterdRecords) {
    return (
      <HStack minH={500} w='100%' justifyContent='center' alignItems='center'>
        <Spinner thickness='8px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='4xl' />
      </HStack>
    )
  } else
    return (
      <Box minHeight={2000} overflow='auto' fontFamily={'Roboto'} fontWeight={400} backgroundColor={'#f5f9fa'}>
        <HStack pt={30} justifyContent={'space-between'} w={'100%'}>
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink fontStyle={'italic'} fontWeight={'bold'} href='#'>
                Kết quả test trắc nghiệm
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </HStack>
        <Flex mx={30} gap={2}>
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
        {filterdRecords.length > 0 ? (
          <Box w={'100%'}>
            <SimpleGrid w={'95%'} m={30} columns={{ base: 1, md: 2 }} spacing={6}>
              {filterdRecords.map((record, index) => (
                <Box key={index} w={'100%'} bgColor={'white'} borderRadius={20} boxShadow={'md'} p={5}>
                  <HStack justifyContent={'space-between'} spacing={4} mb={4}>
                    <HStack m={0} p={0} justifyContent={'flex-start'}>
                      <Avatar borderRadius='full' boxSize='50px' src={record.user.avatar} alt={record.user.fullName} />
                      <VStack spacing={0} align='start'>
                        <Text m={0} p={0} fontWeight='bold'>
                          {record.user.fullName}
                        </Text>
                        <Text m={0} p={0} fontWeight='bold'>
                          Số câu đúng:{' '}
                          <Tag fontWeight={'bold'} colorScheme='green'>
                            {record.score}/{totalQuestions(JSON.parse(record.record))}
                          </Tag>
                        </Text>
                        <Text fontStyle={'italic'} m={0} p={0}>
                          {record.user.email}
                        </Text>
                        {record.cvDTO.view ? <Tag colorScheme='yellow'>Đã xem</Tag> : <Tag colorScheme='green'>Chưa xem</Tag>}
                        <ViewDetailUserMultest record={record} load={load} setLoad={setLoad} />
                      </VStack>
                    </HStack>

                    <VStack align='end' spacing={0}>
                      <Text m={0} p={0} fontSize={'xs'} fontStyle={'italic'}>
                        Thời gian làm bài: <Tag>{record.startTime}</Tag>
                      </Text>
                    </VStack>
                  </HStack>
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        ) : (
          <>
            <Text m={30}>Không có bản ghi nào</Text>
          </>
        )}
      </Box>
    )
}
