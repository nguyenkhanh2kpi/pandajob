import { Box, HStack, Heading, Text, VStack, Input, Button, Textarea, FormControl, FormLabel, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { feedbackService } from '../../Service/feed.service'

export const ContactUs = () => {
  const toast = useToast()

  const [feed, setFeed] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleChange = (e) => {
    const { id, value } = e.target
    setFeed((prevState) => ({
      ...prevState,
      [id]: value,
    }))
  }

  const handleFeedBack = () => {
    if (!feed.name || !feed.email || !feed.message) {
      toast({
        title: 'Dữ liệu không hợp lệ',
        description: 'Vui lòng điền đầy đủ thông tin',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    feedbackService
      .createFeedback(feed)
      .then((response) => {
        if (response.email === feed.email) {
          toast({
            title: 'Thành công',
            description: 'Thông tin của bạn đã được gửi đến chúng tôi',
            status: 'success',
            duration: 3000,
            isClosable: true,
          })
          setFeed({ name: '', email: '', message: '' })
        } else {
          toast({
            title: 'Lỗi',
            description: 'Đã có lỗi xảy ra',
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
        }
      })
      .catch((error) => {
        console.error('Error sending feedback:', error)
        toast({
          title: 'Lỗi',
          description: 'Đã có lỗi xảy ra',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      })
  }

  return (
    <HStack alignItems='flex-start' justifyContent='center' minH='1000px' bgColor='white' w='100%' p={5}>
      <Box fontFamily='Roboto' w='80%' mt='60px' p={5}>
        <VStack spacing={8} align='stretch'>
          {/* Header Section */}
          <VStack spacing={4} align='center' textAlign='center'>
            <Text fontWeight={'bold'} fontFamily='Roboto'>
              Liên hệ với chúng tôi
            </Text>
            <Text color='gray.600'>Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy điền thông tin vào mẫu dưới đây để liên hệ với chúng tôi.</Text>
          </VStack>

          {/* Contact Form */}
          <VStack align='start' spacing={4}>
            <FormControl id='name' isRequired>
              <FormLabel>Họ và tên</FormLabel>
              <Input value={feed.name} type='text' placeholder='Nhập họ và tên của bạn' onChange={handleChange} />
            </FormControl>
            <FormControl id='email' isRequired>
              <FormLabel>Email</FormLabel>
              <Input value={feed.email} type='email' placeholder='Nhập email của bạn' onChange={handleChange} />
            </FormControl>
            <FormControl id='message' isRequired>
              <FormLabel>Tin nhắn</FormLabel>
              <Textarea value={feed.message} placeholder='Nhập tin nhắn của bạn' onChange={handleChange} />
            </FormControl>
            <Button onClick={handleFeedBack} colorScheme='blue' size='md'>
              Gửi
            </Button>
          </VStack>

          {/* Contact Information */}
          <VStack align='start' spacing={4}>
            <Text fontWeight={'bold'} fontFamily='Roboto'>
              Thông tin liên hệ
            </Text>
            <Text fontSize='md' color='gray.700'>
              <strong>Địa chỉ:</strong> Số 1 Võ Văn Ngân, Thành phố Hồ Chí Minh
            </Text>
            <Text fontSize='md' color='gray.700'>
              <strong>Email:</strong> nguyenkhanh2kpi@gmail.com
            </Text>
            <Text fontSize='md' color='gray.700'>
              <strong>Điện thoại:</strong> +84 349 519 943
            </Text>
          </VStack>
        </VStack>
      </Box>
    </HStack>
  )
}
