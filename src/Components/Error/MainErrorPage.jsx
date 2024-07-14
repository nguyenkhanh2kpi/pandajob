import { Box, HStack, Text, VStack } from '@chakra-ui/react'
import React from 'react'

export const MainErrorPage = () => {
  return (
    <HStack alignItems='flex-start' justifyContent='center' minH='100vh' bgColor='white' w='100%' p={5}>
      <VStack align='stretch' spacing={4} w='10%' borderRight='1px solid #ccc' pr={5}></VStack>

      <Box fontFamily='Roboto' w='90%' mt='60px' p={5}>
        <VStack spacing={8} align='stretch'>
          <Text fontSize='2xl' fontWeight='bold' color='red.600'>
            404 - Page Not Found
          </Text>
          <Text fontSize='lg' color='gray.700'>
            Trang bạn đang tìm kiếm không tồn tại. Vui lòng kiểm tra URL hoặc sử dụng điều hướng để tìm thấy những gì bạn đang tìm kiếm.
          </Text>
        </VStack>
      </Box>
    </HStack>
  )
}
