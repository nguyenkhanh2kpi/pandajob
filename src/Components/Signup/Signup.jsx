import React, { useState } from 'react'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './Both.css'
import { hostName, webHost } from '../../global'
import { Box, Button, Card, CardBody, FormControl, FormLabel, Heading, Input, InputGroup, InputRightElement, Link, Stack, Text, VStack } from '@chakra-ui/react'
import { IoEyeOutline } from 'react-icons/io5'
import { IoEyeOffOutline } from 'react-icons/io5'
import { FaGoogle } from 'react-icons/fa'
const Signup = () => {
  const [passShow, setPassShow] = useState(false)
  const [cpassShow, setCPassShow] = useState(false)
  const navigate = useNavigate()

  // =============================================================================================================

  const [email, setEmail] = useState('')
  const [username, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmpassword, setConfirmPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [picMessage, setPicMessage] = useState(null)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (username === '') {
      toast.warning('Yêu cầu nhập tên!', {
        position: 'top-center',
      })
    } else if (email === '') {
      toast.error('Nhập email!', {
        position: 'top-center',
      })
    } else if (!email.includes('@')) {
      toast.warning('Email chưa hợp lệ!', {
        position: 'top-center',
      })
    } else if (password === '') {
      toast.error('Yêu cầu nhập mật khẩu!', {
        position: 'top-center',
      })
    } else if (password.length < 8) {
      toast.error('Mật khẩu phải từ 8 kí tự!', {
        position: 'top-center',
      })
    } else if (confirmpassword === '') {
      toast.error('Hãy nhập mật lại mật khẩu!', {
        position: 'top-center',
      })
    } else if (confirmpassword.length < 8) {
      toast.error('Mật khẩu nhập lại phải từ 8 kí tự!', {
        position: 'top-center',
      })
    } else if (password !== confirmpassword) {
      toast.error('Mật khẩu không khớp!', {
        position: 'top-center',
      })
    } else {
      try {
        const config = {
          headers: {
            'Content-type': 'application/json',
          },
        }
        setLoading(true)

        const { data } = await axios.post(`${hostName}/auth/register`, { username, email, password }, config)
        if (data.status === '409 CONFLICT') {
          toast.error(data.message, {
            position: 'top-center',
          })
        } else {
          setTimeout(() => {
            navigate(`/verify/${email}`)
          }, 2000)
        }
      } catch (error) {
        setError(error.response.data.message)
        const FError = error.response.data.message
        console.log(FError)
        toast.error('something went wrong', {
          position: 'top-center',
        })
        setLoading(false)
      }
    }
  }

  return (
    <>
      <VStack
        style={{
          backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/007/559/359/non_2x/panda-an-illustration-of-a-panda-logo-climbing-a-bamboo-tree-free-vector.jpg')`,
        }}
        minH={1000}
        bgColor={'#f0f4f5'}
        w={'100%'}>
        <Box w={'500px'} mt={20} fontFamily={'Roboto'} fontSize={'20px'} display={'flex'}>
          <Card w={'100%'}>
            <CardBody w={'500px'}>
              <Heading fontFamily={'Roboto'} size={'lg'}>
                Đăng kí JobPanda
              </Heading>

              <FormControl mt={8}>
                <FormLabel>Tên</FormLabel>
                <Input value={username} onChange={(e) => setName(e.target.value)} type='text' name='fullName' placeholder='Họ và tên' />
              </FormControl>

              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input type='email' value={email} onChange={(e) => setEmail(e.target.value)} name='email' id='Email' placeholder='Email' />
              </FormControl>

              <FormControl>
                <FormLabel>Mật khẩu</FormLabel>
                <InputGroup size='md'>
                  <Input value={password} onChange={(e) => setPassword(e.target.value)} type={!passShow ? 'password' : 'text'} placeholder='Mật khẩu' />
                  <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={() => setPassShow(!passShow)}>
                      {!passShow ? <IoEyeOutline /> : <IoEyeOffOutline />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Nhập lại Mật khẩu</FormLabel>
                <InputGroup mb={10} size='md'>
                  <Input value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} type={!cpassShow ? 'password' : 'text'} name='cpassword' id='password' placeholder='Nhập lại mật khẩu' />
                  <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={() => setCPassShow(!cpassShow)}>
                      {!cpassShow ? <IoEyeOutline /> : <IoEyeOffOutline />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <VStack w={'100%'}>
                <Button w={'100%'} colorScheme='blue' onClick={handleSubmit}>
                  Đăng kí
                </Button>
                <Text style={{ fontSize: '15px' }}>Hoặc đăng nhập bằng </Text>
                <Button w={'100%'} leftIcon={<FaGoogle />} colorScheme='red'>
                  Đăng nhập với Google
                </Button>
              </VStack>

              <VStack>
                <Link fontFamily={'Roboto'} to={`/resetPassword`}>
                  <Text style={{ marginTop: '20px', fontSize: '15px' }}>Quên tài khoản </Text>
                </Link>
              </VStack>

              <Stack w={'100%'}>
                <Box mt={3} m='auto' textAlign='center'></Box>
              </Stack>

              <ToastContainer />
            </CardBody>
          </Card>
        </Box>
      </VStack>
    </>
  )
}

export default Signup
