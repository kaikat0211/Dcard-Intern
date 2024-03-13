'use client'
import React from 'react'
import MDEditor from "@uiw/react-md-editor";

interface BodyInputProps {
    value: string;
    setValue: (value: string) => void;
    bodyRef: React.Ref<HTMLTextAreaElement>;
  }
const Markdown = ({value, setValue, bodyRef} : BodyInputProps) => {
  return (
    <>
        <div className='mt-3'>
            <legend>
                <h3 className='font-semibold mb-2'>Add a description</h3>
            </legend>
            <div>
                <MDEditor
                value={value}
                ref={bodyRef}
                onChange={(newValue) => setValue(newValue || '')}
                />
            </div>
        </div>
    </>
  )
}

export default Markdown