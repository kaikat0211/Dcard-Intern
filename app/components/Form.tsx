'use client'
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css"
import React, { FormEvent, useRef, useState, ReactNode, useEffect} from 'react'
import { z } from 'zod'
import MDEditor from "@uiw/react-md-editor";
import Image from "next/image";
import { useAppSelector } from "@/lib/hooks";
import Link from "next/link";
import Marks from "./Marks";
import { Octokit } from "@octokit/core";
import { usePathname, useRouter } from "next/navigation";

const UserSchema = z.object({
    title: z.string().min(1, {message: '請輸入標題'}),
    body: z.string().min(30, {message: '至少需要30字'})
})
const marksArr = [['Assignees', 'No one—'],['Labels', 'none yet'],['Projects', 'none yet'],['Milestone', 'No milestone']]
interface IssueData {
    token: string;
    owner: string;
    repo: string;
    title: string;
    body: string;
    labels: string[];
}
const Form = ({token} : { token : string }) => {
    const [value, setValue] = useState('');
    const [error, setError] = useState<ReactNode>(null)
    const [titleValue, setTitleValue] = useState('');
    const [isTitleEmpty, setIsTitleEmpty] = useState(true)
    const state = useAppSelector(state => state.user)
    const title = useRef<HTMLInputElement>(null)
    const body = useRef<HTMLTextAreaElement>(null)
    const router = useRouter()
    const pathname = usePathname()
    useEffect(()=> {
        setIsTitleEmpty(!titleValue)
    },[titleValue])
    const postIssue = async ({token, owner, repo, title, body, labels}: IssueData) => {
        const octokit = new Octokit({
            auth: token
        });
        await octokit.request(`POST /repos/${owner}/${repo}/issues`, {
            owner: owner,
            repo: repo,
            title: title,
            body: body,
            labels: labels,
            headers: {
              'X-GitHub-Api-Version': '2022-11-28'
            }
          })
        //handle error 
    }
    const handleSubmit = (e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        const titleValue = title.current!.value
        const bodyValue = value
        const validationResult = UserSchema.safeParse({
            title: titleValue,
            body: bodyValue
        })
        const postIssueData: IssueData = {
            token: token,
            owner: pathname.split('/')[1],
            repo: pathname.split('/')[2],
            title: titleValue,
            body: bodyValue,
            labels: ['bug']
        }
        if(validationResult.success){
            setError(null)
            postIssue(postIssueData)
            e.currentTarget.reset()
            setValue('')
            setIsTitleEmpty(true)
            router.push(`http://localhost:3000/${pathname.split('/')[1]}/${pathname.split('/')[2]}/issues`)
        }else{
            const errorMsg = validationResult.error.issues.map(( issue ) => (
                <div key={issue.message} className=''>
                    {issue.path[0]} : {issue.message}
                </div>
            ))
            setError(errorMsg)
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            
            <div className='text-white mt-6 mx-20 px-10 flex'>
                <div className='mr-4'>
                {state.photo && (
                    <Link href={'http://localhost:3000/'} className="inline-block">
                        <Image src={state.photo} alt={state.name} width={40} height={40} className="rounded-full"/>
                    </Link>
                )}
                </div>
                <div className="w-3/4">
                    <h3 className='font-semibold mb-2'>Add a title</h3>
                    <input type='text' 
                    className='w-full text-sm rounded-md outline-0 border border-bordercolor py-2.5 px-3 bg-bodycolor focus:ring-inputcolor focus:ring-2' 
                    name='title'
                    onChange={(event) => setTitleValue(event.target.value)}
                    ref={title}
                    placeholder={'Title'} />
                    <div className='mt-3'>
                        <legend>
                            <h3 className='font-semibold mb-2'>Add a description</h3>
                        </legend>
                        <div>
                            <MDEditor
                            value={value}
                            ref={body}
                            onChange={(newValue) => setValue(newValue || '')}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end my-4">
                        <button 
                        className={`bg-submitbuttoncolor px-4 py-[5px] ml-2 rounded-lg font-semibold text-sm ${isTitleEmpty ? 'text-disablecolor' : 'text-white'}`} 
                        disabled={isTitleEmpty}
                        >
                            Submit new issue
                        </button>
                        {error && <div className=' text-red-600'>{error}</div>}
                    </div>
                </div>
                <div className="w-1/5 ml-4 ">
                    {marksArr.map( (s, index) => (
                        <div key={index}>
                            <Marks props={s}/>
                        </div>
                    ))}
                </div>
            </div>
        </form>
    );
};

export default Form;
