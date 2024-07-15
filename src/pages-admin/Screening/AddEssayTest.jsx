import { Box, Button, FormControl, FormLabel, HStack, Heading, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, useDisclosure, useToast } from '@chakra-ui/react'
import { useCallback, useRef, useState } from 'react'
import { createReactEditorJS } from 'react-editor-js'
import { FaPencilAlt } from 'react-icons/fa'
import { EDITOR_JS_TOOLS } from '../../Components/Essay/tool'
import { testService } from '../../Service/test.service'
import { upLoadService } from '../../Service/uploadFile.service'

export const AddEssayTest = ({ jobId, load, setLoad }) => {
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const toast = useToast()

  // overlay
  const ReactEditorJS = createReactEditorJS()
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => {
    setIsOpen(true)
  }
  const handleClose = () => {
    setLoad(!load)
    setIsOpen(false)
  }
  // editor
  const editorCore = useRef(null)
  const handleInitialize = useCallback((instance) => {
    editorCore.current = instance
  }, [])

  //   form
  const [form, setForm] = useState({
    jdId: jobId,
    summary: '',
    time: 0,
    essayQuestion: '',
  })
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: value,
    })
  }

  const handleChangeN = (valueString, valueNumber) => {
    setForm({
      ...form,
      time: valueNumber,
    })
  }

  const handleSave = async () => {
    const savedData = await editorCore.current.save()
    const uploadPromises = savedData.blocks.map(async (element) => {
      if (element.type === 'simpleImage' && !element.data.url.includes('http')) {
        element.data.url = await handleUploadFile(element.data.url)
      }
    })
    await Promise.all(uploadPromises)
    form.essayQuestion = JSON.stringify(savedData)

    testService
      .addEssayTest(accessToken, form)
      .then((response) =>
        toast({
          title: 'Test Create',
          description: response.message,
          status: 'info',
          duration: 3000,
          isClosable: true,
        })
      )
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
      <Button onClick={handleOpen} leftIcon={<FaPencilAlt />} colorScheme='green' size='sm' variant='outline'>
        Thêm bài test tự luận
      </Button>
      <Overlay isOpen={isOpen} onClose={handleClose}>
        <Box fontFamily={'Roboto'} p={5} w={800} h={650} bgColor={'white'} borderRadius={10}>
          <Heading size={'md'} fontFamily={'Roboto'}>
            Test
          </Heading>
          <FormControl minH={500}>
            <HStack>
              <Box>
                <FormLabel>Tên bài kiểm tra</FormLabel>
                <Input type='text' name='summary' value={form.summary} onChange={handleChange} />
              </Box>
              <Box>
                <FormLabel>Thời gian( Phút)</FormLabel>
                <NumberInput name='time' value={form.time} defaultValue={10} min={10} max={200} onChange={handleChangeN}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Box>
            </HStack>
            {/* <Input type='number' name='time' value={form.time} onChange={handleChange} min={1} max={200} /> */}
            <FormLabel>Nội dung câu hỏi</FormLabel>
            <Box overflow={'auto'} h={390} borderWidth={1} borderRadius={10}>
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
      </Overlay>
    </>
  )
}

const Overlay = ({ isOpen, onClose, children }) => {
  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: isOpen ? 'flex' : 'none',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999999,
  }

  return <div style={overlayStyle}>{children}</div>
}
