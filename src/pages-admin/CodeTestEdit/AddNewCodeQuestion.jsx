import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, FormControl, FormLabel, HStack, Heading, IconButton, Input, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack, Wrap, WrapItem, useToast } from '@chakra-ui/react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { OverlayComponent } from '../../Components-admin/OverlayComponent'
import { EDITOR_JS_TOOLS } from '../../Components/Essay/tool'
import { createReactEditorJS } from 'react-editor-js'
import './addQCode.css'
import { upLoadService } from '../../Service/uploadFile.service'
import { testService } from '../../Service/test.service'
import { Editor } from '@monaco-editor/react'
import { CODE_SNIPPETS, LANGUAGE_VERSIONS } from '../../Components/CodeEditor/constant'
import { AddIcon, CloseIcon, SmallAddIcon, SmallCloseIcon } from '@chakra-ui/icons'

export const AddNewQuestion = ({ jobId, testId, load, setLoad }) => {
  const toast = useToast()
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  // overlay
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => {
    setIsOpen(true)
  }
  const handleClose = () => {
    setLoad(!load)
    setForm({
      jdId: jobId,
      testId: testId,
      questionText: '',
      value: '',
      language: 'javascript',
      testCase: '',
    })
    setIsOpen(false)
  }

  // editor
  const ReactEditorJS = createReactEditorJS()
  const editorCore = useRef(null)
  const handleInitialize = useCallback(
    (instance) => {
      editorCore.current = instance
    },
    [jobId, testId]
  )

  //   form
  const [form, setForm] = useState({
    jdId: jobId,
    testId: testId,
    questionText: '',
    value: '',
    language: 'javascript',
    testCase: '',
    testFunction: '',
  })

  const handleSave = async () => {
    const savedData = await editorCore.current.save()
    const uploadPromises = savedData.blocks.map(async (element) => {
      if (element.type === 'simpleImage' && !element.data.url.includes('http')) {
        element.data.url = await handleUploadFile(element.data.url)
      }
    })
    await Promise.all(uploadPromises)
    form.questionText = JSON.stringify(savedData)
    if (form.value == '' || form.testFunction == '') {
      toast({
        title: 'Code Question',
        description: 'Yêu cầu nhập hàm mẫu và hàm test',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom-right',
      })
    } else {
      testService
        .addCodeQuestionForATest(accessToken, form)
        .then((response) => {
          handleClose()
          toast({
            title: 'Code Question',
            description: response.message,
            status: 'info',
            duration: 3000,
            isClosable: true,
            position: 'bottom-right',
          })
        })
        .catch((er) => console.log(er))
    }
  }

  //  upload
  const handleUploadFile = async (fileStringBase64) => {
    const file = DataURIToBlob(fileStringBase64)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await upLoadService.uploadFile(accessToken, formData)
      return response.data
    } catch (error) {
      console.log(error)
      return null
    }
  }

  //   hàm convert hình base64 thành request
  function DataURIToBlob(dataURI) {
    const splitDataURI = dataURI.split(',')
    const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0]
    const ia = new Uint8Array(byteString.length)
    for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i)
    return new Blob([ia], { type: mimeString })
  }

  //  các hàm truyền cho component con
  const handleChangeValueCode = (value) => {
    setForm((prevForm) => ({
      ...prevForm,
      value: value,
    }))
  }
  //  các hàm truyền cho component con
  const handleChangeTestFunctionCode = (value) => {
    setForm((prevForm) => ({
      ...prevForm,
      testFunction: value,
    }))
  }

  const [testCases, setTestCases] = useState([
    {
      testInput: '',
      expected: '',
    },
  ])
  //  ham log ra test case
  const handleLogTestCase = () => {
    console.log(JSON.stringify(testCases))
  }
  // ham truyen cho componet con test case
  const handleChangeTestCases = (testCases) => {
    setForm((prevForm) => ({
      ...prevForm,
      testCase: JSON.stringify(testCases),
    }))
  }

  useEffect(() => {}, [isOpen])

  return (
    <>
      <Button size={'sm'} onClick={handleOpen} color={'white'} backgroundColor={'rgb(3, 201, 215)'}>
        + Thêm câu hỏi
      </Button>

      <OverlayComponent isOpen={isOpen} onClose={handleClose}>
        <Box overflow={'auto'} fontFamily={'Roboto'} p={10} w={800} h={650} bgColor={'white'} borderRadius={20}>
          <Heading size={'md'} fontFamily={'Roboto'}>
            Câu hỏi coding
          </Heading>
          <Accordion minH={500} allowToggle>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as='span' flex='1' textAlign='left'>
                    Nội dung câu hỏi
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Box p={5} borderRadius={10} borderWidth={1} h={500} overflow={'auto'} borderColor={'gray'}>
                  <ReactEditorJS editorCore={editorCore} tools={EDITOR_JS_TOOLS} onInitialize={handleInitialize} />
                </Box>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as='span' flex='1' textAlign='left'>
                    Hàm mẫu
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <SampleFunction handleChangeValueCode={handleChangeValueCode} />
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as='span' flex='1' textAlign='left'>
                    Hàm test
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Box bgColor={'#f5f7f7'} borderRadius={10} borderLeftWidth={'5px'} borderColor={'orange'}>
                  <Text>gợi ý: Hàm test kiểm tra kết quả của hàm mẫu có thể trả về log cuối cùng là 0 hoặc 1 thể hiện câu trả lời có pass được test case hay khônng</Text>
                </Box>
                <SampleFunction handleChangeValueCode={handleChangeTestFunctionCode} />
              </AccordionPanel>
            </AccordionItem>

            {/* <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as='span' flex='1' textAlign='left'>
                    Test Case
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <TestCaseSample testCases={testCases} setTestCases={setTestCases} handleChangeTestCases={handleChangeTestCases} />
              </AccordionPanel>
            </AccordionItem> */}
          </Accordion>

          <HStack justifyContent={'flex-end'} mt={5} w={'100%'}>
            <Button w={'20%'} colorScheme='gray' onClick={handleClose}>
              Đóng
            </Button>
            <Button onClick={handleSave} w={'20%'} bgColor={'#2cccc7'} color={'white'}>
              Lưu
            </Button>
          </HStack>
        </Box>
      </OverlayComponent>
    </>
  )
}

const SampleFunction = ({ handleChangeValueCode }) => {
  const [codeSnippets, setCodeSnippets] = useState(CODE_SNIPPETS)

  const handleEditorChange = (value, language) => {
    setCodeSnippets({
      ...codeSnippets,
      [language]: value,
    })
    handleChangeValueCode(
      JSON.stringify({
        ...codeSnippets,
        [language]: value,
      })
    )
  }

  return (
    <Tabs borderWidth={1} borderRadius={10}>
      <TabList>
        {Object.keys(LANGUAGE_VERSIONS).map((lang) => (
          <Tab key={lang}>{lang}</Tab>
        ))}
      </TabList>

      <TabPanels maxH={200} overflow={'hidden'}>
        {Object.keys(LANGUAGE_VERSIONS).map((lang) => (
          <TabPanel key={lang}>
            <Editor height={190} defaultLanguage={lang} value={codeSnippets[lang]} onChange={(value) => handleEditorChange(value, lang)} />
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  )
}

const TestCaseSample = ({ testCases, setTestCases, handleChangeTestCases }) => {
  const [selectedTestCaseIndex, setSelectedTestCaseIndex] = useState(0)

  const handleAddTestCase = () => {
    setTestCases((oldArray) => [
      ...oldArray,
      {
        testInput: '',
        expected: '',
      },
    ])
    setSelectedTestCaseIndex(testCases.length)
  }

  const handleRemoveTestCase = (index) => {
    setTestCases((prevTestCases) => prevTestCases.filter((_, i) => i !== index))
    if (selectedTestCaseIndex >= index && selectedTestCaseIndex > 0) {
      setSelectedTestCaseIndex(selectedTestCaseIndex - 1)
    }
  }

  const handleChangeTestCase = (e) => {
    const { name, value } = e.target
    setTestCases((prevTestCases) => {
      const updatedTestCases = [...prevTestCases]
      updatedTestCases[selectedTestCaseIndex] = {
        ...updatedTestCases[selectedTestCaseIndex],
        [name]: value,
      }
      handleChangeTestCases(updatedTestCases)
      return updatedTestCases
    })
  }

  const handleSelectedTestCase = (index) => {
    setSelectedTestCaseIndex(index)
  }

  return (
    <Box w={'100%'} h={300}>
      <Wrap spacing={2} shouldWrapChildren>
        {testCases.map((testCase, index) => (
          <WrapItem key={index}>
            <Button
              onClick={() => handleSelectedTestCase(index)}
              size={'sm'}
              rightIcon={
                <SmallCloseIcon
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRemoveTestCase(index)
                  }}
                />
              }
              variant='solid'>
              Test case {index + 1}
            </Button>
          </WrapItem>
        ))}
        <WrapItem>
          <IconButton onClick={handleAddTestCase} size={'sm'} aria-label='Add test case' icon={<SmallAddIcon />} />
        </WrapItem>
      </Wrap>

      <VStack mt={2}>
        <FormControl>
          <FormLabel>Value</FormLabel>
          <Input name='testInput' onChange={handleChangeTestCase} value={testCases[selectedTestCaseIndex]?.testInput || ''} />
          <FormLabel>Expected</FormLabel>
          <Input name='expected' onChange={handleChangeTestCase} value={testCases[selectedTestCaseIndex]?.expected || ''} />
        </FormControl>
      </VStack>
    </Box>
  )
}
