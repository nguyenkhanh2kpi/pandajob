import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Flex,
  FormControl,
  HStack,
  Heading,
  IconButton,
  Image,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SlideFade,
  Stack,
  Text,
  UnorderedList,
  VStack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import React, { useCallback, useRef, useState } from 'react'
import { createReactEditorJS } from 'react-editor-js'
import { BiChat, BiLike, BiShare } from 'react-icons/bi'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { EDITOR_JS_TOOLS, demoDefaultValue } from './tool'
import { json, useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { testService } from '../../Service/test.service'
import { upLoadService } from '../../Service/uploadFile.service'

export const HomeEssay = () => {
  const toast = useToast()
  const navigate = useNavigate()
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const params = useParams()
  const ReactEditorJS = createReactEditorJS()
  const [start, setStart] = useState(false)
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)
  const [timeLeft, setTimeLeft] = useState({ minutes: 0, seconds: 0 })
  // lay bai kiem tra
  const [test, settest] = useState(null)
  useEffect(() => {
    testService.getATestById(accessToken, params.testId).then((response) => {
      settest(response)
      const parsedStartTime = response.startTime ? parseDateTime(response.startTime) : new Date()
      const calculatedEndTime = new Date(parsedStartTime.getTime() + response.time * 60000)
      setStartTime(parsedStartTime)
      setEndTime(calculatedEndTime)
    })
  }, [params.testId])

  // xu lý form
  const editorCore = useRef(null)
  const handleInitialize = useCallback((instance) => {
    editorCore.current = instance
  }, [])

  //cua so xác nhận
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isEndOpen, onOpen: onEndOpen, onClose: onEndClose } = useDisclosure()

  const handleSave = async () => {
    onOpen()
  }
  // submit
  const handleConfirmSubmit = async () => {
    onClose()
    const savedData = await editorCore.current.save()
    const uploadPromises = savedData.blocks.map(async (element) => {
      if (element.type === 'simpleImage' && !element.data.url.includes('http')) {
        element.data.url = await handleUploadFile(element.data.url)
      }
    })
    await Promise.all(uploadPromises)
    const form = {
      id: 1,
      testId: params.testId,
      score: 0,
      record: JSON.stringify(savedData),
    }
    testService
      .record(accessToken, form)
      .then((reponse) => navigate('/test'))
      .catch((error) => console.log(error))
  }
  //  upload
  const handleUploadFile = async (fileStringBase64) => {
    const file = DataURIToBlob(fileStringBase64)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await upLoadService.uploadFile(accessToken, formData)
      return response.data
    } catch (error) {
      console.log(error)
      return null
    }
  }

  //   hàm convert hình base64 thành request
  function DataURIToBlob(dataURI) {
    const splitDataURI = dataURI.split(',')
    const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0]
    const ia = new Uint8Array(byteString.length)
    for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i)
    return new Blob([ia], { type: mimeString })
  }

  // handle start
  const handleStartTest = async () => {
    if (test.start) {
      setStart(true)
    } else {
      const form = {
        id: 1,
        testId: test.id,
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

  // const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft()
      if (newTimeLeft.minutes <= 0 && newTimeLeft.seconds <= 0) {
        clearInterval(timer)
        onEndOpen()
        // if (start) {
        //   onEndOpen()
        // }
      } else {
        setTimeLeft(newTimeLeft)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [endTime])

  const renderEssayQuestion = (essayQuestion) => {
    const data = JSON.parse(essayQuestion)
    return data.blocks.map((block) => {
      switch (block.type) {
        case 'header':
          return (
            <Heading fontFamily={'Roboto'} as={`h${block.data.level}`} size={`md`} my={2} key={block.id}>
              {block.data.text}
            </Heading>
          )
        case 'paragraph':
          return (
            <Text fontFamily={'Roboto'} my={2} key={block.id}>
              {block.data.text}
            </Text>
          )
        case 'list':
          return (
            <UnorderedList fontFamily={'Roboto'} key={block.id} my={2}>
              {block.data.items.map((item, index) => (
                <ListItem key={index}>{item}</ListItem>
              ))}
            </UnorderedList>
          )
        case 'simpleImage':
          return (
            <Box key={block.id} my={2}>
              <Image src={block.data.url} alt={block.data.caption || 'Image'} />
              {block.data.caption && (
                <Text textAlign='center' mt={2}>
                  {block.data.caption}
                </Text>
              )}
            </Box>
          )
        default:
          return null
      }
    })
  }

  return (
    <>
      {test ? (
        <>
          <VStack minH={1000} bgColor={'#f0f4f5'} fontFamily={'Roboto'}>
            <SlideFade offsetY={20}>
              <Heading size={'lg'} m={'6'} mt={24}></Heading>
            </SlideFade>

            {test != null ? (
              test.record === false ? (
                <>
                  {start ? (
                    <></>
                  ) : (
                    <HStack align={'flex-start'} w={'60vw'} m={5} p={5}>
                      <Button w={'100%'} size='lg' colorScheme='teal' onClick={handleStartTest}>
                        Bắt đầu làm bài
                      </Button>
                    </HStack>
                  )}
                </>
              ) : (
                <HStack align={'flex-start'} w={'60vw'} m={5} p={5}>
                  <Button w={'100%'}>Bài kiểm tra không thể thực hiện lại</Button>
                </HStack>
              )
            ) : (
              <HStack align={'flex-start'} w={'60vw'} m={5} p={5}>
                <Button w={'100%'}>Loading...</Button>
              </HStack>
            )}

            {start ? (
              <>
                <HStack w={'97vw'}>
                  <HStack justifyContent={'space-between'} w={'100%'}>
                    <Button>
                      {timeLeft.minutes > 0 ? timeLeft.minutes : 0} : {timeLeft.seconds > 0 ? timeLeft.seconds : 0}
                    </Button>
                    <Button onClick={handleSave}>Nộp câu trả lời</Button>
                  </HStack>
                </HStack>
                <HStack pb={100} justifyContent={'space-between'} alignItems={'flex-start'} minH={1000} align={'flex-start'} w={'97vw'}>
                  <Box w={'37%'}>
                    <Card w={'100%'}>
                      <CardBody>
                        <Heading fontFamily={'Roboto'} size='md'>
                          Câu hỏi
                        </Heading>
                        {renderEssayQuestion(test.essayQuestion)}
                      </CardBody>
                    </Card>
                  </Box>
                  <Box w={'63%'}>
                    <Card minH={1000} w={'100%'}>
                      <CardBody>
                        <FormControl>
                          <ReactEditorJS defaultValue={demoDefaultValue} editorCore={editorCore} onInitialize={handleInitialize} tools={EDITOR_JS_TOOLS} />
                        </FormControl>
                      </CardBody>
                    </Card>
                  </Box>
                </HStack>
              </>
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
          </VStack>
        </>
      ) : (
        <></>
      )}
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
