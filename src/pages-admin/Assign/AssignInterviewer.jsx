import React, { useState, useEffect } from 'react'
import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, AlertDialogCloseButton, Flex, Card, CardHeader, Heading, useToast } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { Box, Badge, WrapItem, Text, Button, VStack, Spacer, Input } from '@chakra-ui/react'
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import { Link } from '@chakra-ui/react'
import { AtSignIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import { interviewService } from '../../Service/interview.service'
import { interviewerService } from '../../Service/interviewer.service'

export const AssignInterviewer = ({ roomId }) => {
  const toast = useToast()
  const [interviewer, setInterviewer] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const [form, setForm] = useState({
    interviewerEmail: 'khanh@gmial.com',
    roomId: roomId.toString(),
  })

  const handleAssignInterviewer = (email) => {
    form.interviewerEmail = email
    interviewService
      .interviewerAssign(accessToken, form)
      .then((res) => {
        if (res.message != 'Add success!') {
          toast({
            title: 'Người phỏng vấn',
            description: res.message,
            status: 'info',
            duration: 3000,
            isClosable: true,
          })
        } else {
          toast({
            title: 'Người phỏng vấn',
            description: res.message,
            status: 'success',
            duration: 3000,
            isClosable: true,
          })
        }
      })
      .catch((er) => {
        toast({
          title: 'Người phỏng vấn',
          description: 'Đã có lỗi xảy ra',
          status: 'eror',
          duration: 3000,
          isClosable: true,
        })
      })
  }

  const truncatedEmail = (email) => {
    if (email.length > 20) {
      return `${email.substring(0, 20)}...`
    }
    return email
  }

  useEffect(() => {
    interviewerService
      .getMyInterviewer(accessToken)
      .then((res) => setInterviewer(res))
      .catch((error) => console.log(error))
  }, [])

  return (
    <>
      <Button size='xs' leftIcon={<AtSignIcon />} color='white' backgroundColor='rgb(3, 201, 215)' onClick={onOpen}>
        <Link>Đăng kí người phỏng vấn</Link>
      </Button>

      {isOpen && (
        <Box leastDestructiveRef={cancelRef} position='fixed' top='0' left='0' width='100vw' height='100vh' bg='rgba(0, 0, 0, 0.6)' display='flex' alignItems='center' justifyContent='center' zIndex='1000'>
          <Box bg='white' p={6} borderRadius='md' boxShadow='md' w={'600px'}>
            <Text fontSize='lg' fontWeight='bold' mb={4}>
              Áp dụng TOP VIP
            </Text>
            {interviewer.map((interviewer) => (
              <>
                <Card w={'100%'}>
                  <CardHeader>
                    <Flex spacing='4'>
                      <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                        <Avatar name={interviewer.fullName} src={interviewer.avatar} />
                        <Box>
                          <Heading fontFamily={'Roboto'} size='sm'>
                            {truncatedEmail(interviewer.email)}
                          </Heading>
                          <Text> {interviewer.fullName}</Text>
                        </Box>
                      </Flex>
                      <Button onClick={() => handleAssignInterviewer(interviewer.email)} colorScheme='teal'>
                        Phân công
                      </Button>
                    </Flex>
                  </CardHeader>
                </Card>
              </>
            ))}
            <Flex mt={2} justifyContent='flex-end'>
              <Button ref={cancelRef} onClick={onClose}>
                Hủy
              </Button>
            </Flex>
          </Box>
        </Box>
      )}
    </>
  )
}
