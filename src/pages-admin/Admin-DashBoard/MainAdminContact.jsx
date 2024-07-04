import { ChevronRightIcon } from '@chakra-ui/icons'
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, HStack, VStack, Table, Thead, Tbody, Tr, Th, Td, Button, useToast, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { feedbackService } from '../../Service/feed.service'
import { FaThumbtack } from 'react-icons/fa'
import ReactPaginate from 'react-paginate'

export const MainAdminContact = () => {
  const [feedbacks, setFeedbacks] = useState([])
  const [sortOrder, setSortOrder] = useState('asc')
  const toast = useToast()

  useEffect(() => {
    fetchFeedbacks()
  }, [])

  const fetchFeedbacks = async () => {
    try {
      const data = await feedbackService.getAllFeedback()
      setFeedbacks(data)
    } catch (error) {
      console.error('Error fetching feedback:', error)
      toast({
        title: 'Lỗi',
        description: 'Không thể tải danh sách liên hệ',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const markAsViewed = async (id) => {
    try {
      await feedbackService.markAsViewed(id)
      fetchFeedbacks()
    } catch (error) {
      console.error('Error marking as viewed:', error)
      toast({
        title: 'Lỗi',
        description: 'Không thể đánh dấu là đã xem',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const pinFeedback = async (id) => {
    try {
      await feedbackService.pinFeedback(id)
      fetchFeedbacks()
    } catch (error) {
      console.error('Error pinning feedback:', error)
      toast({
        title: 'Lỗi',
        description: 'Không thể ghim liên hệ',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const unpinFeedback = async (id) => {
    try {
      await feedbackService.pinFeedback(id)
      fetchFeedbacks()
    } catch (error) {
      console.error('Error unpinning feedback:', error)
      toast({
        title: 'Lỗi',
        description: 'Không thể bỏ ghim liên hệ',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const deleteFeedback = async (id) => {
    try {
      await feedbackService.deleteFeedback(id)
      toast({
        title: 'Thành công',
        description: 'Đã xóa liên hệ',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      fetchFeedbacks()
    } catch (error) {
      console.error('Error deleting feedback:', error)
      toast({
        title: 'Lỗi',
        description: 'Không thể xóa liên hệ',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const handleSortByTime = () => {
    const sortedFeedbacks = [...feedbacks].sort((a, b) => {
      return sortOrder === 'asc' ? new Date(a.time) - new Date(b.time) : new Date(b.time) - new Date(a.time)
    })
    setFeedbacks(sortedFeedbacks)
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'))
  }

  // panigate
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 12
  const pageCount = Math.ceil(feedbacks?.length / itemsPerPage)
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected)
  }
  const displayItems = feedbacks?.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)

  return (
    <Box minHeight={2000} overflow='auto' fontFamily={'Roboto'} fontWeight={400} backgroundColor={'#f5f9fa'}>
      <HStack justifyContent={'space-between'} w={'100%'}>
        <Breadcrumb separator={<ChevronRightIcon color='gray.500' />} fontStyle={'italic'} fontWeight={'bold'} pt={30}>
          <BreadcrumbItem>
            <BreadcrumbLink href='#'>Liên hệ</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </HStack>
      <VStack mb={5} w={'100%'} pl={30} pr={30} spacing={2}>
        <Text fontStyle={'italic'} fontWeight={'bold'}>
          Trang {currentPage + 1}/{pageCount}
        </Text>
        <Table bgColor={'white'} variant='simple' size='md'>
          <Thead>
            <Tr>
              <Th>Họ và tên</Th>
              <Th>Email</Th>
              <Th>Tin nhắn</Th>
              <Th onClick={handleSortByTime} cursor='pointer'>
                Thời gian {sortOrder === 'asc' ? '↑' : '↓'}
              </Th>
              <Th>Đã xem</Th>
              <Th>Ghim</Th>
              <Th>Thao tác</Th>
            </Tr>
          </Thead>
          <Tbody>
            {displayItems.map((feedback) => (
              <Tr key={feedback.id} bgColor={feedback.view ? 'white' : '#defffd'}>
                <Td>{feedback.name}</Td>
                <Td>{feedback.email}</Td>
                <Td>
                  {feedback.isPin && <FaThumbtack color='orange' style={{ marginRight: '5px' }} />}
                  {feedback.message}
                </Td>
                <Td>{new Date(feedback.time).toLocaleString()}</Td>
                <Td>{feedback.view ? 'Đã xem' : 'Chưa xem'}</Td>
                <Td>{feedback.isPin ? 'Đã ghim' : 'Chưa ghim'}</Td>
                <Td>
                  <HStack spacing={2}>
                    {!feedback.view && (
                      <Button size='sm' onClick={() => markAsViewed(feedback.id)}>
                        Đánh dấu đã xem
                      </Button>
                    )}
                    <Button size='sm' onClick={() => (feedback.isPin ? unpinFeedback(feedback.id) : pinFeedback(feedback.id))}>
                      {feedback.isPin ? 'Bỏ ghim' : 'Ghim'}
                    </Button>
                    <Button size='sm' colorScheme='red' onClick={() => deleteFeedback(feedback.id)}>
                      Xóa
                    </Button>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
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
