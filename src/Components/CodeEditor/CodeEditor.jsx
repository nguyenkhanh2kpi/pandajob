import { Box, HStack, Heading, SlideFade, Stack, Text, VStack } from '@chakra-ui/react'
import { Editor } from '@monaco-editor/react'
import React, { useRef, useState } from 'react'
import { CodeLanguageEditor } from './CodeLanguageEditor'
import { CODE_SNIPPETS } from './constant'
import { Output } from './Output'

export const CodeEditor = () => {
  const editorRef = useRef()
  const [value, setvalue] = useState('')
  const [language, setlanguage] = useState('javascript')
  const onMount = (editor) => {
    editorRef.current = editor
    editor.focus()
  }
  const onSelect = (language) => {
    setlanguage(language)
    setvalue(CODE_SNIPPETS[language])
  }
  return (
    <VStack bgColor={'#f0f4f5'} fontFamily={'Roboto'}>
      <SlideFade offsetY={20}>
        <Heading size={'lg'} m={'6'} mt={24}></Heading>
      </SlideFade>

      <HStack h={1000} align={'flex-start'} w={'80vw'}>
        <HStack w={'100%'}>
          <Box bgColor={'white'} w={'50%'}>
            <CodeLanguageEditor language={language} onSelect={onSelect} />
            <Editor onMount={onMount} onChange={(value) => setvalue(value)} height='90vh' language={language} defaultValue={CODE_SNIPPETS[language]} value={value} />
          </Box>
          <Output editorRef={editorRef} language={language} />
        </HStack>
      </HStack>
    </VStack>
  )
}
