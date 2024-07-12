import React from 'react'
import { Box, Text, Button, useDisclosure, Flex, Center, Link } from '@chakra-ui/react'

function ConfirmVipDialog({ isVip, job, onConfirm }) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleConfirm = () => {
    onConfirm(job)
    onClose()
  }

  return (
    <>
      <Button isDisabled={!isVip} size='sm' backgroundColor='rgb(3, 201, 215)' color={'white'} onClick={onOpen}>
        <Link> Áp dụng TOP VIP </Link>
      </Button>

      {isOpen && (
        <Box position='fixed' top='0' left='0' width='100vw' height='100vh' bg='rgba(0, 0, 0, 0.6)' display='flex' alignItems='center' justifyContent='center' zIndex='1000'>
          <Box bg='white' p={6} borderRadius='md' boxShadow='md' maxWidth='400px' width='100%'>
            <Text fontSize='lg' fontWeight='bold' mb={4}>
              Áp dụng TOP VIP
            </Text>
            <Text mb={4}>Bạn có chắc chắn muốn đặt trạng thái VIP cho công việc "{job.name}"?</Text>
            <Box bgColor={'#FEEBC8'} w={'100%'} as='blockquote' borderRadius={3} borderLeft='4px solid' borderColor='blue.400' pl={4} py={2} mb={4}>
              lưu ý: Bạn chỉ có thể áp dụng gói TOP VIP cho 1 công việc của mình
            </Box>
            <Flex justifyContent='flex-end'>
              <Button onClick={onClose} mr={3}>
                Hủy
              </Button>
              <Button colorScheme='blue' onClick={handleConfirm}>
                Xác nhận
              </Button>
            </Flex>
          </Box>
        </Box>
      )}
    </>
  )
}

export default ConfirmVipDialog
