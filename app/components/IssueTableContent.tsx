'use client'
import React, { useEffect, useState } from 'react'
import { graphql } from "@octokit/graphql";
import { useAppSelector } from '@/lib/hooks';
import { GoIssueOpened } from "react-icons/go";
import { differenceInDays } from 'date-fns'
import Link from 'next/link';

interface Label {
    name: string;
    color: string;
    description: string;
}

interface Issue {
    number: number;
    title: string;
    body: string;
    createdAt: string;
    updatedAt: string;
    labels: {
        nodes: Label[];
    };
    comments: {
        totalCount: number;
    };
    repository: {
        nameWithOwner: string;
    };
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
const getDiffDay = (day : string) => {
    const createDate = new Date(day)
    const nowTime = new Date()
    const diffDay = differenceInDays(createDate, nowTime)
    if(Math.abs(diffDay) < 1) return 'yesterday'
    else return `${Math.abs(diffDay)} days ago`
}
const IssueTableContent = ({ initIssue } : { initIssue : Issue[] | undefined }) => {
    const userState = useAppSelector(state => state.user)
    const [newIssue, setNewIssue] = useState<Issue[] | undefined>(initIssue)
  return (
    <>
    {newIssue!.map(i => (
        <div className='text-white px-4 py-2 border-t border-githubBorder flex' key={i.title}>
            <div className='pt-1'>
                <GoIssueOpened style={{color: '#3FB950'}} className='text-md mr-2'/>
            </div>
            <div className='w-3/4'>
                <div className='flex items-center gap-1  flex-auto flex-wrap'>
                    <div className='' >
                        <Link href={'/'} className='font-semibold text-textgray hover:text-hoverblue pr-1'>{i.repository.nameWithOwner}</Link>
                        <Link href={'/'} className='font-semibold hover:text-hoverblue'>{i.title}</Link>
                    </div>
                        {i.labels.nodes.map( label => (
                            <span 
                            className='px-[7px] rounded-full cursor-pointer font-semibold text-xs border' 
                            key={label.name}
                            style={{
                                color: hexToRgba(label.color, 0.9), 
                                borderColor: hexToRgba(label.color, 0.3), 
                                backgroundColor: hexToRgba(label.color, 0.2) 
                            }}>
                                {label.name}
                            </span>
                        ))}
                </div>
                <div className='text-xs text-textgray mt-1'>#{i.number} opened 
                <span> {getDiffDay(i.createdAt)} </span> 
                by 
                <span className='hover:text-hoverblue'> {userState.name}</span>
                </div>
            </div>
            
        </div>
    ))}
    </>
  )
}

export default IssueTableContent