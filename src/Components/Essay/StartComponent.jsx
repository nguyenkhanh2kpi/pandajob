import { CheckCircleIcon } from '@chakra-ui/icons'
import { Button, Image, List, ListIcon, ListItem, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import codeExample1 from '../assets/codeExample1.png'
import codeExample2 from '../assets/codeExample2.png'
import codeExample3 from '../assets/codeExample3.png'

export const StartComponent = ({ handleStartTest }) => {
  return (
    <VStack fontFamily={'Roboto'} align={'flex-start'} w={'60vw'} m={5} p={5} spacing={5}>
      <Button fontFamily={'Roboto'}  h={'50px'} w={'100%'} size='lg' colorScheme='teal' onClick={handleStartTest}>
        Bắt đầu làm bài
      </Button>
      <Text fontSize='sm' color='gray.500'>
        Lưu ý: Bài test chỉ được thực hiện 1 lần duy nhất
      </Text>
      <Text fontSize='md' fontWeight='bold'>
        Hướng dẫn làm bài test coding:
      </Text>
      <List spacing={3} pl={5}>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color='teal.500' />
          Đọc kỹ đề bài trước khi bắt đầu.Đừng bỏ sót câu hỏi nào trước khi nộp bài
          <Image src={codeExample1} />
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color='teal.500' />
          Viết mã nguồn đáp ứng đầy đủ yêu cầu của đề bài <b>Không đổi tên hàm, mẫu hàm có sẵn</b>. Có thể chọn ngôn ngữ lập trình nào mong muốn ở góc trên bên phải
          <Image src={codeExample2} />
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color='teal.500' />
          Chạy thử mã nguồn để kiểm tra kết quả ở khung dưới bên phải.
          <Image src={codeExample3} />
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color='teal.500' />
          Nộp bài trước thời hạn quy định.
        </ListItem>
      </List>
    </VStack>
  )
}
