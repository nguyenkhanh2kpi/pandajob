import { Button, HStack, Heading, SlideFade, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { CodeFrameTest } from './CodeFrameTest'

export const CodeEssay = () => {
  const [start, setStart] = useState(false)
  return (
    <VStack minH={730} bgColor={'#f0f4f5'} fontFamily={'Montserrat'}>
      <SlideFade offsetY={20}>
        <Heading size={'lg'} mt={16}></Heading>
      </SlideFade>
      {start ? (
        <>
          <CodeFrameTest />
        </>
      ) : (
        <HStack align={'flex-start'} w={'60vw'} m={5} p={5}>
          <Button w={'100%'} size='lg' colorScheme='teal' onClick={() => setStart(true)}>
            Bắt đầu làm bài code
          </Button>
        </HStack>
      )}
    </VStack>
  )
}
