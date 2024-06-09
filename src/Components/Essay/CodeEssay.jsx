import { Box, Button, Center, HStack, Heading, SlideFade, Text, VStack, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { CodeFrameTest } from './CodeFrameTest'
import { useNavigate, useParams } from 'react-router-dom'
import { testService } from '../../Service/test.service'

export const CodeEssay = () => {
  const toast = useToast()
  const params = useParams()
  const navigate = useNavigate()
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const [start, setStart] = useState(false)
  const [endTime, setEndTime] = useState(null)
  const [startTime, setStartTime] = useState(null)
  const [timeLeft, setTimeLeft] = useState({ minutes: 0, seconds: 0 })

  // test
  const [test, settest] = useState(null)
  useEffect(() => {
    testService
      .getATestById(accessToken, params.testId)
      .then((response) => {
        settest(response)
        const parsedStartTime = response.startTime ? parseDateTime(response.startTime) : new Date()
        const calculatedEndTime = new Date(parsedStartTime.getTime() + response.time * 60000)
        setStartTime(parsedStartTime)
        setEndTime(calculatedEndTime)
      })
      .catch((er) => console.log(er))
  }, [])

  // handle start
  const handleStartTest = async () => {
    if (test.start) {
      setStart(true)
    } else {
      const form = {
        id: 1,
        testId: params.testId,
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
              status: 'error',
              duration: 9000,
              isClosable: true,
            })
          }
        })
        .catch((er) => console.log(er))
    }
  }

  // handletime
  const parseDateTime = (dateTimeString) => {
    const [time, date] = dateTimeString.split(' ')
    const [hours, minutes, seconds] = time.split(':').map(Number)
    const [day, month, year] = date.split('/').map(Number)
    return new Date(year, month - 1, day, hours, minutes, seconds)
  }

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

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft()
      if (newTimeLeft.minutes <= 0 && newTimeLeft.seconds <= 0) {
        clearInterval(timer)
        onEndOpen()
      } else {
        setTimeLeft(newTimeLeft)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [endTime])

  //cua so xác nhận
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isEndOpen, onOpen: onEndOpen, onClose: onEndClose } = useDisclosure()


  const handleSave = async () => {
    onOpen()
  }
  // submit
  const handleConfirmSubmit = async () => {
    onClose()
    const form = {
      id: 1,
      testId: params.testId,
      score: 0,
      record: JSON.stringify('abc'),
    }
    testService
      .record(accessToken, form)
      .then((reponse) => navigate('/test'))
      .catch((error) => console.log(error))
  }

  return (
    <>
      {test ? (
        <VStack minH={730} bgColor={'#f0f4f5'} fontFamily={'Roboto'}>
          <SlideFade offsetY={20}>
            <Heading size={'lg'} mt={16}></Heading>
          </SlideFade>
          {test.record === false ? (
            <>
              {start ? (
                <>
                  <CodeFrameTest handleSave={handleSave} timeLeft={timeLeft} listQuestion={test.codeQuestions} />
                </>
              ) : (
                <HStack align={'flex-start'} w={'60vw'} m={5} p={5}>
                  <Button w={'100%'} size='lg' colorScheme='teal' onClick={handleStartTest}>
                    Bắt đầu làm bài code
                  </Button>
                </HStack>
              )}
            </>
          ) : (
            <>
              <HStack align={'flex-start'} w={'60vw'} m={5} p={5}>
                <Button w={'100%'}>Bài kiểm tra không thể thực hiện lại</Button>
              </HStack>
            </>
          )}
        </VStack>
      ) : (
        <></>
      )}

      <Overlay isOpen={isOpen} onClose={onClose}>
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
              <Button colorScheme='blue' mr={3} onClick={handleConfirmSubmit}>
                Xác nhận
              </Button>
            </HStack>
          </Box>
        </Center>
      </Overlay>
      <Overlay isOpen={isEndOpen} onClose={onEndClose}>
        <Center h='100vh' w='100vw' bg='rgba(0, 0, 0, 0.4)'>
          <Box overflow='auto' fontFamily='Roboto' p={5} w='400px' bgColor='white' borderRadius='10px'>
            <Heading fontFamily={'Roboto'} fontSize='lg' mb={4}>
              Xác nhận
            </Heading>
            <Text mb={4}>Thời gian làm bài đã kết thúc bạn phải nộp bài</Text>
            <HStack justifyContent='flex-end'>
              <Button colorScheme='blue' mr={3} onClick={handleConfirmSubmit}>
                Xác nhận
              </Button>
            </HStack>
          </Box>
        </Center>
      </Overlay>
    </>
  )
}

const Overlay = ({ isOpen, onClose, children }) => {
  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: isOpen ? 'flex' : 'none',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999999,
  }

  return <div style={overlayStyle}>{children}</div>
}
