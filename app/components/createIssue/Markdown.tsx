'use client'
import React from 'react'
import MDEditor from "@uiw/react-md-editor";

interface BodyInputProps {
    value: string | undefined;
    setValue: (value: string) => void;
    bodyRef?: React.Ref<HTMLTextAreaElement>;
  }
const Markdown = ({value, setValue, bodyRef} : BodyInputProps) => {
  return (
    <>
        <MDEditor
        value={value}
        ref={bodyRef}
        onChange={(newValue) => setValue(newValue || '')}      
        />
    </>
  )
}

export default Markdown