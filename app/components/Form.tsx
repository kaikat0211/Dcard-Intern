'use client'
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css"
import React, { FormEvent, useRef, useState, ReactNode, useEffect} from 'react'
import { z } from 'zod'
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Link from "next/link";
import Marks from "./Marks";
import { Octokit } from "@octokit/core";
import { usePathname, useRouter } from "next/navigation";
import Title from "./Title";
import Markdown from "./Markdown";
import { setLabels } from "@/lib/features/labelsSlice";


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
const Form = ({ userPhoto } : { userPhoto : string }) => {
    const [value, setValue] = useState('');
    const [error, setError] = useState<ReactNode>(null)
    const [titleValue, setTitleValue] = useState('');
    const [isTitleEmpty, setIsTitleEmpty] = useState(true)
    const dispatch = useAppDispatch()
    const userState = useAppSelector(state => state.user)
    const labelsState = useAppSelector(state => state.labels)
    const titleRef = useRef<HTMLInputElement>(null)
    const bodyRef = useRef<HTMLTextAreaElement>(null)
    const router = useRouter()
    const pathname = usePathname()
    const token = userState.token
    const createNewIssue = true
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
    }
    const handleSubmitForm = (e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        const titleValue = titleRef.current!.value
        const bodyValue = value
        const validationResult = UserSchema.safeParse({
            title: titleValue,
            body: bodyValue
        })
        const postLabelsArr = labelsState.labels.map(l => l.label )
        const postIssueData: IssueData = {
            token: token,
            owner: pathname.split('/')[1],
            repo: pathname.split('/')[2],
            title: titleValue,
            body: bodyValue,
            labels: postLabelsArr
        }
        if(validationResult.success){
            setError(null)
            postIssue(postIssueData)
            e.currentTarget.reset()
            setValue('')
            setIsTitleEmpty(true)
            router.push(`/${pathname.split('/')[1]}/${pathname.split('/')[2]}/issues`)
        }else{
            const errorMsg = validationResult.error.issues.map(( issue ) => (
                <div key={issue.message} className=''>
                    {issue.path[0]} : {issue.message}
                </div>
            ))
            setError(errorMsg)
        }
    }
    useEffect(()=> {
        setIsTitleEmpty(!titleValue)
    },[titleValue])
    useEffect(()=> {
        dispatch(setLabels([]))
    },[])
    return (
        <form onSubmit={handleSubmitForm}>
            <div className='text-white mt-6 mx-20 px-10 flex'>
                <div className='mr-4'>
                {userPhoto && (
                    <Link href={'/'} className="inline-block">
                        <Image src={userPhoto} alt={userState.name} width={40} height={40} className="rounded-full"/>
                    </Link>
                )}
                </div>
                <div className="w-3/4">
                    <Title titleValue={titleValue} setTitleValue={setTitleValue} titleRef={titleRef}/>
                    <div className='mt-3'>
                        <legend>
                            <h3 className='font-semibold mb-2'>Add a description</h3>
                        </legend>

                    </div>
                    <Markdown value={value} setValue={setValue} bodyRef={bodyRef}/>
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
                            <Marks markTitle={s} initLabels={undefined} userIdentity={undefined} patchInfo={undefined} createNewIssue={createNewIssue}/>
                        </div>
                    ))}
                </div>
                
            </div>
        </form>
    );
};

export default Form;
