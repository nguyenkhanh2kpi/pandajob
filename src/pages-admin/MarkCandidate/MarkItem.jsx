import React, { useEffect, useState } from 'react'
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
} from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { QuestionMarkItem } from './QuestionMarkItem'
import { interviewDetailService } from '../../Service/interviewDetail.service'
import { questionService } from '../../Service/question.service'
import { toast, ToastContainer } from 'react-toastify'

export const MarkItem = ({ roomId, loadDetail, isClick }) => {
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
    let data = {
      interviewDetailId: form.interviewDetailId,
      comment: form.comment,
      averageMark: avg,
      englishQuestion: JSON.stringify(form.englishQuestion),
      technicalQuestion: JSON.stringify(form.technicalQuestion),
      softSkillQuestion: JSON.stringify(form.softSkillQuestion),
    }
    await interviewDetailService
      .markCandidate(accessToken, data)
      .then((res) => toast.info(res.message))
      .catch((er) => console.log(er.message))
    console.log(JSON.stringify(data))
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
    setAvg(average)
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
      [`${type}Question`]: [
        ...prevQuestion[`${type}Question`],
        { id: id, question: newQuestion, mark: mark },
      ],
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

  if (isClick === true) {
    return (
      <Box w={'80%'} backgroundColor={'#e9f3f5'} p={30} overflow='hidden'>
        <VStack spacing={10}>
          <Skeleton w={'70%'}>
            <div>contents wrapped</div>
            <div>won't be visible</div>
          </Skeleton>
          <Skeleton h={300} w={'70%'}>
            <div>contents wrapped</div>
            <div>won't be visible</div>
          </Skeleton>
        </VStack>
      </Box>
    )
  } else if (roomId === 0 || loadDetail === null)
    return (
      <Box p={9} borderRadius='lg' w={'100%'} backgroundColor={'#FFFFFF'}>
        <VStack>
          <Text>No detail choosen</Text>
        </VStack>
      </Box>
    )
  else
    return (
      <Box
        fontFamily={'Montserrat'}
        fontWeight={400}
        p={9}
        borderRadius='lg'
        w={'100%'}
        backgroundColor={'#FFFFFF'}>
        <VStack>
          <Box p={10} borderRadius={4} w={'100%'} borderWidth={1}>
            <Text fontWeight={'black'}>
              CV Candidate {loadDetail.candidate.name}
              {' , '}
              {loadDetail.candidate.email}
            </Text>
            <Link href={loadDetail.cv.url} isExternal>
              View cv here <ExternalLinkIcon mx='2px' />
            </Link>
            <Text>Date create: {loadDetail.cv.dateApply}</Text>
          </Box>
          <Box p={10} h={'100%'} borderWidth={1} borderRadius={4} w={'100%'}>
            <Text pb={30} fontWeight={'black'}>
              Canditate Detail with id: {loadDetail.id}
            </Text>
            <VStack justifyContent={'flex-start'} spacing={5}>
              <HStack w={'100%'}>
                <FormLabel w={'80px'}>Name</FormLabel>
                <Input
                  value={loadDetail.candidate.name ? loadDetail.candidate.name : ''}
                  disabled={true}
                  w={'400px'}
                  placeholder='name'
                />
              </HStack>
              <HStack w={'100%'}>
                <FormLabel w={'80px'}>Email</FormLabel>
                <Input
                  value={loadDetail.candidate.email}
                  disabled={true}
                  w={'400px'}
                  placeholder='email'
                />
                <FormLabel w={'60px'}>Status</FormLabel>
                <Input
                  value={loadDetail.candidate.status}
                  disabled={true}
                  w={'165px'}
                  placeholder='status'
                />
              </HStack>
            </VStack>
            <br />
            <hr />
            <Text pt={30} pb={30} fontWeight={'black'}>
              Mark{' '}
            </Text>
            <VStack justifyContent={'flex-start'} spacing={5}>
              <HStack w={'100%'}>
                <FormLabel w={'20%'}>Average Mark</FormLabel>
                <Input
                  name='averageMark'
                  onChange={handleOnChangeForm}
                  value={avg}
                  disabled={true}
                  type='number'
                  w={'80%'}
                  placeholder='mark'
                />
              </HStack>

              <QuestionMarkItem
                field='Language'
                question={form.englishQuestion}
                onAddClick={handleAddQuestion}
                onDeleteClick={handleDeleteQuestion}
              />
              <QuestionMarkItem
                field='TechSkill'
                question={form.technicalQuestion}
                onAddClick={handleAddQuestion}
                onDeleteClick={handleDeleteQuestion}
              />
              <QuestionMarkItem
                field='SoftSkill'
                question={form.softSkillQuestion}
                onAddClick={handleAddQuestion}
                onDeleteClick={handleDeleteQuestion}
              />

              <HStack w={'100%'}>
                <FormLabel w={'20%'}>Comment</FormLabel>
                <Textarea
                  name='comment'
                  onChange={handleOnChangeForm}
                  value={form.comment}
                  w={'80%'}
                  placeholder='comment'
                />
              </HStack>

              <HStack display={'flex'}>
                <Button
                  color={'#ffffff'}
                  w={100}
                  backgroundColor={'rgb(3, 201, 215)'}
                  onClick={handleMark}>
                  Mark
                </Button>
              </HStack>
            </VStack>
          </Box>
        </VStack>
        <ToastContainer
          position='bottom-right'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
        />
      </Box>
    )
}
