import { Box, Button, HStack, Text, VStack, Code, useDisclosure, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Spinner, useToast, Link, Tag, Flex, Checkbox, Divider, Icon } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { OverlayComponent } from '../../../Components-admin/OverlayComponent'
import { CheckCircleIcon, CloseIcon } from '@chakra-ui/icons'
import { QuestionInCodeTestResult } from './QuestionInCodeTestResult'
import { executeCode } from '../../../Components/CodeEditor/api'
import { labelService } from '../../../Service/label.service'
import { IoPricetagsOutline } from 'react-icons/io5'
import { cvService } from '../../../Service/cv.service'
import { MdCancel } from 'react-icons/md'

export const ViewACodeTestResult = ({ record, load, setLoad }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const parsedRecords = JSON.parse(record.record)
  const [output, setOutput] = useState({})
  const [isLoading, setIsLoading] = useState({})
  const [isError, setIsError] = useState({})
  const toast = useToast()

  const runCode = async (language, sourceCode, questionId) => {
    if (!sourceCode) return
    setIsLoading((prev) => ({ ...prev, [questionId]: true }))
    try {
      const { run: result } = await executeCode(language, sourceCode)
      setOutput((prev) => ({
        ...prev,
        [questionId]: result.output.split('\n'),
      }))
      setIsError((prev) => ({
        ...prev,
        [questionId]: !!result.stderr,
      }))
    } catch (error) {
      console.log(error)
      toast({
        title: 'An error occurred.',
        description: error.message || 'Unable to run code',
        status: 'error',
        duration: 6000,
      })
    } finally {
      setIsLoading((prev) => ({ ...prev, [questionId]: false }))
    }
  }

  //   label
  const [userLabels, setUserLabels] = useState(record.cvDTO.labels ? JSON.parse(record.cvDTO.labels) : {})
  const [labels, setLabels] = useState([])
  useEffect(() => {
    labelService
      .getMyLabel(accessToken)
      .then((response) => setLabels(response))
      .catch((er) => console.log(er))
  }, [])
  // xử lý gán nhãn
  const handleLabelClick = (labelId) => {
    setUserLabels((prevCheckedLabels) => ({
      ...prevCheckedLabels,
      [labelId]: !prevCheckedLabels[labelId],
    }))
  }
  useEffect(() => {
    const checkedLabelIds = Object.keys(userLabels).filter((labelId) => userLabels[labelId])
    if (checkedLabelIds.length >= 0 && labels.length > 0) {
      cvService
        .updateLabel(accessToken, record.cvDTO.id, JSON.stringify(userLabels))
        .then((response) => console.log('chel', JSON.stringify(response)))
        .catch((er) => console.log(er))
    }
  }, [userLabels])

  //cv status
  const handleOnChangeStatus = (cvId, status) => {
    cvService
      .updateStatus(accessToken, cvId, status)
      .then((response) => {
        toast({ description: response.message })
        setLoad(!load)
      })
      .catch((er) => console.log(er))
  }

  // xem cv
  const handleChangeView = () => {
    cvService
      .updateView(accessToken, record.cvDTO.id, !record.cvDTO.view)
      .then((response) => {
        console.log(response)
        setLoad(!load)
      })
      .catch((er) => console.log(er))
      .finally()
  }

  useEffect(() => {}, [output])

  const [outoValLoading, setOutToValLoading] = useState(false)

  // const handleAutoValuated = () => {
  //   setOutToValLoading(true)
  //   parsedRecords.map((question, index) => {
  //     const code = JSON.parse(question.value)[question.language]
  //     const testCode = JSON.parse(question.testFunction)[question.language]
  //     const fullCode = `${code}\n\n${testCode}`
  //     runCode(question.language, fullCode, question.id)
  //   })
  //   setOutToValLoading(false)
  // }
  const handleAutoValuated = async () => {
    setOutToValLoading(true)
    try {
      const results = await Promise.all(
        parsedRecords.map(async (question) => {
          const code = JSON.parse(question.value)[question.language]
          const testCode = JSON.parse(question.testFunction)[question.language]
          const fullCode = `${code}\n\n${testCode}`

          try {
            await runCode(question.language, fullCode, question.id)
            return { success: true }
          } catch (error) {
            return { success: false, error, questionId: question.id }
          }
        })
      )
    } catch (err) {
      console.error('Lỗi trong quá trình xử lý:', err)
    } finally {
      setOutToValLoading(false)
    }
  }

  return (
    <>
      <Button colorScheme='green' size={'xs'} onClick={onOpen}>
        Xem Chi tiết bài test
      </Button>
      <OverlayComponent isOpen={isOpen} onClose={onClose}>
        <Box h={'650px'} borderRadius={10} p={5} bgColor={'white'} w={'1200px'}>
          <HStack justifyContent={'flex-end'} w={'100%'}>
            <Button variant='ghost' onClick={onClose} size={'sm'} aria-label='Close'>
              <CloseIcon />
            </Button>
          </HStack>
          <HStack w={'100%'} h={'600px'} overflowY={'auto'} align={'start'} spacing={4}>
            <VStack w={'30%'} align={'flex-start'}>
              <Text m={0} p={0} fontWeight={'bold'} size={'sm'}>
                {record.user.fullName} - {record.user.email}
              </Text>
              <Link isExternal href={record.cvDTO.url}>
                CV link <Tag colorScheme='yellow'>{record.cvDTO.view ? 'Đã xem' : 'Chưa xem'}</Tag>
              </Link>
              <Text fontWeight={'bold'} m={0} p={0}>
                Nhãn
              </Text>
              <Flex gap={3} wrap='wrap'>
                {labels ? (
                  labels.map((label) => (
                    <Button onClick={() => handleLabelClick(label.id)} key={label.id} colorScheme='green' variant={userLabels[label.id] ? 'solid' : 'outline'} size={'xs'} leftIcon={<IoPricetagsOutline />}>
                      {label.name}
                    </Button>
                  ))
                ) : (
                  <></>
                )}
              </Flex>
              <Text fontWeight={'bold'} m={0} p={0}>
                Trạng thái CV
              </Text>
              <Flex gap={3} wrap={'wrap'}>
                {Object.keys(State).map((key) => (
                  <Button onClick={() => handleOnChangeStatus(record.cvDTO.id, key)} variant={record.cvDTO.state === key ? 'solid' : 'outline'} size={'xs'} colorScheme='green' key={key}>
                    {State[key].replace(/_/g, ' ')}
                  </Button>
                ))}
              </Flex>
              <Checkbox onChange={handleChangeView} defaultChecked={record.cvDTO.view} colorScheme='green'>
                Đã xem
              </Checkbox>
            </VStack>
            <VStack w={'70%'}>
              <Button isLoading={outoValLoading} colorScheme='green' onClick={handleAutoValuated} size={'sm'}>
                Chấm tự động
              </Button>
              <Accordion borderWidth={1} w={'100%'} allowToggle>
                {parsedRecords.map((question, index) => {
                  const code = JSON.parse(question.value)[question.language]
                  const testCode = JSON.parse(question.testFunction)[question.language]
                  const fullCode = `${code}\n\n${testCode}`

                  const questionOutput = output[question.id]
                  const questionOutputString = questionOutput ? questionOutput.join('') : ''
                  const isPass = questionOutputString.endsWith('1')

                  return (
                    <AccordionItem key={question.id}>
                      <h2>
                        <AccordionButton>
                          <Box as='span' flex='1' textAlign='left'>
                            Câu {index + 1} {questionOutput && (isPass ? <Icon color={'green'} as={CheckCircleIcon} /> : <Icon color={'red'} as={MdCancel} />)}
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        <QuestionInCodeTestResult questionTxt={question.questionText} />
                        <Text fontWeight={'bold'}>Câu trả lời của ứng viên</Text>
                        <Text>Ngôn ngữ: {question.language}</Text>
                        <Box as='pre' whiteSpace='pre-wrap' overflow='auto'>
                          <Code p={2} width='100%'>
                            {code}
                          </Code>
                        </Box>
                        <Button mt={4} colorScheme='green' size={'sm'} onClick={() => runCode(question.language, fullCode, question.id)}>
                          Run
                        </Button>
                        {isLoading[question.id] && <Spinner size='sm' ml={2} />}
                        {output[question.id] && (
                          <Box mt={4} p={2} border='1px' borderColor='gray.200'>
                            <Text fontWeight={'bold'}>Output:</Text>
                            <Code as='pre' whiteSpace='pre-wrap' p={2}>
                              {output[question.id].join('\n')}
                            </Code>
                          </Box>
                        )}
                        {isError[question.id] && (
                          <Text mt={2} color='red.500'>
                            An error occurred while running the code.
                          </Text>
                        )}
                      </AccordionPanel>
                    </AccordionItem>
                  )
                })}
              </Accordion>
            </VStack>
          </HStack>
        </Box>
      </OverlayComponent>
    </>
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
