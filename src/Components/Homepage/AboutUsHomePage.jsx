import { Icon } from '@chakra-ui/icons'
import React from 'react'
import { AiOutlineAlert } from 'react-icons/ai'
import { Box, Flex, Heading, Image, Link, Text, VStack } from '@chakra-ui/react'

const AboutUsHomePage = () => {
  return (
    <VStack p={10} fontFamily={'Roboto'} w={'100%'}>
      <Box overflow={'hidden'} position='relative' w={'100%'}>
        <Flex alignItems='center' mb={6}>
          <Text m={0} p={0} fontWeight={'bold'} size='md' mr={4}>
            Về chúng tôi
          </Text>
          <Link href='/about-us' color='blue.500' fontWeight='bold'>
            Tìm hiểu thêm
          </Link>
        </Flex>

        <Flex alignItems='center' justifyContent='space-between'>
          <Box maxW='50%'>
            <Text lineHeight={2} fontStyle={'italic'} fontWeight={'bold'} mb={4}>
              Chào mừng bạn đến với Panda Job! Chúng tôi cam kết cung cấp các dịch vụ tuyển dụng chất lượng cao. Với sự tận tâm và chuyên nghiệp, chúng tôi mang đến cho bạn cơ hội và giải pháp tối ưu cho sự nghiệp của bạn.
            </Text>
            <Text lineHeight={2} fontStyle={'italic'} fontWeight={'bold'}>
              Tại Panda Job, sứ mệnh của chúng tôi là kết nối những người có tài năng với những cơ hội nghề nghiệp phù hợp nhất. Chúng tôi tin rằng mỗi ứng viên đều có những kỹ năng và phẩm chất độc đáo, và nhiệm vụ của chúng tôi là tìm ra những cơ hội tuyệt vời để họ phát huy tiềm năng của mình.
              Chúng tôi không chỉ tập trung vào việc lấp đầy các vị trí tuyển dụng, mà còn quan tâm đến việc xây dựng các mối quan hệ bền vững giữa các ứng viên và nhà tuyển dụng.
            </Text>
          </Box>
          <Image src='https://imageio.forbes.com/specials-images/imageserve/6241e0d6a9cfb1481d6edf2e/Ghost-jobs-permeate-the-job-market-/960x0.jpg?format=jpg&width=960' alt='About Us' borderRadius='md' maxW='50%' boxShadow='lg' />
        </Flex>
      </Box>
    </VStack>
  )
}

export default AboutUsHomePage
