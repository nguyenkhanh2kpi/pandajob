import React, { useEffect, useMemo, useState } from 'react'
import {
  Heading,
  HStack,
  SlideFade,
  VStack,
  Image,
  Text,
  Button,
  Wrap,
  WrapItem,
  Avatar,
  FormLabel,
  Input,
  Select,
  Box,
  SimpleGrid,
  Link,
  Spacer,
  Textarea,
  Skeleton,
  Card,
  CardBody,
  Icon,
  Tag,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Flex,
  useToast,
  Spinner,
} from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { QuestionMarkItem } from './QuestionMarkItem'
import { interviewDetailService } from '../../Service/interviewDetail.service'
import { questionService } from '../../Service/question.service'
import { AiOutlineUser } from 'react-icons/ai'
import { CandidateDetailInProces } from '../Process/CandidateDetailInProcess'
import { cvService } from '../../Service/cv.service'
import { labelService } from '../../Service/label.service'
import { IoPricetagsOutline } from 'react-icons/io5'

export const MarkItem = ({ roomId, loadDetail, isClick, load, setLoad }) => {
  const toast = useToast()
  const [avg, setAvg] = useState(0)
  const [form, setForm] = useState({
    interviewDetailId: 0,
    comment: '',
    averageMark: 0,
    englishQuestion: [],
    technicalQuestion: [],
    softSkillQuestion: [],
  })
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token

  const handleMark = async () => {
    if (isNaN(form.averageMark) || form.averageMark < 0 || form.averageMark > 10) {
      toast({
        title: 'Yêu cầu chấm điểm',
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    } else {
      let data = {
        interviewDetailId: form.interviewDetailId,
        comment: form.comment,
        averageMark: form.averageMark,
        englishQuestion: JSON.stringify(form.englishQuestion),
        technicalQuestion: JSON.stringify(form.technicalQuestion),
        softSkillQuestion: JSON.stringify(form.softSkillQuestion),
      }
      await interviewDetailService
        .markCandidate(accessToken, data)
        .then((res) =>
          toast({
            description: res.message,
            status: 'info',
          })
        )
        .catch((er) => console.log(er.message))
    }
  }

  useEffect(() => {
    let totalMarks = 0
    let totalQuestions = 0
    if (form && form.englishQuestion && form.englishQuestion.length > 0) {
      totalMarks += form.englishQuestion.reduce((acc, ques) => acc + ques.mark, 0)
      totalQuestions += form.englishQuestion.length
    }
    if (form && form.softSkillQuestion && form.softSkillQuestion.length > 0) {
      totalMarks += form.softSkillQuestion.reduce((acc, ques) => acc + ques.mark, 0)
      totalQuestions += form.softSkillQuestion.length
    }
    if (form && form.technicalQuestion && form.technicalQuestion.length > 0) {
      totalMarks += form.technicalQuestion.reduce((acc, ques) => acc + ques.mark, 0)
      totalQuestions += form.technicalQuestion.length
    }
    const average = totalMarks / totalQuestions
    // setAvg(average)
  }, [form])

  useEffect(() => {
    if (loadDetail) {
      if (loadDetail.candidate.status === 'Đã chấm') {
        setForm((prevDisplayQuestion) => ({
          ...prevDisplayQuestion,
          englishQuestion: JSON.parse(loadDetail.englishQuestion),
          technicalQuestion: JSON.parse(loadDetail.technicalQuestion),
          softSkillQuestion: JSON.parse(loadDetail.softSkillQuestion),
          interviewDetailId: loadDetail.id,
          comment: loadDetail.comment,
          averageMark: loadDetail.averageScores,
        }))
      } else {
        setForm((prevDisplayQuestion) => ({
          ...prevDisplayQuestion,
          englishQuestion: [],
          technicalQuestion: [],
          softSkillQuestion: [],
          interviewDetailId: loadDetail.id,
          comment: '',
          averageMark: 0,
        }))
      }
    } else {
      setForm({
        interviewDetailId: 0,
        comment: '',
        averageMark: 0,
        englishQuestion: [],
        technicalQuestion: [],
        softSkillQuestion: [],
      })
    }
  }, [loadDetail])

  const handleAddQuestion = (id, newQuestion, mark, type) => {
    setForm((prevQuestion) => ({
      ...prevQuestion,
      [`${type}Question`]: [...prevQuestion[`${type}Question`], { id: id, question: newQuestion, mark: mark }],
    }))
  }

  const handleDeleteQuestion = (id, type) => {
    setForm((prevQuestion) => ({
      ...prevQuestion,
      [`${type}Question`]: prevQuestion[`${type}Question`].filter((q) => q.id !== id),
    }))
  }

  const handleOnChangeForm = (event) => {
    const { name, value } = event.target
    setForm((prevForm) => ({ ...prevForm, [name]: value }))
  }

  //   label
  const [userLabels, setUserLabels] = useState(JSON.parse(loadDetail.cv.labels))
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
        .updateLabel(accessToken, loadDetail.cv.id, JSON.stringify(userLabels))
        .then((response) => {})
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

  useEffect(() => {
    setUserLabels(JSON.parse(loadDetail.cv.labels))
  }, [loadDetail])

  if (isClick === true) {
    return (
      <HStack minH={500} w='100%' justifyContent='center' alignItems='center'>
        <Spinner thickness='8px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='4xl' />
      </HStack>
    )
  } else if (roomId === 0 || loadDetail === null)
    return (
      <Box p={9} borderRadius='lg' w={'100%'} backgroundColor={'#FFFFFF'}>
        <VStack>
          <Text>hãy chọn ứng viên</Text>
        </VStack>
      </Box>
    )
  else
    return (
      <VStack w={'100%'} align={'flex-start'}>
        <Box bgColor={'white'} borderRadius={20} boxShadow={'md'} p={10} w={'100%'}>
          <VStack alignItems={'flex-start'} w={'100%'}>
            <HStack w={'100%'} justifyContent={'space-between'}>
              <HStack w={'80%'} mb={3} alignItems='center' spacing={4}>
                <Avatar name={loadDetail.candidate.name} src={loadDetail.candidate.avatar} />
                <VStack align={'flex-start'}>
                  <Text m={0} p={0} fontWeight={'bold'}>
                    {loadDetail.candidate.name}-{loadDetail.candidate.email}
                  </Text>
                  <Link href={loadDetail.cv.url} isExternal>
                    Nộp cv ngày {loadDetail.cv.dateApply}
                    <ExternalLinkIcon mx='2px' />
                  </Link>
                </VStack>
              </HStack>
              <Tag colorScheme='yellow'>{loadDetail.candidate.status}</Tag>
            </HStack>
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
                <>
                  {' '}
                  {loadDetail.cv.state === key ? (
                    <Button display={loadDetail.cv.state === key} variant={loadDetail.cv.state === key ? 'solid' : 'outline'} size={'xs'} colorScheme='green' key={key}>
                      {State[key].replace(/_/g, ' ')}
                    </Button>
                  ) : (
                    <></>
                  )}
                </>
              ))}
            </Flex>
            {/* <iframe src={loadDetail.cv.url} width='100%' height='500px' style={{ border: 'none' }} title='Candidate CV' /> */}

            <Accordion w={'100%'} defaultIndex={[0]} allowMultiple>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as='span' flex='1' textAlign='left'>
                      Phỏng vấn với bộ câu hỏi
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <HStack w={'100%'}>
                    <FormLabel w={'20%'}>Điểm trung bình</FormLabel>
                    <Input min={0} max={10} name='averageMark' onChange={handleOnChangeForm} value={form.averageMark} type='number' w={'100%'} step={1} />
                  </HStack>

                  <QuestionMarkItem field='Language' question={form.englishQuestion} onAddClick={handleAddQuestion} onDeleteClick={handleDeleteQuestion} />
                  <QuestionMarkItem field='TechSkill' question={form.technicalQuestion} onAddClick={handleAddQuestion} onDeleteClick={handleDeleteQuestion} />
                  <QuestionMarkItem field='SoftSkill' question={form.softSkillQuestion} onAddClick={handleAddQuestion} onDeleteClick={handleDeleteQuestion} />
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
            <HStack w={'100%'}>
              <FormLabel w={'20%'}>Nội dung</FormLabel>
              <Textarea h={'400px'} name='comment' onChange={handleOnChangeForm} value={form.comment} w={'100%'} />
            </HStack>

            <VStack justifyContent={'space-between'} w={'100%'} spacing={5}>
              <Box></Box>
              <Button color={'#ffffff'} w={'100px'} backgroundColor={'rgb(3, 201, 215)'} onClick={handleMark}>
                Lưu
              </Button>
            </VStack>
          </VStack>
        </Box>
      </VStack>
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
