import { Box, Button, ChakraProvider, HStack, IconButton, Text, VStack, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { loadJobDetail } from '../../redux/JobDetail/Action'
import { Step, StepDescription, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, Stepper, useSteps } from '@chakra-ui/react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react'
import { interviewService } from '../../Service/interview.service'
import { testService } from '../../Service/test.service'
import { AiOutlinePlayCircle } from 'react-icons/ai'

const steps = [
  { title: 'Received resume', description: 'Post job vacancies and wait for applications' },
  { title: 'Screening test', description: 'for candidates to take the screening test' },
  { title: 'Screening resume', description: 'Select profiles for interview' },
  { title: 'Interview', description: 'Interview each candidate' },
  { title: 'Evaluate', description: `Evaluate the candidate's ability to perform the job well` },
]

export const ProcessItem = () => {
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const job = useSelector((store) => store.jobDetail.data)

  useEffect(() => {
    dispatch(loadJobDetail(params.jobId))
  }, [params.jobId])

  return (
    <Box minHeight={2000} overflow='auto' fontFamily={'Montserrat'} fontWeight={400} backgroundColor={'#e9f3f5'} p={30}>
      <VStack spacing={3}>
        <Box minHeight={1000} overflow='auto' p={'3%'} borderRadius={20} backgroundColor={'#FFFFFF'} w={'100%'} mb={10}>
          <Text fontSize={30}>{job.name}</Text>
          <StepProcess job={job} />
        </Box>
      </VStack>
    </Box>
  )
}

const StepProcess = ({ job }) => {
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  })
  const setIndex = (index) => {
    setActiveStep(index)
  }
  return (
    <Stepper orientation='vertical' index={activeStep}>
      {steps.map((step, index) => (
        <Step key={index}>
          <StepIndicator>
            <StepStatus complete={<StepIcon />} incomplete={<StepNumber />} active={<StepNumber />} />
          </StepIndicator>
          <Box flexShrink='0'>
            <StepTitle>{step.title}</StepTitle>
            <StepDescription>
              <Rt description={step.description} setIndex={setIndex} index={index} job={job} />
            </StepDescription>
          </Box>
          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  )
}

const Rt = ({ index, job, setIndex, description }) => {
  switch (index) {
    case 0:
      return <Step0Item description={description} index={index} setIndex={setIndex} job={job} />
    case 1:
      return <Step1Item description={description} index={index} setIndex={setIndex} job={job} />
    case 2:
      return <Step2Item description={description} index={index} setIndex={setIndex} job={job} />
    case 3:
      return <Step3Item description={description} index={index} setIndex={setIndex} job={job} />
    case 4:
      return <Step4Item description={description} index={index} setIndex={setIndex} job={job} />
    default:
      return null
  }
}
const Step0Item = ({ job, index, setIndex, description }) => {
  return (
    <Box p={5} w={'100%'} boxShadow={'lg'} borderRadius={20}>
      <Text>{description}</Text>
      <Text>Create date: {job.createDate}</Text>
      <Text>Number of recruits: {job.number}</Text>
      <Text>Create date: {job.createDate}</Text>
      <ListCandidate job={job} />
    </Box>
  )
}

const Step1Item = ({ job, index, setIndex, description }) => {
  const navigate = useNavigate()
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const [tests, SetTests] = useState({})
  useEffect(() => {
    testService
      .getTestByjd(accessToken, job.id)
      .then((response) => SetTests(response))
      .catch((er) => console.log(er))
  }, [])
  return (
    <Box p={5} w={'100%'} boxShadow={'lg'} borderRadius={20}>
      <Text>{description}</Text>
      <Text>Number of test: {tests.length}</Text>
      <HStack>
        <IconButton borderRadius={20} fontSize={14} onClick={() => setIndex(index)} icon={<AiOutlinePlayCircle />} />
        <Button borderRadius={20} fontSize={14} onClick={() => navigate(`/process/screening/${job.id}`)}>
          Screening test
        </Button>
      </HStack>
    </Box>
  )
}
const Step2Item = ({ job, index, setIndex, description }) => {
  const navigate = useNavigate()
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const [tests, SetTests] = useState({})
  useEffect(() => {
    testService
      .getTestByjd(accessToken, job.id)
      .then((response) => SetTests(response))
      .catch((er) => console.log(er))
  }, [])

  return (
    <Box fontSize={14} p={5} w={'100%'} boxShadow={'lg'} borderRadius={20}>
      <Text>{description}</Text>
      <Text>Number of candidate: 2</Text>
      <HStack>
        <IconButton borderRadius={20} fontSize={14} onClick={() => setIndex(index)} icon={<AiOutlinePlayCircle />} />
        <Button borderRadius={20} fontSize={14} onClick={() => navigate(`/process/step/screening-resume/${job.id}`)}>
          View screening result
        </Button>
      </HStack>
    </Box>
  )
}
const Step3Item = ({ job, index, setIndex, description }) => {
  const navigate = useNavigate()
  const [number, setNumber] = useState(0)
  return (
    <Box fontSize={14} p={5} w={'100%'} boxShadow={'lg'} borderRadius={20}>
      <Text>{description}</Text>
      <Text>Number of room: {number}</Text>
      <HStack>
        <IconButton borderRadius={20} fontSize={14} onClick={() => setIndex(index)} icon={<AiOutlinePlayCircle />} />
        <ListRoom setNumber={setNumber} job={job} />
        <Button borderRadius={20} fontSize={14} onClick={() => navigate('/roomAdd')}>
          Create interview
        </Button>
      </HStack>
    </Box>
  )
}
const Step4Item = ({ job, index, setIndex, description }) => {
  const navigate = useNavigate()
  return (
    <Box fontSize={14} p={5} w={'100%'} boxShadow={'lg'} borderRadius={20}>
      <Text>{description}</Text>
      <Text>Result</Text>
      <HStack>
        <IconButton borderRadius={20} fontSize={14} onClick={() => setIndex(index)} icon={<AiOutlinePlayCircle />} />
        <Button borderRadius={20} fontSize={14} onClick={() => navigate('/result')}>
          Results
        </Button>
      </HStack>
    </Box>
  )
}

function ListCandidate({ job }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [candidates, setCandidates] = useState([])
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  useEffect(() => {
    interviewService
      .getCandidatesByJob(accessToken, job.id)
      .then((response) => setCandidates(response))
      .catch((er) => console.log(er))
  }, [job])
  return (
    <>
      <Button borderRadius={20} fontSize={14} onClick={onOpen}>
        Detail
      </Button>

      <Modal fontFamily={'Montserrat'} size={'2xl'} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxH={500} overflow={'auto'}>
          <ModalHeader>{candidates.length} resumes</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {candidates.map((candidate) => (
              <Box p={5} boxShadow='md' borderRadius={20}>
                <Text>{candidate.fullName}</Text>
                <Text>{candidate.email}</Text>
                <Text fontWeight={'bold'}>{candidate.interviewStatus}</Text>
                <Button borderRadius={20} color={'#ffffff'} backgroundColor='rgb(3, 201, 215)' as='a' href={candidate.cv} target='_blank'>
                  Link CV
                </Button>
              </Box>
            ))}
          </ModalBody>

          <ModalFooter>
            {/* <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

function ListRoom({ job, setNumber }) {
  const navigate = useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [rooms, setRooms] = useState([])
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token

  useEffect(() => {
    interviewService
      .getInterviewByJobId(accessToken, job.id)
      .then((response) => {
        setRooms(response)
        setNumber(response.length)
      })
      .catch((er) => console.log(er))
  }, [job])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = ('0' + (date.getMonth() + 1)).slice(-2)
    const day = ('0' + date.getDate()).slice(-2)
    const hours = ('0' + date.getHours()).slice(-2)
    const minutes = ('0' + date.getMinutes()).slice(-2)
    return `${year}-${month}-${day} ${hours}:${minutes}`
  }
  return (
    <>
      <Button borderRadius={20} fontSize={14} onClick={onOpen}>
        Rooms
      </Button>

      <Modal fontFamily={'Montserrat'} size={'2xl'} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w={1000} maxH={500} overflow={'auto'}>
          <ModalHeader>Rooms</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {rooms.map((room) => (
              <Box p={5} boxShadow='md' borderRadius={20}>
                <Text>Name: {room.roomName}</Text>
                <Text>Title: {room.roomSkill}</Text>
                <Text>Number of candidate: {room.listCandidate.length}</Text>
                <Text>
                  Time: {formatDate(room.startDate)} to {formatDate(room.endDate)}
                </Text>
                <Text>Status: {room.status}</Text>
                <Button onClick={() => navigate(`/addCandidate/${job.id}/${room.id}`)} borderRadius={20} color={'#ffffff'} backgroundColor='rgb(3, 201, 215)'>
                  Detail
                </Button>
              </Box>
            ))}
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
