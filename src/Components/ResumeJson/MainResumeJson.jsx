import { Box, Button, FormControl, FormLabel, HStack, Heading, Icon, Input, Select, SlideFade, Spinner, Text, Textarea, VStack, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { json, useNavigate } from 'react-router-dom'
import { locationService } from '../../Service/location.service'
import { BiBrain, BiBriefcase, BiFolder } from 'react-icons/bi'
import { FaCertificate, FaGraduationCap, FaHandsHelping, FaTrophy } from 'react-icons/fa'
import { degrees, initialResumeJson, newActivity, newCertificate, newEducation, newProject, newSkill, newTitleAward, newWorkExpSample, sampleJson } from './constrain'
import { ResumeJsonWorkExp } from './WorkExpJson'
import { ResumeJsonEducation } from './EducationJson'
import { ResumeJsonSkill } from './SkillJson'
import { ResumeJsonProject } from './ProjectJson'
import { ResumeJsonCertificate } from './CertifiCateJson'
import { ResumeJsonActivate } from './ActiveJson'
import { ResumeJsonTitleAward } from './TitleAwardJson'
import { resumeJsonService } from '../../Service/resumeJson.service'

export const MainResumeJson = () => {
  const toast = useToast()
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const [resume, setResume] = useState(null)
  const [resumeJson, setResumeJson] = useState(null)

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setResumeJson((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }
  // kinh nghiem
  const handleWorkExpChange = (index, name, value) => {
    const updatedWorkExperiences = resumeJson.workingExperiences.map((workExp, i) => (i === index ? { ...workExp, [name]: value } : workExp))
    setResumeJson((prevState) => ({
      ...prevState,
      workingExperiences: updatedWorkExperiences,
    }))
  }
  const handleAddWorkExp = () => {
    setResumeJson((prevState) => ({
      ...prevState,
      workingExperiences: [...prevState.workingExperiences, newWorkExpSample],
    }))
  }
  const handleDeleteWorkExp = (index) => {
    setResumeJson((prevState) => ({
      ...prevState,
      workingExperiences: prevState.workingExperiences.filter((_, i) => i !== index),
    }))
  }

  //  education
  const handleEducationChange = (index, name, value) => {
    const updatedEducation = resumeJson.education.map((edu, i) => (i === index ? { ...edu, [name]: value } : edu))
    setResumeJson((prevState) => ({
      ...prevState,
      education: updatedEducation,
    }))
  }
  const handleAddEducation = () => {
    setResumeJson((prevState) => ({
      ...prevState,
      education: [...prevState.education, newEducation],
    }))
  }
  const handleDeleteEducation = (index) => {
    setResumeJson((prevState) => ({
      ...prevState,
      education: prevState.education.filter((_, i) => i !== index),
    }))
  }
  // skill
  const handleSkillChange = (index, name, value) => {
    const updatedSkills = resumeJson.skills.map((skill, i) => (i === index ? { ...skill, [name]: value } : skill))
    setResumeJson((prevState) => ({
      ...prevState,
      skills: updatedSkills,
    }))
  }
  const handleAddSkill = () => {
    setResumeJson((prevState) => ({
      ...prevState,
      skills: [...prevState.skills, newSkill],
    }))
  }
  const handleDeleteSkill = (index) => {
    setResumeJson((prevState) => ({
      ...prevState,
      skills: prevState.skills.filter((_, i) => i !== index),
    }))
  }
  // project
  const handleProjectChange = (index, name, value) => {
    const updatedProjects = resumeJson.workingProjects.map((project, i) => (i === index ? { ...project, [name]: value } : project))
    setResumeJson((prevState) => ({
      ...prevState,
      workingProjects: updatedProjects,
    }))
  }
  const handleAddProject = () => {
    setResumeJson((prevState) => ({
      ...prevState,
      workingProjects: [...prevState.workingProjects, newProject],
    }))
  }
  const handleDeleteProject = (index) => {
    setResumeJson((prevState) => ({
      ...prevState,
      workingProjects: prevState.workingProjects.filter((_, i) => i !== index),
    }))
  }

  // chung chi
  const handleCertificateChange = (index, name, value) => {
    const updatedCertificates = resumeJson.certificate.map((cert, i) => (i === index ? { ...cert, [name]: value } : cert))
    setResumeJson((prevState) => ({
      ...prevState,
      certificate: updatedCertificates,
    }))
  }
  const handleAddCertificate = () => {
    setResumeJson((prevState) => ({
      ...prevState,
      certificate: [...prevState.certificate, newCertificate],
    }))
  }
  const handleDeleteCertificate = (index) => {
    setResumeJson((prevState) => ({
      ...prevState,
      certificate: prevState.certificate.filter((_, i) => i !== index),
    }))
  }

  // hoat dong

  const handleActivateChange = (index, name, value) => {
    const updatedActivates = resumeJson.activate.map((act, i) => (i === index ? { ...act, [name]: value } : act))
    setResumeJson((prevState) => ({
      ...prevState,
      activate: updatedActivates,
    }))
  }
  const handleAddActivity = () => {
    setResumeJson((prevState) => ({
      ...prevState,
      activate: [...prevState.activate, newActivity],
    }))
  }
  const handleDeleteActivity = (index) => {
    setResumeJson((prevState) => ({
      ...prevState,
      activate: prevState.activate.filter((_, i) => i !== index),
    }))
  }
  //
  const handleTitleAwardChange = (index, name, value) => {
    const updatedTitleAwards = resumeJson.title_award.map((award, i) => (i === index ? { ...award, [name]: value } : award))
    setResumeJson((prevState) => ({
      ...prevState,
      title_award: updatedTitleAwards,
    }))
  }
  const handleAddAward = () => {
    setResumeJson((prevState) => ({
      ...prevState,
      title_award: [...prevState.title_award, newTitleAward],
    }))
  }
  const handleDeleteAward = (index) => {
    setResumeJson((prevState) => ({
      ...prevState,
      title_award: prevState.title_award.filter((_, i) => i !== index),
    }))
  }

  const handleSave = () => {
    resume.resumeJson = JSON.stringify(resumeJson)
    resumeJsonService
      .putResumeJson(accessToken, resume)
      .then((response) =>
        toast({
          title: 'CV',
          description: response.message,
          status: 'info',
          duration: 3000,
          isClosable: true,
        })
      )
      .catch((er) => console.log(er))
  }

  // lấy danh sách tỉnh thành
  const [province, setProvince] = useState([])

  useEffect(() => {
    locationService
      .getAllProvince()
      .then((response) => {
        setProvince(response)
      })
      .catch((er) => console.log(er))
    resumeJsonService
      .getMyResumeJson(accessToken)
      .then((response) => {
        setResume(response)
        // setResumeJson(sampleJson)
        if (response.resumeJson) {
          const parsedResumeJson = JSON.parse(response.resumeJson)
          setResumeJson(parsedResumeJson)
        } else {
          setResumeJson(initialResumeJson)
        }
      })
      .catch((er) => console.log(er))
  }, [])

  if (!resume || !resumeJson) {
    return (
      <HStack minH={800} w='100%' justifyContent='center' alignItems='center'>
        <Spinner thickness='8px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='4xl' />
      </HStack>
    )
  } else
    return (
      <VStack bgColor={'#f0f4f5'} fontFamily={'Roboto'}>
        <SlideFade offsetY={20}>
          <Heading size={'lg'} m={'6'} mt={24}></Heading>
        </SlideFade>

        <VStack pb={20} minH={1000} align={'flex-start'} w={'60vw'}>
          {/* mỗi phần này là 1 frame  */}
          <VStack p={10} bgColor={'white'} w={'100%'} borderWidth='1px' borderRadius='lg' overflow='hidden' boxShadow='md' align={'flex-start'}>
            <HStack alignItems='center' spacing={4}>
              <Icon as={AiOutlineUser} boxSize={7} p={1} bgColor='#ddeff0' borderRadius='full' />
              <Text m={0} fontSize='2xl'>
                Thông tin cá nhân
              </Text>
            </HStack>

            <VStack w={'100%'}>
              <HStack spacing={10} w={'100%'}>
                <FormControl w={'50%'} isRequired>
                  <FormLabel>Họ và tên</FormLabel>
                  <Input onChange={handleOnChange} name='fullName' value={resumeJson.fullName} />
                </FormControl>
                <FormControl w={'50%'} isRequired>
                  <FormLabel>Vị trí hiện tại, vị trí ứng tuyển</FormLabel>
                  <Input onChange={handleOnChange} name='applicationPosition' value={resumeJson.applicationPosition} />
                </FormControl>
              </HStack>
              <HStack spacing={10} w={'100%'}>
                <FormControl w={'50%'} isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input onChange={handleOnChange} name='email' value={resumeJson.email} />
                </FormControl>
                <FormControl w={'50%'} isRequired>
                  <FormLabel>Số điện thoại</FormLabel>
                  <Input onChange={handleOnChange} name='phone' value={resumeJson.phone} />
                </FormControl>
              </HStack>

              <HStack spacing={10} w={'100%'}>
                <FormControl w={'50%'} isRequired>
                  <FormLabel>Giới tính</FormLabel>
                  <Select onChange={handleOnChange} name='gender' value={resumeJson.gender} placeholder='Giới tính'>
                    <option value='Male'>Nam</option>
                    <option value='FeMale'>Nữ</option>
                    <option value='Other'>Khác</option>
                  </Select>
                </FormControl>
                <FormControl w={'50%'} isRequired>
                  <FormLabel>Ngày sinh</FormLabel>
                  <Input onChange={handleOnChange} name='dateOB' type='date' value={resumeJson.dateOB} />
                </FormControl>
              </HStack>

              <HStack spacing={10} w={'100%'}>
                <FormControl w={'50%'} isRequired>
                  <FormLabel>Thành phố</FormLabel>
                  <Select onChange={handleOnChange} name='city' value={resumeJson.city} placeholder='Tỉnh/Thành phố'>
                    {province.map((p) => (
                      <option key={p.name} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl w={'50%'}>
                  <FormLabel>Địa chỉ</FormLabel>
                  <Input onChange={handleOnChange} name='address' value={resumeJson.address} />
                </FormControl>
              </HStack>

              <HStack spacing={10} w={'100%'}>
                <FormControl w={'50%'}>
                  <FormLabel>Linkedin</FormLabel>
                  <Input onChange={handleOnChange} name='linkedIn' value={resumeJson.linkedIn} />
                </FormControl>
                <FormControl w={'50%'}>
                  <FormLabel>Github</FormLabel>
                  <Input onChange={handleOnChange} name='github' placeholder='Dành cho ứng viên là lập trình viên' value={resumeJson.github} />
                </FormControl>
              </HStack>

              <HStack spacing={10} w={'100%'}>
                <FormControl w={'100%'}>
                  <FormLabel>Giới thiệu bản thân</FormLabel>
                  <Textarea onChange={handleOnChange} name='aboutYourself' value={resumeJson.aboutYourself} />
                </FormControl>
              </HStack>
            </VStack>
          </VStack>
          {/* end frame */}
          {/* frame work exp */}
          <VStack p={10} bgColor={'white'} w={'100%'} borderWidth='1px' borderRadius='lg' overflow='hidden' boxShadow='md' align={'flex-start'}>
            <HStack alignItems='center' spacing={4}>
              <Icon as={BiBriefcase} boxSize={7} p={1} bgColor='#ddeff0' borderRadius='full' />
              <Text m={0} fontSize='2xl'>
                Kinh nghiệm làm việc
              </Text>
            </HStack>
            <VStack alignItems={'flex-start'} w={'100%'}>
              {resumeJson.workingExperiences.map((workExp, index) => (
                <ResumeJsonWorkExp key={index} workExp={workExp} index={index} onWorkExpChange={handleWorkExpChange} handleAdd={handleAddWorkExp} handleDelete={handleDeleteWorkExp} canDelete={resumeJson.workingExperiences.length > 1} />
              ))}
            </VStack>
          </VStack>
          {/* end frame work exp */}
          {/* frame educationi */}
          <VStack p={10} bgColor={'white'} w={'100%'} borderWidth='1px' borderRadius='lg' overflow='hidden' boxShadow='md' align={'flex-start'}>
            <HStack alignItems='center' spacing={4}>
              <Icon as={FaGraduationCap} boxSize={7} p={1} bgColor='#ddeff0' borderRadius='full' />
              <Text m={0} fontSize='2xl'>
                Học vấn
              </Text>
            </HStack>
            {resumeJson.education.map((education, index) => (
              <ResumeJsonEducation key={index} education={education} index={index} onEducationChange={handleEducationChange} handleAdd={handleAddEducation} handleDelete={handleDeleteEducation} canDelete={resumeJson.education.length > 1} />
            ))}
          </VStack>
          {/* end frame education */}
          {/* frame skill */}
          <VStack p={10} bgColor={'white'} w={'100%'} borderWidth='1px' borderRadius='lg' overflow='hidden' boxShadow='md' align={'flex-start'}>
            <HStack alignItems='center' spacing={4}>
              <Icon as={BiBrain} boxSize={7} p={1} bgColor='#ddeff0' borderRadius='full' />
              <Text m={0} fontSize='2xl'>
                Kĩ năng
              </Text>
            </HStack>
            {resumeJson.skills.map((skill, index) => (
              <ResumeJsonSkill key={index} skill={skill} index={index} onSkillChange={handleSkillChange} handleAdd={handleAddSkill} handleDelete={handleDeleteSkill} canDelete={resumeJson.skills.length > 1} />
            ))}
          </VStack>
          {/* end frame skill */}
          {/* frame dự án */}
          <VStack p={10} bgColor={'white'} w={'100%'} borderWidth='1px' borderRadius='lg' overflow='hidden' boxShadow='md' align={'flex-start'}>
            <HStack alignItems='center' spacing={4}>
              <Icon as={BiFolder} boxSize={7} p={1} bgColor='#ddeff0' borderRadius='full' />
              <Text m={0} fontSize='2xl'>
                Dự án
              </Text>
            </HStack>
            {resumeJson.workingProjects.map((project, index) => (
              <ResumeJsonProject key={index} worksProject={project} index={index} onProjectChange={handleProjectChange} handleAdd={handleAddProject} handleDelete={handleDeleteProject} canDelete={resumeJson.workingProjects.length > 1} />
            ))}
          </VStack>
          {/* end frame dự án */}
          <VStack p={10} bgColor={'white'} w={'100%'} borderWidth='1px' borderRadius='lg' overflow='hidden' boxShadow='md' align={'flex-start'}>
            <HStack alignItems='center' spacing={4}>
              <Icon as={FaCertificate} boxSize={7} p={1} bgColor='#ddeff0' borderRadius='full' />
              <Text m={0} fontSize='2xl'>
                Chứng chỉ
              </Text>
            </HStack>
            <VStack alignItems={'flex-start'} w={'100%'}>
              {resumeJson.certificate.map((certificate, index) => (
                <ResumeJsonCertificate key={index} certificate={certificate} index={index} onCertificateChange={handleCertificateChange} handleAdd={handleAddCertificate} handleDelete={handleDeleteCertificate} canDelete={resumeJson.certificate.length > 1}/>
              ))}
            </VStack>
          </VStack>
          {/* // end frame certificate */}
          <VStack p={10} bgColor={'white'} w={'100%'} borderWidth='1px' borderRadius='lg' overflow='hidden' boxShadow='md' align={'flex-start'}>
            <HStack alignItems='center' spacing={4}>
              <Icon as={FaHandsHelping} boxSize={7} p={1} bgColor='#ddeff0' borderRadius='full' />
              <Text m={0} fontSize='2xl'>
                Hoạt động
              </Text>
            </HStack>
            <VStack alignItems={'flex-start'} w={'100%'}>
              {resumeJson.activate.map((activate, index) => (
                <ResumeJsonActivate key={index} activate={activate} index={index} onActivateChange={handleActivateChange} handleAdd={handleAddActivity} handleDelete={handleDeleteActivity} canDelete={resumeJson.activate.length > 1}/>
              ))}
            </VStack>
          </VStack>
          {/*  */}
          <VStack p={10} bgColor={'white'} w={'100%'} borderWidth='1px' borderRadius='lg' overflow='hidden' boxShadow='md' align={'flex-start'}>
            <HStack alignItems='center' spacing={4}>
              <Icon as={FaTrophy} boxSize={7} p={1} bgColor='#ddeff0' borderRadius='full' />
              <Text m={0} fontSize='2xl'>
                Giải thưởng
              </Text>
            </HStack>
            <VStack alignItems={'flex-start'} w={'100%'}>
              {resumeJson.title_award.map((award, index) => (
                <ResumeJsonTitleAward key={index} titleAward={award} index={index} onTitleAwardChange={handleTitleAwardChange} handleAdd={handleAddAward} handleDelete={handleDeleteAward} canDelete={resumeJson.title_award.length > 1} />
              ))}
            </VStack>
          </VStack>
          {/* // end frame title_award */}
        </VStack>
        <FixButton handleSave={handleSave} />
      </VStack>
    )
}

// nút menu bên cạnh khung hình
function FixButton({ name, value, handleSave }) {
  const navigate = useNavigate()
  return (
    <Box position='fixed' top='50%' left='0' transform='translateY(-50%)' p={4}>
      <VStack>
        <Button onClick={handleSave} w={'100%'} bgColor={'#96d7e7'} color={'#317282'}>
          Lưu thông tin
        </Button>
        <Button onClick={() => navigate('/cv-build-theme')} w={'100%'} bgColor={'#96d7e7'} color={'#317282'}>
          Tạo PDF
        </Button>
      </VStack>
    </Box>
  )
}
