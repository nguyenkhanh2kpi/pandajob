import { DragHandleIcon, ViewIcon } from '@chakra-ui/icons'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  IconButton,
  HStack,
  Box,
  VStack,
  Avatar,
  Text,
  Select,
  Link,
  Card,
  CardHeader,
  Flex,
  CardFooter,
  Heading,
  CardBody,
  CheckboxGroup,
  Stack,
  Checkbox,
  useToast,
} from '@chakra-ui/react'
import { cvService } from '../../Service/cv.service'
import { MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns'
import { useEffect, useState } from 'react'
import { labelService } from '../../Service/label.service'

const State = {
  RECEIVE_CV: 'Tiếp nhận CV',
  SUITABLE: 'Phù hợp yêu cầu',
  SCHEDULE_INTERVIEW: 'Lên lịch phỏng vấn',
  SEND_PROPOSAL: 'Gửi đề nghị',
  ACCEPT: 'Nhận việc',
  REJECT: 'Từ chối',
}

const valueTemplate = (data) => {
  return (
    <HStack fontFamily={'Montserrat'} spacing={2}>
      <Box w={3} h={3} borderRadius='50%' bgColor={data.color}></Box>
      <Text mt={3}>{data.name}</Text>
    </HStack>
  )
}

export const CandidateDetailInProces = ({ candidate, load, setLoad }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const [labels, setLabels] = useState([])
  const toast = useToast()
  const [cv, setCV] = useState({})

  useEffect(() => {
    labelService
      .getMyLabel(accessToken)
      .then((response) => setLabels(response))
      .catch((er) => console.log(er))
  }, [])

  const onChangeStatus = (event) => {
    const status = event.target.value
    handleOnChangeStatus({ cvId: candidate.cvId, status })
  }
  const handleOnChangeStatus = ({ cvId, status }) => {
    cvService
      .updateStatus(accessToken, cvId, status)
      .then((response) => {
        toast({ description: response.message })
        setLoad(!load)
      })
      .catch((er) => console.log(er))
  }
  useEffect(() => {
    cvService
      .getCVById(accessToken, candidate.cvId)
      .then((response) => {
        setCV(response.data[0])
        setCheckedLabels(JSON.parse(response.data[0].labels))
      })
      .catch((er) => console.log(er))
  }, [load])

  // ;=label
  const [checkedLabels, setCheckedLabels] = useState({})
  const handleCheckboxChange = (labelId) => {
    setCheckedLabels((prevCheckedLabels) => ({
      ...prevCheckedLabels,
      [labelId]: !prevCheckedLabels[labelId],
    }))
  }
  useEffect(() => {
    const checkedLabelIds = Object.keys(checkedLabels).filter((labelId) => checkedLabels[labelId])
    if (checkedLabelIds.length >= 0) {
      cvService
        .updateLabel(accessToken, candidate.cvId, JSON.stringify(checkedLabelIds))
        .then((response) => console.log(response))
        .catch((er) => console.log(er))
    }
  }, [checkedLabels])

  return (
    <>
      <Card mb={5} onClick={onOpen}>
        <CardBody>
          <HStack>
            <Text fontWeight={'bold'} w={'25%'}>
              {candidate.fullName}
            </Text>
            <Text w={'25%'}>{candidate.email}</Text>
            <Text w={'25%'}>{candidate.applyDate}</Text>
            <Text w={'25%'}> {candidate.cvStatus}</Text>
          </HStack>
        </CardBody>
      </Card>
      {/* <IconButton  bgColor={'white'} aria-label='Search database' icon={<ViewIcon />} /> */}

      <Modal size={'6xl'} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent fontFamily={'Montserrat'} fontWeight={400}>
          <ModalHeader>Chi tiết ứng viên: {candidate.fullName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack align={'flex-start'} w={'100%'}>
              <Box h={700} w='60%'>
                <iframe src={candidate.cv} width='100%' height='100%' style={{ border: 'none' }} title='Candidate CV' />
              </Box>
              <VStack w={'40%'}>
                <Card w={'100%'} maxW='md'>
                  <CardHeader>
                    <Flex spacing='4'>
                      <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                        <Avatar src={candidate.avatar} />
                        <Box>
                          <Heading size='sm'>{candidate.fullName}</Heading>
                          <Text>{candidate.email}</Text>
                        </Box>
                      </Flex>
                    </Flex>
                  </CardHeader>
                  <CardBody>
                    <Heading size='sm'>Trạng thái</Heading>
                    <HStack alignItems='center' justifyContent='space-between'>
                      <Select onChange={onChangeStatus} w={'50%'} defaultValue={cv.state}>
                        {Object.keys(State).map((key) => (
                          <option key={key} value={key}>
                            {State[key].replace(/_/g, ' ')}
                          </option>
                        ))}
                      </Select>
                    </HStack>
                    <Heading mt={5} size='sm'>
                      Nhãn
                    </Heading>
                    <CheckboxGroup colorScheme='green' defaultValue={['naruto', 'kakashi']}>
                      <VStack w={'100%'} alignItems={'flex-start'} spacing={[1, 5]} direction={['column', 'row']}>
                        {labels?.map((label) => (
                          <Checkbox key={label.id} isChecked={checkedLabels[label.id]} onChange={() => handleCheckboxChange(label.id)}>
                            <Text m={0}>{label.name}</Text>
                          </Checkbox>
                        ))}
                      </VStack>
                    </CheckboxGroup>
                    <Heading mt={5} size='sm'>
                      Đã xem
                    </Heading>
                    <Checkbox colorScheme='green' defaultChecked>
                      Đã xem
                    </Checkbox>
                    <Button mt={5} w={'100%'} color={'white'} bgColor={'#2cccc7'}>
                      Lưu
                    </Button>
                  </CardBody>
                </Card>
              </VStack>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
