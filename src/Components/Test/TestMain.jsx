import { Box, CardHeader, Heading, Container, FormControl, VStack, FormErrorMessage, FormLabel, SlideFade, Stack, Input, HStack, CardBody, Card, Text, Radio, RadioGroup, StackDivider, Button, useToast, Center } from '@chakra-ui/react'
import { useField } from 'formik'
import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import './test.css'
import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, AlertDialogCloseButton, useDisclosure } from '@chakra-ui/react'
import { useNavigate, useParams } from 'react-router-dom'
import { testService } from '../../Service/test.service'
import { toast } from 'react-toastify'
import { OverlayComponent } from '../../Components-admin/OverlayComponent'

export const TestMain = () => {
  const toast = useToast()
  const { id } = useParams()
  const [test, setTest] = useState(null)
  const [start, setStart] = useState(false)
  const navigate = useNavigate()
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token

  // handle start
  const handleStartTest = async () => {
    if (test.start) {
      setStart(true)
    } else {
      const form = {
        id: 1,
        testId: id,
        startTime: new Date().toLocaleString(),
      }
      testService
        .StartRecord(accessToken, form)
        .then((response) => {
          if (response.message === 'Success !') {
            setStart(true)
          } else {
            toast({
              title: 'Thực hiện bài test',
              description: 'Đã có lỗi xảy ra, hãy thử lại sau',
              status: 'info',
              duration: 9000,
              isClosable: true,
            })
          }
        })
        .catch((er) => console.log(er))
    }
  }

  useEffect(() => {
    testService
      .getATest(accessToken, id)
      .then((response) => {
        setTest(response)
      })
      .catch((error) => console.error(error))
  }, [])

  // const isTestStarted = () => {
  //   if (test && test.startTime) {
  //     const startTime = new Date(test.startTime).getTime()
  //     const currentTime = new Date().getTime()
  //     return currentTime >= startTime
  //   }
  //   return false
  // }

  // const isNotEnded = () => {
  //   if (test && test.endTime) {
  //     const endTime = new Date(test.endTime).getTime()
  //     const currentTime = new Date().getTime()
  //     return currentTime <= endTime
  //   }
  // }

  return (
    <>
      <VStack h={1300} fontFamily={'Roboto'} fontWeight={400} mb={20}>
        <SlideFade in={true} offsetY={20}>
          <Heading size={'lg'} m={'6'} mt={24} ml={2} textAlign={'left'} marginRight='auto'></Heading>
          <Stack direction='row' spacing={4}></Stack>
        </SlideFade>
        <HStack align={'flex-start'} w={'60vw'} m={5} p={5}>
          {test != null ? (
            test.record === false ? (
              <>
                {start ? (
                  <></>
                ) : (
                  <Button w={'100%'} size='lg' colorScheme='teal' onClick={handleStartTest}>
                    Bắt đầu làm bài
                  </Button>
                )}
              </>
            ) : (
              <Button w={'100%'}>Bài kiểm tra không thể thực hiện lại</Button>
            )
          ) : (
            <Button w={'100%'}>Loading...</Button>
          )}

          {start ? <DoTest test={test} /> : <></>}
        </HStack>
      </VStack>
    </>
  )
}

function AlertDialogExample({ onConfirm }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()
  return (
    <>
      <Button onClick={onOpen}>Nộp</Button>
      <OverlayComponent isOpen={isOpen} onClose={onClose}>
        <Center h='100vh' w='100vw' bg='rgba(0, 0, 0, 0.4)'>
          <Box overflow='auto' fontFamily='Roboto' p={5} w='400px' bgColor='white' borderRadius='10px'>
            <Heading fontFamily={'Roboto'} fontSize='lg' mb={4}>
              Xác nhận
            </Heading>
            <Text mb={4}>Bạn có chắc chắn muốn nộp câu trả lời này không?</Text>
            <HStack justifyContent='flex-end'>
              <Button variant='ghost' onClick={onClose}>
                Hủy
              </Button>
              <Button
                colorScheme='blue'
                mr={3}
                onClick={() => {
                  onConfirm()
                  onClose()
                }}>
                Xác nhận
              </Button>
            </HStack>
          </Box>
        </Center>
      </OverlayComponent>
    </>
  )
}

const DoTest = ({ test }) => {
  const [selectedOptions, setSelectedOptions] = useState({})
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const navigate = useNavigate()
  const handleOptionChange = (questionId, optionId) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [questionId]: optionId,
    }))
  }
  const isOptionChecked = (questionId, optionId) => {
    return selectedOptions[questionId] === optionId
  }
  //// panigate

  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 4

  const pageCount = Math.ceil(test.questions.length / itemsPerPage)
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected)
  }

  const displayQuestion = test.questions.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)

  // count
  const parseDateTime = (dateTimeString) => {
    const [time, date] = dateTimeString.split(' ')
    const [hours, minutes, seconds] = time.split(':').map(Number)
    const [day, month, year] = date.split('/').map(Number)
    return new Date(year, month - 1, day, hours, minutes, seconds)
  }

  // Calculate end time
  const startTime = test.startTime ? parseDateTime(test.startTime) : new Date()
  const endTime = new Date(startTime.getTime() + test.time * 60000)

  // Timer
  const calculateTimeLeft = () => {
    const now = new Date()
    const difference = endTime - now
    const minutesLeft = Math.floor(difference / 60000)
    const secondsLeft = Math.floor((difference % 60000) / 1000)
    return {
      minutes: minutesLeft,
      seconds: secondsLeft,
    }
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft()
      if (newTimeLeft.minutes <= 0 && newTimeLeft.seconds <= 0) {
        clearInterval(timer)
        // Handle test end (e.g., submit test)
      } else {
        setTimeLeft(newTimeLeft)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  ///submit
  const handleConfirm = () => {
    const form = {
      id: 1,
      testId: test.id,
      score: calculateScore(),
      record: JSON.stringify(selectedOptions),
    }
    testService
      .record(accessToken, form)
      .then((reponse) => navigate('/test'))
      .catch((error) => console.log(error))
  }

  const calculateScore = () => {
    let score = 0
    const selectedOptionsArray = convertObjectToArray(selectedOptions)
    selectedOptionsArray.forEach((selected) => {
      const question = test.questions.find((question) => question.id.toString() === selected.questionId)
      question.options.map((o) => {
        if (o.answer && o.optionText === selected.selectedOptionText) {
          score++
        }
      })
    })
    return score
  }

  function convertObjectToArray(selectedOptions) {
    return Object.entries(selectedOptions).map(([questionId, selectedOptionText]) => ({
      questionId,
      selectedOptionText,
    }))
  }

  //

  ///

  return (
    <div className='cv' style={{ width: '1000px' }}>
      <HStack alignItems='flex-start'>
        <div className='page' style={{ fontFamily: 'Roboto', padding: '20px' }}>
          <div>
            <HStack w={'100%'} justifyContent='space-between'>
              <Text>Bài test: {test.summary}</Text>
              <Text>
                Trang: {currentPage + 1}/{pageCount}
              </Text>
            </HStack>
          </div>
          <div>
            {displayQuestion.map((question, index) => (
              <Card key={question.id} fontFamily='Roboto' mt={2}>
                <CardHeader>
                  <Heading fontSize={16} size='m'>
                    Question: {question.questionText}
                  </Heading>
                </CardHeader>
                <CardBody>
                  <ul>
                    <RadioGroup value={selectedOptions[question.id]} onChange={(value) => handleOptionChange(question.id, value)}>
                      <Stack>
                        {question.options.map((option) => (
                          <Radio fontSize={15} key={option.id} value={option.optionText} isChecked={isOptionChecked(question.id, option.id)}>
                            {option.optionText}
                          </Radio>
                        ))}
                      </Stack>
                    </RadioGroup>
                  </ul>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
        <VStack>
          <Box h={'100%'} p={2} borderWidth={1}>
            <VStack>
              <ReactPaginate
                className='question-panigate1'
                pageCount={pageCount}
                onPageChange={handlePageChange}
                previousLabel='trang trước'
                nextLabel='trang sau'
                breakLabel='...'
                breakClassName='page-item1'
                breakLinkClassName='page-link1'
                containerClassName='pagination'
                pageClassName='page-item1'
                pageLinkClassName='page-link'
                previousClassName='before'
                nextClassName='next'
                previousLinkClassName='page-link'
                nextLinkClassName='page-link'
                activeClassName='active'
              />
              <VStack>
                <div
                  style={{
                    fontFamily: 'Arial',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: 'black',
                  }}>
                  <div>
                    {timeLeft.minutes} : {timeLeft.seconds}
                  </div>
                </div>
              </VStack>
            </VStack>
          </Box>
          <AlertDialogExample onConfirm={handleConfirm} />
        </VStack>
      </HStack>
    </div>
  )
}
