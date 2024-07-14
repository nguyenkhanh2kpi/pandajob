import React, { useState } from 'react'
import { OverlayComponent } from '../../Components-admin/OverlayComponent'
import { Box, Button, FormControl, FormLabel, HStack, Link, Text, Textarea, useToast, VStack } from '@chakra-ui/react'
import { CloseIcon, Icon } from '@chakra-ui/icons'
import proposalService from '../../Service/proposal.service'

export const SendProposalOverLay = ({ email, cvId, cvLink, jobName }) => {
  const toast = useToast()
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => {
    setIsOpen(true)
  }
  const handleClose = () => {
    setIsOpen(false)
  }

  const [message, setMessage] = useState('')
  const handleSend = () => {
    const form = {
      message: message,
      cvId: cvId,
    }
    proposalService
      .addNewProposal(form, accessToken)
      .then((response) => {
        if (response.data.message === 'OK') {
          toast({
            title: 'Thành công',
            status: 'success',
            duration: 3000,
            isClosable: true,
          })
        } else {
          toast({
            title: 'Đã có lỗi',
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
        }
      })
      .catch((er) => console.log(er))
  }
  const handleChange = (event) => {
    setMessage(event.target.value)
  }
  return (
    <>
      <Button colorScheme='blue' size={'sm'} onClick={handleOpen}>
        Gửi đề nghị
      </Button>
      <OverlayComponent isOpen={isOpen} onClose={handleClose}>
        <Box w={'500px'} p={5} borderRadius={20} bgColor={'white'}>
          <VStack w={'100%'} align={'flex-start'}>
            <HStack w={'100%'} justifyContent={'space-between'}>
              <Text fontWeight={'bold'}>
                Gửi yêu cầu đến ứng viên {email} cho công việc {jobName}
              </Text>
              <Icon onClick={handleClose} as={CloseIcon} />
            </HStack>
            <FormControl>
              <Text fontWeight={'bold'}>
                CV: {cvId} -{' '}
                <Link isExternal href={cvLink}>
                  Xem
                </Link>
              </Text>
              <FormLabel>Lời nhắn</FormLabel>
              <Textarea value={message} onChange={handleChange} />
            </FormControl>
            <Button onClick={() => handleSend()}>Gửi</Button>
          </VStack>
        </Box>
      </OverlayComponent>
    </>
  )
}
