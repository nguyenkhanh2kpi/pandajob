import { useEffect, useState } from 'react'
import { Box, Button, Text, VStack, useToast } from '@chakra-ui/react'
import ConfirmationOverlay from './ConfirmationOverlay'
import { jobService } from '../../Service/job.service'

export const State = {
  CREATE: 'Tạo',
  ON: 'Mở nhận CV',
  PAUSE: 'Tạm dừng',
  END: 'Kết thúc',
}

// Mapping from display state to backend state
const stateMapping = {
  Tạo: 'CREATE',
  'Mở nhận CV': 'ON',
  'Tạm dừng': 'PAUSE',
  'Kết thúc': 'END',
}

const JobStateComponent = ({ job }) => {
  const toast = useToast()
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const [currentState, setCurrentState] = useState(null)
  const [isOverlayOpen, setIsOverlayOpen] = useState(false)
  const [selectedState, setSelectedState] = useState(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    setCurrentState(job.state)
  }, [job])

  const handleStateChange = (newState) => {
    setSelectedState(newState)
    setIsOverlayOpen(true)
    if (newState === State.CREATE) {
      setMessage('Bạn không thể thay đổi trạng thái thành CREATE')
    } else {
      setMessage(`Bạn có chắc muốn đổi trạng thái của job thành ${newState}`)
    }
  }

  const confirmStateChange = async () => {
    if (selectedState === State.CREATE) {
      setIsOverlayOpen(false)
    } else {
      try {
        const backendState = stateMapping[selectedState]
        const response = await jobService.putJobState(accessToken, job.id, backendState)
        toast({
          title: 'Job state',
          description: response.message,
          status: 'info',
          duration: 5000,
          isClosable: true,
        })
        setCurrentState(stateMapping[selectedState])
      } catch (error) {
        console.error('Error updating state:', error)
      } finally {
        setIsOverlayOpen(false)
      }
    }
  }

  const cancelStateChange = () => {
    setSelectedState(null)
    setIsOverlayOpen(false)
  }
  if (currentState)
    return (
      <VStack align='stretch'>
        <Box>
          <Button colorScheme='green' size='sm' variant={currentState === 'CREATE' ? 'solid' : 'outline'} onClick={() => handleStateChange(State.CREATE)}>
            Tạo
          </Button>
          <Button colorScheme='green' size='sm' variant={currentState === 'ON' ? 'solid' : 'outline'} ml={2} onClick={() => handleStateChange(State.ON)}>
            Mở nhận CV
          </Button>
          <Button colorScheme='green' size='sm' variant={currentState === 'PAUSE' ? 'solid' : 'outline'} ml={2} onClick={() => handleStateChange(State.PAUSE)}>
            Tạm dừng
          </Button>
          <Button colorScheme='green' size='sm' variant={currentState === 'END' ? 'solid' : 'outline'} ml={2} onClick={() => handleStateChange(State.END)}>
            Kết thúc
          </Button>
        </Box>

        <ConfirmationOverlay isOpen={isOverlayOpen} onClose={cancelStateChange} onConfirm={confirmStateChange} message={message} />
      </VStack>
    )
}

export default JobStateComponent
