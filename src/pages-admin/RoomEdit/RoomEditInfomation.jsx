import React, { useState, useEffect } from 'react'
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Card, CardBody, CardFooter, CardHeader, Divider, Flex, FormControl, Icon, IconButton, List, ListIcon, ListItem, Menu, MenuButton, MenuItem, MenuList, Skeleton, Stack, Tag, useToast } from '@chakra-ui/react'
import { useNavigate, useParams } from 'react-router-dom'
import { Heading, HStack, SlideFade, VStack, Image, Text, Button, Wrap, WrapItem, Avatar, FormLabel, Input, Select } from '@chakra-ui/react'
import { AssignInterviewer } from '../Assign/AssignInterviewer'
import { AssignCandidate } from '../Assign/AssignCandidate'
import { interviewService } from '../../Service/interview.service'
import { GoogleCalendar } from '../GoogleCalendar/GoogleCalendar'
import { MdCheckCircle, MdSettings } from 'react-icons/md'
import { AiOutlineFolderOpen, AiOutlineSetting, AiOutlineUsergroupAdd } from 'react-icons/ai'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { interviewDetailService } from '../../Service/interviewDetail.service'
import ChatWindow from '../MessageAdmin/ChatWindow'
const initialRoomData = {
  id: 0,
  jobPostId: 0,
  roomName: '',
  roomSkill: '',
  roomDescription: '',
  startDate: '',
  endDate: '',
  status: '',
  link: null,
  listInterviewer: [],
  listCandidate: [],
}
const convertData = (initialRoomData) => {
  const { id, jobPostId, roomName, roomSkill, roomDescription, startDate, endDate, status, link, listInterviewer, listCandidate } = initialRoomData

  const form = {
    roomId: id,
    roomName: roomName,
    skill: roomSkill,
    description: roomDescription,
    startDate: startDate,
    endDate: endDate,
    status: status,
    linkMeet: link || '',
  }
  return form
}

export const RoomEditInfomation = () => {
  const [load, setLoad] = useState(false)
  const toastChakra = useToast()
  const [room, setRoom] = useState(initialRoomData)
  const params = useParams()
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const navigate = useNavigate()
  const [listAttendee, setListAttendee] = useState([])
  const [form, setForm] = useState({
    roomId: 0,
    roomName: '',
    skill: '',
    description: '',
    startDate: '',
    endDate: '',
    status: '',
    linkMeet: '',
  })

  useEffect(() => {
    interviewService
      .getInterviewByID(accessToken, params.idRoom)
      .then((res) => {
        setRoom(res)
        const interviewerEmails = res.listInterviewer.map((interviewer) => interviewer.email)
        const candidateEmails = res.listCandidate.map((candidate) => candidate.email)
        const combinedEmails = [...interviewerEmails, ...candidateEmails]
        const uniqueEmails = [...new Set(combinedEmails)]
        setListAttendee(uniqueEmails)
      })
      .catch((er) => console.log(er))
  }, [load])

  const handleOnChangeForm = (event) => {
    const { name, value } = event.target
    setRoom((prevForm) => ({ ...prevForm, [name]: value }))
  }

  const handleUpdateRoom = () => {
    interviewService
      .updateRoom(convertData(room), accessToken)
      .then((res) => {
        if (res.message === 'SUCCESS!!') {
          toastChakra({
            description: res.message,
            status: 'success',
            duration: 3000,
            isClosable: true,
          })
        } else {
          toastChakra({
            description: res.message,
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
        }
      })
      .catch(() =>
        toastChakra({
          description: 'Đã có lỗi xảy ra',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      )
  }

  //xoa ung vien
  const [candidateToDelete, setCandidateToDelete] = useState(null)
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
  const handleDeleteCandidate = () => {
    interviewDetailService
      .deleteCandidate(accessToken, candidateToDelete)
      .then((response) =>
        toastChakra({
          title: 'Delete Candidate',
          description: response.message,
          status: 'info',
          duration: 1000,
          isClosable: true,
        })
      )
      .catch((er) => console.log(er))
      .finally(() => {
        setLoad(!load)
        setIsConfirmationOpen(false)
      })
  }
  const openConfirmModal = (candidateId) => {
    setCandidateToDelete(candidateId)
    setIsConfirmationOpen(true)
  }
  //chat
  const [openChatCandidate, setOpenChatCandidate] = useState(null)

  // Function to toggle the chat window for a specific candidate
  const toggleChatWindow = (candidateEmail) => {
    setOpenChatCandidate(candidateEmail === openChatCandidate ? null : candidateEmail)
  }

  // dele assign
  const handleDeleteInterviewer = (email) => {
    interviewService
      .deleteInterviewerAssign(accessToken, email, room.id)
      .then((response) => {
        if (response.message === 'Delete success!') {
          toastChakra({
            title: response.message,
            status: 'success',
            duration: 3000,
          })
        } else {
          toastChakra({
            title: response.message,
            status: 'error',
            duration: 3000,
          })
        }
      })
      .catch((er) => console.log(JSON.stringify(er)))
      .finally(() => {
        setLoad(!load)
      })
  }

  if (room.id === 0) {
    return (
      <>
        <Stack>
          <Skeleton height='20px' />
          <Skeleton height='20px' />
          <Skeleton height='20px' />
        </Stack>
      </>
    )
  } else {
    return (
      <>
        <Box fontFamily={'Roboto'} fontWeight={400} backgroundColor={'#f5f9fa'} overflow='hidden'>
          <Breadcrumb separator={<ChevronRightIcon color='gray.500' />} fontStyle={'italic'} fontWeight={'bold'} pt={30}>
            <BreadcrumbItem>
              <BreadcrumbLink href='/roomList'>Phòng họp</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href='#'>Edit</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <VStack spacing={10} pl={30} pr={30} align={'flex-start'}>
            {/* <Box w={'100%'} p={'30px'} borderRadius={20} boxShadow={'md'} bgColor={'white'}>
              <List spacing={3}>
                <ListItem>
                  <ListIcon as={MdCheckCircle} color='green.500' />
                  Tên: {room.roomName}
                </ListItem>
                <ListItem>
                  <ListIcon as={MdCheckCircle} color='green.500' />
                  Mô tả:{room.roomDescription}
                </ListItem>
                <ListItem>
                  <ListIcon as={MdCheckCircle} color='green.500' />
                  Trạng thái: <Tag colorScheme={getStatusColor(room.status)}> {room.status}</Tag>
                </ListItem>
                <ListItem>
                  <ListIcon as={MdSettings} color='green.500' />
                  Thời gian: {room.startDate} to {room.endDate}
                </ListItem>
              </List>
            </Box> */}
            <HStack pb={50} spacing={10} w={'100%'} align={'flex-start'}>
              <Box w={'50%'} p={'30px'} borderRadius={20} boxShadow={'md'} bgColor={'white'}>
                <HStack alignItems='center' spacing={4}>
                  <Icon as={AiOutlineUsergroupAdd} boxSize={7} p={1} bgColor='#ddeff0' borderRadius='full' />
                  <Text m={0} fontSize='2xl'>
                    Thành viên
                  </Text>
                </HStack>
                <Box m={5}>
                  <HStack alignItems={'flex-start'}>
                    <Text fontWeight={'bold'}>Đội phỏng vấn</Text>
                    {room.status === 'Created' ? <AssignInterviewer roomId={params.idRoom} load={load} setLoad={setLoad} /> : <></>}
                  </HStack>

                  {room.listInterviewer.map((interviewer) => (
                    <Card mb={1} key={interviewer.id} p={1}>
                      <Flex spacing='4'>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                          <Avatar name={interviewer.fullName} src={interviewer.avatar} />

                          <Box>
                            <Heading size='sm'>{interviewer.fullName}</Heading>
                            <Text>{interviewer.email}</Text>
                          </Box>
                        </Flex>
                        {room.status === 'Created' ? (
                          <Menu>
                            <MenuButton>
                              <IconButton variant='ghost' colorScheme='gray' aria-label='See menu' icon={<BsThreeDotsVertical />} />
                            </MenuButton>
                            <MenuList>
                              <MenuItem onClick={() => handleDeleteInterviewer(interviewer.email)}>Xóa</MenuItem>
                            </MenuList>
                          </Menu>
                        ) : (
                          <></>
                        )}
                      </Flex>
                    </Card>
                  ))}

                  <HStack mt={10} alignItems={'flex-start'}>
                    <Text fontWeight={'bold'}>Ứng viên</Text>
                    {room.status === 'Created' ? <AssignCandidate load={load} setLoad={setLoad} roomId={params.idRoom} jobId={params.id} startDate={room.startDate} endDate={room.endDate} /> : <></>}
                  </HStack>
                  {room.listCandidate.map((candidate) => (
                    <Card mb={1} key={candidate.itemId} p={1}>
                      {openChatCandidate === candidate.email && <ChatWindow onClose={() => toggleChatWindow(candidate.email)} email={candidate.email} />}
                      <Flex spacing='4'>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                          <Avatar name={candidate.name} src={candidate.avatar} />

                          <Box>
                            <Heading size='sm'>{candidate.name}</Heading>
                            <Text>{candidate.email}</Text>
                          </Box>
                        </Flex>
                        {room.status === 'Created' ? (
                          <Menu>
                            <MenuButton>
                              <IconButton variant='ghost' colorScheme='gray' aria-label='See menu' icon={<BsThreeDotsVertical />} />
                            </MenuButton>
                            <MenuList>
                              <MenuItem onClick={() => toggleChatWindow(candidate.email)}>Gửi tin nhắn</MenuItem>
                              <MenuItem key={candidate.itemId} value={candidate.itemId} onClick={() => openConfirmModal(candidate.itemId)}>
                                Xóa
                              </MenuItem>
                            </MenuList>
                          </Menu>
                        ) : (
                          <></>
                        )}
                      </Flex>
                    </Card>
                  ))}
                  <DeleteConfirmationModal isOpen={isConfirmationOpen} onClose={() => setIsConfirmationOpen(false)} onDelete={handleDeleteCandidate} />
                </Box>
              </Box>
              <VStack w={'50%'}>
                <Box p={4} borderRadius={20} w={'100%'} backgroundColor={'white'}>
                  <HStack justifyContent={'space-between'} w={'100%'}>
                    <HStack>
                      <Icon as={AiOutlineSetting} boxSize={7} p={1} bgColor='#ddeff0' borderRadius='full' />
                      <Text m={0} fontSize='2xl'>
                        Cài đặt
                      </Text>
                    </HStack>

                    <GoogleCalendar startDate={room.startDate} endDate={room.endDate} listEmail={listAttendee} roomId={params.idRoom} />
                  </HStack>

                  <VStack mt={10} justifyContent={'flex-start'} spacing={4}>
                    <HStack w={'100%'}>
                      <VStack w={'50%'}>
                        <FormLabel ml={5} w={'100%'}>
                          Tên
                        </FormLabel>
                        <Input onChange={handleOnChangeForm} name='roomName' backgroundColor={'#FFFFFF'} w={'100%'} placeholder='Room name' value={room.roomName} />
                      </VStack>
                      <VStack w={'50%'}>
                        <FormLabel ml={5} w={'100%'}>
                          Trạng thái
                        </FormLabel>
                        <Select disabled name='status' onChange={handleOnChangeForm} backgroundColor={'#FFFFFF'} w={'100%'} size='md' value={room.status}>
                          <option value='Created'>Created</option>
                          <option value='Processing'>Processing</option>
                          <option value='Ended'>Ended</option>
                        </Select>
                      </VStack>
                    </HStack>

                    <VStack w={'100%'}>
                      <FormLabel ml={5} w={'100%'}>
                        Thời gian
                      </FormLabel>
                      <HStack w='100%'>
                        <Input onChange={handleOnChangeForm} name='startDate' backgroundColor={'#FFFFFF'} w={'50%'} placeholder='Room description' type='datetime-local' defaultValue={room.startDate} />
                        <Text>To</Text>
                        <Input onChange={handleOnChangeForm} name='endDate' backgroundColor={'#FFFFFF'} w={'50%'} placeholder='Room description' type='datetime-local' defaultValue={room.endDate} />
                      </HStack>
                    </VStack>

                    <VStack w={'100%'}>
                      <FormLabel ml={5} w={'100%'}>
                        Mô tả
                      </FormLabel>
                      <Input name='roomDescription' onChange={handleOnChangeForm} backgroundColor={'#FFFFFF'} w={'100%'} placeholder='Room description' value={room.roomDescription} />
                    </VStack>

                    <VStack w={'100%'}>
                      <FormLabel ml={5} w={'100%'}>
                        Link google meet( optional)
                      </FormLabel>

                      <Input disabled name='link' onChange={handleOnChangeForm} backgroundColor={'#FFFFFF'} w={'100%'} placeholder='link' type='link' value={room.link} />
                    </VStack>

                    <HStack w={'100%'} justifyContent={'space-between'}>
                      <Box></Box>
                      <HStack>
                        <Button onClick={() => navigate('/roomList')} w={40} colorScheme='gray'>
                          Thoát
                        </Button>
                        <Button w={40} color='white' backgroundColor='rgb(3, 201, 215)' onClick={handleUpdateRoom}>
                          Lưu
                        </Button>
                      </HStack>
                    </HStack>
                  </VStack>
                </Box>
              </VStack>
            </HStack>
          </VStack>
        </Box>
      </>
    )
  }
}

const DeleteConfirmationModal = ({ isOpen, onClose, onDelete }) => {
  return (
    <Box display={isOpen ? 'block' : 'none'} position='fixed' zIndex={999} top={0} left={0} right={0} bottom={0} bg='rgba(0,0,0,0.5)'>
      <Box bg='white' maxWidth='400px' p={4} m='auto' mt={20} borderRadius='md' boxShadow='md'>
        <Box fontWeight='bold' fontSize='lg' mb={4}>
          Xác nhận xóa
        </Box>
        <Box mb={4}>Bạn có chắc chắn muốn xóa ứng viên này không, Mọi thông tin về ứng viên tại phòng này bao gồm bản ghi phỏng vấn( nếu có) sẽ bị xóa?</Box>
        <Box textAlign='right'>
          <Button variant='outline' mr={3} onClick={onClose}>
            Hủy
          </Button>
          <Button colorScheme='red' onClick={onDelete}>
            Xóa
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
const getStatusColor = (status) => {
  switch (status) {
    case 'Created':
      return 'yellow'
    case 'Processing':
      return 'blue'
    case 'Ended':
      return 'green'
    default:
      return 'gray'
  }
}
