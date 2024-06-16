import { Box, Image, SimpleGrid, Center, Spinner, VStack, InputGroup, InputLeftElement, Input, Flex, Select, Container, Button, Text, HStack, Tag, Icon, Tooltip, useColorModeValue, IconButton } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link, useFetcher, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { loadJob } from '../../redux/Job-posting/Action'
import { BsCalendar2DayFill } from 'react-icons/bs'
import { BiDollar, BiDollarCircle, BiLocationPlus } from 'react-icons/bi'
import { SearchIcon } from '@chakra-ui/icons'
import ReactPaginate from 'react-paginate'
import { locationService } from '../../Service/location.service'
import { jobService } from '../../Service/job.service'
import { MdLocationOn, MdAttachMoney, MdFavoriteBorder, MdSearch, MdFavorite } from 'react-icons/md'
import { hostName } from '../../global'
import axios from 'axios'
import { favoriteService } from '../../Service/favorite.service'
import { JobItemInList } from './JobItemInList'
import { LoadingComponent } from '../../Components-admin/LoadingComponent'

export const NJobPage = () => {
  const dispatch = useDispatch()
  const jobList = useSelector((store) => store.job.data)
  useEffect(() => {
    dispatch(loadJob())
  }, [])

  // loacation
  const [provinces, setProvinces] = useState(null)
  useEffect(() => {
    locationService
      .getAllProvince()
      .then((response) => {
        const provinceNames = response.map((province) => province.name)
        setProvinces(provinceNames)
      })
      .catch((er) => console.log(er))
  }, [])

  // danh sach nganh nghe
  const [industries, setIndustries] = useState([])
  useEffect(() => {
    axios
      .get(`${hostName}/industries`)
      .then((response) => {
        setIndustries(response.data)
      })
      .catch((error) => {
        console.error('There was an error fetching the industries!', error)
      })
  }, [])

  return (
    <Box bgColor={'#f0f4f5'} pb={20} fontFamily={'Roboto'} alignItems={'center'} w={'100%'}>
      <VStack>
        {jobList.length > 0 ? (
          <JobGrid displayItems={jobList} provinces={provinces} industries={industries} />
        ) : (
          <HStack minH={800} w='100%' justifyContent='center' alignItems='center'>
            <Spinner thickness='8px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='4xl' />
          </HStack>
        )}
      </VStack>
    </Box>
  )
}

const JobGrid = ({ displayItems, provinces, industries }) => {
  const accessToken = JSON.parse(localStorage.getItem('data')) !== null ? JSON.parse(localStorage.getItem('data')).access_token : 'abc'
  const navigate = useNavigate()

  const [filteredJobs, setFilteredJobs] = useState(displayItems)
  const [search, setSearch] = useState('')
  const [province, setProvince] = useState(null)
  const [experience, setExperience] = useState('all')
  const [salary, setSalary] = useState('all')
  const [industry, setIndustry] = useState(null)

  const handleSearch = () => {
    const filteredJobs = displayItems.filter((job) => {
      const searchMatch = job.name.toLowerCase().includes(search.toLowerCase())
      const provinceMatch = !province || job.location === province
      const experienceMatch = experience === 'all' || job.experience === experience
      const salaryMatch = salary === 'all' || job.salary === salary
      const industryMatch = !industry || job.industry === industry
      return searchMatch && provinceMatch && experienceMatch && salaryMatch && industryMatch
    })

    setFilteredJobs(filteredJobs)
  }

  //   phan trang
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 12
  const pageCount = Math.ceil(filteredJobs.length / itemsPerPage)
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected)
  }
  const currentPageItems = filteredJobs.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)

  //whish list
  const [wishLists, setWhishList] = useState(null)
  const handleLike = (jobId) => {
    favoriteService
      .addToFavorites(jobId, accessToken)
      .then((response) => setWhishList(response.data))
      .catch((er) => console.log(er))
  }
  useEffect(() => {
    favoriteService
      .getMyWishlist(accessToken)
      .then((response) => setWhishList(response.data))
      .catch((er) => console.log(er))
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentPage])

  return (
    <>
      <Box w={'85%'} mt={50} p={5}>
        <Flex p={5} direction={{ base: 'column', md: 'row' }} align='center' justify='space-between' wrap='wrap'>
          <Input bgColor={'white'} placeholder='Tìm kiếm công việc' size='md' mb={{ base: 2, md: 0 }} value={search} onChange={(e) => setSearch(e.target.value)} icon={<MdSearch />} flex='1 1 200px' mr={{ base: 0, md: 3 }} />
          <Select bgColor={'white'} placeholder='Địa điểm' size='md' mb={{ base: 2, md: 0 }} value={province} onChange={(e) => setProvince(e.target.value)} flex='1 1 150px' mr={{ base: 0, md: 3 }}>
            {provinces?.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </Select>
          <Select bgColor={'white'} size='md' mb={{ base: 2, md: 0 }} value={experience} onChange={(e) => setExperience(e.target.value)} flex='1 1 150px' mr={{ base: 0, md: 3 }}>
            <option value='all'>Kinh nghiệm</option>
            <option value='chưa có'>chưa có</option>
            <option value='dưới 1 năm'>dưới 1 năm</option>
            <option value='1 năm'>1 năm</option>
            <option value='2 năm'>2 năm</option>
            <option value='3 năm'>3 năm</option>
            <option value='4 năm'>4 năm</option>
            <option value='5 năm'>5 năm</option>
            <option value='trên 5 năm'>trên 5 năm</option>
          </Select>
          <Select bgColor={'white'} size='md' mb={{ base: 2, md: 0 }} value={salary} onChange={(e) => setSalary(e.target.value)} flex='1 1 150px' mr={{ base: 0, md: 3 }}>
            <option value='all'>Mức lương</option>
            <option value='Dưới 10 triệu'>Dưới 10 triệu</option>
            <option value='10 -15 triệu'>10 -15 triệu</option>
            <option value='15 -20 triệu'>15 -20 triệu</option>
            <option value='20 -25 triệu'>20 -25 triệu</option>
            <option value='25 -30 triệu'>25 -30 triệu</option>
            <option value='30 -50 triệu'>30 -50 triệu</option>
            <option value='trên 50 triệu'>trên 50 triệu</option>
            <option value='thỏa thuận'>thỏa thuận</option>
          </Select>
          <Select bgColor={'white'} placeholder='Ngành nghề' size='md' value={industry} onChange={(e) => setIndustry(e.target.value)} flex='1 1 150px'>
            {industries.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </Select>
          <IconButton ml={1} bgColor={'white'} onClick={handleSearch} icon={<SearchIcon />} />
        </Flex>
        <HStack pl={5} pr={5} justifyContent={'space-between'}>
          <Text>
            Trang {currentPage + 1} trên tổng số {pageCount} trang
          </Text>
        </HStack>

        <SimpleGrid w={'100%'} columns={{ sm: 1, md: 2, lg: 3 }} spacing={5} pl={5} pr={5}>
          {currentPageItems.map((job) => (
            <JobItemInList job={job} wishLists={wishLists} handleLike={handleLike} />
          ))}
        </SimpleGrid>
        <Center mt={20}>
          <ReactPaginate
            className='question-panigate'
            pageCount={pageCount}
            onPageChange={handlePageChange}
            previousLabel='Trang trước'
            nextLabel='Trang sau'
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
        </Center>
      </Box>
    </>
  )
}
