import { Box, Badge, Image, SimpleGrid, Center, Spinner, VStack, InputGroup, InputLeftElement, Input, Flex, Select, Container, Button, Text, HStack, Tag, Icon, Tooltip, useColorModeValue } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { loadJob } from '../../redux/Job-posting/Action'
import { BsCalendar2DayFill } from 'react-icons/bs'
import { BiDollar, BiDollarCircle, BiLocationPlus } from 'react-icons/bi'
import { SearchIcon } from '@chakra-ui/icons'
import ReactPaginate from 'react-paginate'
import { locationService } from '../../Service/location.service'
import { jobService } from '../../Service/job.service'
import { MdLocationOn, MdAttachMoney, MdFavoriteBorder, MdSearch } from 'react-icons/md'

const JobPage = () => {
  const dispatch = useDispatch()
  const params = useParams()

  const jobList = useSelector((store) => store.job.data)

  useEffect(() => {
    dispatch(loadJob())
  }, [])
  console.log(jobList)

  const navigate = useNavigate()

  const [jobFiltered, setFilteredJobList] = useState([])

  const [search, setSearch] = useState({
    keyword: params.keyword || '',
    location: params.location || 'all',
    experience: params.experience || 'all',
    salary: params.salary || 'all',
  })

  const handleChangeSearch = (e) => {
    const { name, value } = e.target
    setSearch((search) => ({ ...search, [name]: value }))
  }

  const handleSearch = () => {
    console.log(search)
    const filteredJobs = jobList.filter((job) => {
      const keywordMatch = job.name.toLowerCase().includes(search.keyword.toLowerCase())
      const locationMatch = search.location === 'all' || job.location === search.location
      const experienceMatch = search.experience === 'all' || job.experience === search.experience
      const salaryMatch = search.salary === 'all' || job.salary === search.salary

      return keywordMatch && locationMatch && experienceMatch && salaryMatch
    })
    setFilteredJobList(filteredJobs)
  }

  useEffect(() => {
    handleSearch()
  }, [])

  const [province, setProvince] = useState([])
  useEffect(() => {
    locationService
      .getAllProvince()
      .then((response) => {
        setProvince(response)
      })
      .catch((er) => console.log(er))
  }, [])

  // panigate
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 12
  const pageCount = Math.ceil(jobFiltered.length / itemsPerPage)
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected)
  }

  const displayItems = jobFiltered.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)

  const jobdatas =
    displayItems !== null ? (
      displayItems.map((job) => {
        return job.status === true ? (
          <Box
            bgColor={'white'}
            _hover={{
              boxShadow: 'xl',
              transition: 'all 0.2s ease-in-out',
              transform: 'translate(2px, -5px)',
            }}
            m={5}
            onClick={() => navigate(`/jobDetail/${job.id}`)}
            key={job.id}
            maxW='sm'
            borderRadius='lg'
            fontFamily={'Roboto'}
            overflow='hidden'>
            <Image w={'100%'} h={164} src={job.image} fallbackSrc='https://static.tintuc.com.vn/images/ver3/2020/02/06/1580924892844-screenshot-135.png' />

            <Box p='6'>
              <Box display='flex' alignItems='baseline'>
                <Box color='gray.500' fontWeight='semibold' letterSpacing='wide' fontSize='xs' textTransform='uppercase'>
                  {job.name}
                </Box>
              </Box>

              <Box mt='1' fontWeight='semibold' as='h4' lineHeight='tight' noOfLines={1}>
                {job.title}
              </Box>

              <Box display='flex'>
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z'
                  />
                </svg>
                <Box ml={2} as='span' color='gray.600' fontSize='sm'>
                  {job.salary}
                </Box>
              </Box>

              <Box display='flex' mt='2' alignItems='center'>
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z' />
                  <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z' />
                </svg>
                <Box ml={2} as='span' color='gray.600' fontSize='sm'>
                  {job.location}
                </Box>
              </Box>

              <Box display='flex' mt='2' alignItems='center'>
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z'
                  />
                </svg>
                <Box ml={2} as='span' color='gray.600' fontSize='sm'>
                  {job.workingForm}
                </Box>
              </Box>
            </Box>
          </Box>
        ) : (
          <></>
        )
      })
    ) : (
      <Center direction='row' spacing={4} w={'80vw'} h={'20vw'}>
        <Spinner color='blue.500' size='xl' />
      </Center>
    )

  return (
    <>
      <Box bgColor={'#f0f4f5'} pb={20} fontFamily={'Roboto'} alignItems={'center'} w={'100%'}>
        <VStack>
          <Box mt='120px' fontWeight='bold' width='80%' fontSize='20px'>
            <Container h={'70px'} maxW={'100%'}>
              <Flex boxShadow='base' p='6' rounded='md' bg='white' w={'995px'} h={'100%'} m={'auto'} borderRadius={'50px'} pl={'24px'} pr={'9px'} py={'9px'}>
                <Box w={'28px'} display={'flex'} alignItems={'center'}>
                  <Image mr={'8px'} w={'20px'} h={'20px'} src='https://static.naukimg.com/s/7/103/i/search.9ec0e1ac.svg' />
                </Box>
                <Box w={'340px'} h={'100%'} pr={'12px'} py={'4px'} pl={'4px'}>
                  <Input value={search.keyword} name='keyword' onChange={handleChangeSearch} border={'none'} color={'#8292b4'} placeholder='vị trí tuyển dụng' defaultValue={search.keyword} />
                </Box>
                <Box w={'223px'} h={'100%'} pr={'0px'} pt={'4px'} pl={'10px'} pb={'6px'}>
                  <Select onChange={handleChangeSearch} name='location' color={'#8292b4'} border={'none'} defaultValue={search.location}>
                    <option value='all'>Địa điểm</option>
                    {province.map((p) => (
                      <option key={p.id} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                  </Select>
                </Box>
                <Box w={'223px'} h={'100%'} pr={'0px'} pt={'4px'} pl={'10px'} pb={'6px'}>
                  <Select onChange={handleChangeSearch} name='experience' color={'#8292b4'} border={'none'} defaultValue={search.experience}>
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
                </Box>
                <Box w={'223px'} h={'100%'} pr={'0px'} pt={'4px'} pl={'10px'} pb={'6px'}>
                  <Select onChange={handleChangeSearch} name='salary' color={'#8292b4'} border={'none'} defaultValue={search.salary}>
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
                </Box>
                <Button onClick={handleSearch} color={'white'} fontWeight={'600'} fontSize={'19px'} bgColor={'#457eff'} borderRadius={'50px'} h={'48px'} w={'120px'} px={'28px'} py={'11px'}>
                  Search
                </Button>
              </Flex>
            </Container>
          </Box>

          <Box w={'80%'} display='flex' justifyContent='space-between'>
            {/* <SimpleGrid w={'100%'} columns={{ sm: 1, md: 2, lg: 3 }} spacing={5} p={5}>
              {displayItems.map((job) => (
                <Box key={job.id} borderWidth='1px' borderRadius='lg' overflow='hidden' p={2} bg='white' boxShadow='sm' _hover={{ boxShadow: 'lg' }} display='flex' alignItems='center' width='100%'>
                  <Image src={job.image} alt={job.name} boxSize='80px' objectFit='cover' borderRadius='md' flexShrink={0} marginRight={3} />
                  <VStack align='start' spacing={2} flex={1} overflow='hidden'>
                    <Tooltip label={job.name} hasArrow>
                      <Text m={0} p={0} fontSize='md' fontWeight='bold' isTruncated w={'190px'} whiteSpace='nowrap'>
                        {job.name}
                      </Text>
                    </Tooltip>
                    <VStack align='start' spacing={0}>
                      <HStack spacing={1}>
                        <Icon m={0} p={0} as={MdLocationOn} color='gray.500' />
                        <Text m={0} p={0} fontSize='sm'>
                          {job.location}
                        </Text>
                      </HStack>
                      <HStack spacing={1}>
                        <Icon m={0} p={0} as={MdAttachMoney} color='gray.500' />
                        <Text m={0} p={0} fontSize='sm'>
                          {job.salary}
                        </Text>
                      </HStack>
                    </VStack>
                    <HStack spacing={1}>
                      <Tag colorScheme='blue'>{job.position}</Tag>
                      <Tag colorScheme='green'>{job.workingForm}</Tag>
                      <Icon as={MdFavoriteBorder} color='red.500' />
                    </HStack>
                  </VStack>
                </Box>
              ))}
            </SimpleGrid> */}

            <SimpleGrid w='100%' top='50' left='50' ml='10' mt='50px' mr='10' columns={3} spacing={'5'}>
              {jobdatas}
            </SimpleGrid>
          </Box>
          {/* <JobGrid displayItems={displayItems} /> */}
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
    </>
  )
}

export default JobPage

const locations = ['Hà Nội', 'TP.HCM', 'Đà Nẵng', 'Cần Thơ']
const experiences = ['Không yêu cầu', 'Dưới 1 năm', '1-3 năm', '3-5 năm', 'Trên 5 năm']
const salaries = ['< 5 triệu', '5-10 triệu', '10-20 triệu', '20-50 triệu', '> 50 triệu']
const industries = ['Công nghệ thông tin', 'Kế toán', 'Marketing', 'Nhân sự', 'Kinh doanh']

const JobGrid = ({ displayItems }) => {
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('')
  const [experience, setExperience] = useState('')
  const [salary, setSalary] = useState('')
  const [industry, setIndustry] = useState('')

  // Lọc các công việc dựa trên các điều kiện tìm kiếm
  const filteredItems = displayItems.filter((job) => {
    return (search === '' || job.name.toLowerCase().includes(search.toLowerCase())) && (location === '' || job.location === location) && (experience === '' || job.experience === experience) && (salary === '' || job.salary === salary) && (industry === '' || job.industry === industry)
  })
  const boxBgColor = useColorModeValue('white', 'gray.800')

  return (
    <Box w={'85%'} mt={50} p={5}>
      <Flex p={5} direction={{ base: 'column', md: 'row' }} align='center' justify='space-between' wrap='wrap'>
        <Input placeholder='Tìm kiếm công việc' size='md' mb={{ base: 2, md: 0 }} value={search} onChange={(e) => setSearch(e.target.value)} icon={<MdSearch />} flex='1 1 200px' mr={{ base: 0, md: 3 }} />
        <Select placeholder='Địa điểm' size='md' mb={{ base: 2, md: 0 }} value={location} onChange={(e) => setLocation(e.target.value)} flex='1 1 150px' mr={{ base: 0, md: 3 }}>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </Select>
        <Select placeholder='Kinh nghiệm' size='md' mb={{ base: 2, md: 0 }} value={experience} onChange={(e) => setExperience(e.target.value)} flex='1 1 150px' mr={{ base: 0, md: 3 }}>
          {experiences.map((exp) => (
            <option key={exp} value={exp}>
              {exp}
            </option>
          ))}
        </Select>
        <Select placeholder='Mức lương' size='md' mb={{ base: 2, md: 0 }} value={salary} onChange={(e) => setSalary(e.target.value)} flex='1 1 150px' mr={{ base: 0, md: 3 }}>
          {salaries.map((sal) => (
            <option key={sal} value={sal}>
              {sal}
            </option>
          ))}
        </Select>
        <Select placeholder='Ngành nghề' size='md' value={industry} onChange={(e) => setIndustry(e.target.value)} flex='1 1 150px'>
          {industries.map((ind) => (
            <option key={ind} value={ind}>
              {ind}
            </option>
          ))}
        </Select>
      </Flex>

      <SimpleGrid w={'100%'} columns={{ sm: 1, md: 2, lg: 3 }} spacing={5} p={5}>
        {displayItems.map((job) => (
          <Box key={job.id} borderWidth='1px' borderRadius='lg' overflow='hidden' p={2} bg='white' boxShadow='sm' _hover={{ boxShadow: 'lg' }} display='flex' alignItems='center' width='100%'>
            <Image src={job.image} alt={job.name} boxSize='80px' objectFit='cover' borderRadius='md' flexShrink={0} marginRight={3} />
            <VStack align='start' spacing={2} flex={1} overflow='hidden'>
              <Tooltip label={job.name} hasArrow>
                <Text m={0} p={0} fontSize='md' fontWeight='bold' isTruncated w={'190px'} whiteSpace='nowrap'>
                  {job.name}
                </Text>
              </Tooltip>
              <VStack align='start' spacing={0}>
                <HStack spacing={1}>
                  <Icon m={0} p={0} as={MdLocationOn} color='gray.500' />
                  <Text m={0} p={0} fontSize='sm'>
                    {job.location}
                  </Text>
                </HStack>
                <HStack spacing={1}>
                  <Icon m={0} p={0} as={MdAttachMoney} color='gray.500' />
                  <Text m={0} p={0} fontSize='sm'>
                    {job.salary}
                  </Text>
                </HStack>
              </VStack>
              <HStack spacing={1}>
                <Tag colorScheme='blue'>{job.position}</Tag>
                <Tag colorScheme='green'>{job.workingForm}</Tag>
                <Icon as={MdFavoriteBorder} color='red.500' />
              </HStack>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  )
}
