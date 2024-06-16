import React, { useState } from 'react'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import FormHelperText from '@mui/material/FormHelperText'
import CoPresentIcon from '@mui/icons-material/CoPresent'
import BadgeIcon from '@mui/icons-material/Badge'
import { Checkbox } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom'
import './Both.css'
import { hostName } from '../../global'
import { useParams } from 'react-router-dom'
import { Box, Button, FormControl, FormLabel, HStack, Heading, Icon, Input, SlideFade, Text, VStack } from '@chakra-ui/react'
import { AiOutlineUser } from 'react-icons/ai'
const Verify = () => {
  const params = useParams()
  const [passShow, setPassShow] = useState(false)
  const [cpassShow, setCPassShow] = useState(false)
  const navigate = useNavigate()
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  // =============================================================================================================

  const [otp, setCodeVerify] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (otp === '') {
      toast.warning('codeVerify is required!', {
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

        const email = params.email
        const { data } = await axios.post(`${hostName}/auth/verify`, { email, otp }, config)

        if (data.data !== null) {
          toast.success(data.message, {
            position: 'top-center',
          })
          console.log(data)
          setTimeout(() => {
            navigate('/')
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
                Nhập mã xác thực nhận từ email của bạn
              </Text>
            </HStack>
            <FormControl w={'100%'}>
              <FormLabel>OPT</FormLabel>
              <Input type='verify' onChange={(e) => setCodeVerify(e.target.value)} name='verify' id='verify' />
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

export default Verify
