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
    title: z.string().refine((val) => val.trim() !== '', {
        message: '標題不得為空',
      }),
    body: z.string().min(30, {message: '內容需要至少30字'})
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
const Form = ({ userPhoto } : { userPhoto : string | null}) => {
    const [value, setValue] = useState('');
    const [error, setError] = useState<ReactNode[]>([])
    const [titleValue, setTitleValue] = useState('');
    const [isTitleEmpty, setIsTitleEmpty] = useState(true)
    const [postError, setPostError] = useState(false)
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
        try{
            const octokit = new Octokit({
                auth: token
            });
            const response = await octokit.request(`POST /repos/${owner}/${repo}/issues`, {
                owner: owner,
                repo: repo,
                title: title,
                body: body,
                labels: labels,
                headers: {
                  'X-GitHub-Api-Version': '2022-11-28'
                }
              })    
            return response.data
        }
        catch(error){
            console.log('fail to post issue', error)
        }
        
    }
    const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) =>{
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
            setError([])
            const response = await postIssue(postIssueData);
            if(response.OK) {
                setTitleValue('')
                setValue('')
                setPostError(false)
                setIsTitleEmpty(true)
                router.push(`/${pathname.split('/')[1]}/${pathname.split('/')[2]}/issues/${response.number}`)
            }else{
                setPostError(true)
                return
            }
        }else{
            const errorMsg = validationResult.error.issues.map(( issue ) => (
                issue.message
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
                    <Title titleValue={titleValue} setTitleValue={setTitleValue} titleRef={titleRef} error={error}/>
                    <div className='mt-3'>
                        <legend>
                            <h3 className={`font-semibold mb-2 ${error?.some(item => typeof item === 'string' && item.includes("內容")) ? 'after:content-["*需30字"] after:text-red-500 after:text-sm' : ''}}`}>Add a description</h3>
                        </legend>
                    </div>
                    <div>
                        <Markdown value={value} setValue={setValue} bodyRef={bodyRef} />
                    </div>         
                    <div className="flex justify-end my-4">
                        <button 
                        className={`bg-submitbuttoncolor px-4 py-[5px] ml-2 rounded-lg font-semibold text-sm ${isTitleEmpty ? 'text-disablecolor' : 'text-white'}`} 
                        disabled={isTitleEmpty}
                        >
                            Submit new issue
                        </button>
                    </div>
                    {postError && <span className="text-red-500">請再試一次</span>}
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
