import React, { useEffect, useState } from 'react'
import { OverlayComponent } from '../../Components-admin/OverlayComponent'
import { Box, Button, Flex, HStack, Icon, Link, Tag, Text, VStack } from '@chakra-ui/react'
import { labelService } from '../../Service/label.service'
import { IoPricetagsOutline } from 'react-icons/io5'
import { CloseIcon } from '@chakra-ui/icons'
import { FaStar } from 'react-icons/fa'

export const OverlayAResult = ({ detail }) => {
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => {
    setIsOpen(true)
  }
  const handleClose = () => {
    setIsOpen(false)
  }

  //   label
  const [labels, setLabels] = useState(null)
  useEffect(() => {
    labelService
      .getMyLabel(accessToken)
      .then((response) => setLabels(response))
      .catch((er) => console.log(er))
  }, [])

  return (
    <>
      <VStack borderWidth={1} borderRadius={10} p={2} w={'100%'} align={'flex-start'}>
        <HStack w={'100%'} spacing={1} align={'flex-start'}>
          <Tag>{detail.roomName}</Tag>
          <Tag>{detail.interviewTime} </Tag>
          <Tag>{detail.jobPosting.name}</Tag>
          <Tag colorScheme='blue' onClick={handleOpen}>
            Xem
          </Tag>
        </HStack>
        <StarRating rating={detail.averageScores} />
      </VStack>

      <OverlayComponent isOpen={isOpen} onClose={handleClose}>
        <Box bgColor='white' m={1} w={'50%'} borderWidth={1} p={5} borderRadius={10} boxShadow={'md'}>
          <HStack w={'100%'} justifyContent={'space-between'}>
            <Text></Text>
            <Icon m={3} onClick={handleClose} as={CloseIcon} />
          </HStack>
          <HStack w={'100%'}>
            <Box w={'50%'}>
              <Text m={0} p={0} fontStyle={'italic'}>
                JOB: {detail.jobPosting.name}
              </Text>
              <Text m={0} p={0} fontStyle={'italic'}>
                Phỏng vấn ngày: {detail.interviewTime}
              </Text>
              <Text m={0} p={0} fontStyle={'italic'}>
                <Link color={'blue'} isExternal href={detail.cv.url}>
                  Xem CV
                </Link>
              </Text>
            </Box>
            <VStack justifyContent={'flex-end'} align={'flex-end'} w={'50%'}>
              <Flex>
                <Text size={'xs'} m={0} p={0} mr={4}>
                  Nhãn
                </Text>
                {labels?.map((label) => (
                  <>
                    {JSON.parse(detail.cv.labels)[label.id] ? (
                      <Button variant='solid' size={'xs'} leftIcon={<IoPricetagsOutline />}>
                        {label.name}
                      </Button>
                    ) : (
                      <></>
                    )}
                  </>
                ))}
              </Flex>

              <Flex>
                <Text size={'xs'} m={0} p={0} mr={4}>
                  Trạng thái CV
                </Text>
                <Button size={'xs'}>{detail.cv.state}</Button>
              </Flex>
              <Flex>
                <Text size={'xs'} m={0} p={0} mr={4}>
                  Trạng thái phỏng vấn
                </Text>
                <Button size={'xs'} colorScheme={detail.candidate.status == 'Đã chấm' ? 'green' : 'red'}>
                  {detail.candidate.status}
                </Button>
              </Flex>
            </VStack>
          </HStack>
          <Box p={1} borderWidth={1}>
            <Text m={0} p={0} fontWeight={'bold'}>
              Ghi chú - Đánh giá của người phỏng vấn:{' '}
            </Text>
            <Box p={3}>
              <Text m={0} p={0}>
                {detail.comment}
              </Text>
            </Box>
            {detail.englishQuestion != '' ? (
              <>
                <Text m={0} p={0} fontWeight={'bold'}>
                  Câu hỏi tiếng Anh:
                </Text>
                <Box p={3}>
                  {JSON.parse(detail.englishQuestion).map((q) => (
                    <Text key={q.id} m={0} p={0}>
                      {q.question} (Điểm: {q.mark})
                    </Text>
                  ))}
                </Box>
              </>
            ) : null}
            {detail.technicalQuestion != '' ? (
              <>
                <Text m={0} p={0} fontWeight={'bold'}>
                  Câu hỏi kỹ thuật:
                </Text>
                <Box p={3}>
                  {JSON.parse(detail.technicalQuestion).map((q) => (
                    <Text key={q.id} m={0} p={0}>
                      {q.question} (Điểm: {q.mark})
                    </Text>
                  ))}
                </Box>
              </>
            ) : null}
            {detail.softSkillQuestion != '' ? (
              <>
                <Text m={0} p={0} fontWeight={'bold'}>
                  Câu hỏi kỹ năng mềm:
                </Text>
                <Box p={3}>
                  {JSON.parse(detail.softSkillQuestion).map((q) => (
                    <Text key={q.id} m={0} p={0}>
                      {q.question} (Điểm: {q.mark})
                    </Text>
                  ))}
                </Box>
              </>
            ) : null}
          </Box>
        </Box>
      </OverlayComponent>
    </>
  )
}

const StarRating = ({ rating }) => {
  // Tạo mảng 10 phần tử và sử dụng map để hiển thị các ngôi sao
  return (
    <Box display='flex' alignItems='center'>
      {[...Array(10)].map((_, index) => (
        <Icon as={FaStar} key={index} color={index < rating ? 'yellow.400' : 'gray.300'} boxSize={6} />
      ))}
    </Box>
  )
}
