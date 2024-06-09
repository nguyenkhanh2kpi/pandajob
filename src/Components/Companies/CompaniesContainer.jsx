import { AspectRatio, Box, Button, Container, Flex, Input, Link, SimpleGrid, Spinner, Text, VStack } from '@chakra-ui/react'
import { PhoneIcon, ExternalLinkIcon, AddIcon } from '@chakra-ui/icons' // import các icon từ Chakra UI
import { useEffect, useState } from 'react'
import { companyService } from '../../Service/company.service'
import { useNavigate } from 'react-router-dom'

const CompaniesContainer = () => {
  const [companies, setCompanies] = useState([])
  const [filteredCompanies, setFilteredCompanies] = useState([])
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
        <Spinner color='blue.500' size='xl' />
      ) : (
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={5} mt={8} width='100%'>
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
    <Box fontFamily={'Roboto'} bgColor={'white'} borderWidth='1px' borderRadius='lg' overflow='hidden'>
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
        <Flex justify='flex-end' mt={4}>
          <Button onClick={() => navigate('/companies/' + company.id)} colorScheme='blue' size='sm'>
            Xem chi tiết
          </Button>
        </Flex>
      </Box>
    </Box>
  )
}

export default CompaniesContainer
