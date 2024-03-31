'use client'
import React, { useEffect, useRef, useState } from 'react'
import { IoSettingsOutline } from "react-icons/io5";
import LabelSelelctor from "./LabelSelelctor";
import { useAppSelector } from '@/lib/hooks';
import { Label, updateIssueInfo } from '../../types/singleIssueTypes';
import { hexToRgba } from '@/lib/simple/hexToRgbaFunc';
interface Props {
    markTitle: string[]
    initLabels?: Label[] | undefined
    userIdentity?: string | undefined
    patchInfo?: updateIssueInfo | undefined
    createNewIssue?: boolean | undefined
}
const Marks = ({ markTitle, initLabels, userIdentity , patchInfo, createNewIssue} : Props) => {
    const [open, setOpen] = useState(false)
    const [firstLoad, setFirstLoad] = useState(true)
    const labelSelectorRef = useRef<HTMLDivElement>(null)
    const divRef = useRef<HTMLDivElement>(null)
    const labelsState = useAppSelector(state => state.labels.labels)
    const handleOpenLabelSelector = () => {
        if(createNewIssue || userIdentity === 'Owner'){
            setOpen(!open)
        }else return
        
    }
    const renderChooseLabels = () => {
        if(firstLoad) {
            return(initLabels?.map((label) => (<span 
                style={{
                    color: hexToRgba(label.color, 0.9), 
                    borderColor: hexToRgba(label.color, 0.3), 
                    backgroundColor: hexToRgba(label.color, 0.2) 
                }}
                className='labelsStyle text-opacity-10 bg-opacity-10 border-opacity-25' key={label.name}>{label.name}</span>

            )))
        }
        else if(labelsState.length > 0){
            return (labelsState.map((label) => (<span 
                style={{
                    color: hexToRgba(label.color, 0.9), 
                    borderColor: hexToRgba(label.color, 0.3), 
                    backgroundColor: hexToRgba(label.color, 0.2) 
                }}
                className='labelsStyle text-opacity-10 bg-opacity-10 border-opacity-25' key={label.label}>{label.label}</span>)))
        }
    }
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (labelSelectorRef.current && !labelSelectorRef.current.contains(event.target as Node) && divRef.current && !divRef.current.contains(event.target as Node) ) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [labelSelectorRef]);
    useEffect(()=>{
        setFirstLoad(false)
    },[])
  return (
    <div className="border-b pb-4 border-githubBorder relative w-full" key={markTitle[0]}>
        <div className="flex justify-between text-textgray hover:text-inputcolor text-xs font-semibold cursor-pointer relative pt-4" onClick={handleOpenLabelSelector} ref={divRef}>
            <div>{markTitle[0]}</div>
            <IoSettingsOutline className=" w-[15px] h-[16px]"/>
        </div>
        {markTitle[0] === 'Labels' && <LabelSelelctor open={open} labelSelectorRef={labelSelectorRef} initLabels={initLabels} patchInfo={patchInfo}/>}
        <div className='text-xs mt-2 text-white'>
            {markTitle[0] === 'Labels'  && (
                <div className=''>
                    {renderChooseLabels()} 
                </div>
            ) }
            {markTitle[0] === 'Labels' ? (initLabels && initLabels?.length > 0 ? '' : labelsState.length > 0 ? '' : markTitle[1]) : markTitle[1]}
            {markTitle[0] === 'Assignees' && <span className='text-textgray hover:text-inputcolor text-xs underline underline-offset-2 cursor-pointer'>assign yourself</span>}
        </div>   
    </div>
  )
}

export default Marks