import React, { useId, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import {
  Box,
  Flex,
  Text,
  Image,
  Badge,
  Select,
  HStack,
  VStack,
  Button,
  Textarea,
  Input,
  FormControl,
  FormLabel,
  BreadcrumbItem,
  BreadcrumbLink,
  Breadcrumb,
  Card,
  CardBody,
  Stepper,
  Step,
  StepIndicator,
  StepStatus,
  StepTitle,
  StepDescription,
  StepNumber,
  useSteps,
  StepIcon,
  StepSeparator,
  Heading,
  Icon,
} from '@chakra-ui/react'
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom'
import './style4.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { loadJob } from '../../redux/Job-posting/Action'
import uuid from 'react-uuid'
import { Link } from 'react-router-dom'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '../../firebase.js'
import { v4 } from 'uuid'
import { hostName } from '../../global.js'
import { locationService } from '../../Service/location.service.js'
import { DragHandleIcon, InfoIcon, SmallAddIcon } from '@chakra-ui/icons'
import { AiOutlineEdit, AiOutlineFire, AiOutlineFolderOpen, AiOutlineInfoCircle } from 'react-icons/ai'
const JobPosting = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadJob())
  }, [])

  const data = useSelector((store) => store.job.data)
  if (data !== null) {
    console.log(data.length)
  }
  const jobList = data !== null ? data.slice(data.length - 3, data.length) : []
  const [passShow, setPassShow] = useState(false)
  const [cpassShow, setCPassShow] = useState(false)
  const navigate = useNavigate()

  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const [name, setName] = useState('')
  const [position, setPosition] = useState('')
  const [language, setLanguage] = useState('')
  const [location, setLocation] = useState('')
  const [salary, setSalary] = useState('')
  const [number, setNumber] = useState('')
  const [workingForm, setWorkingForm] = useState('')
  const [sex, setSex] = useState('NONE')
  const [experience, setExperience] = useState('')
  const [detailLocation, setDetailLocation] = useState('')
  const [detailJob, setDetailJob] = useState('')
  const [requirements, setRequirements] = useState('')
  const [interest, setInterest] = useState('')
  const [image, setImage] = useState('')

  const [industry, setIndustry] = useState('')
  const [industry2, setIndustry2] = useState('')

  const [requireTest, setRequireTest] = useState(false)

  const handleUpload = (e) => {
    const storageRef = ref(storage, `/files/${e.target.files[0].name + v4()}`)
    uploadBytes(storageRef, e.target.files[0]).then((data) => {
      console.log(data)
      getDownloadURL(data.ref).then((url) => {
        setImage(url)
        console.log('image', url)
      })
    })
  }

  const HandleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault()
    if (name === '') {
      toast.error('Yêu cầu nhập tên!', {
        position: 'top-center',
      })
      setLoading(false)
    } else if (industry === '') {
      toast.error('Hãy chọn ngành nghề!', {
        position: 'top-center',
      })
      setLoading(false)
    } else if (industry2 === '') {
      toast.error('Chọn ngành nghề phụ!', {
        position: 'top-center',
      })
      setLoading(false)
    } else if (position === '') {
      toast.error('Cần nhập vị trí tuyển dụng!', {
        position: 'top-center',
      })
      setLoading(false)
    } else if (salary === '') {
      toast.error('Yêu cầu chọn mức lương!', {
        position: 'top-center',
      })
      setLoading(false)
    } else if (workingForm === '') {
      toast.error('Chưa chọn hình thức làm việc!', {
        position: 'top-center',
      })
      setLoading(false)
    } else if (location === '') {
      toast.error('Yêu cầu nhập địa điểm!', {
        position: 'top-center',
      })
      setLoading(false)
    } else if (language === '') {
      toast.error('Hãy nhập yêu cầu ngôn ngữ!', {
        position: 'top-center',
      })
      setLoading(false)
    } else if (sex === '') {
      toast.error('Yêu cầu nhập giới tính!', {
        position: 'top-center',
      })
      setLoading(false)
    } else if (number === '') {
      toast.error('Hãy nhập số người tuyển dụng!', {
        position: 'top-center',
      })
      setLoading(false)
    } else if (detailLocation === '') {
      toast.error('Nhập địa điểm làm việc chi tiết!', {
        position: 'top-center',
      })
      setLoading(false)
    } else if (experience === '') {
      toast.error('Nhập yêu cầu kinh nghiệm!', {
        position: 'top-center',
      })
      setLoading(false)
    } else if (detailJob === '') {
      toast.error('Yêu cầu nhập mô tả chi tiết về công việc!', {
        position: 'top-center',
      })
      setLoading(false)
    } else if (requirements === '') {
      toast.error('Nhập yêu cầu công việc!', {
        position: 'top-center',
      })
      setLoading(false)
    } else if (interest === '') {
      toast.error('Nhập phúc lợi nhân viên!', {
        position: 'top-center',
      })
      setLoading(false)
    } else if (image === null) {
      toast.error('image is required!', {
        position: 'top-center',
      })
      setLoading(false)
    } else {
      try {
        const formData = new FormData()
        formData.append('file', image)

        const imageResponse = await axios.post(`${hostName}/file/upload`, formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        const imageData = imageResponse.data.data
        let data = JSON.stringify({
          name,
          position,
          language,
          location,
          salary,
          number,
          workingForm,
          sex,
          experience,
          detailLocation,
          detailJob,
          requirements,
          interest,
          industry,
          industry2,
          image: imageData,
          requireTest,
        })

        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: `${hostName}/job-posting`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          data: data,
        }

        await axios
          .request(config)
          .then((response) => {
            toast.info(response.data.message, {
              position: 'top-center',
            })
            setLoading(false)
          })
          .catch((error) => {
            console.log(error)
            toast.error('Đã có lỗi xảy ra', {
              position: 'top-center',
            })
            setLoading(false)
          })
        // .finally(() => navigate('/allJob_Recruiter'))
      } catch (error) {
        toast.error('Đã có lỗi xảy ra', {
          position: 'top-center',
        })
        setLoading(false)
      }
    }
  }

  const userId = JSON.parse(localStorage.getItem('data')).data.userInfo.id

  const [province, setProvince] = useState([])
  useEffect(() => {
    locationService
      .getAllProvince()
      .then((response) => {
        setProvince(response)
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
    <>
      <Box minHeight={2000} overflow='auto' fontFamily={'Roboto'} fontWeight={400} backgroundColor={'#e9f3f5'}>
        <ToastContainer />
        <Breadcrumb pt={30}>
          <BreadcrumbItem>
            <BreadcrumbLink href='/allJob_Recruiter'>Công việc của tôi</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href='#'>Đăng tuyển dụng</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        {/* tiêu đề */}
        <Box pl={30} pr={30} w={'100%'} mb={5}>
          <Box mx={'100px'} p='30px' fontSize={'sm'} bgColor={'white'} borderRadius={20} boxShadow={'md'}>
            <FormControl>
              <HStack alignItems='center' spacing={4}>
                <Icon as={AiOutlineEdit} boxSize={7} p={1} bgColor='#ddeff0' borderRadius='full' />
                <Text fontWeight={'bold'} m={0}>
                  Tiêu đề tuyển dụng
                </Text>
              </HStack>
              <Input mt={5} w={'50%'} type='text' onChange={(e) => setName(e.target.value)} name='name' id='Name' />
            </FormControl>

            <HStack w={'100%'} mt={3}>
              <VStack w={'50%'}>
                <FormLabel ml={3} w={'100%'}>
                  Ngành nghề chính
                </FormLabel>
                <Select w={'100%'} placeholder='Chọn ngành nghề' value={industry} onChange={(e) => setIndustry(e.target.value)}>
                  {industries.map((industry, index) => (
                    <option key={index} value={industry}>
                      {industry}
                    </option>
                  ))}
                </Select>
              </VStack>
              <VStack w={'50%'}>
                <FormLabel ml={3} w={'100%'}>
                  Ngành nghề phụ
                </FormLabel>
                <Select w={'100%'} placeholder='Chọn ngành nghề' value={industry2} onChange={(e) => setIndustry2(e.target.value)}>
                  {industries.map((industry, index) => (
                    <option key={index} value={industry}>
                      {industry}
                    </option>
                  ))}
                </Select>
              </VStack>
            </HStack>

            <HStack w={'100%'} mt={3} spacing={10}>
              <VStack w={'50%'}>
                <FormLabel ml={3} mr={1} w={'100%'}>
                  Địa chỉ làm việc
                </FormLabel>
                <Input w={'100%'} type='text' onChange={(e) => setDetailLocation(e.target.value)} name='position' id='position' />
              </VStack>
            </HStack>

            <HStack w={'100%'} mt={3}>
              <VStack w={'50%'}>
                <FormLabel ml={3} w={'100%'}>
                  Lương
                </FormLabel>
                <Select w={'100%'} onChange={(e) => setSalary(e.target.value)} defaultValue='all'>
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
              </VStack>
              <VStack w={'50%'}>
                <FormLabel ml={3} w={'100%'}>
                  Hình thức làm việc
                </FormLabel>
                <Input w={'100%'} type='text' onChange={(e) => setWorkingForm(e.target.value)} name='workingForm' id='workingForm' />
              </VStack>
            </HStack>

            <HStack w={'100%'} mt={3}>
              <VStack w={'50%'}>
                <FormLabel ml={3} w={'100%'}>
                  Địa điểm
                </FormLabel>
                <Select w={'100%'} defaultValue='all' onChange={(e) => setLocation(e.target.value)}>
                  <option value='all'>Địa điểm</option>
                  {province.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </Select>
              </VStack>
              <VStack w={'50%'}>
                <FormLabel ml={3} w={'100%'}>
                  Ngôn ngữ
                </FormLabel>
                <Input w={'100%'} type='text' onChange={(e) => setLanguage(e.target.value)} name='language' id='language' />
              </VStack>
            </HStack>

            <HStack w={'100%'} mt={3}>
              <VStack w={'50%'}>
                <FormLabel ml={3} w={'100%'}>
                  Giới tính
                </FormLabel>
                <Select w={'100%'} onChange={(e) => setSex(e.target.value)} defaultValue='NONE'>
                  <option value='Nam'>Nam</option>
                  <option value='Nữ'>Nữ</option>
                  <option value='Không yêu cầu'>Không yêu cầu</option>
                </Select>
              </VStack>
              <VStack w={'50%'}>
                <FormLabel ml={3} w={'100%'}>
                  Số lượng tuyển
                </FormLabel>
                <Input w={'100%'} onChange={(e) => setNumber(e.target.value)} type='text' name='number' id='number' />
              </VStack>
            </HStack>

            <HStack w={'100%'} mt={3}>
              <VStack w={'50%'}>
                <FormLabel ml={3} w={'100%'}>
                  Chức vụ/ Vị trí công việc
                </FormLabel>{' '}
                <Input w={'100%'} onChange={(e) => setPosition(e.target.value)} type='text' name='detailLocation' id='detailLocation' />
              </VStack>
              <VStack w={'50%'}>
                <FormLabel ml={3} w={'100%'}>
                  Kinh nghiệm
                </FormLabel>
                <Select w={'100%'} onChange={(e) => setExperience(e.target.value)} defaultValue={'Chưa có'}>
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
              </VStack>
            </HStack>

            <FormLabel>Mô tả</FormLabel>
            <Textarea h={250} onChange={(e) => setDetailJob(e.target.value)} type='text' name='detailJob' id='detailJob' />

            <FormLabel>Yêu cầu</FormLabel>
            <Textarea h={250} onChange={(e) => setRequirements(e.target.value)} type='text' name='requirements' id='requirements' />

            <FormLabel>Quyền lợi</FormLabel>
            <Textarea h={250} onChange={(e) => setInterest(e.target.value)} type='text' name='interest' id='interest' />

            <FormLabel>Hình ảnh</FormLabel>
            <Input type='file' onChange={(e) => setImage(e.target.files[0])} name='image' id='image' />

            <FormLabel w={'15%'}>Bài test sàng lọc</FormLabel>
            <Select w={'35%'} defaultValue={requireTest} onChange={(e) => setRequireTest(e.target.value === 'true')}>
              <option value={true}>Áp dụng</option>
              <option value={false}>Không áp dụng</option>
            </Select>
          </Box>
        </Box>

        <HStack justifyContent={'space-between'} pl={30} pr={30} w={'100%'} mb={5}>
          <Box></Box>
          {loading ? (
            <Text mr={'100px'}>loading</Text>
          ) : (
            <Button mr={'100px'} w={300} color={'white'} onClick={HandleSubmit} backgroundColor='rgb(3, 201, 215)'>
              Lưu
            </Button>
          )}
        </HStack>
      </Box>
    </>
  )
}

export default JobPosting
