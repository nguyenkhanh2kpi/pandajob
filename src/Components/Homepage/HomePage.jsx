import { Box, Button, Container, Flex, Image, Input, Link, Select, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import FeatureCompony from './FeatureCompony'
import { useNavigate } from 'react-router-dom'
import { locationService } from '../../Service/location.service'
import NewJob from './NewJob'
import SliderBanner from './Banner'
import ListIndustry from './ListIndustry'
import Tour from 'reactour'
import AboutUsHomePage from './AboutUsHomePage'

const HomePage = () => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('userInfo'))
  const [isTourOpen, setIsTourOpen] = useState(false)

  const [search, setSearch] = useState({
    keyword: '',
    location: 'all',
    experience: 'all',
    salary: 'all',
  })

  const [province, setProvince] = useState([])

  const handleChangeSearch = (e) => {
    const { name, value } = e.target
    setSearch((search) => ({ ...search, [name]: value }))
  }

  // Đảm bảo dữ liệu trong localStorage tồn tại
  let storedData = localStorage.getItem('keyw')
  if (storedData === null) {
    storedData = JSON.stringify({ keyw: '' })
    localStorage.setItem('keyw', storedData)
  }
  const keyWords = JSON.parse(storedData).keyw

  const handleSearch = () => {
    if (search.keyword !== '') {
      // sessionStorage.setItem('keyw', search.keyword)
      localStorage.setItem('keyw', JSON.stringify({ keyw: search.keyword }))
      navigate(`/jobpage`)
      // navigate(`/jobpage/${search.keyword}/${search.location}/${search.experience}/${search.salary}`)
    } else {
      navigate(`/jobpage`)
      // navigate(`/jobpage/${search.location}/${search.experience}/${search.salary}`)
    }
  }

  useEffect(() => {
    locationService
      .getAllProvince()
      .then((response) => {
        setProvince(response)
      })
      .catch((er) => console.log(er))
  }, [])

  // react tour
  const steps = [
    {
      selector: '.search-bar', // Selector của phần tử cần hướng dẫn
      content: 'Đây là thanh tìm kiếm việc làm. Hãy nhập từ khóa và chọn các điều kiện tìm kiếm.',
    },
    {
      selector: '.slider-banner',
      content: 'Đây là banner quảng cáo.',
    },
  ]
  const toggleTour = () => {
    setIsTourOpen(!isTourOpen)
  }

  return (
    <VStack spacing={0} w={'100%'} bgColor={'#f0f4f5'} fontFamily={'Roboto'} mt={'72px'}>
      <VStack pb={1} bgGradient='linear(to-b, #8ad4d4, #f0f4f5)' w={'100%'} overflow='hidden' align={'center'}>
        <SliderBanner />
        <Tour steps={steps} isOpen={isTourOpen} onRequestClose={toggleTour} rounded={10} accentColor='#457eff' />
        <Container mt={10} h={'70px'} maxW={'100%'}>
          <Flex className='search-bar' boxShadow='base' p='6' rounded='md' bg='white' w={'80%'} h={'100%'} m={'auto'} borderRadius={'50px'} pl={'24px'} pr={'9px'} py={'9px'}>
            <Box w={'28px'} display={'flex'} alignItems={'center'}>
              <Image mr={'8px'} w={'20px'} h={'20px'} src='https://static.naukimg.com/s/7/103/i/search.9ec0e1ac.svg' />
            </Box>
            <Box w={'340px'} h={'100%'} pr={'12px'} py={'4px'} pl={'4px'}>
              <Input fontFamily={'Roboto'} value={search.keyword} name='keyword' onChange={handleChangeSearch} border={'none'} color={'#8292b4'} placeholder='vị trí tuyển dụng' />
            </Box>
            <Box w={'223px'} h={'100%'} pr={'0px'} pt={'4px'} pl={'10px'} pb={'6px'}>
              <Select fontFamily={'Roboto'} onChange={handleChangeSearch} name='location' color={'#8292b4'} border={'none'} defaultValue='all'>
                <option value='all'>Địa điểm</option>
                {province.map((p) => (
                  <option key={p.name} value={p.name}>
                    {p.name}
                  </option>
                ))}
              </Select>
            </Box>
            <Box w={'223px'} h={'100%'} pr={'0px'} pt={'4px'} pl={'10px'} pb={'6px'}>
              <Select fontFamily={'Roboto'} onChange={handleChangeSearch} name='experience' color={'#8292b4'} border={'none'} defaultValue='all'>
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
              <Select fontFamily={'Roboto'} onChange={handleChangeSearch} name='salary' color={'#8292b4'} border={'none'} defaultValue='all'>
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
            <Button fontFamily={'Roboto'} onClick={handleSearch} backgroundColor='rgb(3, 201, 215)' color={'white'} fontWeight={'600'} fontSize={'19px'} borderRadius={'50px'} h={'48px'} w={'120px'} px={'28px'} py={'11px'}>
              <Link>Tìm</Link>
            </Button>
          </Flex>
        </Container>
      </VStack>
      <VStack mb={100} minH={1000} align={'flex-start'} w={'80vw'}>
        <VStack w={'100%'} align={'flex-start'}>
          <NewJob />
        </VStack>
        <VStack w={'100%'} align={'flex-start'}>
          <AboutUsHomePage />
        </VStack>
        <VStack w={'100%'} align={'flex-start'}>
          <FeatureCompony />
        </VStack>
        <VStack w={'100%'} align={'flex-start'}>
          <ListIndustry />
        </VStack>
      </VStack>
    </VStack>
  )
}

export default HomePage
