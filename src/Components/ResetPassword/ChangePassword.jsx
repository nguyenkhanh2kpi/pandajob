import React, { useState } from 'react'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './Both.css'
import { hostName } from '../../global'
import { useParams } from 'react-router-dom'
import { Box, Button, FormControl, FormLabel, HStack, Heading, Icon, Input, SlideFade, Text, VStack } from '@chakra-ui/react'
import { AiOutlineUser } from 'react-icons/ai'
const ChangePassword = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  // =============================================================================================================

  const [password, setPassword] = useState('')
  const [confirmPassword, SetConfirmPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password === '') {
      toast.warning('Cần nhập mật khẩu', {
        position: 'top-center',
      })
    } else if (password.length < 8) {
      toast.warning('Mật khấu phải đủ từ 8 kí tự', {
        position: 'top-center',
      })
    } else if (confirmPassword === '') {
      toast.warning('Cần nhập lại mật khẩu!', {
        position: 'top-center',
      })
    } else if (confirmPassword !== password) {
      toast.warning('Mật khẩu phải trùng khớp', {
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

        console.log('password', password)
        console.log('comfirm password', confirmPassword)
        const { data } = await axios.put(`${hostName}/recover/password?uid=${params.id}&o=${params.otp}`, { password, confirmPassword }, config)

        if (data.message === 'Success !') {
          toast.success('Đổi mật khẩu mới thành công', {
            position: 'top-center',
          })
          console.log(data.data)
          setTimeout(() => {
            navigate('/login')
          }, 2000)
        } else {
          toast.error(data.message, {
            position: 'top-center',
          })
          console.log(data)
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
      <VStack bgColor={'#f0f4f5'} fontFamily={'Roboto'}>
        <SlideFade offsetY={20}>
          <Heading size={'lg'} m={'6'} mt={24}></Heading>
        </SlideFade>
        <HStack h={1000} align={'flex-start'} w={'40vw'}>
          <VStack bgColor={'white'} w={'100%'} pr={3} p={10} borderWidth='1px' borderRadius='lg' overflow='hidden' boxShadow='md' align={'flex-start'}>
            <HStack alignItems='center' spacing={4}>
              <Icon as={AiOutlineUser} boxSize={7} p={1} bgColor='#ddeff0' borderRadius='full' />
              <Text m={0} fontSize='2xl'>
                Đổi mật khẩu mới
              </Text>
            </HStack>
            <FormControl w={'100%'}>
              <FormLabel>Mật khẩu mới</FormLabel>
              <Input type='password' onChange={(e) => setPassword(e.target.value)} name='verify' id='verify' />
              <FormLabel>Nhập lại mật khẩu mới</FormLabel>
              <Input type='password' onChange={(e) => SetConfirmPassword(e.target.value)} name='verify' id='verify' />
            </FormControl>
            <Button mt={4} colorScheme='teal' onClick={handleSubmit}>
              Xác thực
            </Button>
          </VStack>
        </HStack>
        <ToastContainer />
      </VStack>
    </>
  )
}

export default ChangePassword
