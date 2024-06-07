import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Card, HStack, Image, Text, VStack } from '@chakra-ui/react'
import React from 'react'

export const EditEssayTest = () => {
  return (
    <Box minH={1000} fontFamily={'Montserrat'} fontWeight={400} backgroundColor={'#e9f3f5'} overflow='hidden'>
      <Breadcrumb pt={30}>
        <BreadcrumbItem>
          <BreadcrumbLink href='#'>Bài test tự luận</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <VStack w={'100%'} pl={30} pr={30} spacing={10}>
        <Card w={'100%'} direction={{ base: 'column', sm: 'row' }} overflow='hidden' variant='outline'>
          <Image objectFit='cover' maxW={{ base: '100%', sm: '200px' }} src='https://firebasestorage.googleapis.com/v0/b/quanlytuyendung-4fb2c.appspot.com/o/1716283312536__87023a25-c40b-4cfc-8280-9b752524a5ba.jpg?alt=media' alt='Room' />
        </Card>
      </VStack>
    </Box>
  )
}
