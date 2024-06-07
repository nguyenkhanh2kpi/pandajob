import { ChevronDownIcon } from '@chakra-ui/icons'
import { Box, Button, HStack, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react'
import React from 'react'
import { LANGUAGE_VERSIONS } from './constant'
const languages = Object.entries(LANGUAGE_VERSIONS)
const ACTIVE_COLOR = 'blue.400'

export const CodeLanguageEditor = ({ language, onSelect }) => {
  return (
    <HStack w={'100%'} justifyContent={'flex-end'}>
      <Menu isLazy>
        <MenuButton m={1} variant={'outline'} size='xs' colorScheme='blue' as={Button}>
          {language}
        </MenuButton>
        <MenuList bg='#ffffff'>
          {languages.map(([lang, version]) => (
            <MenuItem
              key={lang}
              color={lang === language ? ACTIVE_COLOR : ''}
              bg={lang === language ? '#fafafa' : 'transparent'}
              _hover={{
                color: ACTIVE_COLOR,
                bg: '#e1f2f2',
              }}
              onClick={() => onSelect(lang)}>
              {lang}
              &nbsp;
              <Text as='span' color='gray.600' fontSize='sm'>
                ({version})
              </Text>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </HStack>
  )
}
