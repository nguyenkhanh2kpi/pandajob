import React, { useEffect, useState, useRef } from 'react'
import { Box, Button, Card, CardBody, HStack, Heading, SlideFade, Text, VStack, useToast } from '@chakra-ui/react'
import { userService } from '../../Service/user.servie'
import { cvService } from '../../Service/cv.service'
import { useNavigate } from 'react-router-dom'
import { upLoadService } from '../../Service/uploadFile.service'

export const MyCV = () => {
  const navigate = useNavigate()
  const toast = useToast()
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const [user, setUser] = useState(null)
  const [appliedJobs, setAppliedJobs] = useState([])
  const [selectedFile, setSelectedFile] = useState(null) 

  useEffect(() => {
    userService
      .getMyProfile(accessToken)
      .then((response) => setUser(response.data))
      .catch((error) => console.error('Error fetching user profile:', error))

    cvService
      .getAllMyAppliedJobs(accessToken)
      .then((response) => setAppliedJobs(response.data))
      .catch((error) => console.error('Error fetching applied jobs:', error))
  }, [])

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0])
    handleUploadFile(event.target.files[0])
  }

  const handleUploadFile = async (file) => {
    if (!file) {
      console.log('No file selected.')
      return
    }
    const formData = new FormData()
    formData.append('file', file)
    try {
      const response = await upLoadService.uploadFile(accessToken, formData)
      const uploadedFileUrl = response.data
      setUser((prevUser) => ({
        ...prevUser,
        cv_pdf: uploadedFileUrl,
      }))
      toast({
        title: 'File uploaded successfully.',
        description: `Link: ${uploadedFileUrl}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    } catch (error) {
      console.error('Error uploading file:', error)
      toast({
        title: 'Failed to upload file.',
        description: 'Please try again later.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  const fileInputRef = useRef(null)

  const handleUpdateProfile = () => {
    userService
      .updateProfile(user, accessToken)
      .then((response) =>
        toast({
          title: 'CV profile',
          description: response.message,
          status: 'info',
          duration: 3000,
          isClosable: true,
        })
      )
      .catch((er) => console.log(er))
  }

  return (
    <VStack bgColor={'#f0f4f5'} fontFamily={'Roboto'}>
      {user ? (
        <VStack mt={'80px'} pb={20} minH={1000} align={'flex-start'} w={'80vw'}>
          <Card w={'100%'}>
            <CardBody>
              <Text fontWeight={'bold'}>CV của bạn</Text>
              <input type='file' id='fileInput' ref={fileInputRef} accept='.pdf,.doc,.docx' style={{ display: 'none' }} onChange={handleFileChange} />
              <Button m={1} onClick={() => fileInputRef.current.click()}>
                Tải CV lên
              </Button>
              <Button onClick={handleUpdateProfile}>Lưu</Button>
              <Box width='300px' overflow={'hidden'} borderColor={'blue'} borderWidth={1} borderRadius={20}>
                <iframe src={user.cv_pdf} title='CV' width='300px' height='500px' style={{ border: 'none' }}></iframe>
              </Box>
            </CardBody>
          </Card>
          <Card w={'100%'}>
            <CardBody>
              <Text fontWeight={'bold'}>Những CV bạn đã apply</Text>
              <HStack>
                {appliedJobs.map((job) => (
                  <Box key={job.jobPostingId} overflow={'hidden'} borderColor={'black'} borderWidth={1} borderRadius={20}>
                    <iframe src={job.cvurl} title='Applied CV' width='300px' height='500px' style={{ border: 'none' }}></iframe>
                  </Box>
                ))}
              </HStack>
            </CardBody>
          </Card>
        </VStack>
      ) : (
        <></>
      )}
    </VStack>
  )
}
