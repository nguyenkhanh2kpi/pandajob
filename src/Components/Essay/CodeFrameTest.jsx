import { Box, Button, HStack, Text, VStack } from '@chakra-ui/react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { CODE_SNIPPETS } from '../CodeEditor/constant'
import { Editor } from '@monaco-editor/react'
import { CodeLanguageEditor } from '../CodeEditor/CodeLanguageEditor'
import { Output } from '../CodeEditor/Output'
import { createReactEditorJS } from 'react-editor-js'
import { EDITOR_JS_TOOLS } from './tool'

export const CodeFrameTest = ({ listQuestion, timeLeft, handleSave }) => {
  const editorRef = useRef()
  const [language, setLanguage] = useState('javascript')
  const [questions, setQuestions] = useState(listQuestion)
  const [selectedQuestion, setSelectedQuestion] = useState(listQuestion[0])

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

  // const handleSubmit = async () => {
  //   await handleQuestionClick(questions[0])
  //   console.log(JSON.stringify(questions))
  // }
  useEffect(() => {
    console.log(timeLeft)
  }, [timeLeft])

  return (
    <HStack h={650} align={'flex-start'} w={'98vw'}>
      <VStack w={'100%'}>
        <HStack mt={5} minH={660} w={'100%'} alignItems='flex-start'>
          <VStack minH={660} justifyContent={'flex-start'} w={'4%'}>
            <Button w={'70px'} variant={'outline'} colorScheme='green'>
              {timeLeft.minutes} :{timeLeft.seconds}
            </Button>
            <Button w={'70px'} onClick={() => handleSave()} variant={'solid'} color={'white'} backgroundColor={'#2cccc7'}>
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
              {questions.map((q) => (
                <>{selectedQuestion.id == q.id ? <BoxQuestion question={q} /> : <></>}</>
              ))}
            </Box>

            <VStack w={'60%'}>
              <Box bgColor={'white'} h={390} w={'100%'} overflow={'hidden'}>
                <CodeLanguageEditor language={language} onSelect={onSelect} />
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

const BoxQuestion = ({ question }) => {
  const ReactEditorJS = createReactEditorJS()
  const editorCore = useRef(null)
  const handleInitialize = useCallback(
    (instance) => {
      editorCore.current = instance
    },
    [question]
  )
  return (
    <>
      <ReactEditorJS readOnly defaultValue={JSON.parse(question.questionText)} editorCore={editorCore} tools={EDITOR_JS_TOOLS} onInitialize={handleInitialize} />
    </>
  )
}
