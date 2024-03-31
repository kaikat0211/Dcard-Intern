'use client'
import React from 'react'

interface Props {
  edit: boolean
  setEdit: (edit: boolean) => void
}
const CancelEditButton = ({edit, setEdit} : Props) => {
  return (
    <button className='rounded-lg text-sm font-medium hover:bg-bordercolor leading-8 px-3' style={{color: "#388BFD"}}
    onClick={()=>setEdit(!edit)}
    >Cancel</button>
  )
}

export default CancelEditButton