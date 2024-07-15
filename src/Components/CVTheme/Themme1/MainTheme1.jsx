import React, { useState, useEffect } from 'react'
import { Box, Avatar, Heading, Text, List, ListItem, Icon, Divider, UnorderedList, VStack, Input, HStack, Stack, Button } from '@chakra-ui/react'
import { EmailIcon, PhoneIcon, LinkIcon, MinusIcon, AddIcon } from '@chakra-ui/icons'
import './style.css'
import { InfomationBasic } from './InfomationBasic'
import { WokExpThemme1 } from './WokExp'
import { EducationThemme1 } from './EducationThemme1'
import { ProjectThemme1 } from './ProjectThemme1'
import { CertificateThemme1 } from './CertificateThemme1'
import { TitleThemme1 } from './TitleThemme1'
import { ActiviyThemme1 } from './ActivityThmeme1'

export const MainTheme1 = ({ cvRef, resumeJson }) => {
  const [jsonData, setJsonData] = useState(resumeJson)

  useEffect(() => {
    setJsonData(resumeJson)
  }, [resumeJson])
  const [avatarUrl, setAvatarUrl] = useState('https://i.pinimg.com/564x/eb/57/6f/eb576ff023487bcb1fa3ad61ee7b23ee.jpg')
  const handleAvatarClick = () => {
    document.getElementById('avatarInput').click()
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarUrl(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Box bgColor={'white'} ref={cvRef} w='100%' p='50px' display='grid' gridTemplateColumns='35% 60%' columnGap='5%' rowGap='30px'>
      {/* Avatar and Contact Info */}
      <Box display='flex' justifyContent='end' alignItems='center'>
        <Avatar size='2xl' name={jsonData.fullName} src={avatarUrl} onClick={handleAvatarClick} cursor='pointer' /> <input id='avatarInput' type='file' accept='image/*' style={{ display: 'none' }} onChange={handleFileChange} />
      </Box>
      <Box pl='30px' borderLeft='1px solid black'>
        <Heading contentEditable as='h1' size='2xl' fontWeight='300'>
          {jsonData.fullName}
        </Heading>
        <Text contentEditable fontWeight='bold' letterSpacing='3px'>
          {jsonData.applicationPosition}
        </Text>
        <InfomationBasic jsonData={jsonData} />
      </Box>

      {/* Personal Info */}
      <Box textAlign='right'>
        <UnorderedList listStyleType='none' m={0} p={0} lineHeight='30px'>
          <ListItem fontWeight={'bold'}>
            <Text m={0} p={0} contentEditable>
              {jsonData.city}
            </Text>
          </ListItem>
          <ListItem>
            <Text m={0} p={0} contentEditable>
              {jsonData.address}
            </Text>
          </ListItem>
          <ListItem>
            <Text m={0} p={0} contentEditable>
              {jsonData.dateOB}
            </Text>
          </ListItem>
        </UnorderedList>
      </Box>

      {/* About Yourself */}
      <Box pl='30px' borderLeft='1px solid black'>
        <Heading as='h2' size='md'>
          MỤC TIÊU NGHỀ NGHIỆP
        </Heading>
        <Text contentEditable textAlign='justify'>
          {jsonData.aboutYourself}
        </Text>
      </Box>

      {/* Experience */}
      <VStack align='start'>
        <Box w={'100%'} textAlign='right'>
          <Heading as='h2' size='md'>
            KINH NGHIỆM
          </Heading>
          <WokExpThemme1 workExperience={jsonData.workingExperiences} />
        </Box>

        {/* Skills */}
        <Box w={'100%'} textAlign='right'>
          <Heading as='h2' size='md'>
            KĨ NĂNG
          </Heading>
          <UnorderedList listStyleType='none' m={0} p={0} mt={4}>
            {jsonData.skills.map((skill, index) => (
              <ListItem contentEditable key={index}>
                {skill.name}
              </ListItem>
            ))}
          </UnorderedList>
        </Box>
      </VStack>

      {/* Projects */}
      <Box pl='30px' borderLeft='1px solid black'>
        <Heading as='h2' size='md'>
          DỰ ÁN
        </Heading>
        <ProjectThemme1 projects={jsonData.workingProjects} />
      </Box>

      {/* Certificates */}
      <Box pl='30px' textAlign='right'>
        <Heading as='h2' size='md'>
          CHỨNG CHỈ
        </Heading>
        <CertificateThemme1 certificates={jsonData.certificate} />
      </Box>

      {/* Education */}
      <Box pl='30px' borderLeft='1px solid black'>
        <Heading as='h2' size='md'>
          HỌC VẤN
        </Heading>
        <EducationThemme1 educations={jsonData.education} />
      </Box>

      {/* Awards */}
      <Box pl='30px' textAlign='right'>
        <Heading as='h2' size='md'>
          GIẢI THƯỞNG
        </Heading>
        <TitleThemme1 titles={jsonData.title_award} />
      </Box>

      {/* Activities */}
      <Box pl='30px' borderLeft='1px solid black'>
        <Heading as='h2' size='md'>
          HOẠT ĐỘNG
        </Heading>
        <ActiviyThemme1 activities={jsonData.activate} />
      </Box>
    </Box>
  )
}
