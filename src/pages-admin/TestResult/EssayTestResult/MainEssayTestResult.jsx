import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, HStack, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { testService } from '../../../Service/test.service'

export const MainEssayTestResult = () => {
  const params = useParams()
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const [records, setRecords] = useState(null)

  useEffect(() => {
    testService
      .getAllRecordCodeByTestId(accessToken, params.testId)
      .then((response) => {
        setRecords(response.data)
      })
      .catch((er) => console.log(er))
  }, [accessToken, params.testId])

  return (
    <Box minHeight={2000} overflow='auto' fontFamily={'Roboto'} fontWeight={400} backgroundColor={'#e9f3f5'}>
      <HStack pt={30} justifyContent={'space-between'} w={'100%'}>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href='#'>Kết quả test tự luận</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </HStack>
      <Text>{params.testId}</Text>
    </Box>
  )
}
