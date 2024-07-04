import { ChevronRightIcon } from '@chakra-ui/icons'
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, HStack, Input, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { bannerService } from '../../Service/banner.service'

export const MainBanner = () => {
  const [banners, setBanners] = useState([])
  const [currentBanner, setCurrentBanner] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [newBannerContent, setNewBannerContent] = useState('')
  const [newBannerImageUrl, setNewBannerImageUrl] = useState('')

  useEffect(() => {
    fetchBanners()
  }, [])

  const fetchBanners = async () => {
    try {
      setIsLoading(true)
      const data = await bannerService.getAllBanners()
      setBanners(data)
    } catch (error) {
      console.error('Error fetching banners:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const createBanner = async () => {
    try {
      const newBanner = {
        content: newBannerContent,
        imageUrl: newBannerImageUrl,
      }
      const createdBanner = await bannerService.createBanner(newBanner)
      setBanners([...banners, createdBanner])
      setNewBannerContent('')
      setNewBannerImageUrl('')
    } catch (error) {
      console.error('Error creating banner:', error)
    }
  }

  const deleteBanner = async (id) => {
    try {
      await bannerService.deleteBanner(id)
      setBanners(banners.filter((banner) => banner.id !== id))
    } catch (error) {
      console.error('Error deleting banner:', error)
    }
  }

  const editBanner = (banner) => {
    setCurrentBanner(banner)
    setIsEditing(true)
  }

  const cancelEditBanner = () => {
    setCurrentBanner(null)
    setIsEditing(false)
  }

  const saveEditedBanner = async () => {
    try {
      const updatedBanner = {
        id: currentBanner.id,
        content: currentBanner.content,
        imageUrl: currentBanner.imageUrl,
      }
      await bannerService.updateBanner(currentBanner.id, updatedBanner)
      // Update banners array to reflect changes
      setBanners(banners.map((banner) => (banner.id === currentBanner.id ? { ...banner, ...updatedBanner } : banner)))
      setCurrentBanner(null)
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating banner:', error)
    }
  }

  return (
    <Box minHeight={2000} overflow='auto' fontFamily={'Roboto'} fontWeight={400} backgroundColor={'#f5f9fa'}>
      <HStack justifyContent={'space-between'} w={'100%'}>
        <Breadcrumb separator={<ChevronRightIcon color='gray.500' />} fontStyle={'italic'} fontWeight={'bold'} pt={30}>
          <BreadcrumbItem>
            <BreadcrumbLink href='#'>Banners</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </HStack>
      <VStack mb={5} w={'100%'} pl={30} pr={30} spacing={2}>
        {!isEditing && <Button onClick={() => setIsEditing(true)}>Thêm Banners</Button>}
        {isEditing && (
          <Box w='100%'>
            <Input placeholder='Banner Content' value={newBannerContent} onChange={(e) => setNewBannerContent(e.target.value)} />
            <Input placeholder='Image URL' value={newBannerImageUrl} onChange={(e) => setNewBannerImageUrl(e.target.value)} />
            <Button onClick={createBanner}>Create</Button>
          </Box>
        )}
        {isLoading ? (
          <p>Loading banners...</p>
        ) : (
          banners.map((banner) => (
            <Box bgColor={'white'} key={banner.id} w='100%' boxShadow={'lg'} borderRadius='lg' p={4}>
              <img src={banner.imageUrl} alt={banner.content} />
              <p>{banner.content}</p>
              {!isEditing && (
                <Button colorScheme='teal' onClick={() => editBanner(banner)}>
                  Sửa
                </Button>
              )}
              {!isEditing && (
                <Button colorScheme='red' onClick={() => deleteBanner(banner.id)}>
                  Xóa
                </Button>
              )}
              {isEditing && currentBanner && currentBanner.id === banner.id && (
                <Box w='100%'>
                  <Input placeholder='Banner Content' value={currentBanner.content} onChange={(e) => setCurrentBanner({ ...currentBanner, content: e.target.value })} />
                  <Input placeholder='Image URL' value={currentBanner.imageUrl} onChange={(e) => setCurrentBanner({ ...currentBanner, imageUrl: e.target.value })} />
                  <Button colorScheme='blue' onClick={saveEditedBanner}>
                    Lưu
                  </Button>
                  <Button colorScheme='gray' onClick={cancelEditBanner}>
                    Thoát
                  </Button>
                </Box>
              )}
            </Box>
          ))
        )}
      </VStack>
    </Box>
  )
}
