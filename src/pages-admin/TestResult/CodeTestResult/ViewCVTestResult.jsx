import { Box, Button, HStack, Text, useDisclosure, VStack } from '@chakra-ui/react'
import React from 'react'
import { OverlayComponent } from '../../../Components-admin/OverlayComponent'
import { CloseIcon } from '@chakra-ui/icons'


const renderCVContent = (cv) => {
  if (cv.url) {
    return <iframe src={cv.url} style={{ width: '100%', height: '100%', border: 'none' }} title='CV Document' />
  }
  return (
    <Box overflowY='auto' w='100%' h='100%'>
      {cv.content ? <Box dangerouslySetInnerHTML={{ __html: cv.content }} /> : <Text>Không thể tải cv</Text>}
    </Box>
  )
}

export const ViewCVTestResult = ({ cv }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button colorScheme='green' size={'xs'} onClick={onOpen}>
        Xem CV
      </Button>
      <OverlayComponent isOpen={isOpen} onClose={onClose}>
        <Box borderRadius={10} p={5} bgColor={'white'} w={'800px'} h={'650px'} overflowY={'auto'}>
          <HStack justifyContent={'flex-end'} w={'100%'}>
            <Button variant='ghost' onClick={onClose} size={'sm'} aria-label='Close'>
              <CloseIcon />
            </Button>
          </HStack>
          <VStack align={'start'} spacing={4} h='100%'>
            <Text m={0} p={0} fontWeight={'bold'}>Chi tiết CV</Text>
            {renderCVContent(cv)}
          </VStack>
        </Box>
      </OverlayComponent>
    </>
  )
}
