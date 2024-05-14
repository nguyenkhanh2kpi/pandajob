import React, { useId, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { Box, Flex, Text, Image, Badge, Select, HStack, VStack, Button, Textarea, Input, FormControl, FormLabel, BreadcrumbItem, BreadcrumbLink, Breadcrumb } from '@chakra-ui/react'
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
const JobPosting = () => {
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
    e.preventDefault()
    if (name === '') {
      toast.warning('name is required!', {
        position: 'top-center',
      })
    } else if (position === '') {
      toast.error('position is required!', {
        position: 'top-center',
      })
    } else if (salary === '') {
      toast.error('salary is required!', {
        position: 'top-center',
      })
    } else if (workingForm === '') {
      toast.error('workingForm is required!', {
        position: 'top-center',
      })
    } else if (location === '') {
      toast.error('location is required!', {
        position: 'top-center',
      })
    } else if (language === '') {
      toast.error('language is required!', {
        position: 'top-center',
      })
    } else if (sex === '') {
      toast.error('sex is required!', {
        position: 'top-center',
      })
    } else if (number === '') {
      toast.error('number is required!', {
        position: 'top-center',
      })
    } else if (detailLocation === '') {
      toast.error('detailLocation is required!', {
        position: 'top-center',
      })
    } else if (experience === '') {
      toast.error('experience is required!', {
        position: 'top-center',
      })
    } else if (detailJob === '') {
      toast.error('detailJob is required!', {
        position: 'top-center',
      })
    } else if (requirements === '') {
      toast.error('requirements is required!', {
        position: 'top-center',
      })
    } else if (interest === '') {
      toast.error('interest is required!', {
        position: 'top-center',
      })
    } else if (image === null) {
      toast.error('image is required!', {
        position: 'top-center',
      })
    } else {
      try {
        console.log('image', image)
        const formData = new FormData()
        formData.append('file', image)

        const imageResponse = await axios.post(`${hostName}/file/upload`, formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        const imageData = imageResponse.data.data

        console.log('hình anh tren firebase', imageResponse)
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
          image: imageData,
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

        axios
          .request(config)
          .then((response) => {
            console.log('ok')
          })
          .catch((error) => {
            console.log(error)
            toast.error('Upload Job Failed', {
              position: 'top-center',
            })
          })

        toast.success('Upload Job Successfuly', {
          position: 'top-center',
        })
        window.location.replace(`/job-posting`)
      } catch (error) {}
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

  return (
    <>
      <Box minHeight={2000} overflow='auto' fontFamily={'Montserrat'} fontWeight={400} backgroundColor={'#e9f3f5'} p={30}>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href='/allJob_Recruiter'>My Job</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href='#'>New Job</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <Box minHeight={1000} overflow='auto' p={'3%'} borderRadius={20} backgroundColor={'#FFFFFF'} w={'100%'} mb={10}>
          <Text fontWeight={'bold'}>Post a new job</Text>
          <FormControl>
            <HStack mt={3}>
              <FormLabel w={'15%'}>Name</FormLabel>
              <Input w={'35%'} type='text' onChange={(e) => setName(e.target.value)} name='name' id='Name' />
              <FormLabel w={'15%'}>Working location</FormLabel>
              <Input w={'35%'} type='text' onChange={(e) => setDetailLocation(e.target.value)} name='position' id='position' />
            </HStack>

            <HStack mt={3}>
              <FormLabel w={'15%'}>Salary</FormLabel>
              <Select w={'35%'} onChange={(e) => setSalary(e.target.value)} defaultValue='all'>
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
              <FormLabel w={'15%'}>Working form</FormLabel>
              <Input w={'35%'} type='text' onChange={(e) => setWorkingForm(e.target.value)} name='workingForm' id='workingForm' />
            </HStack>

            <HStack mt={3}>
              <FormLabel w={'15%'}>Location</FormLabel>
              <Select w={'35%'} defaultValue='all' onChange={(e) => setLocation(e.target.value)}>
                <option value='all'>Địa điểm</option>
                {province.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name}
                  </option>
                ))}
              </Select>
              <FormLabel w={'15%'}>Language</FormLabel>
              <Input w={'35%'} type='text' onChange={(e) => setLanguage(e.target.value)} name='language' id='language' />
            </HStack>

            <HStack mt={3}>
              <FormLabel w={'15%'}>Gender</FormLabel>
              <Select w={'35%'} onChange={(e) => setSex(e.target.value)} defaultValue='NONE'>
                <option value='Nam'>Nam</option>
                <option value='Nữ'>Nữ</option>
                <option value='Không yêu cầu'>Không yêu cầu</option>
              </Select>
              <FormLabel w={'15%'}>Number of candiate</FormLabel>
              <Input w={'35%'} onChange={(e) => setNumber(e.target.value)} type='text' name='number' id='number' />
            </HStack>

            <HStack mt={3}>
              <FormLabel w={'15%'}>Position</FormLabel>
              <Input w={'35%'} onChange={(e) => setPosition(e.target.value)} type='text' name='detailLocation' id='detailLocation' />
              <FormLabel w={'15%'}>Experience</FormLabel>
              <Select w={'35%'} onChange={(e) => setExperience(e.target.value)} defaultValue={'Chưa có'}>
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
            </HStack>

            <FormLabel>Description</FormLabel>
            <Textarea onChange={(e) => setDetailJob(e.target.value)} type='text' name='detailJob' id='detailJob' />

            <FormLabel>Job requirements</FormLabel>
            <Textarea onChange={(e) => setRequirements(e.target.value)} type='text' name='requirements' id='requirements' />

            <FormLabel>Benefits</FormLabel>
            <Textarea onChange={(e) => setInterest(e.target.value)} type='text' name='interest' id='interest' />

            <FormLabel>Image</FormLabel>
            <Input type='file' onChange={(e) => setImage(e.target.files[0])} name='image' id='image' />

            <Button onClick={HandleSubmit} mt={10} colorScheme='teal'>
              Save
            </Button>
          </FormControl>
        </Box>
      </Box>
    </>
  )
}

export default JobPosting
