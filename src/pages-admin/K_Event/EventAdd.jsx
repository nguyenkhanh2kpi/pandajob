import React, { useEffect, useState } from 'react'
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, FormControl, FormLabel, HStack, Image, Img, Input, Stack, VStack } from '@chakra-ui/react'
import { eventService } from '../../Service/event.service'
import { ToastContainer, toast } from 'react-toastify'
import { Textarea } from '@chakra-ui/react'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from '../../firebase'
import alt_img from '../../data/product9.jpg'
import { useNavigate } from 'react-router-dom'
import { Spinner } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'

export const EventAdd = () => {
  const naigate = useNavigate()
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const [file, setFile] = useState()
  const [form, setForm] = useState({
    title: '',
    article: '',
    time: '',
    status: true,
    image: alt_img,
    content: '',
  })
  const [errors, setErrors] = useState({})
  const handleOnChangeForm = (event) => {
    const { name, value } = event.target
    setForm((prevForm) => ({ ...prevForm, [name]: value }))
    console.log(JSON.stringify(form))
  }
  const handleChangeFile = (event) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      setFile({
        name: selectedFile.name,
        file: selectedFile,
      })
    } else {
      setFile(undefined)
      console.log('BUG')
    }
  }
  const handleUpload = async () => {
    if (!file) {
      toast.error('Please chose file first')
      return
    }
    const storageRef = ref(storage, `/files/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file.file)
    await uploadTask.on(
      'state_changed',
      (snapshot) => {
        const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        // setLoading(true);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          // setLoading(false);
          setForm((prevForm) => ({ ...prevForm, image: url }))
          toast.success('image to fire base')
        })
      }
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const isValid = validateForm()
    if (isValid) {
      await eventService
        .postEvent(form, accessToken)
        .then((response) => toast.success(response.message))
        .catch((error) => toast.error('something went wrong'))
    } else {
      Object.values(errors).forEach((error) => {
        toast.error(error)
      })
    }
  }

  const validateForm = () => {
    let errors = {}
    let isValid = true
    if (form.title.trim() == '') {
      errors.title = 'Title is required'
      isValid = false
    }
    if (form.article.trim() == '') {
      errors.article = 'Article is required'
      isValid = false
    }
    if (form.content.trim() == '') {
      errors.content = 'Content is required'
      isValid = false
    }
    setErrors(errors)
    return isValid
  }
  useEffect(() => {
    validateForm()
  }, [form])

  return (
    <>
      <ToastContainer position='bottom-right' autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme='light' />
      <Box minHeight={2000} overflow='auto' fontFamily={'Roboto'} fontWeight={400} backgroundColor={'#f5f9fa'}>
        <Breadcrumb separator={<ChevronRightIcon color='gray.500' />} fontStyle={'italic'} fontWeight={'bold'} pt={30}>
          <BreadcrumbItem>
            <BreadcrumbLink href='#'>Events</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href='#'>Edit</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <VStack spacing={3} pl={30} pr={30}>
          <Box p={10} overflow={'hidden'} w={'70%'} bgColor={'white'} borderRadius={20} boxShadow={'md'}>
            <FormControl>
              <FormLabel htmlFor='title'>Tiêu đề</FormLabel>
              <Input id='title' name='title' variant='outline' placeholder='Title' value={form.title} onChange={handleOnChangeForm} size='sm' />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel htmlFor='article'>Mô tả</FormLabel>
              <Input id='article' name='article' variant='outline' placeholder='Article' value={form.article} onChange={handleOnChangeForm} size='sm' />
            </FormControl>
            <FormControl hidden mt={4}>
              <FormLabel htmlFor='image'>Image URL</FormLabel>
              <Input id='image' name='image' variant='filled' placeholder='Image URL' value={form.image} onChange={handleOnChangeForm} size='sm' />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel htmlFor='time'>Thời gian</FormLabel>
              <Input id='time' name='time' placeholder='Select Date and Time' value={form.time} size='sm' type='datetime-local' onChange={handleOnChangeForm} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel htmlFor='content'>Nội dung</FormLabel>
              <Textarea id='content' placeholder='Content' name='content' value={form.content} onChange={handleOnChangeForm} size='sm' />
            </FormControl>
            <Image
              mt={10}
              borderRadius={20}
              h={200}
              src={form.image}
              onClick={() => {
                const fileInput = document.getElementById('fileInput')
                if (fileInput) {
                  fileInput.click()
                }
              }}
            />
            <input type='file' accept='image/*' onChange={handleChangeFile} id='fileInput' />
            <Button mt={2} size={'sm'} color='white' bgColor='#03C9D7' text='Xem chi tiết' borderRadius='10px' onClick={handleUpload}>
              Lưu hình ảnh
            </Button>
          </Box>
          <HStack justifyContent={'space-between'} w={'70%'}>
            <Box></Box>
            <HStack>
              <Button size={'sm'} color='white' bgColor='#97a4a6' text='Xem chi tiết' borderRadius='10px' onClick={() => naigate('/event')}>
                thoát
              </Button>
              <Button size={'sm'} color='white' bgColor='#03C9D7' text='Xem chi tiết' borderRadius='10px' onClick={handleSubmit}>
                Lưu thay đổi
              </Button>
            </HStack>
          </HStack>
        </VStack>
      </Box>
    </>
  )
}
