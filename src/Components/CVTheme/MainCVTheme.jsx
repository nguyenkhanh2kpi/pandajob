import { Box, Button, Flex, HStack, Image, Input, Select, Stack, Text, Tooltip, VStack } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { CurriculumVitae } from '../CVBuild/CurriculumVitae'
import { MainTheme1 } from './Themme1/MainTheme1'
import { useReactToPrint } from 'react-to-print'
import { resumeJsonService } from '../../Service/resumeJson.service'
import { Themme2 } from './Themme2/CurriculumVitae'
import { AddIcon } from '@chakra-ui/icons'

export const MainCVTheme = () => {
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const [resume, setResume] = useState(null)
  const [resumeJson, setResumeJson] = useState(null)
  useEffect(() => {
    window.scrollTo(0, 0)
    resumeJsonService.getMyResumeJson(accessToken).then((response) => {
      setResume(response)
      setResumeJson(JSON.parse(response.resumeJson))
    })
  }, [])
  console.log(resumeJson)

  const cvRef = useRef()
  const generatePDF = useReactToPrint({
    content: () => cvRef.current,
    documentTitle: 'CV_PDF',
    onAfterPrint: () => {},
  })

  const [isTheme1, setIsTheme1] = useState(false)

  if (!resumeJson) {
    return <></>
  } else
    return (
      <VStack bgColor={'#f0f4f5'} minHeight={'100vh'} fontFamily={'Roboto'} fontWeight={400} pb={20} position={'relative'}>
        <Box h={'45px'}></Box>
        <VStack align={'center'} w={'70%'}>
          <VStack mt={100} w={'80%'}>
            <Box boxShadow='0px 4px 25px rgba(0, 0, 0, 0.1)' w='857px'>
              {isTheme1 ? <MainTheme1 cvRef={cvRef} resumeJson={resumeJson} /> : <Themme2 cvRef={cvRef} resumeJson={resumeJson} />}
            </Box>
          </VStack>
        </VStack>
        <MenuCVTheme handleExport={generatePDF} setIsTheme1={setIsTheme1} />
      </VStack>
    )
}

const MenuCVTheme = ({ handleExport, setIsTheme1 }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }
  return (
    <Box position={'fixed'} left={0} top={'60px'} p={5} display={'flex'} flexDirection={'column'} alignItems={'flex-start'}>
      <HStack alignItems={'flex-start'}>
        <Stack>
          <Button colorScheme='teal' onClick={toggleDropdown} width={'150px'}>
            Chọn mẫu CV
          </Button>
          {isDropdownOpen && (
            <VStack>
              <Image onClick={() => setIsTheme1(false)} src='https://firebasestorage.googleapis.com/v0/b/upload2-23381.appspot.com/o/1718084452107_CVimage1.png?alt=media' alt='Mẫu 1' boxSize={'150px'} objectFit={'contain'} border={'1px solid'} borderColor={'gray.200'} borderRadius={'md'} mb={2} />
              <Image onClick={() => setIsTheme1(true)} src='https://firebasestorage.googleapis.com/v0/b/upload2-23381.appspot.com/o/1718092821097_cvsample222.png?alt=media' alt='Mẫu 1' boxSize={'150px'} objectFit={'contain'} border={'1px solid'} borderColor={'gray.200'} borderRadius={'md'} mb={2} />
            </VStack>
          )}
        </Stack>

        <Button onClick={handleExport} colorScheme='teal' width={'150px'}>
          Xuất file
        </Button>
      </HStack>
    </Box>
  )
}


