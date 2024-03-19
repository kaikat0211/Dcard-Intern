'use client'
import React from 'react'

interface Props {
    edit: boolean
    setEdit: (edit: boolean) => void
}
const EditTitleButton = ({edit, setEdit} : Props) => {
  return (
    <button className='text-xs bg-bordercolor rounded-lg border border-githubBorder hover:border-buttonhover hover:bg-githubBorder leading-7 px-2 font-medium' style={{color: '#c9d1d9'}} onClick={()=>setEdit(!edit)}
    >
        Edit
    </button>
  )
}

export default EditTitleButton