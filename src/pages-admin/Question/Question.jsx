import React, { useEffect, useState } from 'react'
import { Header } from '../../Components-admin'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Breadcrumb,
  BreadcrumbLink,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
  List,
  ListIcon,
  ListItem,
  Select,
  Skeleton,
  Spinner,
  Stack,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Table,
  TableCaption,
  TableContainer,
  Tabs,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  useEditableControls,
  useToast,
} from '@chakra-ui/react'
import { MdBuild, MdCheckCircle, MdSettings } from 'react-icons/md'
import { questionService } from '../../Service/question.service'
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns'
import { Exposure } from '@mui/icons-material'
import { skillPositionService } from '../../Service/skillPosition.service'
import { BreadcrumbItem, Pagination } from 'react-bootstrap'
import { PaginationItem } from '@mui/material'
import { AddIcon, ArrowBackIcon, ArrowForwardIcon, CheckIcon, ChevronRightIcon, CloseIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import './question.css'
import { AiOutlineEdit } from 'react-icons/ai'
import { AddSkillOverplay } from '../PositionSkill/AddSkillOverplay'

export const dropdownField = [
  {
    id: 0,
    field: '--Chọn phạm vi--',
  },
  {
    id: 1,
    field: 'SoftSkill',
  },
  {
    id: 2,
    field: 'TechSkill',
  },
  {
    id: 3,
    field: 'Language',
  },
]

export const Question = () => {
  const [load, setLoad] = useState(false)
  const toast = useToast()
  const navigate = useNavigate()
  const [allQuestions, setAllQuestions] = useState([])
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const [skills, setSkill] = useState([])
  const [positions, setPositions] = useState([])
  const [filter, setFilter] = useState({
    fieldId: 0,
    skillId: 0,
    positionId: 0,
  })

  const getAllquestion = (data) => {
    let allQuestions = []
    data.forEach((field) => {
      if (field.questions && field.questions.length > 0) {
        allQuestions = allQuestions.concat(field.questions)
      }
    })
    return allQuestions
  }

  useEffect(() => {
    questionService.getAllquestion(accessToken).then((res) => setAllQuestions(getAllquestion(res)))
    skillPositionService
      .getSkill(accessToken)
      .then((res) => setSkill(res))
      .catch((er) => console.log(er))
    skillPositionService
      .getPosition(accessToken)
      .then((res) => setPositions(res))
      .catch((er) => console.log(er))
  }, [load])

  const [filteredQuestions, setFilteredQuestions] = useState([])

  useEffect(() => {
    const filteredData = allQuestions.filter((question) => {
      const fieldMatch = filter.fieldId === 0 || question.fieldEnum === dropdownField.find((item) => item.id === filter.fieldId)?.field
      return fieldMatch
    })
    setFilteredQuestions(filteredData)
  }, [filter, allQuestions])

  // panigate
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 7
  const pageCount = Math.ceil(filteredQuestions.length / itemsPerPage)
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected)
  }
  const displayItems = filteredQuestions.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)

  if (allQuestions.length === 0) {
    return (
      <HStack minH={500} w='100%' justifyContent='center' alignItems='center'>
        <Spinner thickness='8px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='4xl' />
      </HStack>
    )
  } else
    return (
      <>
        <Box minHeight={1000} fontFamily={'Roboto'} backgroundColor={'#f5f9fa'} overflow='hidden'>
          <Breadcrumb separator={<ChevronRightIcon color='gray.500' />} fontStyle={'italic'} fontWeight={'bold'} pt={30}>
            <BreadcrumbItem>
              <BreadcrumbLink href='#'>Bộ câu hỏi</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <VStack w={'100%'} align={'flex-start'} mb={10} pl={30} pr={30} spacing={3}>
            <Box mx={'100px'} w={'80%'} bgColor={'white'} boxShadow={'md'} borderRadius={20} p={30}>
              <VStack w={'100%'} alignItems={'flex-start'}>
                <HStack w={'100%'} spacing={5}>
                  <Select
                    w={'25%'}
                    onChange={(event) => {
                      const selectedValue = parseInt(event.target.value, 10)
                      setFilter((filter) => ({
                        ...filter,
                        fieldId: selectedValue,
                      }))
                    }}
                    value={filter.fieldId}>
                    {dropdownField.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.field}
                      </option>
                    ))}
                  </Select>

                  <Button w={'25%'} onClick={() => navigate('/question/add')} leftIcon={<AddIcon />}>
                    Thêm câu hỏi
                  </Button>
                </HStack>
                <Accordion minHeight={450} w={'100%'} allowToggle>
                  {displayItems.map((item) => (
                    <AccordionItem key={item.id}>
                      <h2>
                        <AccordionButton>
                          <Box as='span' flex='1' textAlign='left'>
                            <HStack>
                              <Text fontWeight={'bold'}>{item.question}</Text>
                              <IconButton color='#e06cae' backgroundColor='#f7f7f7' aria-label='Search database' icon={<EditIcon />} onClick={() => navigate(`/question/edit/${item.id}`)} />
                            </HStack>
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>
                        <List spacing={3}>
                          <ListItem>
                            <ListIcon as={MdCheckCircle} color='green.500' />
                            Creator: {item.creatorName}
                          </ListItem>
                          <ListItem>
                            <ListIcon as={MdCheckCircle} color='green.500' />
                            Answer: {item.answer}
                          </ListItem>
                          <ListItem>
                            <ListIcon as={MdCheckCircle} color='green.500' />
                            Field: {item.fieldEnum}
                          </ListItem>
                        </List>
                      </AccordionPanel>
                    </AccordionItem>
                  ))}
                </Accordion>
                <ReactPaginate
                  className='question-panigate'
                  pageCount={pageCount}
                  onPageChange={handlePageChange}
                  previousLabel='<'
                  nextLabel='>'
                  breakLabel='...'
                  breakClassName='page-item'
                  breakLinkClassName='page-link'
                  containerClassName='pagination'
                  pageClassName='page-item'
                  pageLinkClassName='page-link'
                  previousClassName='page-item'
                  previousLinkClassName='page-link'
                  nextClassName='page-item'
                  nextLinkClassName='page-link'
                  activeClassName='active'
                />
              </VStack>
            </Box>
          </VStack>
        </Box>
      </>
    )
}
