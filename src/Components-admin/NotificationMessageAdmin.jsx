import React, { useEffect, useState } from 'react'
import { Menu, MenuButton, MenuList, MenuItem, IconButton, Box, Badge, Flex, Text } from '@chakra-ui/react'
import { ChatIcon } from '@chakra-ui/icons'
import { CometChatConversations, TitleAlignment, ConversationsStyle } from '@cometchat/chat-uikit-react'
import { CometChat } from '@cometchat/chat-sdk-javascript'
import { ChatWindowAdmin } from './ChatWindowAdmin/ChatWindowAdmin'
const conversationsStyle = new ConversationsStyle({
  width: '100%',
  height: '100%',
  background: 'white',
  fontFamily: 'Roboto',
})

export const NotificationMessageAdmin = () => {
  const [unreadCount, setUnreadCount] = useState(0)
  const [uid, setUuid] = useState('')

  //   chat
  const [isChatOpen, setIsChatOpen] = useState(false)
  const toggleChatWindow = () => {
    setIsChatOpen(!isChatOpen)
  }
  const handleOnItemClick = async (item) => {
    await setUuid(item.conversationWith.uid)
    setIsChatOpen(!isChatOpen)
  }

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        icon={
          <Box position='relative'>
            <ChatIcon />
            {unreadCount > 0 && (
              <Badge colorScheme='red' borderRadius='full' boxSize={4} position='absolute' top={-1} right={-1} display='flex' alignItems='center' justifyContent='center' fontSize='0.6em'>
                {unreadCount}
              </Badge>
            )}
          </Box>
        }
        aria-label='Messages'
        bgColor='white'
        _hover={{ backgroundColor: 'white' }}
        borderWidth={0}
      />
      {isChatOpen ? <ChatWindowAdmin onClose={toggleChatWindow} uid={uid} /> : <></>}
      <MenuList w='300px' maxH='400px' overflowY='auto'>
        <CometChatConversations onItemClick={handleOnItemClick} title='' titleAlignment={TitleAlignment.center} conversationsStyle={conversationsStyle} />
      </MenuList>
    </Menu>
  )
}
