import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Image,
  Skeleton,
  Spinner,
  Text,
  VStack,
  HStack,
  IconButton,
  Divider,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Checkbox,
  Textarea,
} from '@chakra-ui/react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  AiFillDelete,
  AiFillPlusCircle,
  AiOutlineEdit,
  AiOutlineProfile,
  AiTwotonePlusSquare,
} from 'react-icons/ai'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import { Tooltip } from '@chakra-ui/react'
import { testService } from '../../Service/test.service'
import { ToastContainer, toast } from 'react-toastify'
import { load } from '@syncfusion/ej2-react-charts'

const TestAddForm = () => {
  const [load, setLoad] = useState(false)
  const { id } = useParams()
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const [test, setTest] = useState(null)
  useEffect(() => {
    testService
      .getATest(accessToken, id)
      .then((response) => setTest(response))
      .catch((er) => console.log(er))
  }, [load])

  return (
    <>
      {test ? (
        <>
          <Box
            spacing={3}
            h={1100}
            fontFamily={'Montserrat'}
            fontWeight={400}
            backgroundColor={'#e9f3f5'}
            p={30}
            overflow='hidden'>
            <VStack>
              <Box
                h={1000}
                p={'3%'}
                borderRadius={20}
                backgroundColor={'#FFFFFF'}
                w={'100%'}
                mb={10}>
                <Box p={30} w={'100%'}>
                  <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>
                    Job: {test.job}
                  </Text>
                </Box>

                <Divider />
                <Box pl={30} m={30} w={'80%'}>
                  <FormControl isReadOnly>
                    <FormLabel>Test title</FormLabel>
                    <Input type='title' value={test.summary} />
                    <FormLabel>Start at:</FormLabel>
                    <HStack>
                      <FormLabel>date</FormLabel>
                      <Input type='date' value={test.startTime.split('T')[0]} />
                      <FormLabel>time</FormLabel>
                      <Input type='time' value={test.startTime.split('T')[1].slice(0, 5)} />
                    </HStack>
                    <FormLabel>End at:</FormLabel>
                    <HStack>
                      <FormLabel>date</FormLabel>
                      <Input type='date' value={test.endTime.split('T')[0]} />
                      <FormLabel>time</FormLabel>
                      <Input type='time' value={test.endTime.split('T')[1].slice(0, 5)} />
                    </HStack>
                  </FormControl>
                </Box>
                <Divider />
                <Box h={430} overflowY='auto' mt={30} mb={30} w={'70%'}>
                  {test.questions.length > 0 ? (
                    test.questions.map((question) => (
                      <QuestionItem
                        setLoad={setLoad}
                        load={load}
                        key={question.id}
                        question={question}
                        testId={test.id}
                      />
                    ))
                  ) : (
                    <QuestionItem setLoad={setLoad} load={load} question={null} testId={test.id} />
                  )}
                </Box>
              </Box>
            </VStack>
          </Box>
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
        </>
      ) : (
        <></>
      )}
    </>
  )
}
export default TestAddForm

const QuestionItem = ({ question, testId, load, setLoad }) => {
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token

  const handleDelete = (questionId) => {
    testService
      .deleteQuestion(accessToken, questionId)
      .then((response) => {
        toast.info(response.message)
        setLoad(!load)
      })
      .catch((er) => {
        console.log(er)
        toast.error('Something went wrong')
      })
  }
  return (
    <>
      {question ? (
        <>
          <HStack>
            <Box w={'90%'} m={2} p={10} borderRadius={10} borderWidth={1} ml={50}>
              <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>
                Question: {question.questionText}
              </Text>
              {question.options.map((option, index) => (
                <Text
                  key={option.optionText}
                  style={{
                    marginLeft: 20,
                    marginVertical: 5,
                    fontWeight: option.answer ? 'bold' : 'normal',
                  }}>
                  {option.optionText}
                </Text>
              ))}
            </Box>
            <VStack>
              <AddQuestionModel load={load} setLoad={setLoad} testId={testId} />
              <IconButton
                onClick={() => handleDelete(question.id)}
                aria-label='Search database'
                icon={<AiFillDelete />}
              />
            </VStack>
          </HStack>
        </>
      ) : (
        <>
          <AddQuestionModel load={load} setLoad={setLoad} testId={testId} />
        </>
      )}
    </>
  )
}

const AddQuestionModel = ({ testId, setLoad, load }) => {
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [text, setText] = useState('')
  const [options, setOptions] = useState([])
  const [correctIndex, setCorrectIndex] = useState(null)
  const [form, setForm] = useState({
    questionText: '',
    testId: testId,
    options: [
      {
        optionText: '',
        answer: true,
      },
      {
        optionText: '',
        answer: false,
      },
      {
        optionText: '',
        answer: false,
      },
    ],
  })

  const handleAddOption = () => {
    setOptions([...options, { text: '' }])
  }

  const handleSelectCorrect = (index) => {
    setCorrectIndex(index)
  }
  const handleRemove = (indexToRemove) => {
    setOptions(options.filter((_, index) => index !== indexToRemove))
  }

  const handleSave = () => {
    const updatedOptions = options.map((option, index) => ({
      optionText: document.querySelector(`input[name="option-${index}"]`).value,
      answer: index === correctIndex,
    }))
    const updatedForm = {
      ...form,
      questionText: text,
      options: updatedOptions,
    }

    testService
      .addQuestion(accessToken, updatedForm)
      .then((response) => {
        toast.success(response.message)
        setLoad(!load)
        onClose()
      })
      .catch((er) => {
        console.log(er)
        toast.error('Something went wrong')
      })
  }
  const handleTextChange = (event) => {
    setText(event.target.value)
    setForm({
      ...form,
      questionText: event.target.value,
    })
  }

  return (
    <>
      <IconButton onClick={onOpen} aria-label='Search database' icon={<AiFillPlusCircle />} />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Question</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Text</FormLabel>
              <Textarea value={text} type='text' name='text' onChange={handleTextChange} />
              <FormLabel>Options</FormLabel>
              {options.map((option, index) => (
                <HStack key={index}>
                  <Input m={2} type='title' name={`option-${index}`} />
                  <Checkbox
                    isChecked={correctIndex === index}
                    onChange={() => handleSelectCorrect(index)}></Checkbox>
                  <Button onClick={() => handleRemove(index)}>x</Button>
                </HStack>
              ))}

              <Button onClick={handleAddOption}>+</Button>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleSave} colorScheme='blue' mr={3}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
