import { Box, Center, HStack, Heading, SlideFade, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { ChatEngine, ChatEngineWrapper, ChatFeed, ChatList, ChatSocket } from 'react-chat-engine'
import { PrettyChatWindow } from 'react-chat-engine-pretty'
import { ChatEngineId } from '../../global'

const Message = () => {
  const data = JSON.parse(localStorage.getItem('data'))

  return (
    <Box mb={20} mt={120} fontFamily={'Montserrat'}>
      <Box display='flex' justifyContent='space-evenly'>
        <Box w='1200px'>
          <Box display='flex' justifyContent='center' alignItems='center'>
            <Box w='100%' borderWidth={1} borderRadius={2} borderColor={'#85858c'}>
              {/* <PrettyChatWindow
                backgroundColor='white'
                projectId={ChatEngineId}
                username={data.data.email}
                secret='1234'
                style={{ height: '100%', width: '100%', backgroundColor: 'white' }}
              /> */}
              <ChatEngine
                borderWidth={2}
                projectID={ChatEngineId}
                userName={data.data.email}
                userSecret='1234'
                renderChatSettings={(props) => {
                  return <></>
                }}
                renderNewChatForm={(creds) => {
                  return <Box m={2}></Box>
                }}
                renderChatHeader={(chat) => {
                  ;<></>
                }}
              />
              {/* <ChatEngineWrapper>
          <ChatSocket
            projectID={ChatEngineId}
            chatID='235459'
            chatAccessKey='ca-a2aa8a8d-f1df-4191-8c28-4f43f6a8075e'
            senderUsername='candidate@gmail.com'
          />
          <ChatFeed activeChat='235459' />
        </ChatEngineWrapper> */}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Message
