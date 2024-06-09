import React from 'react';
import { Box, Container, Stack, Text, Link, HStack, IconButton } from '@chakra-ui/react';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <Box fontFamily={'Roboto'} bg='gray.200' color='gray.800' py={8}>
      <Container maxW='6xl'>
        <Stack spacing={4}>
          <HStack justifyContent='space-between' wrap='wrap' spacing={6}>
            <Stack spacing={2}>
              <Text fontWeight='bold' fontSize='lg'>
                JOB Panda
              </Text>
              <Text fontSize='sm'>© {new Date().getFullYear()} JOB Panda. All rights reserved.</Text>
            </Stack>
            <Stack direction='row' spacing={6}>
              <Link href='#'>Về chúng tôi</Link>
              <Link href='#'>Liên hệ</Link>
              <Link href='#'>Chính sách bảo mật</Link>
              <Link href='#'>Điều khoản dịch vụ</Link>
            </Stack>
            <HStack spacing={4}>
              <IconButton as='a' href='https://www.facebook.com' target='_blank' aria-label='Facebook' icon={<FaFacebook />} />
              <IconButton as='a' href='https://www.twitter.com' target='_blank' aria-label='Twitter' icon={<FaTwitter />} />
              <IconButton as='a' href='https://www.linkedin.com' target='_blank' aria-label='LinkedIn' icon={<FaLinkedin />} />
            </HStack>
          </HStack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
