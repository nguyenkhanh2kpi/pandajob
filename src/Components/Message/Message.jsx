import { Box, Center } from '@chakra-ui/react'
import React from 'react'
import { ChatEngine, ChatEngineWrapper, ChatFeed, ChatList, ChatSocket } from 'react-chat-engine'
import { PrettyChatWindow } from 'react-chat-engine-pretty'
import { ChatEngineId } from '../../global'

const Message = () => {
  const data = JSON.parse(localStorage.getItem('data'))

  return (
    <Box display='flex' justifyContent='center' alignItems='center' height='100vh'>
      <Box width='70%' height={600} pt={50}>
        <PrettyChatWindow
          projectId={ChatEngineId}
          username={data.data.email}
          secret='123'
          style={{ height: '100%', width: '100%', backgroundColor: 'white' }}
        />
        {/* <ChatEngine 
          projectID={ChatEngineId}
          userName={data.data.email}
          userSecret='123'
          renderChatSettings={(props) => {return (<></>)}}
          renderNewChatForm={(creds) => {return (<></>)}}
        /> */}
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
  )
}

export default Message
