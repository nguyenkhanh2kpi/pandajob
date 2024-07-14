import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Table, Thead, Tbody, Tr, Th, Td, Badge, Spinner, HStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { vipService } from '../../../Service/vip.service'

export const MainVipPackAll = () => {
  const accessToken = JSON.parse(localStorage.getItem('data')).access_token
  const [bills, setBills] = useState([])

  useEffect(() => {
    vipService
      .getAllBill(accessToken)
      .then((response) => setBills(response))
      .catch((er) => console.error(er))
  }, [accessToken])

  if (!bills.length) {
    return (
      <HStack minH={500} w='100%' justifyContent='center' alignItems='center'>
        <Spinner thickness='8px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='4xl' />
      </HStack>
    )
  }

  return (
    <Box minHeight={1000} fontFamily={'Roboto'} backgroundColor={'#f5f9fa'} overflow='hidden'>
      <Breadcrumb fontWeight={'bold'} fontStyle={'italic'} pt={30}>
        <BreadcrumbItem>
          <BreadcrumbLink href='#'>Bills</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Box mb={100} px={8}>
        <Table bgColor={'white'} borderWidth={1}>
          <Thead>
            <Tr>
              <Th>Email</Th>
              <Th>Status</Th>
              <Th>Type</Th>
              <Th>Payment Date</Th>
              <Th>Expired At</Th>
              <Th>Payment Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {bills.map((bill) => (
              <Tr key={bill.id}>
                <Td>{bill.email}</Td>
                <Td>{bill.status}</Td>
                <Td>{bill.type}</Td>
                <Td>{bill.pay_date ? bill.pay_date : 'Not Paid'}</Td>
                <Td>{bill.expired_at ? bill.expired_at : 'Not Expired'}</Td>
                <Td>
                  <Badge colorScheme={bill.is_payed ? 'green' : 'red'}>{bill.is_payed ? 'Paid' : 'Not Paid'}</Badge>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  )
}
