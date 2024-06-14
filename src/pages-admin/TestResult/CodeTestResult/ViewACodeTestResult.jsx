import { Box, Button, HStack, Text, VStack, Code, useDisclosure, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Spinner, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { OverlayComponent } from '../../../Components-admin/OverlayComponent'
import { CloseIcon } from '@chakra-ui/icons'
import { QuestionInCodeTestResult } from './QuestionInCodeTestResult'
import { executeCode } from '../../../Components/CodeEditor/api'

export const ViewACodeTestResult = ({ records,results }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const parsedRecords = JSON.parse(records)
  const [output, setOutput] = useState({})
  const [isLoading, setIsLoading] = useState({})
  const [isError, setIsError] = useState({})
  const toast = useToast()

  const runCode = async (language, sourceCode, questionId) => {
    if (!sourceCode) return
    setIsLoading((prev) => ({ ...prev, [questionId]: true }))
    try {
      const { run: result } = await executeCode(language, sourceCode)
      setOutput((prev) => ({
        ...prev,
        [questionId]: result.output.split('\n'),
      }))
      setIsError((prev) => ({
        ...prev,
        [questionId]: !!result.stderr,
      }))
    } catch (error) {
      console.log(error)
      toast({
        title: 'An error occurred.',
        description: error.message || 'Unable to run code',
        status: 'error',
        duration: 6000,
      })
    } finally {
      setIsLoading((prev) => ({ ...prev, [questionId]: false }))
    }
  }

  return (
    <>
      <Button colorScheme='green' size={'xs'} onClick={onOpen}>
        Xem Chi tiết bài test
      </Button>
      <OverlayComponent isOpen={isOpen} onClose={onClose}>
        <Box borderRadius={10} p={5} bgColor={'white'} w={'800px'} h={'650px'} overflowY={'auto'}>
          <HStack justifyContent={'flex-end'} w={'100%'}>
            <Button variant='ghost' onClick={onClose} size={'sm'} aria-label='Close'>
              <CloseIcon />
            </Button>
          </HStack>
          <VStack align={'start'} spacing={4} h='100%'>
            <Accordion w={'100%'} allowToggle>
              {parsedRecords.map((question, index) => {
                const code = JSON.parse(question.value)[question.language]
                const testCode = JSON.parse(question.testFunction)[question.language]
                const fullCode = `${code}\n\n${testCode}`

                return (
                  <AccordionItem key={question.id}>
                    <h2>
                      <AccordionButton>
                        <Box as='span' flex='1' textAlign='left'>
                          Câu {index + 1} 
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <QuestionInCodeTestResult questionTxt={question.questionText} />
                      <Text fontWeight={'bold'}>Câu trả lời của ứng viên</Text>
                      <Text>Ngôn ngữ: {question.language}</Text>
                      <Box as='pre' whiteSpace='pre-wrap' overflow='auto'>
                        <Code p={2} width='100%'>
                          {fullCode}
                        </Code>
                      </Box>
                      <Button mt={4} colorScheme='blue' size={'sm'} onClick={() => runCode(question.language, fullCode, question.id)}>
                        Run Code
                      </Button>
                      {isLoading[question.id] && <Spinner size='sm' ml={2} />}
                      {output[question.id] && (
                        <Box mt={4} p={2} border='1px' borderColor='gray.200'>
                          <Text fontWeight={'bold'}>Output:</Text>
                          <Code as='pre' whiteSpace='pre-wrap' p={2}>
                            {output[question.id].join('\n')}
                          </Code>
                        </Box>
                      )}
                      {isError[question.id] && (
                        <Text mt={2} color='red.500'>
                          An error occurred while running the code.
                        </Text>
                      )}
                    </AccordionPanel>
                  </AccordionItem>
                )
              })}
            </Accordion>
          </VStack>
        </Box>
      </OverlayComponent>
    </>
  )
}















// import { Box, Button, HStack, Text, VStack, Code, Image, useDisclosure, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, useToast } from '@chakra-ui/react'
// import React from 'react'
// import { OverlayComponent } from '../../../Components-admin/OverlayComponent'
// import { CloseIcon } from '@chakra-ui/icons'
// import { QuestionInCodeTestResult } from './QuestionInCodeTestResult'
// import { executeCode } from '../../../Components/CodeEditor/api'

// export const ViewACodeTestResult = ({ records }) => {
//   const toast = useToast()
//   const { isOpen, onOpen, onClose } = useDisclosure()
//   const parsedRecords = JSON.parse(records)

//   //
//   const [output, setOutput] = useState(null)
//   const [isLoading, setIsLoading] = useState(false)
//   const [isError, setIsError] = useState(false)

//   const runCode = async (language, sourceCode, questionId) => {
//     if (!sourceCode) return
//     setIsLoading((prev) => ({ ...prev, [questionId]: true }))
//     try {
//       const { run: result } = await executeCode(language, sourceCode)
//       setOutput((prev) => ({
//         ...prev,
//         [questionId]: result.output.split('\n'),
//       }))
//       setIsError((prev) => ({
//         ...prev,
//         [questionId]: !!result.stderr,
//       }))
//     } catch (error) {
//       console.log(error)
//       toast({
//         title: 'An error occurred.',
//         description: error.message || 'Unable to run code',
//         status: 'error',
//         duration: 6000,
//       })
//     } finally {
//       setIsLoading((prev) => ({ ...prev, [questionId]: false }))
//     }
//   }

//   return (
//     <>
//       <Button colorScheme='green' size={'xs'} onClick={onOpen}>
//         Xem Chi tiết bài test
//       </Button>
//       <OverlayComponent isOpen={isOpen} onClose={onClose}>
//         <Box borderRadius={10} p={5} bgColor={'white'} w={'800px'} h={'650px'} overflowY={'auto'}>
//           <HStack justifyContent={'flex-end'} w={'100%'}>
//             <Button variant='ghost' onClick={onClose} size={'sm'} aria-label='Close'>
//               <CloseIcon />
//             </Button>
//           </HStack>
//           <VStack align={'start'} spacing={4} h='100%'>
//             <Accordion w={'100%'} allowToggle>
//               {parsedRecords.map((question, index) => (
//                 <AccordionItem key={question.id}>
//                   <h2>
//                     <AccordionButton>
//                       <Box as='span' flex='1' textAlign='left'>
//                         Câu {index + 1}
//                       </Box>
//                       <AccordionIcon />
//                     </AccordionButton>
//                   </h2>
//                   <AccordionPanel pb={4}>
//                     <QuestionInCodeTestResult questionTxt={question.questionText} />
//                     <Text fontWeight={'bold'}>Câu trả lời của ứng viên</Text>
//                     <Text>Ngôn ngữ: {question.language}</Text>
//                     <Box as='pre' whiteSpace='pre-wrap' overflow='auto'>
//                       <Code p={2} width='100%'>
//                         {JSON.parse(question.value)[question.language]}
//                       </Code>
//                       <Code p={2} width='100%'>
//                         {JSON.parse(question.testFunction)[question.language]}
//                       </Code>
//                     </Box>
//                   </AccordionPanel>
//                 </AccordionItem>
//               ))}
//             </Accordion>
//           </VStack>
//         </Box>
//       </OverlayComponent>
//     </>
//   )
// }

