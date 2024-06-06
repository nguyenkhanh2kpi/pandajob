import { Box, Button, HStack, Text, VStack } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import { CODE_SNIPPETS } from '../CodeEditor/constant'
import { Editor } from '@monaco-editor/react'
import { CodeLanguageEditor } from '../CodeEditor/CodeLanguageEditor'
import { Output } from '../CodeEditor/Output'

const questionsl = [
  {
    id: 1,
    question: 'What is closure in JavaScript?',
    value: '',
    language: 'javascript',
  },
  {
    id: 2,
    question: 'Explain the difference between list and tuple in Python.',
    value: '',
    language: 'javascript',
  },
  {
    id: 3,
    question: 'What are the different types of access modifiers in Java?',
    value: '',
    language: 'javascript',
  },
  {
    id: 4,
    question: 'What is the purpose of the doctype declaration in HTML?',
    value: '',
    language: 'javascript',
  },
  {
    id: 5,
    question: 'What are the different ways to apply CSS styles to HTML elements?',
    value: '',
    language: 'javascript',
  },
]

// export const CodeFrameTest = () => {
//   const editorRef = useRef()
//   const [language, setlanguage] = useState('javascript')
//   const onMount = (editor) => {
//     editorRef.current = editor
//     editor.focus()
//   }
//   const onSelect = (language) => {
//     setlanguage(language)
//     setSelectedQuestion((prevQuestion) => ({
//       ...prevQuestion,
//       value: CODE_SNIPPETS[language],
//     }))
//   }

//   //cau hoi
//   const [questions, setQuestions] = useState(questionsl)
//   const [selectedQuestion, setSelectedQuestion] = useState({
//     id: 0,
//     question: '',
//     value: '',
//     language:'',
//   })
//   const handleQuestionClick = (question) => {
//     setQuestions((prevQuestions) => prevQuestions.map((q) => (q.id === selectedQuestion.id ? { ...selectedQuestion } : q)))
//     setSelectedQuestion(question)
//   }

//   const handleValueChange = (value) => {
//     setSelectedQuestion((prevQuestion) => ({
//       ...prevQuestion,
//       value: value,
//     }))
//   }
//   const handleSubmit = () => {
//     console.log(JSON.stringify(selectedQuestion))
//     console.log(JSON.stringify(questions))
//   }

//   return (
//     <HStack h={400} align={'flex-start'} w={'98vw'}>
//       <VStack w={'100%'}>
//         <HStack justifyContent={'flex-end'} h={30} w={'100%'}>
//           <CodeLanguageEditor language={language} onSelect={onSelect} />
//           <Button variant={'outline'} size='xs' colorScheme='blue'>
//             time
//           </Button>
//           <Button onClick={handleSubmit} variant={'outline'} size='xs' colorScheme='blue'>
//             submit
//           </Button>
//         </HStack>
//         <HStack minH={600} w={'100%'} alignItems='flex-start'>
//           <VStack h={'100%'} justifyContent={'flex-start'} w={'4%'}>
//             {questions.map((q) => (
//               <Button key={q.id} onClick={() => handleQuestionClick(q)} variant={selectedQuestion.id == q.id ? 'solid' : 'outline'} w={'80%'} colorScheme='blue'>
//                 {q.id}
//               </Button>
//             ))}
//           </VStack>
//           <HStack minH={500} alignItems w={'96%'}>
//             <Box p={3} bgColor={'white'} w={'40%'}>
//               <Text>{selectedQuestion.question}</Text>
//             </Box>
//             <VStack w={'60%'}>
//               <Box bgColor={'white'} h={350} w={'100%'} overflow={'hidden'}>
//                 <Editor onMount={onMount} onChange={handleValueChange} height='100vh' language={language} defaultValue={CODE_SNIPPETS[language]} value={selectedQuestion.value} />
//               </Box>
//               <Box w={'100%'}>
//                 <Output editorRef={editorRef} language={language} />
//               </Box>
//             </VStack>
//           </HStack>
//         </HStack>
//       </VStack>
//     </HStack>
//   )
// }

export const CodeFrameTest = () => {
  const editorRef = useRef()
  const [language, setLanguage] = useState('javascript')
  const [questions, setQuestions] = useState(questionsl)
  const [selectedQuestion, setSelectedQuestion] = useState({
    id: 0,
    question: '',
    value: '',
    language: '',
  })

  const onMount = (editor) => {
    editorRef.current = editor
    editor.focus()
  }

  const onSelect = (language) => {
    setLanguage(language)
    setSelectedQuestion((prevQuestion) => ({
      ...prevQuestion,
      value: CODE_SNIPPETS[language],
      language: language,
    }))
  }

  const handleQuestionClick = (question) => {
    setQuestions((prevQuestions) => prevQuestions.map((q) => (q.id === selectedQuestion.id ? { ...selectedQuestion } : q)))
    setLanguage(question.language)
    setSelectedQuestion(question)
  }

  const handleValueChange = (value) => {
    setSelectedQuestion((prevQuestion) => ({
      ...prevQuestion,
      value: value,
    }))
  }

  const handleSubmit = () => {
    console.log(JSON.stringify(selectedQuestion))
    console.log(JSON.stringify(questions))
  }

  return (
    <HStack h={400} align={'flex-start'} w={'98vw'}>
      <VStack w={'100%'}>
        <HStack justifyContent={'flex-end'} h={30} w={'100%'}>
          <CodeLanguageEditor language={language} onSelect={onSelect} />
          <Button variant={'outline'} size='xs' colorScheme='blue'>
            time
          </Button>
          <Button onClick={handleSubmit} variant={'outline'} size='xs' colorScheme='blue'>
            submit
          </Button>
        </HStack>
        <HStack minH={600} w={'100%'} alignItems='flex-start'>
          <VStack minH={600} justifyContent={'flex-start'} w={'4%'}>
            {questions.map((q) => (
              <Button key={q.id} onClick={() => handleQuestionClick(q)} variant={selectedQuestion.id === q.id ? 'solid' : 'outline'} w={'80%'} colorScheme='blue'>
                {q.id}
              </Button>
            ))}
          </VStack>
          <HStack minH={600} alignItems={'flex-start'} w={'96%'}>
            <Box minH={590} p={3} bgColor={'white'} w={'40%'}>
              <Text>{selectedQuestion.question}</Text>
            </Box>
            <VStack w={'60%'}>
              <Box bgColor={'white'} h={350} w={'100%'} overflow={'hidden'}>
                <Editor onMount={onMount} onChange={handleValueChange} height='100vh' language={selectedQuestion.language} defaultValue={CODE_SNIPPETS[selectedQuestion.language]} value={selectedQuestion.value} />
              </Box>
              <Box w={'100%'}>
                <Output editorRef={editorRef} language={selectedQuestion.language} />
              </Box>
            </VStack>
          </HStack>
        </HStack>
      </VStack>
    </HStack>
  )
}
