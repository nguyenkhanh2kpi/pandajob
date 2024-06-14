import { AccordionButton, AccordionItem, Box, Code, Image, ListItem, UnorderedList } from '@chakra-ui/react'
import React, { useState } from 'react'

export const QuestionInCodeTestResult = ({ questionTxt }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded)
  }

  const parsedQuestion = JSON.parse(questionTxt)

  return (
    <Box maxHeight={isExpanded ? 'none' : '150px'} overflow={isExpanded ? 'visible' : 'hidden'} transition='max-height 0.5s ease' onClick={toggleExpansion} cursor='pointer' border='1px solid #ccc' p={4} borderRadius='md' boxShadow='md'>
      {parsedQuestion.blocks.map((block) => {
        switch (block.type) {
          case 'paragraph':
            return <p key={block.id} dangerouslySetInnerHTML={{ __html: block.data.text }} />
          case 'list':
            return (
              <UnorderedList key={block.id}>
                {block.data.items.map((item, itemIndex) => (
                  <ListItem key={itemIndex} dangerouslySetInnerHTML={{ __html: item }} />
                ))}
              </UnorderedList>
            )
          case 'simpleImage':
            return <Image key={block.id} src={block.data.url} alt={block.data.caption || 'Image'} />
          case 'code':
            return (
              <Box key={block.id} my={2}>
                <Code whiteSpace='pre-wrap'>{block.data.code}</Code>
              </Box>
            )
          default:
            return null
        }
      })}
    </Box>
  )
}
