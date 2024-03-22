'use client'
import React, { useEffect, useRef, useState } from 'react'
import { IoSettingsOutline } from "react-icons/io5";
import LabelSelelctor from "./LabelSelelctor";
import { useAppSelector } from '@/lib/hooks';
interface Label {
    name: string;
    color: string;
    description: string;
}
function hexToRgba(hex: string, alpha: number): string {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => {
        return r + r + g + g + b + b;
    });

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result === null) {
        throw new Error("Invalid hex color string");
    }
    const r = parseInt(result[1]!, 16);
    const g = parseInt(result[2]!, 16);
    const b = parseInt(result[3]!, 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const Marks = ({ markTitle, initLabels } : { markTitle : string[], initLabels?: Label[] | undefined}) => {
    const [open, setOpen] = useState(false)
    const labelSelectorRef = useRef<HTMLDivElement>(null)
    const divRef = useRef<HTMLDivElement>(null)
    const labelsState = useAppSelector(state => state.labels.labels)
    const colorState = useAppSelector(state => state.labels.color)
    const initLabelsNameandColor = initLabels?.map(label => [label.name, label.color])
    const handleOpenLabelSelector = () => {
        setOpen(!open)
    }

    // const renderChooseLabels = () => {
    //     if(initLabels) {
    //         return (initLabels?.map(label => (
    //             <span 
    //             style={{
    //                 color: hexToRgba(label.color, 0.9), 
    //                 borderColor: hexToRgba(label.color, 0.3), 
    //                 backgroundColor: hexToRgba(label.color, 0.2) 
    //             }}
    //             className='labelsStyle text-opacity-10 bg-opacity-10 border-opacity-25' key={label.name}>{label.name}
    //             </span>
    //             )))
            
    //     }else if (labelsState[0] !== ''){
    //         return (labelsState[0] !== '' && labelsState.slice().sort().map((label, index) => (<span 
    //             style={{
    //                 color: hexToRgba(colorState[index], 0.9), 
    //                 borderColor: hexToRgba(colorState[index], 0.3), 
    //                 backgroundColor: hexToRgba(colorState[index], 0.2) 
    //             }}
    //             className='labelsStyle text-opacity-10 bg-opacity-10 border-opacity-25' key={label}>{label}</span>)))
    //     }
    // }
const renderChooseLabels = () => {
        if (labelsState[0] !== ''){
            return (labelsState[0] !== '' && labelsState.slice().sort().map((label, index) => (<span 
                style={{
                    color: hexToRgba(colorState[index], 0.9), 
                    borderColor: hexToRgba(colorState[index], 0.3), 
                    backgroundColor: hexToRgba(colorState[index], 0.2) 
                }}
                className='labelsStyle text-opacity-10 bg-opacity-10 border-opacity-25' key={label}>{label}</span>)))
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

  return (
    <div className="border-b pb-4 border-githubBorder relative " key={markTitle[0]}>
        <div className="flex justify-between text-textgray hover:text-inputcolor text-xs font-semibold cursor-pointer relative pt-4" onClick={handleOpenLabelSelector} ref={divRef}>
            <div>{markTitle[0]}</div>
            <IoSettingsOutline className=" w-[15px] h-[16px]"/>
        </div>
        {markTitle[0] === 'Labels' && <LabelSelelctor open={open} labelSelectorRef={labelSelectorRef} initLabels={initLabels}/>}
        <div className='text-xs mt-2 text-white'>
            {markTitle[0] === 'Labels'  && (
                <div className=''>
                    {renderChooseLabels()}
                </div>
            ) }
            {markTitle[0] === 'Labels' ? (labelsState[0] === '' && !initLabels ? markTitle[1] : '') : markTitle[1]}
            {markTitle[0] === 'Assignees' && <span className='text-textgray hover:text-inputcolor text-xs underline underline-offset-2 cursor-pointer'>assign yourself</span>}
        </div>   
    </div>
  )
}

export default Marks