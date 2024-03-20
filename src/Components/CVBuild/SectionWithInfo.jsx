import React from 'react'
import './indexBuild.css'

export const SectionWithInfo = ({ title, type, sectionData, handleUpdateData, isShowButton }) => {
  const BtnAddItem = (props) => (
    <button
      data-bs-toggle='tooltip'
      title='Add new item'
      className='btn-add btn btn-outline-primary'
      onClick={() => handleUpdateData(type, { idx: props.idx })}>
      +
    </button>
  )
  const BtnRemoveItem = (props) => (
    <button
      data-bs-toggle='tooltip'
      title='Remove this item'
      className='btn-remv btn btn-outline-danger'
      onClick={() => handleUpdateData(type, { idx: props.idx }, false)}>
      -
    </button>
  )

  const handleUpdateSectionDat = (isFieldName, idx, newValue) => {
    sectionData[idx][isFieldName ? 0 : 1] = newValue
    handleUpdateData(type)
  }

  return (
    <div style={{ fontFamily: 'Montserrat' }} className='section'>
      {sectionData.map((item, idx) => (
        <div className='info-wrapper' key={idx}>
          <input
            className='cv-ipt info'
            value={item[0]}
            onChange={(e) => handleUpdateSectionDat(true, idx, e.target.value)}
            contentEditable></input>
          <input
            className='cv-ipt info-val'
            contentEditable
            value={item[1]}
            onChange={(e) => handleUpdateSectionDat(false, idx, e.target.value)}></input>
          {isShowButton && <BtnAddItem idx={idx} />}
          {isShowButton && <BtnRemoveItem idx={idx} />}
        </div>
      ))}
    </div>
  )
}
