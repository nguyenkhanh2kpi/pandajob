import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Card, CardHeader, Flex, HStack, Heading, Icon, IconButton, Image, ListItem, Text, UnorderedList, VStack, useToast } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { testService } from '../../Service/test.service'
import { FaCode } from 'react-icons/fa'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { ArrowUpDownIcon, DeleteIcon } from '@chakra-ui/icons'
import { AddNewQuestion } from './AddNewCodeQuestion'
import { createReactEditorJS } from 'react-editor-js'
import { EDITOR_JS_TOOLS } from '../../Components/Essay/tool'

export const EditCodeTest = () => {
  const toast = useToast()
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const params = useParams()
  const [load, setLoad] = useState(false)

  const [test, settest] = useState(null)
  useEffect(() => {
    testService
      .getATestById(accessToken, params.testId)
      .then((response) => {
        // console.log(JSON.stringify(response))
        settest(response)
      })
      .catch((er) => console.log(er))
    window.scrollTo(0, 0)
  }, [load, accessToken, params.testId])

  return (
    <>
      {test ? (
        <Box minH={1000} fontFamily={'Roboto'} fontWeight={400} backgroundColor={'#e9f3f5'} overflow='hidden'>
          <VStack mb={50} w={'100%'} pl={30} pr={30} spacing={10}>
            <Card minH={500} mt={30} p={5} w={'100%'} direction={{ base: 'column', sm: 'row' }} overflow='hidden' variant='outline'>
              <VStack alignItems={'flex-start'} w={'100%'}>
                <HStack alignItems='center' spacing={4}>
                  <Icon as={FaCode} boxSize={7} p={1} bgColor='#ddeff0' borderRadius='full' />
                  <Text m={0} fontSize='2xl'>
                    {test.summary} - Thời gian: {test.time} phút
                  </Text>
                </HStack>
                <Box w='100%' textAlign='center'>
                  <HStack justifyContent={'flex-end'}>
                    <AddNewQuestion testId={test.id} jobId={params.jobId} load={load} setLoad={setLoad} />
                  </HStack>
                </Box>
                {test.codeQuestions.length > 0 ? (
                  <VStack  spacing={4} w='100%'>
                    {test.codeQuestions.map((question) => (
                      <TestQuestionItem key={question.id} question={question} load={load} setLoad={setLoad} />
                    ))}
                  </VStack>
                ) : (
                  <Box w='100%' p={4} textAlign='center'>
                    <Text fontSize='lg' color='gray.500'>
                      Chưa có câu hỏi
                    </Text>
                  </Box>
                )}
              </VStack>
            </Card>
          </VStack>
        </Box>
      ) : (
        <></>
      )}
    </>
  )
}

const TestQuestionItem = ({ question, load, setLoad }) => {
  const toast = useToast()
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const [expanded, setExpanded] = useState(false)
  // editor
  const ReactEditorJS = createReactEditorJS()
  const editorCore = useRef(null)
  const handleInitialize = useCallback(
    (instance) => {
      editorCore.current = instance
    },
    [question, load]
  )

  // handle xoa
  const handleDeleteCodeQuesiton = (questionId) => {
    testService
      .deleteCodeQuestionById(accessToken, questionId)
      .then((response) => {
        setLoad(!load)
        toast({
          title: 'Delete Question.',
          description: response.message,
          status: 'info',
          duration: 3000,
          isClosable: true,
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <Card key={question.id} w='100%' maxH={expanded ? 'unset' : '200px'} overflow='hidden'>
      <CardHeader>
        <Flex spacing='4'>
          <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
            <Box>
              <ReactEditorJS defaultValue={JSON.parse(question.questionText)} editorCore={editorCore} tools={EDITOR_JS_TOOLS} onInitialize={handleInitialize} />
            </Box>
          </Flex>
          <IconButton onClick={() => setExpanded(!expanded)} variant='ghost' colorScheme='gray' aria-label='Toggle expansion' icon={<ArrowUpDownIcon />} />
          <IconButton onClick={() => handleDeleteCodeQuesiton(question.id)} variant='ghost' colorScheme='gray' aria-label='Delete question' icon={<DeleteIcon />} />
        </Flex>
      </CardHeader>
    </Card>
  )
}
