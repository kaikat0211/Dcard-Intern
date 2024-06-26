'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { Octokit } from "@octokit/core";
import { usePathname } from 'next/navigation';
import { SlPencil } from "react-icons/sl";
import Image from 'next/image';
import Check from '@/public/check.svg'
import Delete from '@/public/delete.svg'
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setLabels } from '@/lib/features/labelsSlice';
import patchIssue from '@/lib/update/patchIssue';
import { Label, updateIssueInfo } from '../../types/singleIssueTypes';

interface LabelSelectorProps {
    open: boolean;
    labelSelectorRef: React.RefObject<HTMLDivElement>;
    initLabels?: Label[]
    patchInfo?: updateIssueInfo
}
interface SelectLabels{
    label : string
    color : string
}
const LabelSelelctor = ({ open, labelSelectorRef, initLabels, patchInfo }: LabelSelectorProps) => {
    const pathname = usePathname()
    const [selectedLabels, setSelectedLabels] = useState<SelectLabels[] | undefined>([])
    const [searchLabels, setSearchLabels] = useState<Label[]>([])
    const [searchValue, setSearchValue] = useState<string>('')
    const initLabelsName = initLabels?.map(label => label.name)
    const [updateLabels, setUpdateLabels] = useState<string[] | undefined>(initLabelsName)
    const dispatch = useAppDispatch()
    const token = useAppSelector(state => state.user.token)
    const initLabelsNameWithColor = useMemo(()=>{
        return initLabels?.map(label => ({ label: label.name, color: label.color }))
    },[initLabels]);
    const getLebels = async () => {
        const octokit = new Octokit({
            auth: token
          })
        const res = await octokit.request('GET /repos/{owner}/{repo}/labels', {
            owner: pathname.split('/')[1],
            repo: pathname.split('/')[2],
            headers: {
              'X-GitHub-Api-Version': '2022-11-28'
            }
          })
        return res.data.map((label : any) =>  ({
            name: label.name,
            color: label.color,
            description: label.description
        }))
    }
    const getLebelsResult = useMemo(() => {
        return getLebels();
    }, []);
    const handleLabelsState = (name: string, color: string) => {
        if (selectedLabels && !selectedLabels.some(label => label.label === name)) {
            const newLabels = [...selectedLabels, { label: name, color }];
            setUpdateLabels(prev => [...(prev || []), name])
            setSelectedLabels(newLabels)
            dispatch(setLabels(newLabels))
        } else {
            const newLabels = selectedLabels?.filter(label => label.label !== name);
            setUpdateLabels(prev => (prev || []).filter(l => l !== name))
            setSelectedLabels(newLabels)
            dispatch(setLabels(newLabels!))
        }
    }
    const LabelArr = useMemo(() => {
        if (!searchValue) {
            return searchLabels;
        }
        return searchLabels.filter(label => label.name.includes(searchValue) || label.description.includes(searchValue));
    }, [searchLabels, searchValue]);

    useEffect(()=>{
        const fetchLabels = async () => {
            try {
                const allLabels = await getLebelsResult
                setSearchLabels(allLabels)
                if(initLabels){
                    setSelectedLabels(initLabelsNameWithColor)
                    dispatch(setLabels(initLabels!.map(label => ({ label: label.name, color: `${label.color}` }))))
                }
            }catch(error){
                console.error('Error fetching labels:', error);
            }
        }
        fetchLabels()
    },[])
    useEffect(()=>{
        if(patchInfo) patchIssue(patchInfo, {labels : updateLabels})
    },[updateLabels])
  return (
    <div className={`absolute right-0 border border-githubBorder rounded-md bg-labelscolor w-[300px] max-md:w-full  z-20 ${!open && 'hidden'}`} ref={labelSelectorRef}>
        <div className='sticky top-0 border-b border-bordercolor bg-labelscolor z-30 rounded-t-md'>
            <div className='font-semibold text-white text-xs border-b p-2 border-bordercolor '>Apply labels to this issue
            </div>
            <div className='p-2'>
                <input type='text' 
                    className='w-full text-sm rounded-md outline-0 border border-bordercolor py-[5px] px-3 bg-bodycolor focus:ring-inputcolor focus:ring-2 placeholder:text-textgray text-textgray'
                    name='labels'
                    placeholder={'Filter labels'} 
                    onChange={(event : React.ChangeEvent<HTMLInputElement>)=>{setSearchValue(event.target.value)}}
                />
            </div>
        </div>
        <div className='overflow-auto h-[380px]'>
            {
                LabelArr.map((label) => (
                <div className='pl-[30px] py-2 pr-2 border-b border-bordercolor hover:bg-labelshover group cursor-pointer' key={label.name} onClick={() => handleLabelsState(label.name, label.color)}>
                    <div>
                        <div className='flex mb-1 relative items-center'>
                            {selectedLabels!.some(l => l.label === label.name) && <Image alt='checkIcon' src={Check} width={16} height={16} className=' absolute left-[-8%]'/>}
                            <div className='rounded-full w-[14px] h-[14px] mt-0.5 mr-2' style={{backgroundColor: `#${label.color}`}}>
                            </div>
                            <span className='text-xs text-white'>{label.name}</span>
                            {selectedLabels!.some(l => l.label === label.name) && <Image alt='deleteIcon' src={Delete} width={14} height={12} className=' absolute right-[3%] w-[14px] h-[12px]'/>}
                        </div>
                        <div className='text-xs text-textgray group-hover:text-white'>{label.description}</div>
                    </div>
                </div>
                ))
            }
        </div>
        <div className='sticky bottom-0 bg-labelscolor z-30 pl-[30px] py-2 pr-2 border-t border-bordercolor text-xs text-textgray rounded-b-md flex items-center gap-2 cursor-pointer hover:bg-labelshover'>
            <SlPencil />
            <span className=''>Edit labels</span>
        </div>

    </div>
  )
}

export default LabelSelelctor