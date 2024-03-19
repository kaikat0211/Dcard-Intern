'use client'
import React from 'react'
interface Props {
  edit: boolean
  setEdit: (edit: boolean) => void
}

const SaveEditButton = ({edit, setEdit} : Props) => {
  const handleSaveEdit = () => {
    setEdit(!edit)
  }
  return (
    <button className='text-sm bg-bordercolor rounded-lg border border-githubBorder hover:border-buttonhover hover:bg-githubBorder leading-8 px-3 font-medium'
    style={{color: '#c9d1d9'}}
    onClick={handleSaveEdit}
    >
      Save
    </button>
  )
}

export default SaveEditButton