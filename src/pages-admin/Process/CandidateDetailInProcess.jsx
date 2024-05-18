import { ViewIcon } from '@chakra-ui/icons'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, useDisclosure, IconButton, HStack, Box, VStack, Avatar, Text, Select, Link } from '@chakra-ui/react'
import { cvService } from '../../Service/cv.service'
const State = {
  APPLY: 'APPLY',
  PRIORITIZE: 'PRIORITIZE',
  LITTLE_POTENTIAL: 'LITTLE_POTENTIAL',
  PROCESSING: 'PROCESSING',
  INTERVIEWED: 'INTERVIEWED',
}

export const CandidateDetailInProces = ({ candidate, setTabIndex }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const handleManageTab = async () => {
    await setTabIndex(4)
    onClose()
  }
  return (
    <>
      <IconButton onClick={onOpen} colorScheme='blue' aria-label='Search database' icon={<ViewIcon />} />

      <Modal size={'full'} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Chi tiết ứng viên: {candidate.fullName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack align={'flex-start'} w={'100%'}>
              <Box h={700} w='60%'>
                <iframe src={candidate.cv} width='100%' height='100%' style={{ border: 'none' }} title='Candidate CV' />
              </Box>
              <VStack w={'40%'}>
                <Box p={5} w={'100%'} m={3} borderWidth={1}>
                  <HStack>
                    <Avatar src={candidate.avatar} />
                    <VStack align={'flex-start'} spacing={0}>
                      <Text fontWeight={'bold'}>{candidate.fullName}</Text>
                      <Text>{candidate.email}</Text>
                    </VStack>
                  </HStack>
                </Box>
                <Box p={5} w={'100%'} m={3} borderWidth={1}>
                  <HStack alignItems='center' justifyContent='space-between'>
                    <Text w={'30%'}>Trạng thái CV</Text>
                    <Select w={'30%'} value={State[candidate.cvStatus]} placeholder='Trạng thái'>
                      {Object.keys(State).map((key) => (
                        <option key={key} value={State[key]}>
                          {State[key].replace(/_/g, ' ')}
                        </option>
                      ))}
                    </Select>
                    <Button w={'40%'} colorScheme='teal'>
                      Thay đổi trạng thái
                    </Button>
                  </HStack>
                </Box>
                <Box p={5} w={'100%'} m={3} borderWidth={1}>
                  <HStack>
                    <Text w={'50%'}>Nhãn</Text>
                    <Button onClick={handleManageTab}>Quản lý nhãn</Button>
                  </HStack>
                </Box>
              </VStack>
            </HStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
