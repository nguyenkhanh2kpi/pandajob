import { Avatar, Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Card, CardHeader, Center, Checkbox, Flex, HStack, Heading, Icon, Spinner, Tag, Text, VStack, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { testService } from '../../../Service/test.service'
import { ViewCVTestResult } from './ViewCVTestResult'
import { ViewACodeTestResult } from './ViewACodeTestResult'
import { executeCode } from '../../../Components/CodeEditor/api'
import { VscPassFilled } from 'react-icons/vsc'
import { MdCancel } from 'react-icons/md'
import { IoPricetagsOutline } from 'react-icons/io5'

export const CodeTestResultMain = () => {
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const params = useParams()
  const [records, setRecords] = useState(null)
  const [results, setResults] = useState({})
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const [listRordSelected, SetListSelected] = useState([])

  useEffect(() => {
    testService
      .getAllRecordCodeByTestId(accessToken, params.testId)
      .then((response) => {
        setRecords(response.data)
        runAllTests(response.data)
      })
      .catch((er) => console.log(er))
  }, [accessToken, params.testId])

  const runCode = async (language, sourceCode) => {
    if (!sourceCode) throw new Error('Source code is required')
    try {
      const { run: result } = await executeCode(language, sourceCode)

      if (result.stderr) {
        throw new Error(result.stderr)
      }
      return result.output
    } catch (error) {
      console.error('Error executing code:', error)
      throw new Error(error.message || 'Unable to run code')
    }
  }

  const runAllTests = async (records) => {
    setLoading(true)
    const tempResults = {}
    for (const record of records) {
      const questionResults = await Promise.all(
        JSON.parse(record.record).map(async (question, index) => {
          const code = JSON.parse(question.value)[question.language]
          const testCode = JSON.parse(question.testFunction)[question.language]
          const fullCode = `${code}\n\n${testCode}`
          try {
            const output = await runCode(question.language, fullCode)
            return output.includes('true') ? 'pass' : 'fail'
          } catch {
            return 'wait'
          }
        })
      )
      tempResults[record.id] = questionResults
      setLoading(false)
    }
    setResults(tempResults)
  }
  

  // filter value
  const [filterButton, setFilterButton] = useState('Tất cả')

  return (
    <Box fontFamily={'Roboto'} fontWeight={400} backgroundColor={'#e9f3f5'} overflow='hidden'>
      <Breadcrumb pt={30}>
        <BreadcrumbItem>
          <BreadcrumbLink href={`/process/screening/`}>Code Test</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href='#'>Kết quả</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      {records && !loading ? (
        <VStack mb={30} w={'100%'} minH={800} pl={30} pr={30} spacing={5}>
          <HStack m={0} p={0} w={'100%'} align={'flex-start'}>
            <Text fontWeight={'bold'} m={0} p={0}>
              {records.length} ứng viên đã thực hiện bài test
            </Text>
          </HStack>
          <HStack justifyContent={'space-between'} m={0} p={0} w={'100%'} align={'flex-start'}>
            <HStack>
              <Button size='sm' colorScheme='blue' variant={filterButton === 'Tất cả' ? 'solid' : 'outline'} onClick={() => setFilterButton('Tất cả')}>
                Tất cả
              </Button>
              <Button size='sm' colorScheme='blue' variant={filterButton === 'Đã xem' ? 'solid' : 'outline'} onClick={() => setFilterButton('Đã xem')}>
                Đã xem
              </Button>
              <Button size='sm' colorScheme='blue' variant={filterButton === 'Chưa xem' ? 'solid' : 'outline'} onClick={() => setFilterButton('Chưa xem')}>
                Chưa xem
              </Button>
            </HStack>
            <HStack>
              <Checkbox>Chọn tất cả</Checkbox>
              <Button leftIcon={<IoPricetagsOutline />} colorScheme='teal' variant='outline'>
                Gán nhãn
              </Button>
            </HStack>
          </HStack>
          <HStack w={'100%'}>
            <VStack borderRadius={10} w={'100%'}>
              {records.map((record) => (
                <Card bgColor={'#f7fcfc'} _hover={{ boxShadow: 'lg', cursor: 'pointer' }} w={'100%'} key={record.id}>
                  <CardHeader>
                    <Flex w={'100%'} spacing='4'>
                      <Box w={'35%'} h={'100%'}>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                          <Checkbox />
                          <Avatar name={record.user.fullName} src={record.user.avatar} />
                          <Box>
                            <Heading size='sm'>{record.user.fullName}</Heading>
                            <Text m={0} p={0}>
                              Email: {record.user.email}
                            </Text>
                            <Text m={0} p={0}>
                              Thời gian: <Tag colorScheme='blue'>{record.startTime}</Tag>
                            </Text>
                            <Box>{record.cvDTO.view ? <Tag colorScheme='grey'>Đã xem</Tag> : <Tag colorScheme='yellow'>Chưa xem</Tag>}</Box>
                            <ViewCVTestResult cv={record.cvDTO} />
                          </Box>
                        </Flex>
                      </Box>
                      <Box w={'65%'} h={'100%'}>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                          <Box w={'100%'}>
                            <Heading size='sm'>Kết quả Test</Heading>
                            <HStack>
                              {JSON.parse(record.record).map((question, index) => {
                                const result = results[record.id]?.[index]
                                return (
                                  <VStack key={index}>
                                    <Text m={0} p={0}>
                                      Câu {index + 1}
                                    </Text>
                                    <Icon as={result === 'pass' ? VscPassFilled : MdCancel} w={8} h={8} color={result === 'pass' ? 'green' : 'red'} />
                                  </VStack>
                                )
                              })}
                            </HStack>
                            <ViewACodeTestResult results={results} records={record.record} />
                          </Box>
                        </Flex>
                      </Box>
                    </Flex>
                  </CardHeader>
                </Card>
              ))}
            </VStack>
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
