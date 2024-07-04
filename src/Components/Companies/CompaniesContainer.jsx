import { AspectRatio, Box, Button, Container, Flex, HStack, Input, Link, SimpleGrid, Spinner, Text, VStack } from '@chakra-ui/react'
import { PhoneIcon, ExternalLinkIcon, AddIcon } from '@chakra-ui/icons'
import React, { useEffect, useState } from 'react'
import { companyService } from '../../Service/company.service'
import { useNavigate } from 'react-router-dom'

const CompaniesContainer = () => {
  const [companies, setCompanies] = useState(null)
  const [filteredCompanies, setFilteredCompanies] = useState(null)
  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    companyService.getAllCompany().then((res) => {
      setCompanies(res)
      setFilteredCompanies(res)
    })
  }, [])

  const handleSearch = () => {
    const filtered = companies.filter((company) => company.name.toLowerCase().includes(keyword.toLowerCase()) || company.website.toLowerCase().includes(keyword.toLowerCase()) || company.address.toLowerCase().includes(keyword.toLowerCase()) || company.phone.includes(keyword))
    setFilteredCompanies(filtered)
  }

  const handleInputChange = (e) => {
    setKeyword(e.target.value)
  }

  return (
    <VStack fontFamily={'Roboto'} width={'90vw'} align={'flex-start'} m={2} p={2}>
      <Container maxW='container.xl'>
        <Flex justify='center'>
          <Input bgColor={'white'} type='text' placeholder='Tìm kiếm công ty...' value={keyword} onChange={handleInputChange} mr={4} />
          <Button colorScheme='blue' onClick={handleSearch}>
            Tìm kiếm
          </Button>
        </Flex>
      </Container>

      {!filteredCompanies ? (
        <HStack minH={500} w='100%' justifyContent='center' alignItems='center'>
          <Spinner thickness='8px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='4xl' />
        </HStack>
      ) : (
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={8} mt={8} width='100%'>
          {filteredCompanies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </SimpleGrid>
      )}
    </VStack>
  )
}

const CompanyCard = ({ company }) => {
  const navigate = useNavigate()
  return (
    <Box onClick={() => navigate('/companies/' + company.id)} fontFamily={'Roboto'} bgColor={'white'} borderWidth='1px' borderRadius='lg' overflow='hidden'>
      <AspectRatio ratio={16 / 9}>
        <Box as='img' src={company.avatar} alt={company.name} objectFit='cover' />
      </AspectRatio>
      <Box p={4}>
        <Text m={0} p={0} fontWeight='bold' mb={2}>
          {company.name}
        </Text>
        <Flex align='center' mb={2}>
          <ExternalLinkIcon mr={2} />
          <Link href={company.website} isExternal>
            {company.website}
          </Link>
        </Flex>
        <Flex align='center' mb={2}>
          <AddIcon mr={2} />
          <Text m={0} p={0} noOfLines={1}>
            {company.address}
          </Text>
        </Flex>
        <Flex align='center' mb={2}>
          <PhoneIcon mr={2} />
          <Text m={0} p={0}>
            {company.phone}
          </Text>
        </Flex>
        <Text noOfLines={3}>{company.info}</Text>
      </Box>
    </Box>
  )
}

export default CompaniesContainer
