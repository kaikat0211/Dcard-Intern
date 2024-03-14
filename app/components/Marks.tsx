'use client'
import React, { useEffect, useRef, useState } from 'react'
import { IoSettingsOutline } from "react-icons/io5";
import LabelSelelctor from "./LabelSelelctor";
import { useAppSelector } from '@/lib/hooks';

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

const Marks = ({ props, token } : { props : string[], token: string}) => {
    const [open, setOpen] = useState(false)
    const labelSelectorRef = useRef<HTMLDivElement>(null)
    const divRef = useRef<HTMLDivElement>(null)
    const labelsState = useAppSelector(state => state.labels.labels)
    const colorState = useAppSelector(state => state.labels.color)
    const handleOpenLabelSelector = () => {
        setOpen(!open)
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
    <div className="border-b pb-4 mb-4 border-githubBorder relative " key={props[0]}>
        <div className="flex justify-between text-textgray hover:text-inputcolor text-sm font-semibold cursor-pointer relative" onClick={handleOpenLabelSelector} ref={divRef}>
            <div>{props[0]}</div>
            <IoSettingsOutline className=" w-[15px] h-[16px]"/>
        </div>
        {props[0] === 'Labels' && <LabelSelelctor token={token} open={open} labelSelectorRef={labelSelectorRef}/>}
        <div className='text-xs mt-2'>
            {props[0] === 'Labels' && labelsState[0] !== '' && (
                <div className=''>
                    {labelsState[0] !== '' && labelsState.slice().sort().map((label, index) => (<span 
                    style={{
                        color: hexToRgba(colorState[index], 0.9), 
                        borderColor: hexToRgba(colorState[index], 0.3), 
                        backgroundColor: hexToRgba(colorState[index], 0.2) 
                    }}
                    className='labelsStyle text-opacity-10 bg-opacity-10 border-opacity-25' key={label}>{label}</span>))}
                </div>
            ) }
            {props[0] === 'Labels' ? (labelsState[0] === '' ? props[1] : '') : props[1]}
            {props[0] === 'Assignees' && <span className='text-textgray hover:text-inputcolor text-xs underline underline-offset-2 cursor-pointer'>assign yourself</span>}
        </div>   
    </div>
  )
}

export default Marks