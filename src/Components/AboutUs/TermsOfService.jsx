import { Box, HStack, Heading, Text, VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react'

export const TermsOfService = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <HStack alignItems='flex-start' justifyContent='center' minH='1000px' bgColor='white' w='100%' p={5}>
      <Box fontFamily='Roboto' w='80%' mt='60px' p={5}>
        <VStack spacing={8} align='stretch'>
          {/* Header Section */}
          <VStack spacing={4} align='center' textAlign='center'>
            <Heading fontFamily='Roboto' as='h1' size='md'>
              Điều khoản dịch vụ
            </Heading>
            <Text fontSize='lg' color='gray.600'>
              Vui lòng đọc kỹ điều khoản dịch vụ của chúng tôi trước khi sử dụng trang web. Việc sử dụng trang web này đồng nghĩa với việc bạn đồng ý với các điều khoản sau đây.
            </Text>
          </VStack>

          {/* Terms of Service Content */}
          <VStack align='start' spacing={4}>
            <Heading fontFamily='Roboto' as='h2' size='md'>
              Điều kiện sử dụng
            </Heading>
            <Text fontSize='md' color='gray.700'>
              Khi sử dụng dịch vụ của chúng tôi, bạn đồng ý tuân thủ tất cả các luật pháp liên quan và không sử dụng dịch vụ cho bất kỳ mục đích bất hợp pháp hoặc không đúng đắn nào.
            </Text>

            <Heading fontFamily='Roboto' as='h2' size='md'>
              Trách nhiệm của người dùng
            </Heading>
            <Text fontSize='md' color='gray.700'>
              Bạn chịu trách nhiệm về tính chính xác và hợp pháp của thông tin bạn cung cấp. Bạn cũng đồng ý không sao chép, phân phối hoặc tạo ra các tác phẩm phái sinh từ nội dung của chúng tôi mà không có sự cho phép rõ ràng.
            </Text>

            <Heading fontFamily='Roboto' as='h2' size='md'>
              Giới hạn trách nhiệm
            </Heading>
            <Text fontSize='md' color='gray.700'>
              Chúng tôi không chịu trách nhiệm về bất kỳ thiệt hại nào phát sinh từ việc sử dụng dịch vụ của chúng tôi. Điều này bao gồm, nhưng không giới hạn, các thiệt hại do mất dữ liệu, lỗi hệ thống hoặc gián đoạn dịch vụ.
            </Text>

            <Heading fontFamily='Roboto' as='h2' size='md'>
              Thay đổi điều khoản
            </Heading>
            <Text fontSize='md' color='gray.700'>
              Chúng tôi có quyền thay đổi điều khoản dịch vụ này bất kỳ lúc nào. Các thay đổi sẽ có hiệu lực ngay khi được đăng tải trên trang web. Việc tiếp tục sử dụng dịch vụ sau khi các thay đổi có hiệu lực đồng nghĩa với việc bạn chấp nhận các thay đổi đó.
            </Text>
          </VStack>
        </VStack>
      </Box>
    </HStack>
  )
}
