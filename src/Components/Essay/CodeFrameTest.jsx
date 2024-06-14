import { Box, Button, HStack, Text, VStack } from '@chakra-ui/react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Editor } from '@monaco-editor/react'
import { CodeLanguageEditor } from '../CodeEditor/CodeLanguageEditor'
import { Output } from '../CodeEditor/Output'
import { createReactEditorJS } from 'react-editor-js'
import { EDITOR_JS_TOOLS } from './tool'
// khung test code
export const CodeFrameTest = ({ codeQuestions, timeLeft, handleSave, record, setRecord }) => {
  const editorRef = useRef()
  const [language, setLanguage] = useState('javascript')
  const [questions, setQuestions] = useState(codeQuestions)

  // 2 gia tri dang duoc chon
  const [selectedQuestion, setSelectedQuestion] = useState(codeQuestions[0])
  const [codeSnippets, setCodeSnippets] = useState(JSON.parse(codeQuestions[0].value))

  const onMount = (editor) => {
    editorRef.current = editor
    editor.focus()
  }

  const onSelect = (language) => {
    setLanguage(language)
  }

  const handleQuestionClick = (question) => {
    //luu cau hoj cu
    setQuestions((prevQuestions) => prevQuestions.map((q) => (q.id === selectedQuestion.id ? { ...selectedQuestion, value: JSON.stringify(codeSnippets), language: language } : q)))
    //  doi sang cau hoi moi
    setSelectedQuestion(question)
    setLanguage(question.language)
    setCodeSnippets(JSON.parse(question.value))
    setRecord(questions)
  }

  const handleValueChange = (value) => {
    setCodeSnippets((prevSnippets) => ({
      ...prevSnippets,
      [language]: value,
    }))
    setRecord(questions)
  }

  return (
    <HStack h={650} align={'flex-start'} w={'98vw'}>
      <VStack w={'100%'}>
        <HStack mt={5} minH={660} w={'100%'} alignItems='flex-start'>
          <VStack minH={660} justifyContent={'flex-start'} w={'4%'}>
            <Button w={'70px'} variant={'outline'} colorScheme='green'>
              {timeLeft.minutes} :{timeLeft.seconds}
            </Button>
            <Button w={'70px'} onClick={handleSave} variant={'solid'} color={'white'} backgroundColor={'#2cccc7'}>
              Nộp
            </Button>
            <Text>{questions.length} Câu</Text>
            {questions.map((q, index) => (
              <Button key={index} borderRadius={'50%'} onClick={() => handleQuestionClick(q)} variant={selectedQuestion.id === q.id ? 'solid' : 'outline'} w={'80%'} colorScheme='yellow'>
                {index + 1}
              </Button>
            ))}
          </VStack>
          <HStack minH={660} alignItems={'flex-start'} w={'96%'}>
            <Box overflow={'auto'} h={630} p={3} bgColor={'white'} w={'40%'}>
              {selectedQuestion && <BoxQuestion key={selectedQuestion.id} question={selectedQuestion} />}
            </Box>
            <VStack w={'60%'}>
              <Box bgColor={'white'} h={390} w={'100%'} overflow={'hidden'}>
                <CodeLanguageEditor language={language} onSelect={onSelect} />
                <Editor onMount={onMount} onChange={(value) => handleValueChange(value)} height='100vh' language={language} value={codeSnippets[language]} />
              </Box>
              <Box w={'100%'}>
                <Output editorRef={editorRef} language={language} />
              </Box>
            </VStack>
          </HStack>
        </HStack>
      </VStack>
    </HStack>
  )
}


// chỉ để hiện câu hỏi
const BoxQuestion = ({ question }) => {
  const ReactEditorJS = createReactEditorJS()
  const editorCore = useRef(null)
  const handleInitialize = useCallback(
    (instance) => {
      editorCore.current = instance
    },
    [question]
  )
  return <ReactEditorJS readOnly defaultValue={JSON.parse(question.questionText)} editorCore={editorCore} tools={EDITOR_JS_TOOLS} onInitialize={handleInitialize} />
}
