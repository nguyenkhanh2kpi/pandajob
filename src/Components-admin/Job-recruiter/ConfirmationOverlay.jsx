import { Button, Text, Alert, AlertIcon, Box, Flex } from '@chakra-ui/react'

const ConfirmationOverlay = ({ isOpen, onClose, onConfirm, message }) => (
  <>
    {isOpen && (
      <Box position='fixed' top='0' left='0' width='100vw' height='100vh' bg='rgba(0, 0, 0, 0.6)' display='flex' alignItems='center' justifyContent='center' zIndex='1000'>
        <Box bg='white' p={6} borderRadius='md' boxShadow='md' maxWidth='400px' width='100%'>
          <Text fontSize='lg' fontWeight='bold' mb={4}>
            Thay đổi trạng thái bài đăng
          </Text>
          <Text mb={4}>{message}</Text>
          <Flex justifyContent='flex-end'>
            <Button onClick={onClose} mr={3}>
              Hủy
            </Button>
            <Button colorScheme='blue' onClick={onConfirm}>
              Xác nhận
            </Button>
          </Flex>
        </Box>
      </Box>
    )}
  </>
)

export default ConfirmationOverlay
