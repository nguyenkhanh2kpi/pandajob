import {
  Box,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  Text,
  Textarea,
  VStack,
  Button,
} from '@chakra-ui/react'

import React, { useEffect, useState } from 'react'
import { resumeService } from '../../Service/resume.service'
import { ResumeWorkEx } from './ResumeWorkEx'
import { Stack } from 'react-bootstrap'
import { Grid } from 'swiper'
import { ResumeHelp } from './ResumeHelp'
import { ResumeProject } from './ResumeProject'

export const ResumeProfile = () => {
  const [resume, setResume] = useState({
    id: null,
    fullName: '',
    applicationPosition: '',
    email: '',
    phone: '',
    gender: '',
    dateOB: '',
    city: '',
    address: '',
    linkedIn: '',
    github: '',
    aboutYourself: '',
    workingExperiences: [],
    mainSkill: '',
    skills: [],
    school: '',
    startEdudatiomTime: '',
    endEducationTime: '',
    major: '',
    others: '',
    workingProjects: [],
  })

  const [selectedProject, setSelectedProject] = useState({
    id: null,
    nameProject: '',
    startTime: '',
    endTime: '',
    client: '',
    description: '',
    members: '',
    position: '',
    responsibilities: '',
    technology: '',
  })

  const [selectedWorkEx, setSelectedWorkEx] = useState({
    id: null,
    companyName: '',
    startWorkingTime: '',
    endWorkingTime: '',
    position: '',
    jobDetail: '',
    technology: '',
  })

  const accessToken = JSON.parse(localStorage.getItem('data')).access_token

  useEffect(() => {
    resumeService
      .getMyResume(accessToken)
      .then((response) => setResume(response))
      .catch((er) => console.log(er.message))
  }, [])

  const handleAddSkill = () => {}

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setResume((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  return (
    <Box fontFamily={'Montserrat'} mt={100} h={10000} display={'flex'} justifyContent={'center'}>
      <Box h={500} w={'74%'}>
        <HStack align='flex-start'>
          <Box m={5} h={200} w={'30%'} backgroundColor={'yellow'} position='sticky' top={0}>
            {/* Nội dung bên trong */}
          </Box>
          <Box p={5} m={5} w={'62%'} backgroundColor={'#e0dede'}>
            <VStack>
              <Box
                fontWeight={'bold'}
                fontSize={20}
                borderWidth={1}
                p={1}
                w={'100%'}
                backgroundColor={'grey'}
                display='flex'
                alignItems='baseline'>
                Nguyễn Lê Quốc Khánh - Back-end Developer.pdf
              </Box>

              <ResumeHelp />



              <Text w={'100%'} fontSize='3xl'>
                Personal Information
              </Text>

              <Box p={5} w={'100%'} backgroundColor={'white'} display='flex' alignItems='baseline'>
                <VStack w={'100%'}>
                  <FormControl isRequired>
                    <FormLabel>Full name</FormLabel>
                    <Input onChange={handleOnChange} name='fullName' placeholder='Full name' value={resume.fullName} />

                    <FormLabel>Current position/Application position</FormLabel>
                    <Input onChange={handleOnChange} name='applicationPosition' placeholder='Ex: Fresher' value={resume.applicationPosition} />

                    <FormLabel>Email</FormLabel>
                    <Input onChange={handleOnChange} name='email' placeholder='email' value={resume.email} />

                    <FormLabel>Phone</FormLabel>
                    <Input onChange={handleOnChange} name='phone' placeholder='phone' value={resume.phone} />

                    <FormLabel>Gender</FormLabel>
                    <Select onChange={handleOnChange} name='gender' value={resume.gender} placeholder='Select gender'>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </Select>

                    <FormLabel>Date of Birth</FormLabel>
                    <Input onChange={handleOnChange} name='dateOB' type='date' placeholder='Full name' value={resume.dateOB} />

                    <FormLabel>City</FormLabel>
                    <Select onChange={handleOnChange} name='city' value={resume.city} placeholder='Select city'>
                      <option>TP. Hồ Chí Minh</option>
                      <option>Đà Nẵng</option>
                      <option>Hà Nội</option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Address</FormLabel>
                    <Input onChange={handleOnChange} name='address' placeholder='Enter your address' value={resume.address} />

                    <FormLabel>Linkedin</FormLabel>
                    <Input onChange={handleOnChange} name='linkedIn' placeholder='Enter your LinkedIn profile URL' value={resume.linkedIn} />

                    <FormLabel>Github</FormLabel>
                    <Input onChange={handleOnChange} name='github' placeholder='Enter your GitHub username' value={resume.github} />
                  </FormControl>
                </VStack>
              </Box>

              <Text w={'100%'} fontSize='3xl'>
                About yourself
              </Text>
              <Box p={5} w={'100%'} backgroundColor={'white'} display='flex' alignItems='baseline'>
                <FormControl isRequired>
                  <FormLabel>About yourself</FormLabel>
                  <Textarea onChange={handleOnChange} name='aboutYourself'  placeholder='' value={resume.aboutYourself} />
                </FormControl>
              </Box>

              {/*  */}

              <HStack>
                <Text w={'100%'} fontSize='3xl'>
                  Work experience
                </Text>
                <HStack>
                  <Button>Đã có kinh nghiệm</Button>
                  <Button>Chưa có kinh nghiệm</Button>
                </HStack>
              </HStack>
              <ResumeWorkEx workExps={resume.workingExperiences} setResume={setResume} />

              {/*  */}

              {/*  */}

              <Text w={'100%'} fontSize='3xl'>
                Skills
              </Text>

              <Box p={5} w={'100%'} backgroundColor={'white'} display='flex' alignItems='baseline'>
                <FormControl isRequired>
                  <FormLabel>Main skill group</FormLabel>
                  <Input placeholder='' value={resume.mainSkill} />
                  <FormLabel>List the skills in the group</FormLabel>
                  <VStack>
                    {resume.skills.map((skill) => (
                      <HStack>
                        <Input value={skill} placeholder='' />
                        <Button>+</Button>
                        <Button>X</Button>
                      </HStack>
                    ))}
                  </VStack>
                </FormControl>
              </Box>

              {/*  */}

              {/*  */}
              <Text w={'100%'} fontSize='3xl'>
                Education
              </Text>
              <Box p={5} w={'100%'} backgroundColor={'white'} display='flex' alignItems='baseline'>
                <VStack w={'100%'}>
                  <FormControl isRequired>
                    <FormLabel>Name of school of formal training facility</FormLabel>
                    <Input  onChange={handleOnChange} name='school'  placeholder='' value={resume.school} />
                    <FormLabel>Learning time </FormLabel>
                    <HStack>
                      <Text>From</Text>
                      <Input onChange={handleOnChange} name='startEdudatiomTime' type='date' placeholder='' value={resume.startEdudatiomTime} />
                      <Text>To</Text>
                      <Input onChange={handleOnChange} name='endEducationTime' type='date' placeholder='' value={resume.endEducationTime} />
                      <Button>Now</Button>
                    </HStack>

                    <FormLabel>Majors</FormLabel>
                    <Input onChange={handleOnChange} name='major' placeholder='' value={resume.major} />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Other</FormLabel>
                    <Textarea onChange={handleOnChange} name='others' placeholder='' value={resume.others} />
                  </FormControl>
                </VStack>
              </Box>

              {/*  */}

              {/*  */}
              <HStack w={'100%'}>
                <Text w={'100%'} fontSize='3xl'>
                  Projects
                </Text>
                <HStack>
                  <Button>No Projects</Button>
                </HStack>
              </HStack>
              <ResumeProject workProjects={resume.workingProjects} setResume={setResume} />

              {/*  */}


              <Button >Save</Button>
            </VStack>
          </Box>
        </HStack>
      </Box>
    </Box>
  )
}
