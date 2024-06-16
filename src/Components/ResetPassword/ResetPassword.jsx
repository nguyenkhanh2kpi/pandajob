import React, { useState } from 'react'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './Both.css'
import { hostName } from '../../global'
import { Box, Button, FormControl, FormLabel, HStack, Heading, Icon, Input, SlideFade, Text, VStack, useToast } from '@chakra-ui/react'
import { AiOutlineUser } from 'react-icons/ai'
const ResetPassword = () => {
  const toast = useToast()
  const navigate = useNavigate()
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  // =============================================================================================================

  const [email, setEmail] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (email === '') {
      toast({
        title: 'Email',
        description: 'Yêu cầu bạn nhập email',
        status: 'info',
        duration: 3000,
        isClosable: true,
      })
    } else {
      try {
        const config = {
          headers: {
            'Content-type': 'application/json',
          },
        }
        setLoading(true)

        const { data } = await axios.post(`${hostName}/recover/send-otp`, { email }, config)
        if (data.message === 'Success !') {
          console.log(data)
          toast({
            title: 'Yêu cầu lấy lại mật khẩu',
            description: data.message,
            status: 'info',
            duration: 3000,
            isClosable: true,
          })
          navigate(`/verifyResetPW/${email}`)
        } else {
          toast({
            title: 'Yêu cầu lấy lại mật khẩu',
            description: data.message,
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
        }
      } catch (error) {
        setError(error.response.data.message)
        const FError = error.response.data.message
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
                Nhập địa chỉ email của bạn
              </Text>
            </HStack>
            <FormControl w={'100%'}>
              <FormLabel>Email</FormLabel>
              <Input type='verify' onChange={(e) => setEmail(e.target.value)} name='verify' id='verify' />
            </FormControl>
            <Button mt={4} colorScheme='teal' onClick={handleSubmit}>
              Xác thực
            </Button>
          </VStack>
        </HStack>
      </VStack>
    </>
  )
}

export default ResetPassword
