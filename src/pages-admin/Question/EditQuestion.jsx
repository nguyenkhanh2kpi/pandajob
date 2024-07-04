import React, { useEffect, useState } from 'react'
import { Header } from '../../Components-admin'
import { MultiSelect, useMultiSelect } from 'chakra-multiselect'
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, HStack, Input, Select, Stack, Textarea, VStack } from '@chakra-ui/react'
import './style.css'
import { useNavigate, useParams } from 'react-router-dom'
import { skillPositionService } from '../../Service/skillPosition.service'
import { ToastContainer, toast } from 'react-toastify'
import { questionService } from '../../Service/question.service'
import { ChevronRightIcon } from '@chakra-ui/icons'

export const EditQuestion = () => {
  const params = useParams()
  const naigate = useNavigate()
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const [positions, setPosition] = useState([])
  const [skills, setSkill] = useState([])
  const [form, setForm] = useState({
    id: 0,
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
    console.log(JSON.stringify(form))
    questionService
      .putQuestion(accessToken, form)
      .then((res) => toast.info(res.message))
      .catch((er) => toast.error('something went wrong'))
  }

  useEffect(() => {
    questionService
      .getQuestionByID(accessToken, params.id)
      .then((response) => {
        setForm(response)
      })
      .catch((error) => toast.error('something went wrong'))
  }, [])

  // console.log(JSON.stringify(form));
  return (
    <>
      <Box minHeight={1000} fontFamily={'Roboto'} backgroundColor={'#f5f9fa'} overflow='hidden'>
        <Breadcrumb separator={<ChevronRightIcon color='gray.500' />} fontStyle={'italic'} fontWeight={'bold'} pt={30}>
          <BreadcrumbItem>
            <BreadcrumbLink href='#'>Bộ câu hỏi</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href='#'>Edit</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <VStack w={'100%'} mb={10} pl={30} pr={30} spacing={3}>
          <Box bgColor={'white'} w='70%' p={10} borderRadius={20} boxShadow={'lg'}>
            <Stack spacing={5}>
              <label>Nội dung</label>

              <Textarea name='question' placeholder='Question ?' value={form.question} onChange={handleOnChange} />
              <label>Câu trả lời</label>
              <Textarea name='answer' placeholder='Answer' value={form.answer} onChange={handleOnChange} />
              <label>Loại</label>
              <Select name='fieldEnum' onChange={handleOnChange} value={form.fieldEnum}>
                <option value='SoftSkill'>Soft Skill</option>
                <option value='TechSkill'>Teachnical</option>
                <option value='Language'>English</option>
                <option value=''>---</option>
              </Select>
              <br />
            </Stack>
          </Box>
          <HStack justifyContent={'flex-end'} w={'70%'}>
            <Button ml={6} className='back-button' color='white' bgColor='#97a4a6' text='Xem chi tiết' borderRadius='10px' onClick={() => naigate('/question')}>
              Thoát
            </Button>
            <Button color='white' bgColor='#03C9D7' text='Xem chi tiết' borderRadius='10px' onClick={handleSubmit}>
              Lưu
            </Button>
          </HStack>
        </VStack>
      </Box>
      <ToastContainer position='bottom-right' autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme='light' />
    </>
  )
}
