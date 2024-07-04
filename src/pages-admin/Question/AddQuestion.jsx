import React, { useEffect, useState } from 'react'
import { Header } from '../../Components-admin'
import { MultiSelect, useMultiSelect } from 'chakra-multiselect'
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, HStack, Input, Select, Stack, Text, Textarea, VStack } from '@chakra-ui/react'
import './style.css'
import { useNavigate } from 'react-router-dom'
import { skillPositionService } from '../../Service/skillPosition.service'
import { ToastContainer, toast } from 'react-toastify'
import { questionService } from '../../Service/question.service'
import { ChevronRightIcon } from '@chakra-ui/icons'

export const AddQuestion = () => {
  const naigate = useNavigate()
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const [form, setForm] = useState({
    question: '',
    answer: '',
    positionIds: [],
    skillIds: [],
    fieldEnum: '',
  })

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setForm((form) => ({ ...form, [name]: value }))
  }

  const handleSubmit = () => {
    setForm({
      question: '',
      answer: '',
      positionIds: [],
      skillIds: [],
      fieldEnum: '',
    })
    console.log(JSON.stringify(form))
    questionService
      .addQuestion(accessToken, form)
      .then((res) => toast.info(res.message))
      .catch((er) => toast.error('something went wrong'))
  }


  return (
    <>
      <Box minHeight={1000} fontFamily={'Roboto'} backgroundColor={'#f5f9fa'} overflow='hidden'>
        <Breadcrumb separator={<ChevronRightIcon color='gray.500' />} fontStyle={'italic'} fontWeight={'bold'} pt={30}>
          <BreadcrumbItem>
            <BreadcrumbLink href='#'>Bộ câu hỏi</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href='#'>Thêm câu hỏi</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <VStack w={'100%'} align={'flex-start'} mb={10} pl={30} pr={30} spacing={3}>
          <Box mx={'100px'} w={'80%'} bgColor={'white'} boxShadow={'md'} borderRadius={20} p={30}>
            <HStack w={'100%'}>
              <VStack align={'flex-start'} w={'100%'}>
                <label>Nội dung</label>
                <Textarea name='question' value={form.question} onChange={handleOnChange} />
                <label>Gợi ý trả lời</label>
                <Textarea name='answer' value={form.answer} onChange={handleOnChange} />
                <label>Loại câu hỏi</label>
                <Select name='fieldEnum' onChange={handleOnChange} value={form.fieldEnum}>
                  <option value='SoftSkill'>Soft Skill</option>
                  <option value='TechSkill'>Teachnical</option>
                  <option value='Language'>English</option>
                  <option value=''>---</option>
                </Select>
              </VStack>
            </HStack>
            <HStack mt={10} w={'100%'} align={'flex-end'}>
              <Button onClick={() => naigate('/question')}>Thoát</Button>
              <Button onClick={handleSubmit}>Lưu</Button>
            </HStack>
          </Box>
        </VStack>
      </Box>
      <ToastContainer position='bottom-right' autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme='light' />
    </>
  )
}
