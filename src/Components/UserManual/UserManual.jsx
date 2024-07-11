// import { Box, HStack, VStack, Text, Image, IconButton } from '@chakra-ui/react'
// import React, { useState } from 'react'
// import { createReactEditorJS } from 'react-editor-js'
// import { MdArrowForward } from 'react-icons/md'
// const data1 = {
//   time: 1720606173120,
//   blocks: [
//     { id: 'NclUySYBoW', type: 'paragraph', data: { text: '<b>Cách bắt đầu tạo CV và ứng tuyển việc làm</b>' } },
//     { id: 'UQx_EHNNWb', type: 'paragraph', data: { text: '<b></b>B1: Đăng kí 1 tài khoản và đăng nhập' } },
//     { id: 'vEJf7Xp2VL', type: 'simpleImage', data: { url: 'https://firebasestorage.googleapis.com/v0/b/upload2-23381.appspot.com/o/1720606173133_blob?alt=media', caption: 'account', withBorder: false, withBackground: false, stretched: false } },
//     { id: '9KBV_XIU13', type: 'paragraph', data: { text: 'B2:&nbsp; Chọn mục tạo<b>&nbsp;CV -&gt;&nbsp; Tạo CV</b>và bắt đầu tạo thông tin hồ sơ' } },
//     { id: '-y3WNDBjKy', type: 'simpleImage', data: { url: 'https://firebasestorage.googleapis.com/v0/b/upload2-23381.appspot.com/o/1720606173146_blob?alt=media', caption: 'resume', withBorder: false, withBackground: false, stretched: false } },
//     { id: '1LFxUr6GQw', type: 'paragraph', data: { text: 'B3: Bấm&nbsp;<b>lưu</b>&nbsp;sau đó bấm<b>&nbsp;Tạo PDF</b>để đến trang chọn mẫu CV' } },
//     { id: 'vu3aihtmT-', type: 'simpleImage', data: { url: 'https://firebasestorage.googleapis.com/v0/b/upload2-23381.appspot.com/o/1720606173148_blob?alt=media', caption: 'template', withBorder: false, withBackground: false, stretched: false } },
//     { id: 'PJ8UJ0OUQG', type: 'paragraph', data: { text: 'B4: Chỉnh sửa lại mẫu theo sở thích' } },
//     { id: '6v03ppzn6Z', type: 'simpleImage', data: { url: 'https://firebasestorage.googleapis.com/v0/b/upload2-23381.appspot.com/o/1720606173147_blob?alt=media', caption: 'edit', withBorder: false, withBackground: false, stretched: false } },
//     { id: 'cLMTfVCYR1', type: 'paragraph', data: { text: 'B5 Bấm xuất file để tải CV về\n\n' } },
//   ],
//   version: '2.29.1',
// }
// const data2 = {
//   time: 1720607926078,
//   blocks: [
//     { id: 'tAi6SMhutu', type: 'paragraph', data: { text: '<b>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; + Để trở thành nhà tuyển dụng hãy liên hệ với chúng tôi thông qua email: nguyenkhanh2kpi@gmail.com</b>' } },
//     { id: '4NXcBieP2q', type: 'paragraph', data: { text: '<b>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;+ Gửi các thông tin về giấy phép kinh doanh và thông tin công ty cho chúng tôi</b>' } },
//   ],
//   version: '2.29.1',
// }

// const data3 = {}

// export const UserManual = () => {
//   const [selectedItem, setSelectedItem] = useState('Cách tạo CV trên JobPanda và bắt đầu ứng tuyển cho công việc')
//   const userManualData = {
//     'Cách tạo CV trên JobPanda và bắt đầu ứng tuyển cho công việc': data1,
//     'Cách để trở thành nhà tuyển dụng': data2,
//     'Cách theo giõi những bài test, thông báo của nhà tuyển dụng': data3,
//   }

//   const handleItemClick = (item) => {
//     setSelectedItem(item)
//     console.log(JSON.stringify(userManualData[selectedItem]))
//   }

//   return (
//     <HStack alignItems='flex-start' justifyContent='center' minH='100vh' bgColor='white' w='100%' p={5}>
//       <VStack align='stretch' spacing={4} w='30%' borderRight='1px solid #ccc' pr={5}>
//         <Text fontSize='xl' fontWeight='bold'>
//           Hướng dẫn sử dụng
//         </Text>
//         <Box as='ul' listStyleType='none' mt={4}>
//           {Object.keys(userManualData).map((item, index) => (
//             <Box key={index} as='li' cursor='pointer' onClick={() => handleItemClick(item)}>
//               <HStack spacing={2} align='center'>
//                 <IconButton aria-label={`Select ${item}`} icon={<MdArrowForward />} size='sm' variant={item === selectedItem ? 'solid' : 'outline'} colorScheme='blue' onClick={() => handleItemClick(item)} />
//                 <Text fontWeight={item === selectedItem ? 'bold' : 'normal'}>{item}</Text>
//               </HStack>
//             </Box>
//           ))}
//         </Box>
//       </VStack>

//       <Box fontFamily='Roboto' w='70%' mt='60px' p={5}>
//         <VStack spacing={8} align='stretch'>
//           <Text fontSize='xl' fontWeight='bold'>
//             {selectedItem}
//           </Text>
//           <Box borderWidth={1}>

//           </Box>
//         </VStack>
//       </Box>
//     </HStack>
//   )
// }

import React, { useState } from 'react'
import { Box, HStack, VStack, Text, Image, IconButton } from '@chakra-ui/react'
import { MdArrowForward } from 'react-icons/md'

// Sample data for demonstration
const data1 = {
  time: 1720606173120,
  blocks: [
    { id: 'NclUySYBoW', type: 'paragraph', data: { text: '<b>Cách bắt đầu tạo CV và ứng tuyển việc làm</b>' } },
    { id: 'UQx_EHNNWb', type: 'paragraph', data: { text: '<b></b>B1: Đăng kí 1 tài khoản và đăng nhập' } },
    { id: 'vEJf7Xp2VL', type: 'simpleImage', data: { url: 'https://firebasestorage.googleapis.com/v0/b/upload2-23381.appspot.com/o/1720606173133_blob?alt=media', caption: 'account', withBorder: false, withBackground: false, stretched: false } },
    { id: '9KBV_XIU13', type: 'paragraph', data: { text: 'B2:&nbsp; Chọn mục tạo<b>&nbsp;CV -&gt;&nbsp; Tạo CV</b>và bắt đầu tạo thông tin hồ sơ' } },
    { id: '-y3WNDBjKy', type: 'simpleImage', data: { url: 'https://firebasestorage.googleapis.com/v0/b/upload2-23381.appspot.com/o/1720606173146_blob?alt=media', caption: 'resume', withBorder: false, withBackground: false, stretched: false } },
    { id: '1LFxUr6GQw', type: 'paragraph', data: { text: 'B3: Bấm&nbsp;<b>lưu</b>&nbsp;sau đó bấm<b>&nbsp;Tạo PDF</b>để đến trang chọn mẫu CV' } },
    { id: 'vu3aihtmT-', type: 'simpleImage', data: { url: 'https://firebasestorage.googleapis.com/v0/b/upload2-23381.appspot.com/o/1720606173148_blob?alt=media', caption: 'template', withBorder: false, withBackground: false, stretched: false } },
    { id: 'PJ8UJ0OUQG', type: 'paragraph', data: { text: 'B4: Chỉnh sửa lại mẫu theo sở thích' } },
    { id: '6v03ppzn6Z', type: 'simpleImage', data: { url: 'https://firebasestorage.googleapis.com/v0/b/upload2-23381.appspot.com/o/1720606173147_blob?alt=media', caption: 'edit', withBorder: false, withBackground: false, stretched: false } },
    { id: 'cLMTfVCYR1', type: 'paragraph', data: { text: 'B5 Bấm xuất file để tải CV về\n\n' } },
  ],
  version: '2.29.1',
}
const data2 = {
  time: 1720607926078,
  blocks: [
    { id: 'tAi6SMhutu', type: 'paragraph', data: { text: '<b>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; + Để trở thành nhà tuyển dụng hãy liên hệ với chúng tôi thông qua email: nguyenkhanh2kpi@gmail.com</b>' } },
    { id: '4NXcBieP2q', type: 'paragraph', data: { text: '<b>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;+ Gửi các thông tin về giấy phép kinh doanh và thông tin công ty cho chúng tôi</b>' } },
  ],
  version: '2.29.1',
}

const data3 = {
  time: 1720609881751,
  blocks: [
    { id: 'P6gyhCHVA3', type: 'paragraph', data: { text: '<b>Để theo giõi những bài test, thông báo của nhà tuyển dụng:</b>' } },
    { id: 'zVeVBptpof', type: 'paragraph', data: { text: 'B1: Sau khi ứng tuyển bấm vào mục <b>Việc làm -&gt; Đã ứng tuyển</b>' } },
    { id: 'pQRIABK6GT', type: 'simpleImage', data: { url: 'https://firebasestorage.googleapis.com/v0/b/upload2-23381.appspot.com/o/1720609881796_blob?alt=media', caption: '1', withBorder: false, withBackground: false, stretched: false } },
    { id: 'MeZHaMHoMe', type: 'paragraph', data: { text: 'Tại đây có thể xem thông báo và thông tin các bài kiểm tra' } },
    { id: 'hN5LfyLLgV', type: 'simpleImage', data: { url: 'https://firebasestorage.googleapis.com/v0/b/upload2-23381.appspot.com/o/1720609881796_blob?alt=media', caption: 'image.png', withBorder: false, withBackground: false, stretched: false } },
  ],
  version: '2.29.1',
}

export const UserManual = () => {
  const [selectedItem, setSelectedItem] = useState('Cách tạo CV trên JobPanda và bắt đầu ứng tuyển cho công việc')
  const userManualData = {
    'Cách tạo CV trên JobPanda và bắt đầu ứng tuyển cho công việc': data1,
    'Cách để trở thành nhà tuyển dụng': data2,
    'Cách theo giõi những bài test, thông báo của nhà tuyển dụng': data3,
  }

  const handleItemClick = (item) => {
    setSelectedItem(item)
  }

  const renderContent = () => {
    const blocks = userManualData[selectedItem]?.blocks || []

    return (
      <VStack spacing={4} align='stretch'>
        {blocks.map((block, index) => (
          <Box key={index} borderWidth='1px' p={4} borderRadius='md'>
            {block.type === 'paragraph' && <Text fontSize='md' dangerouslySetInnerHTML={{ __html: block.data.text }} />}
            {block.type === 'simpleImage' && (
              <Box mt={4}>
                <Image src={block.data.url} alt={block.data.caption} maxW='100%' />
                <Text fontSize='sm' mt={2} textAlign='center'>
                  {block.data.caption}
                </Text>
              </Box>
            )}
          </Box>
        ))}
      </VStack>
    )
  }

  return (
    <HStack alignItems='flex-start' justifyContent='center' minH='100vh' bgColor='white' w='100%' p={5}>
      <VStack align='stretch' spacing={4} w='30%' borderRight='1px solid #ccc' pr={5}>
        <Text fontSize='xl' fontWeight='bold'>
          Hướng dẫn sử dụng
        </Text>
        <Box as='ul' listStyleType='none' mt={4}>
          {Object.keys(userManualData).map((item, index) => (
            <Box key={index} as='li' cursor='pointer' onClick={() => handleItemClick(item)}>
              <HStack spacing={2} align='center'>
                <IconButton aria-label={`Select ${item}`} icon={<MdArrowForward />} size='sm' variant={item === selectedItem ? 'solid' : 'outline'} colorScheme='blue' />
                <Text fontWeight={item === selectedItem ? 'bold' : 'normal'}>{item}</Text>
              </HStack>
            </Box>
          ))}
        </Box>
      </VStack>

      <Box fontFamily='Roboto' w='70%' mt='60px' p={5}>
        <VStack spacing={8} align='stretch'>
          <Text fontSize='xl' fontWeight='bold'>
            {selectedItem}
          </Text>
          {renderContent()}
        </VStack>
      </Box>
    </HStack>
  )
}
