import React, { useState, useRef, useEffect } from 'react'
import { Box, Button, FormLabel, Image, Input, useToast, VStack, FormControl, Select, InputRightAddon, InputGroup, SlideFade, Heading, HStack, Spinner, Text, Icon, Textarea, FormHelperText, FormErrorMessage, Avatar } from '@chakra-ui/react'
import { userService } from '../../Service/user.servie'
import { ToastContainer } from 'react-toastify'
import { AiOutlineUser, AiOutlineUsergroupAdd } from 'react-icons/ai'
import { json } from 'react-router-dom'
import { display } from '@mui/system'

const UserInfo1 = () => {
  const [user, setUser] = useState(null)

  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef(null)
  const toast = useToast()
  const token = JSON.parse(localStorage.getItem('data')).access_token

  const handleImageClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = async (event) => {
    const file = event.target.files[0]
    if (file) {
      try {
        setLoading(true)
        const response = await userService.uploadAvatar(file, token).then((response) => {
          setUser(response.data)
        })

        setLoading(false)
        toast({
          title: 'Upload successful.',
          description: 'Cập nhật ảnh đại diện thành công',
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
      } catch (error) {
        console.error('Error uploading avatar:', error)
        setLoading(false)
        toast({
          title: 'Upload failed.',
          description: 'Đã có lỗi xảy ra, hãy thử lại sau',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }
    }
  }

  useEffect(() => {
    userService
      .getMyProfile(token)
      .then((response) => setUser(response.data))
      .catch((er) => console.log(er))
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }))
  }
  const SubmitHandler = async () => {
    if (user.fullName === '') {
      toast({
        title: 'Form input',
        description: 'Họ và tên không thể để trống',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } else {
      try {
        setLoading(true)
        const formData = user
        const updatedProfile = await userService.updateProfile(formData, token)
        toast({
          title: 'Profile updated.',
          description: 'Cập nhật thông tin cá nhân thành công',
          status: 'success',
          duration: 5000,
          isClosable: true,
        })

        setLoading(false)
      } catch (error) {
        console.error('Error updating profile:', error)
        toast({
          title: 'Update failed.',
          description: 'Đã có lỗi xảy ra, hãy thử lại sau',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
        setLoading(false)
      }
    }
  }

  const [isHovered, setIsHovered] = useState(false) // State để lưu trạng thái hover

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <>
      <VStack bgColor={'#f0f4f5'} fontFamily={'Roboto'}>
        <SlideFade in={!loading} offsetY={20}>
          <Heading size={'lg'} m={'6'} mt={24}></Heading>
        </SlideFade>
        {loading || user === null ? (
          <HStack minH={600} w='100%' justifyContent='center' alignItems='center'>
            <Spinner thickness='8px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='4xl' />
          </HStack>
        ) : (
          <HStack h={1000} align={'flex-start'} w={'80vw'}>
            <VStack bgColor={'white'} w={'100%'} pr={3} p={10} borderWidth='1px' borderRadius='lg' overflow='hidden' boxShadow='md' align={'flex-start'}>
              <HStack alignItems='center' spacing={4}>
                <Icon as={AiOutlineUser} boxSize={7} p={1} bgColor='#ddeff0' borderRadius='full' />
                <Text m={0} fontSize='2xl'>
                  Thông tin cá nhân
                </Text>
              </HStack>
              <HStack w={'100%'} alignItems='center' spacing={4}>
                <Box w={'25%'}>
                  <Avatar _hover={isHovered ? { borderWidth: '5px', borderColor: 'grey', boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)' } : ''} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} cursor={'pointer'} name={user.email} size='2xl' src={user.avatar} onClick={handleImageClick} />
                  <Input type='file' accept='image/*' ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} />
                  <Button onClick={handleImageClick} isLoading={loading} colorScheme='teal' mt={4} display='none'>
                    Upload Avatar
                  </Button>
                </Box>
                <VStack w={'100%'}>
                  <HStack w={'100%'}>
                    <FormControl isRequired isInvalid={user.fullName === ''}>
                      <FormLabel>Email</FormLabel>
                      <Input disabled value={user.email} type='email' />
                      <FormLabel>Họ và tên</FormLabel>
                      <Input name='fullName' onChange={handleInputChange} value={user.fullName} type='text' />
                      {!user.fullName === '' ? <></> : <FormErrorMessage>Yêu cầu tên đầy đủ.</FormErrorMessage>}
                    </FormControl>
                    <FormControl>
                      <FormLabel>SDT</FormLabel>
                      <Input name='phone' onChange={handleInputChange} value={user.phone} type='number' />
                      <FormLabel>Giới tính</FormLabel>
                      <Select value={user.gender} onChange={(e) => setUser({ ...user, gender: e.target.value })}>
                        <option value='MALE'>Nam</option>
                        <option value='FEMALE'>Nữ</option>
                        <option value='NON_BINARY'>Khác</option>
                      </Select>
                    </FormControl>
                  </HStack>
                  <FormControl w={'100%'}>
                    <HStack w={'100%'}>
                      <VStack w={'100%'} alignItems={'flex-start'}>
                        <FormLabel>Địa chỉ</FormLabel>
                        <Input name='address' onChange={handleInputChange} value={user.address} type='text' />
                      </VStack>
                    </HStack>
                  </FormControl>
                </VStack>
              </HStack>

              <HStack w={'100%'} justifyContent='flex-end' p={2}>
                <Button name='saveUserInfoBtn' w={200} colorScheme='blue' onClick={SubmitHandler} m={2}>
                  Lưu
                </Button>
              </HStack>
            </VStack>
          </HStack>
        )}
      </VStack>
    </>
  )
}

export default UserInfo1
