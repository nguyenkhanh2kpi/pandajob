import { Box, HStack, Text, Image, Link, VStack, Button, useDisclosure, Flex, Tag, useToast, Checkbox } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { EDITOR_JS_TOOLS } from '../../../Components/Essay/tool'
import { createReactEditorJS } from 'react-editor-js'
import { labelService } from '../../../Service/label.service'
import { IoPricetagsOutline } from 'react-icons/io5'
import { cvService } from '../../../Service/cv.service'

const State = {
  RECEIVE_CV: 'Tiếp nhận CV',
  SUITABLE: 'Phù hợp yêu cầu',
  SCHEDULE_INTERVIEW: 'Lên lịch phỏng vấn',
  SEND_PROPOSAL: 'Gửi đề nghị',
  ACCEPT: 'Nhận việc',
  REJECT: 'Từ chối',
}

export const ViewDetailUserMultest = ({ record, load, setLoad }) => {
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedRecord, setSelectedRecord] = useState(record)
  const ReactEditorJS = createReactEditorJS()
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token

  const handleOpen = () => {
    onOpen()
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

  return (
    <>
      <Button mt={2} size={'sm'} onClick={() => handleOpen()}>
        Xem
      </Button>
      {selectedRecord && (
        <>
          {isOpen && (
            <Box pos='fixed' top={0} left={0} width='100vw' height='100vh' bg='rgba(0, 0, 0, 0.4)' display='flex' justifyContent='center' alignItems='center' zIndex={1000}>
              <Box overflowY='auto' bg='white' borderRadius='md' p={4} w={'800px'} h='700px' boxShadow='xl' pos='relative'>
                <Box pos='absolute' top={2} right={2} cursor='pointer' fontSize='xl' onClick={onClose}>
                  &times;
                </Box>
                <Box p={4}>
                  <HStack w={'100%'} justifyContent={'space-between'}>
                    <VStack align='start' spacing={0}>
                      <Text m={0} p={0} fontSize='xl' fontWeight='bold'>
                        {selectedRecord.user.fullName}{' '}
                      </Text>
                      <Text m={0} p={0}>
                        {selectedRecord.user.email}
                      </Text>
                      <Text fontWeight={'bold'} m={0} p={0}>
                        Nhãn
                      </Text>
                      <Flex gap={3}>
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
                      <Flex gap={3}>
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
                    <Text fontSize={'xs'} fontStyle={'italic'} mb={4}>
                      <Text as='span' fontWeight='bold'>
                        Thời gian:{' '}
                      </Text>
                      {selectedRecord.startTime}
                    </Text>
                  </HStack>
                  <RecordDisplay recordData={record.record} />

                  <Box h={500} mt={4}>
                    <iframe src={record.cvDTO.url} width='100%' height='100%' style={{ border: 'none' }} title='Candidate CV' />
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
        </>
      )}
    </>
  )
}

const RecordDisplay = ({ recordData }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const parsedRecord = JSON.parse(recordData)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <Box w={'100%'} bgColor={'white'} borderRadius={20} boxShadow={'md'} p={5} overflowY='hidden'>
      <VStack align={'start'} spacing={4} maxH={isExpanded ? 'none' : '100px'} overflowY={isExpanded ? 'visible' : 'auto'}>
        {Object.entries(parsedRecord).map(([key, value], index) => (
          <HStack key={index} spacing={0} w={'100%'}>
            <Text m={0} p={0} fontWeight={'bold'}>Question {key}:</Text>
            <Text m={0} p={0} pl={5}>{value}</Text>
          </HStack>
        ))}
      </VStack>
      <Button mt={4} size='sm' onClick={toggleExpand}>
        {isExpanded ? 'Thu gọn' : 'Mở rộng'}
      </Button>
    </Box>
  )
}
