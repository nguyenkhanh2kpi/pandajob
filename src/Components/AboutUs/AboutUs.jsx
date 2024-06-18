import { Box, Grid, HStack, Heading, Text, VStack, Image } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

export const AboutUs = () => {
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
              Về chúng tôi
            </Heading>
            <Text fontSize='lg' color='gray.600'>
              Chào mừng bạn đến với Panda Job! Chúng tôi cam kết cung cấp các dịch vụ tuyển dụng chất lượng cao. Với sự tận tâm và chuyên nghiệp, chúng tôi mang đến cho bạn cơ hội và giải pháp tối ưu cho sự nghiệp của bạn.
            </Text>
          </VStack>

          {/* Main Content Section */}
          <Grid templateColumns={['1fr', '1fr 1fr']} gap={10}>
            {/* Company Mission */}
            <VStack align='start' spacing={4}>
              <Heading fontFamily='Roboto' as='h2' size='md'>
                Sứ mệnh của chúng tôi
              </Heading>
              <Text fontSize='md' color='gray.700'>
                Tại Panda Job, sứ mệnh của chúng tôi là kết nối những người có tài năng với những cơ hội nghề nghiệp phù hợp nhất. Chúng tôi tin rằng mỗi ứng viên đều có những kỹ năng và phẩm chất độc đáo, và nhiệm vụ của chúng tôi là tìm ra những cơ hội tuyệt vời để họ phát huy tiềm năng của mình.
                Chúng tôi không chỉ tập trung vào việc lấp đầy các vị trí tuyển dụng, mà còn quan tâm đến việc xây dựng các mối quan hệ bền vững giữa các ứng viên và nhà tuyển dụng. Từng bước, chúng tôi nỗ lực để xây dựng một thị trường lao động mạnh mẽ và năng động, nơi mỗi cá nhân đều có thể tìm
                thấy con đường sự nghiệp phù hợp với đam mê và năng lực của mình.
              </Text>
              <Image src='https://imageio.forbes.com/specials-images/imageserve/6241e0d6a9cfb1481d6edf2e/Ghost-jobs-permeate-the-job-market-/960x0.jpg?format=jpg&width=960' alt='Mission' borderRadius='md' />
            </VStack>

            {/* Core Values */}
            <VStack align='start' spacing={4}>
              <Heading fontFamily='Roboto' as='h2' size='md'>
                Giá trị cốt lõi
              </Heading>
              <Text fontSize='md' color='gray.700'>
                Sự chuyên nghiệp, uy tín và tận tâm là những giá trị cốt lõi tạo nên Panda Job. Chúng tôi luôn đặt lợi ích của khách hàng lên hàng đầu và cam kết mang đến những giải pháp tốt nhất cho mọi nhu cầu tuyển dụng. Chúng tôi không ngừng hoàn thiện các quy trình và dịch vụ của mình để đảm
                bảo rằng mỗi khách hàng đều nhận được giá trị tối ưu. Panda Job tôn trọng sự đa dạng và bao dung, thúc đẩy một môi trường làm việc tích cực và sáng tạo, nơi mọi người đều được khuyến khích phát triển bản thân và đóng góp vào sự thành công chung. Chúng tôi cũng tin vào sự minh bạch
                trong mọi giao dịch và cam kết xây dựng niềm tin lâu dài với cả ứng viên và nhà tuyển dụng.
              </Text>
              <Image src='https://images.ctfassets.net/7qqwgjna58ct/3WEd2JUHd2kdYfY34FanGj/ec7084674c3fd7420911240de5a9c5d7/get-a-job-with-no-experience.png' alt='Values' borderRadius='md' />
            </VStack>
          </Grid>

          {/* Services Summary */}
          <VStack align='start' spacing={4}>
            <Heading fontFamily='Roboto' as='h2' size='md'>
              Dịch vụ của chúng tôi
            </Heading>
            <Text fontSize='md' color='gray.700'>
              Panda Job cung cấp một loạt các dịch vụ tuyển dụng đáp ứng nhu cầu đa dạng của cả ứng viên và nhà tuyển dụng. Dịch vụ của chúng tôi bao gồm đăng tin tuyển dụng, quản lý quy trình tuyển dụng, tìm kiếm và sàng lọc ứng viên, tư vấn nghề nghiệp, và đào tạo kỹ năng. Chúng tôi sử dụng các
              công cụ và phương pháp hiện đại nhất để đảm bảo rằng mỗi ứng viên đều có cơ hội tiếp cận với những công việc phù hợp nhất và mỗi nhà tuyển dụng có thể tìm được những nhân viên xuất sắc nhất. Đội ngũ tư vấn của chúng tôi luôn sẵn sàng hỗ trợ bạn trong từng bước của quá trình tuyển dụng,
              từ việc xác định nhu cầu tuyển dụng đến việc hoàn thiện hồ sơ ứng viên và chuẩn bị cho các cuộc phỏng vấn. Với Panda Job, bạn có thể yên tâm rằng mọi khía cạnh của quá trình tuyển dụng sẽ được quản lý một cách chuyên nghiệp và hiệu quả.
            </Text>
            <Image src='https://haenglish.edu.vn/wp-content/uploads/2023/10/cq5dam.web_.1280.1280.png' alt='Services' borderRadius='md' />
          </VStack>
        </VStack>
      </Box>
    </HStack>
  )
}
