import { Box, Button, HStack, Text, VStack, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { executeCode } from './api'

export const Output = ({ editorRef, language }) => {
  const toast = useToast()
  const [output, setOutput] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue()
    if (!sourceCode) return
    try {
      setIsLoading(true)
      const { run: result } = await executeCode(language, sourceCode)
      setOutput(result.output.split('\n'))
      result.stderr ? setIsError(true) : setIsError(false)
    } catch (error) {
      console.log(error)
      toast({
        title: 'An error occurred.',
        description: error.message || 'Unable to run code',
        status: 'error',
        duration: 6000,
      })
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <VStack w={'100%'}>
      <HStack w={'100%'}>
        <Button variant={'outline'} colorScheme='teal' size='xs' isLoading={isLoading} onClick={runCode}>
          Run
        </Button>
      </HStack>
      <Box bgColor={'white'} overflow={'auto'} w={'100%'} height='200px' p={2} color={isError ? 'red.400' : ''} border='1px solid' borderRadius={4} borderColor={isError ? 'red.500' : '#333'}>
        {output ? output.map((line, i) => <Text key={i}>{line}</Text>) : 'Click "Run Code" to see the output here'}
      </Box>
    </VStack>
  )
}
