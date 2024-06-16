import { Box, HStack, VStack, Text, Image, IconButton } from '@chakra-ui/react'
import React, { useState } from 'react'
import { MdArrowForward } from 'react-icons/md'

export const UserManual = () => {
  const [selectedItem, setSelectedItem] = useState('Cách tạo CV trên JobPanda và bắt đầu ứng tuyển cho công việc')

  const userManualData = {
    'Cách tạo CV trên JobPanda và bắt đầu ứng tuyển cho công việc': {
      title: 'Mục 1: Hướng dẫn cách sử dụng',
      content: 'Đây là nội dung hướng dẫn chi tiết cho Mục 1. Bạn có thể thêm các bước hướng dẫn, hình ảnh minh họa và các mô tả chi tiết ở đây.',
    },
    'Cách để trở thành nhà tuyển dụng': {
      title: 'Mục 2: Hướng dẫn chi tiết',
      content: 'Đây là nội dung hướng dẫn chi tiết cho Mục 2. Bạn có thể bổ sung thêm các ví dụ và hình ảnh minh họa để giúp người dùng dễ dàng hiểu.',
    },
    'Cách theo giõi những bài test, thông báo của nhà tuyển dụng': {
      title: 'Mục 3: Các tính năng nâng cao',
      content: 'Đây là nội dung hướng dẫn cho các tính năng nâng cao của Pandajob. Có thể có các bước hướng dẫn cụ thể và hình ảnh minh họa cho từng tính năng.',
    },
  }

  const handleItemClick = (item) => {
    setSelectedItem(item)
  }

  return (
    <HStack alignItems='flex-start' justifyContent='center' minH='100vh' bgColor='white' w='100%' p={5}>
      <VStack align='stretch' spacing={4} w='30%' borderRight='1px solid #ccc' pr={5}>
        <Text fontSize='xl' fontWeight='bold'>
          Hướng dẫn sử dụng
        </Text>
        <Box as='ul' listStyleType='none' mt={4}>
          {Object.keys(userManualData).map((item, index) => (
            <Box key={index} as='li' cursor='pointer' onClick={() => handleItemClick(item)}>
              <HStack spacing={2} align='center'>
                <IconButton aria-label={`Select ${item}`} icon={<MdArrowForward />} size='sm' variant={item === selectedItem ? 'solid' : 'outline'} colorScheme='blue' onClick={() => handleItemClick(item)} />
                <Text fontWeight={item === selectedItem ? 'bold' : 'normal'}>{item}</Text>
              </HStack>
            </Box>
          ))}
        </Box>
      </VStack>

      <Box fontFamily='Roboto' w='70%' mt='60px' p={5}>
        <VStack spacing={8} align='stretch'>
          <Text fontSize='xl' fontWeight='bold'>
            {userManualData[selectedItem].title}
          </Text>
          <Text>{userManualData[selectedItem].content}</Text>
          <Image src='/path/to/your/image.jpg' alt='Hình ảnh minh họa' w='100%' borderRadius='md' boxShadow='lg' />
        </VStack>
      </Box>
    </HStack>
  )
}
