import { DeleteIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'

export const ConfirmDeleteAJob = ({ job, onComfirm }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const handleClick = (jobId) => {
    onComfirm(jobId)
    onClose()
  }

  return (
    <>
      <Button size='sm' rightIcon={<DeleteIcon />} colorScheme='red' variant='outline' data-value={job.id} onClick={onOpen}>
        Xóa
      </Button>

      {isOpen && (
        <Box position='fixed' top='0' left='0' width='100vw' height='100vh' bg='rgba(0, 0, 0, 0.6)' display='flex' alignItems='center' justifyContent='center' zIndex='1000'>
          <Box bg='white' p={6} borderRadius='md' boxShadow='md' maxWidth='400px' width='100%'>
            <Text fontSize='lg' fontWeight='bold' mb={4}>
              Xóa bài đăng
            </Text>
            <Text mb={4}>Bạn có chắc chắn muốn xóa bài đăng {job.name}?</Text>
            <Flex justifyContent='flex-end'>
              <Button onClick={onClose} mr={3}>
                Hủy
              </Button>
              <Button colorScheme='blue' onClick={() => handleClick(job.id)}>
                Xác nhận
              </Button>
            </Flex>
          </Box>
        </Box>
      )}
    </>
  )
}
