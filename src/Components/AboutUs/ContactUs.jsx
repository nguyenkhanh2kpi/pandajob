import { Box, HStack, Heading, Text, VStack, Input, Button, Textarea, FormControl, FormLabel } from '@chakra-ui/react'
import React, { useEffect } from 'react'

export const ContactUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <HStack alignItems='flex-start' justifyContent='center' minH='1000px' bgColor='#f0f4f5' w='100%' p={5}>
      <Box fontFamily='Roboto' w='80%' mt='60px' p={5}>
        <VStack spacing={8} align='stretch'>
          {/* Header Section */}
          <VStack spacing={4} align='center' textAlign='center'>
            <Heading fontFamily='Roboto' as='h1' size='2xl'>
              Liên hệ với chúng tôi
            </Heading>
            <Text fontSize='lg' color='gray.600'>
              Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy điền thông tin vào mẫu dưới đây để liên hệ với chúng tôi.
            </Text>
          </VStack>

          {/* Contact Form */}
          <VStack align='start' spacing={4}>
            <FormControl id='name'>
              <FormLabel>Họ và tên</FormLabel>
              <Input type='text' placeholder='Nhập họ và tên của bạn' />
            </FormControl>
            <FormControl id='email'>
              <FormLabel>Email</FormLabel>
              <Input type='email' placeholder='Nhập email của bạn' />
            </FormControl>
            <FormControl id='message'>
              <FormLabel>Tin nhắn</FormLabel>
              <Textarea placeholder='Nhập tin nhắn của bạn' />
            </FormControl>
            <Button colorScheme='blue' size='md'>
              Gửi
            </Button>
          </VStack>

          {/* Contact Information */}
          <VStack align='start' spacing={4}>
            <Heading fontFamily='Roboto' as='h2' size='lg'>
              Thông tin liên hệ
            </Heading>
            <Text fontSize='md' color='gray.700'>
              <strong>Địa chỉ:</strong> 123 Đường Panda, Quận 1, Thành phố Hồ Chí Minh
            </Text>
            <Text fontSize='md' color='gray.700'>
              <strong>Email:</strong> contact@pandajob.vn
            </Text>
            <Text fontSize='md' color='gray.700'>
              <strong>Điện thoại:</strong> +84 123 456 789
            </Text>
          </VStack>
        </VStack>
      </Box>
    </HStack>
  )
}
