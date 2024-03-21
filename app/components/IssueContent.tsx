'use client'
import React from 'react'
import { GoIssueOpened } from "react-icons/go";
import Link from 'next/link';
import { differenceInDays } from 'date-fns'
interface Label {
    name: string;
    color: string;
    description: string;
}
interface Issue {
    id: string;
    number: number;
    title: string;
    body: string;
    createdAt: string;
    updatedAt: string;
    author: {
        login: string;
    }
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
interface Cursor {
    cursor: string
  }
interface FullIssue {
    cursor: Cursor
    node: Issue
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
    if(Math.abs(diffDay) > 1 && (Math.abs(diffDay) < 2)) return 'yesterday'
    else if(Math.abs(diffDay) < 1) return 'now'
    else return `${Math.abs(diffDay)} days ago`
}
const IssueContent = ({ issue } : { issue: FullIssue }) => {
  return (
        <div className='text-white px-4 py-2 border-t border-githubBorder flex' key={issue.node.id}>
            <div className='pt-1'>
                <GoIssueOpened style={{color: '#3FB950'}} className='text-md mr-2'/>
            </div>
            <div className='w-3/4'>
                <div className='flex items-center gap-1  flex-auto flex-wrap'>
                    <div className='' >
                        <Link href={'/'} className='font-semibold text-textgray hover:text-hoverblue pr-1'>{issue.node.repository.nameWithOwner}</Link>
                        <Link href={`${issue.node.repository.nameWithOwner}/issues/${issue.node.number}`} className='font-semibold hover:text-hoverblue'>{issue.node.title}</Link>
                    </div>
                        {issue.node.labels.nodes.map( (label : Label) => (
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
                <div className='text-xs text-textgray mt-1'>#{issue.node.number} opened 
                <span> {getDiffDay(issue.node.createdAt)} </span> 
                by 
                <span className='hover:text-hoverblue cursor-pointer' onClick={()=>{
                    
                }}> {issue.node.author.login}</span>
                </div>
            </div>
            
        </div>
  )
}

export default IssueContent