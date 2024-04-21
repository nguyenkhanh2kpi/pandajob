import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Avatar, Box, Button, HStack, Img, Link, Spinner, Stack, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { companyService } from '../../Service/company.service'
import { ToastContainer, toast } from 'react-toastify'

export const InterviewResult = () => {
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const [candidates, setCandidates] = useState([])
  const [loading, setLoading] = useState(false)
  const [change, setChange] = useState(false)
  useEffect(() => {
    companyService
      .getListCandidate(accessToken)
      .then((res) => {
        setCandidates(res)
      })
      .catch((err) => console.log(err.message))
  }, [change])

  const handleClick = (status, id) => {
    companyService
      .changeStatusHiring(accessToken, status ? 'hired' : 'not hired', id)
      .then((res) => toast.success(res.message))
      .catch((er) => console.log(er))
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Box minHeight={2000} overflow='auto' fontFamily={'Montserrat'} fontWeight={400} backgroundColor={'#e9f3f5'} p={30}>
      <ToastContainer
        position='bottom-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
      <VStack spacing={3}>
        <Box minHeight={1000} overflow='auto' p={'3%'} borderRadius={20} backgroundColor={'#FFFFFF'} w={'100%'} mb={10}>
          <Text fontWeight={'bold'} fontSize={25}>
            Your available lists job here
          </Text>
          <Box w='100%' backgroundColor='#ffffff' p='2%' borderRadius={20}>
            <VStack w='100%'>
              {candidates.map((candidate) => (
                <Box p={2} borderRadius={20} w='100%' _hover={{ borderWidth: '1px', transform: 'scale(1.001)' }}>
                  <HStack justifyContent={'space-between'}>
                    <HStack spacing={5} w={'50%'}>
                      <Avatar
                        size='xl'
                        name={candidate.name ? candidate.name : candidate.email}
                        src={candidate.avatar}
                      />
                      <VStack>
                        <Text w='100%' fontWeight={'black'}>
                          Full Name: {candidate.name}
                        </Text>
                        <Text w='100%'>Email: {candidate.email}</Text>
                        <Text w='100%'>Id: {candidate.candidateId}</Text>
                      </VStack>
                    </HStack>

                    <VStack w={'50%'}>
                      <Text w='100%'>JobApplied: {candidate.jobApplied}</Text>
                      <Text w='100%'>Điểm phỏng vấn: {candidate.score}</Text>
                      <Text w='100%'>
                        Status:{' '}
                        <Button colorScheme='teal' size='xs'>
                          {candidate.status}
                        </Button>
                      </Text>
                      <Link w={'100%'} href={candidate.cv} isExternal>
                        View cv here <ExternalLinkIcon mx='2px' />
                      </Link>
                    </VStack>

                    <Button
                      onClick={() => handleClick(true, candidate.detailId)}
                      color={'white'}
                      backgroundColor={'#ffffff'}>
                      Hiring
                    </Button>

                    <Button
                      onClick={() => handleClick(false, candidate.detailId)}
                      color={'white'}
                      backgroundColor={'#ffffff'}>
                      Not Hiring
                    </Button>
                  </HStack>
                </Box>
              ))}
            </VStack>
          </Box>
        </Box>
      </VStack>
    </Box>
  )
}
