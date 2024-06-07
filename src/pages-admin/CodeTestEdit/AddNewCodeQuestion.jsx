import { Box, Button, FormControl, FormLabel, HStack, Heading, useToast } from '@chakra-ui/react'
import React, { useCallback, useRef, useState } from 'react'
import { OverlayComponent } from '../../Components-admin/OverlayComponent'
import { EDITOR_JS_TOOLS } from '../../Components/Essay/tool'
import { createReactEditorJS } from 'react-editor-js'
import './addQCode.css'
import { upLoadService } from '../../Service/uploadFile.service'
import { testService } from '../../Service/test.service'

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

    console.log('form', JSON.stringify(form))
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
        })
      })
      .catch((er) => console.log(er))
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

  return (
    <>
      <Button onClick={handleOpen} color={'white'} backgroundColor={'#2cccc7'}>
        + Thêm câu hỏi
      </Button>

      <OverlayComponent isOpen={isOpen} onClose={handleClose}>
        <Box fontFamily={'Montserrat'} p={5} w={800} h={650} bgColor={'white'} borderRadius={10}>
          <Heading size={'md'} fontFamily={'Montserrat'}>
            Thêm bài câu hỏi về code
          </Heading>
          <FormControl minH={500}>
            <FormLabel>Nội dung câu hỏi</FormLabel>
            <Box h={500} overflow={'auto'} borderWidth={1} borderRadius={10} borderColor={'gray'}>
              <ReactEditorJS editorCore={editorCore} tools={EDITOR_JS_TOOLS} onInitialize={handleInitialize} />
            </Box>
          </FormControl>

          <HStack alignItems={'flex-end'} mt={5} w={'40%'}>
            <Button w={'50%'} colorScheme='gray' onClick={handleClose}>
              Đóng
            </Button>
            <Button onClick={handleSave} w={'50%'} bgColor={'#2cccc7'} color={'white'}>
              Lưu
            </Button>
          </HStack>
        </Box>
      </OverlayComponent>
    </>
  )
}
