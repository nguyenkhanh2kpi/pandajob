import React, { useEffect, useRef, useState } from 'react'
import { Box, Button, FormLabel, Heading, HStack, SlideFade, Stack, Switch, VStack } from '@chakra-ui/react'
import { ToastContainer, toast } from 'react-toastify'
import { SectionWithInfo } from './SectionWithInfo'
import { SectionWithList } from './SectionWithList'
import { SectionWithParagraph } from './SectionWithParagraph'
import { SectionWithTable } from './SectionWithTable'
import { useReactToPrint } from 'react-to-print'
import './index.css'
import { convertResponseToCVForm, initState } from './constrain'
import { resumeJsonService } from '../../../Service/resumeJson.service'

export const Themme2 = ({ cvRef, resumeJson }) => {
  const [data, setData] = useState(convertResponseToCVForm(resumeJson))
  const [imgSrc, setImgSrc] = useState('https://static-images.vnncdn.net/files/publish/2023/6/29/rose-nhom-blackpink-tai-san-hon-200-ty-dong-va-chuyen-tinh-bi-an-1877.jpg?width=0&s=J2jeZIxffiqLggFrFVSvfA')

  const hanldeAddField = (type, payload) => {
    if (payload.newVal) {
      switch (type) {
        case 'INFO':
          data.info[payload.idx] = payload.newVal
          break
        case 'TABLE':
          data.expr.splice(payload.idx + 1, 0, ['TIME', 'COMPANY', 'CONTENT'])
          break
        case 'EDU':
          data.edu.splice(payload.idx + 1, 0, ['TIME', 'UNI OR COURSE', 'CONTENT'])
          break
        case 'SKL':
          data.skill.splice(payload.idx + 1, 0, ['TYPE', 'NOTE', 'SKILLS'])
          break
        case 'PROJ':
          data.proj.splice(payload.idx + 1, 0, {
            name: 'NAME',
            time: '',
            desc: '',
            client: '',
            noOfMem: 0,
            pos: '',
            responsibility: '',
            technology: '',
          })
          break
        default:
          break
      }
      return
    }

    switch (type) {
      case 'INFO':
        data.info.splice(payload.idx + 1, 0, ['DATA FIELD', 'VALUE'])
        break
      case 'TABLE':
        data.expr.splice(payload.idx + 1, 0, ['TIME', 'COMPANY', 'CONTENT'])
        break
      case 'EDU':
        data.edu.splice(payload.idx + 1, 0, ['TIME', 'UNI OR COURSE', 'CONTENT'])
        break
      case 'SKL':
        data.skill.splice(payload.idx + 1, 0, ['TYPE', 'NOTE', 'SKILLS'])
        break
      case 'PROJ':
        data.proj.splice(payload.idx + 1, 0, {
          name: 'NAME',
          time: '',
          desc: '',
          client: '',
          noOfMem: 0,
          pos: '',
          responsibility: '',
          technology: '',
        })
        break
      default:
        return
    }
  }

  const hanldeRemoveField = (type, payload) => {
    switch (type) {
      case 'INFO':
        data.info.splice(payload.idx, 1)
        break
      case 'TABLE':
        data.expr.splice(payload.idx, 1)
        break
      case 'EDU':
        data.edu.splice(payload.idx, 1)
        break
      case 'SKL':
        data.skill.splice(payload.idx, 1)
        break
      case 'PROJ':
        data.proj.splice(payload.idx, 1)
        break
      default:
        return
    }
  }
  const handleUpdateData = (type, payload, addField = true) => {
    if (!payload) {
      setData({ ...data })
      return
    }
    if (addField) hanldeAddField(type, payload)
    else hanldeRemoveField(type, payload)
    setData({ ...data })
  }

  const handleChangAvt = (event) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      const reader = new FileReader()
      reader.onload = () => {
        setImgSrc(reader.result)
      }
      reader.readAsDataURL(selectedFile)
    } else {
      console.log('BUG')
    }
  }
  if (!data) {
    return <></>
  } else
    return (
      <>
        <input type='file' accept='image/*' onChange={handleChangAvt} id='fileInput' className='hidden' />
        <div ref={cvRef} className='page' style={{ fontFamily: 'Roboto', padding: '1.4cm', backgroundColor: 'white', backgroundImage: "url('https://cv.fullstack.edu.vn/backgrounds/graph-dot-top-458966.svg')" }}>
          <div>
            <input
              className='cv-ipt name'
              style={{ color: 'green', fontWeight: '600' }}
              value={data.name}
              onChange={(e) => {
                data.name = e.target.value
                handleUpdateData(data)
              }}
            />
            <br />
            <input
              className='cv-ipt name'
              style={{
                color: 'green',
                fontWeight: '600',
                fontSize: '23px',
              }}
              value={data.position}
              onChange={(e) => {
                data.position = e.target.value
                handleUpdateData(data)
              }}
            />
            <br />
          </div>
          <div className='d-flex justify-content-between'>
            <SectionWithInfo title={''} type={'INFO'} sectionData={data.info} handleUpdateData={handleUpdateData} isShowButton={true} />
            <div
              onClick={() => {
                const fileInput = document.getElementById('fileInput')
                if (fileInput) {
                  fileInput.click()
                }
              }}
              className='img-container'
              style={{
                backgroundImage: `url(${imgSrc})`,
                height: 220,
                width: 220,
                backgroundPosition: 'center center',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
              }}></div>
          </div>
          <SectionWithParagraph iconName={'bi bi-yelp'} title={'Mục tiêu nghề nghiệp'} sectionData={data.overview} isShowButton={true} />
          <SectionWithList iconName={'bi bi-pie-chart'} title={'Kĩ năng'} type={'SKL'} oneRow={true} sectionData={data.skill} handleUpdateData={handleUpdateData} isShowButton={true} />
          <SectionWithList iconName={'bi bi-award'} title={'Kinh nghiệm'} type={'EXPR'} sectionData={data.expr} handleUpdateData={handleUpdateData} isShowButton={true} />
          <SectionWithList iconName={'bi bi-box'} title={'Bằng cấp'} type={'EDU'} sectionData={data.edu} handleUpdateData={handleUpdateData} isShowButton={true} />
          <SectionWithTable iconName={'bi bi-brightness-high'} title={'Dự án'} type={'PROJ'} sectionData={data.proj} handleUpdateData={handleUpdateData} isShowButton={true} />
        </div>
      </>
    )
}