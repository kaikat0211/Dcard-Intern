'use client'
import React, { useEffect, useState } from 'react'
import { Octokit } from "@octokit/core";
import { usePathname } from 'next/navigation';
import { SlPencil } from "react-icons/sl";
import Image from 'next/image';
import Check from '@/public/check.svg'
import Delete from '@/public/delete.svg'
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setLabels } from '@/lib/features/labelsSlice';
interface LabelsData {
    name: string
    color: string
    description: string
} 
interface LabelSelectorProps {
    open: boolean;
    labelSelectorRef: React.RefObject<HTMLDivElement>;
    initLabels?: LabelsData[]
}
interface SelectLabels{
    label : string
    color : string
}
const LabelSelelctor = ({ open, labelSelectorRef, initLabels }: LabelSelectorProps) => {
    const pathname = usePathname()
    const [selectedLabels, setSelectedLabels] = useState<SelectLabels[] | undefined>([])
    const [customLabels, setcustomLabels] = useState<LabelsData[]>([])
    const [searchValue, setSearchValue] = useState<string>('')
    const dispatch = useAppDispatch()
    const token = useAppSelector(state => state.user.token)
    const initLabelsName = initLabels?.map(label => ({ label: label.name, color: label.color }));
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
    const handleLabelsState = (name: string, color: string) => {
        if (selectedLabels && !selectedLabels.some(label => label.label === name)) {
            const newLabels = [...selectedLabels, { label: name, color }];
            setSelectedLabels(newLabels)
            dispatch(setLabels(newLabels))
        } else {
            const newLabels = selectedLabels?.filter(label => label.label !== name);
            setSelectedLabels(newLabels)
            dispatch(setLabels(newLabels!))
        }
    }
    const LabelArr = () => {
        let mapArr
        if(searchValue) {
            mapArr = customLabels.filter( label => label.name.includes(searchValue) || label.description.includes(searchValue))
        }else{
            mapArr = customLabels
        }
        return mapArr
    }
    useEffect(()=>{
        const fetchLabels = async () => {
            try {
                const allLabels = await getLebels()
                const colors = allLabels.map(label => label.color);
                setcustomLabels(allLabels)
                if(initLabels){
                    setSelectedLabels(initLabelsName)
                    dispatch(setLabels(initLabels!.map(label => ({ label: label.name, color: `${label.color}` }))))
                }
                console.log('getLables')
            }catch(error){
                console.error('Error fetching labels:', error);
            }
        }
        fetchLabels()
    },[])
  return (
    <div className={`absolute right-0 border border-githubBorder rounded-md bg-labelscolor w-[300px]  z-20 ${!open && 'hidden'}`} ref={labelSelectorRef}>
        <div className='sticky top-0 border-b border-bordercolor bg-labelscolor z-30'>
            <div className='font-semibold text-white text-xs border-b p-2 border-bordercolor '>Apply labels to this issue
            </div>
            <div className='p-2'>
                <input type='text' 
                    className='w-full text-sm rounded-md outline-0 border border-bordercolor py-[5px] px-3 bg-bodycolor focus:ring-inputcolor focus:ring-2 placeholder:text-textgray'
                    name='labels'
                    placeholder={'Filter labels'} 
                    onChange={(event : React.ChangeEvent<HTMLInputElement>)=>{setSearchValue(event.target.value)}}
                />
            </div>
        </div>
        <div className='overflow-auto h-[380px]'>
            {
                LabelArr().map((label) => (
                <div className='pl-[30px] py-2 pr-2 border-b border-bordercolor hover:bg-labelshover group cursor-pointer' key={label.name} onClick={() => handleLabelsState(label.name, label.color)}>
                    <div>
                        <div className='flex mb-1 relative items-center'>
                            {selectedLabels!.some(l => l.label === label.name) && <Image alt='checkIcon' src={Check} width={16} height={16} className=' absolute left-[-8%]'/>}
                            <div className='rounded-full w-[14px] h-[14px] mt-0.5 mr-2' style={{backgroundColor: `#${label.color}`}}>
                            </div>
                            <span className='text-xs text-white'>{label.name}</span>
                            {selectedLabels!.some(l => l.label === label.name) && <Image alt='deleteIcon' src={Delete} width={14} height={12} className=' absolute right-[3%]'/>}
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