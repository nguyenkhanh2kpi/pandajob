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

const ComponentMultiselect = ({ items, title, onChange, name }) => {
  const {
    value,
    options,
    onChange: onInternalChange,
  } = useMultiSelect({
    value: [],
    options: items,
  })

  useEffect(() => {
    if (onChange) {
      onChange(value, name)
    }
  }, [value])

  return (
    <MultiSelect
      selectedListProps={{
        maxH: 50,
        overflow: 'hidden',
      }}
      options={options}
      value={value}
      label={title}
      onChange={onInternalChange}
    />
  )
}

export const AddQuestion = () => {
  const naigate = useNavigate()
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const [positions, setPosition] = useState([])
  const [skills, setSkill] = useState([])
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

  const handleOnChangeMultiSkill = (newValue, name) => {
    setForm({
      ...form,
      [name]: newValue.map((v) => parseInt(v.value, 10)),
    })
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

  useEffect(() => {
    skillPositionService
      .getSkill(accessToken)
      .then((res) => setSkill(res))
      .catch((er) => toast.error('something went wrong'))
    skillPositionService
      .getPosition(accessToken)
      .then((res) => setPosition(res))
      .catch((er) => toast.error('something went wrong'))
  }, [])

  console.log(skills)

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
            <Text fontWeight={'bold'} m={0} fontSize='2xl'>
              Thêm câu hỏi
            </Text>
            <HStack w={'100%'}>
              <VStack align={'flex-start'} w={'50%'}>
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
            {skills.length > 0 && (
              <Box w={'50%'}>
                <ComponentMultiselect
                  name='skillIds'
                  items={skills.map((skill) => ({
                    label: skill.skillName,
                    value: skill.id.toString(),
                  }))}
                  title='Choose Skill'
                  onChange={handleOnChangeMultiSkill}
                />
              </Box>
            )}
            {positions.length > 0 && (
              <Box w={'50%'}>
                <ComponentMultiselect
                  name='positionIds'
                  items={positions.map((position) => ({
                    label: position.positionName,
                    value: position.id.toString(),
                  }))}
                  title='Choose Position'
                  onChange={handleOnChangeMultiSkill}
                />
              </Box>
            )}
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
