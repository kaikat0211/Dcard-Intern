'use client'
import React from 'react'
import { GoIssueOpened } from "react-icons/go";
import Link from 'next/link';
import { hexToRgba } from '@/lib/simple/hexToRgbaFunc';
import getDiffDay from '@/lib/simple/getTimeFunc';
import { FullIssue } from '../types/allIssueTypes';
import { Label } from '../types/singleIssueTypes';

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