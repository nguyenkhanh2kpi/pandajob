import { Box, HStack, Heading, Text, VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react'

export const PrivacyPolicy = () => {
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
              Chính sách bảo mật
            </Heading>
            <Text fontSize='lg' color='gray.600'>
              Chúng tôi cam kết bảo vệ quyền riêng tư của bạn. Đọc kỹ chính sách bảo mật của chúng tôi để hiểu cách chúng tôi thu thập, sử dụng và bảo vệ thông tin cá nhân của bạn.
            </Text>
          </VStack>

          {/* Privacy Policy Content */}
          <VStack align='start' spacing={4}>
            <Heading fontFamily='Roboto' as='h2' size='lg'>
              Thu thập thông tin
            </Heading>
            <Text fontSize='md' color='gray.700'>
              Chúng tôi thu thập thông tin cá nhân của bạn khi bạn đăng ký tài khoản, điền vào biểu mẫu, hoặc tương tác với các dịch vụ của chúng tôi. Các thông tin có thể bao gồm tên, email, số điện thoại, và thông tin liên quan khác.
            </Text>

            <Heading fontFamily='Roboto' as='h2' size='lg'>
              Sử dụng thông tin
            </Heading>
            <Text fontSize='md' color='gray.700'>
              Thông tin của bạn được sử dụng để cung cấp và cải thiện dịch vụ, xử lý yêu cầu của bạn, và cung cấp hỗ trợ khách hàng. Chúng tôi cũng có thể sử dụng thông tin để liên hệ với bạn về các bản cập nhật và các tin tức liên quan đến dịch vụ.
            </Text>

            <Heading fontFamily='Roboto' as='h2' size='lg'>
              Bảo mật thông tin
            </Heading>
            <Text fontSize='md' color='gray.700'>
              Chúng tôi sử dụng các biện pháp bảo mật hợp lý để bảo vệ thông tin cá nhân của bạn khỏi mất mát, truy cập trái phép, hoặc tiết lộ không mong muốn. Tuy nhiên, chúng tôi không thể đảm bảo an ninh hoàn toàn cho dữ liệu bạn cung cấp qua internet.
            </Text>

            <Heading fontFamily='Roboto' as='h2' size='lg'>
              Quyền của bạn
            </Heading>
            <Text fontSize='md' color='gray.700'>
              Bạn có quyền truy cập, chỉnh sửa hoặc xóa thông tin cá nhân của mình bằng cách liên hệ với chúng tôi. Bạn cũng có thể yêu cầu ngừng sử dụng thông tin cá nhân của mình cho mục đích tiếp thị.
            </Text>
          </VStack>
        </VStack>
      </Box>
    </HStack>
  )
}
