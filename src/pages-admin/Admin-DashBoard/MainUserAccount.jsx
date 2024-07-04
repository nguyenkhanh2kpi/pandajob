import { ChevronRightIcon } from '@chakra-ui/icons'
import { Avatar, Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Flex, HStack, IconButton, Input, Menu, MenuButton, MenuItem, MenuList, Spinner, Tag, Text, useToast, VStack } from '@chakra-ui/react'
import React, { useEffect, useId, useState } from 'react'
import { userService } from '../../Service/user.servie'
import { BsThreeDotsVertical } from 'react-icons/bs'
import ReactPaginate from 'react-paginate'

export const MainUserAccount = () => {
  const toast = useToast()
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const [users, setUsers] = useState(null)
  const [filterUsers, setFilterUsers] = useState([])
  const [filter, setFilter] = useState('')
  const [load, setLoad] = useState(false)

  useEffect(() => {
    userService
      .getAllUser(accessToken)
      .then((response) => {
        setUsers(response.data)
        setFilterUsers(response.data)
      })
      .catch((er) => console.log(er))
  }, [load])

  useEffect(() => {
    if (users) {
      let filtered = users
      if (filter === 'candidate') {
        filtered = users.filter((user) => user.permission === 'CANDIDATE')
      } else if (filter === 'recruiter') {
        filtered = users.filter((user) => user.permission === 'RECRUITER')
      } else if (filter === 'active') {
        filtered = users.filter((user) => user.accountStatus === 'ACTIVE')
      } else if (filter === 'banned') {
        filtered = users.filter((user) => user.accountStatus === 'BANNED')
      }
      setFilterUsers(filtered)
    }
  }, [filter, users])

  const handleBan = (userId) => {
    userService
      .banUser(accessToken, userId)
      .then((response) => {
        toast({ description: response.message, status: 'info' })
      })
      .catch((er) => console.log(er))
      .finally(() => setLoad(!load))
  }
  const handleUnBan = (userId) => {
    userService
      .acceptUser(accessToken, userId)
      .then((response) => {
        toast({ description: response.message, status: 'info' })
      })
      .catch((er) => console.log(er))
      .finally(() => setLoad(!load))
  }

  //   search
  const [keyw, setKeyWord] = useState('')
  useEffect(() => {
    if (keyw && users) {
      const filtered = users.filter((user) => user.name?.toLowerCase().includes(keyw.toLowerCase()) || user.email?.toLowerCase().includes(keyw.toLowerCase()))
      setFilterUsers(filtered)
    } else if (users) {
      setFilterUsers(users)
    }
  }, [keyw, users])

  // panigate
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 12
  const pageCount = Math.ceil(filterUsers?.length / itemsPerPage)
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected)
  }

  const displayItems = filterUsers?.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)

  if (filterUsers === null) {
    return (
      <HStack minH={500} w='100%' justifyContent='center' alignItems='center'>
        <Spinner thickness='8px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='4xl' />
      </HStack>
    )
  } else
    return (
      <Box minHeight={2000} overflow='auto' fontFamily={'Roboto'} fontWeight={400} backgroundColor={'#f5f9fa'}>
        <HStack justifyContent={'space-between'} w={'100%'}>
          <Breadcrumb separator={<ChevronRightIcon color='gray.500' />} fontStyle={'italic'} fontWeight={'bold'} pt={30}>
            <BreadcrumbItem>
              <BreadcrumbLink href='#'>Quản lý người dùng</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </HStack>
        <VStack mb={5} w={'100%'} pl={30} pr={30} spacing={2}>
          <HStack justifyContent={'space-between'} m={0} p={0} w={'100%'} align={'flex-start'}>
            <Flex gap={3} wrap='wrap'>
              <Button onClick={() => setFilter('')} size={'sm'} bgColor={filter === '' ? 'black' : 'grey.200'} color={filter === '' ? 'white' : 'black'}>
                Tất cả
              </Button>
              <Button onClick={() => setFilter('candidate')} size={'sm'} bgColor={filter === 'candidate' ? 'black' : 'grey.200'} color={filter === 'candidate' ? 'white' : 'black'}>
                Candidate
              </Button>
              <Button onClick={() => setFilter('recruiter')} size={'sm'} bgColor={filter === 'recruiter' ? 'black' : 'grey.200'} color={filter === 'recruiter' ? 'white' : 'black'}>
                Recruiter
              </Button>
              <Button onClick={() => setFilter('active')} size={'sm'} bgColor={filter === 'active' ? 'black' : 'grey.200'} color={filter === 'active' ? 'white' : 'black'}>
                Active
              </Button>
              <Button onClick={() => setFilter('banned')} size={'sm'} bgColor={filter === 'banned' ? 'black' : 'grey.200'} color={filter === 'banned' ? 'white' : 'black'}>
                Banned
              </Button>
            </Flex>
            <Input value={keyw} onChange={(e) => setKeyWord(e.target.value)} bgColor={'white'} placeholder='Search' w={'50%'} />
          </HStack>
        </VStack>

        <VStack mb={100} w={'100%'} align={'flex-start'} pl={30} pr={30} spacing={3}>
          <Text fontStyle={'italic'} fontWeight={'bold'}>
            Trang {currentPage + 1}/{pageCount}
          </Text>
          {displayItems.map((user) => (
            <Box key={user.id} bgColor={'white'} boxShadow={'lg'} borderRadius={20} p={3} w={'100%'}>
              <Flex spacing='4'>
                <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                  <Avatar name={user.name} src={user.avt} />
                  <Box>
                    <Text m={0} p={0} fontWeight='bold'>
                      {user.name}
                    </Text>
                    <Text m={0} p={0}>
                      {user.email}
                    </Text>
                  </Box>
                </Flex>
                <HStack>
                  <Tag size={'sm'}>Role: {user.permission}</Tag>
                  <Tag size={'sm'}>Date: {formatDate(user.dateRegister)}</Tag>
                  <StatusTag status={user.accountStatus} />
                </HStack>

                <Menu>
                  <MenuButton>
                    <IconButton variant='ghost' colorScheme='gray' aria-label='See menu' icon={<BsThreeDotsVertical />} />
                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={() => handleBan(user.id)}>Khóa tài khoản</MenuItem>
                    <MenuItem onClick={() => handleUnBan(user.id)}>Mở khóa</MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
            </Box>
          ))}
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
    )
}

function formatDate(date) {
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }
  return new Date(date).toLocaleDateString('en-US', options)
}

const StatusTag = ({ status }) => {
  let statusColor = ''

  switch (status) {
    case 'UNAUTHENTICATED':
      statusColor = 'yellow'
      break
    case 'ACTIVE':
      statusColor = 'green'
      break
    case 'BANNED':
      statusColor = 'red'
      break
    default:
      break
  }

  return (
    <Tag size={'sm'} bgColor={statusColor}>
      Status: {status}
    </Tag>
  )
}
