import React, { useState } from 'react'
import { OverlayComponent } from '../../Components-admin/OverlayComponent'
import { Box, Button, FormControl, FormLabel, HStack, Heading, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, useToast } from '@chakra-ui/react'
import { FaCode } from 'react-icons/fa'
import { testService } from '../../Service/test.service'

export const AddNewCodeTest = ({ jobId, load, setLoad }) => {
  const toast = useToast()
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  // overlay
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => {
    setIsOpen(true)
  }
  const handleClose = () => {
    setLoad(!load)
    setIsOpen(false)
  }

  //   form
  const [form, setForm] = useState({
    jdId: jobId,
    summary: '',
    time: '',
    essayQuestion: '',
  })
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: name === 'time' ? (value === '' ? '' : Number(value)) : value,
    })
  }
  // validate
  const validateForm = () => {
    const { summary, time } = form
    if (summary.trim() === '') {
      return { valid: false, message: 'Tên không thể để trống.' }
    }
    if (time === '' || time <= 1 || time >= 200) {
      return { valid: false, message: 'Thời gian phải nằm trong khoảng từ 1 đến 200.' }
    }
    return { valid: true, message: '' }
  }

  // submit
  const handleSave = (e) => {
    e.preventDefault()
    const validation = validateForm()
    if (!validation.valid) {
      alert(validation.message)
      return
    }
    testService
      .addCodeTest(accessToken, form)
      .then((response) => {
        if (response.message == 'Success !') {
          handleClose()
          toast({
            title: 'Code Test',
            description: 'Thêm bài test thành công',
            status: 'success',
            duration: 3000,
            isClosable: true,
          })
          setForm({
            jdId: jobId,
            summary: '',
            time: '',
            essayQuestion: '',
          })
        } else {
          toast({
            title: 'Code Test',
            description: response.message,
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
        }
      })
      .catch((er) => console.log(er))
  }
  return (
    <>
      <Button onClick={handleOpen} color={'white'} leftIcon={<FaCode />} backgroundColor={'rgb(3, 201, 215)'} variant='solid'>
        Kiểm tra code(dành cho ngành IT)
      </Button>
      <OverlayComponent isOpen={isOpen} onClose={handleClose}>
        <Box minH={200} overflow={'auto'} fontFamily={'Roboto'} p={5} bgColor={'white'} borderRadius={10}>
          <Heading size={'md'} fontFamily={'Roboto'}>
            Coding test(dành cho ngành IT)
          </Heading>
          <FormControl minH={200}>
            <FormLabel>Tên bài kiểm tra</FormLabel>
            <Input type='text' name='summary' value={form.summary} onChange={handleChange} />
            <FormLabel>Thời gian( Phút)</FormLabel>
            <NumberInput defaultValue={10} min={10} max={200}>
              <NumberInputField name='time' value={form.time} onChange={handleChange} />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {/* <Input type='number' name='time' value={form.time} onChange={handleChange} min={1} max={200} /> */}
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
