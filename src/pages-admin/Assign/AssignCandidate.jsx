import React, { useState, useEffect } from 'react'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { Box, Badge, WrapItem, Text, Button, VStack, Spacer } from '@chakra-ui/react'
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import { Link } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { interviewService } from '../../Service/interview.service'
import { toast } from 'react-toastify'

export const AssignCandidate = ({ jobId, roomId, startDate, endDate }) => {
  const [candidates, setCandidates] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const [idSelected, setIdSelected] = useState(0)

  const [form, setForm] = useState({
    candidateId: 0,
    interviewId: parseInt(roomId, 10),
    date: startDate,
    time: endDate,
    description: 'no description',
  })

  const convertDates = (startDate, endDate) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const formattedDate = start.toISOString().split('T')[0]
    const startTime = `${start.getHours().toString().padStart(2, '0')}h${start
      .getMinutes()
      .toString()
      .padStart(2, '0')}`
    const endTime = `${end.getHours().toString().padStart(2, '0')}h${end
      .getMinutes()
      .toString()
      .padStart(2, '0')}`
    const result = {
      date: formattedDate,
      time: `${startTime} to ${endTime}`,
    }
    return result
  }

  const handleSelect = (id) => {
    if (idSelected === id) {
      setIdSelected(0)
    } else {
      setForm((pre) => ({
        ...pre,
        candidateId: id,
        ...convertDates(startDate, endDate),
      }))
      setIdSelected(id)
    }
  }

  const truncatedEmail = (email) => {
    if (email.length > 20) {
      return `${email.substring(0, 20)}...`
    }
    return email
  }

  useEffect(() => {
    interviewService
      .getCandidatesByJob(accessToken, jobId)
      .then((res) => setCandidates(res))
      .catch((error) => console.log(error))
  }, [])

  const handleAssign = () => {
    interviewService.candidateAssign(accessToken, form).then((response) => {
      if (response.status === '200 OK') {
        toast.success(response.message)
      } else {
        toast.error(response.message)
      }
    }).catch(
      toast.error("something went wrong")
    )
  }

  return (
    <>
      <Button fontFamily={'Montserrat'} fontWeight={400} colorScheme='blue' onClick={onOpen}>
        Assign Candidate
      </Button>
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent fontFamily={'Montserrat'} fontWeight={400}>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Assign Candidate
            </AlertDialogHeader>
            <AlertDialogBody style={{ maxHeight: '500px', overflowY: 'auto' }}>
              {candidates.map((cadidate) => (
                <Box
                  onClick={() => handleSelect(cadidate.userId)}
                  maxW='sm'
                  borderWidth='3px'
                  borderRadius='lg'
                  overflow='hidden'
                  m={2}
                  borderColor={idSelected === cadidate.userId ? 'green' : ''}
                  backgroundColor={'#EEF5FF'}>
                  <WrapItem m={2} alignItems='center'>
                    <Avatar name={cadidate.fullName} src={cadidate.avatar} />
                    <Text m={2}>{truncatedEmail(cadidate.email)}</Text>
                    <Spacer />
                    <VStack justifyContent='flex-start'>
                      <Button
                        backgroundColor={
                          cadidate.interviewStatus === 'Đã chấm'
                            ? 'green'
                            : cadidate.interviewStatus === 'Chưa phỏng vấn'
                            ? 'orange'
                            : 'grey'
                        }
                        p={1}
                        h={'100%'}
                        colorScheme='teal'
                        size='xs'>
                        {cadidate.interviewStatus}
                      </Button>
                      <Link href={cadidate.cv} isExternal>
                        Link Cv <ExternalLinkIcon mx='2px' />
                      </Link>
                    </VStack>
                  </WrapItem>
                </Box>
              ))}
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme='green'
                onClick={() => handleAssign()}
                ml={3}
                disabled={idSelected === 0 ? true : false}>
                Assign
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
