import React, { useEffect } from 'react'
import './indexBuild.css'
import { useState } from 'react'

export const SectionWithTable = ({
  iconName,
  title,
  type,
  sectionData,
  handleUpdateData,
  isShowButton,
}) => {
  const [isShow, setIsShow] = useState()
  useEffect(() => {
    setIsShow(false)
  }, [])
  const BtnAddItem = (props) => (
    <button
      style={{ marginRight: '5px', marginTop: '5px' }}
      data-bs-toggle='tooltip'
      title='Add new item'
      className='btn-add btn btn-outline-primary'
      onClick={() => handleUpdateData(type, { idx: props.idx })}>
      +
    </button>
  )
  const BtnRemoveItem = (props) => (
    <button
      style={{ marginTop: '5px' }}
      data-bs-toggle='tooltip'
      title='Remove this item'
      className='btn-remv btn btn-outline-danger'
      onClick={() => handleUpdateData(type, { idx: props.idx }, false)}>
      -
    </button>
  )

  const dictionary = {
    client: 'Khách hàng',
    desc: 'Mô tả',
    noOfMem: 'Thành viên',
    pos: 'Vị trí',
    responsibility: 'Vai trò/Trách nhiệm',
    technology: 'Công nghệ( công cụ)',
  }

  const onMouseEnter = () => {
    setIsShow(true)
  }

  const onMouseLeave = () => {
    setIsShow(false)
  }

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ fontFamily: 'Roboto' }}
      className='section'>
      <i className={iconName} style={{ fontSize: '25px', color: 'green' }}>
        {title}
      </i>
      <hr />
      {sectionData.map((tbl, idx) => (
        <div className='proj-tbl' key={idx}>
          <div className='cv-ipt proj-name' contentEditable>
            Tên dự án: {tbl.name}
          </div>
          {/* <i>(</i> */}
          <span className='cv-ipt proj-time' contentEditable>
            Thời gian: {tbl.time}
          </span>
          {/* <i>)</i> */}

          <table>
            {Object.entries(tbl)
              .splice(2)
              .map((item, j) => (
                <tr key={j}>
                  <td className='cv-ipt' contentEditable>
                    {dictionary[item[0]]}
                  </td>
                  <td className='cv-ipt' contentEditable>
                    {item[1]}
                  </td>
                </tr>
              ))}
          </table>
          {isShow && <BtnAddItem idx={idx} />}
          {isShow && <BtnRemoveItem idx={idx} />}
        </div>
      ))}
    </div>
  )
}
