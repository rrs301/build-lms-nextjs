import { CheckCircle2, PauseCircle, PlayCircle } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { CompletedChapterContext } from '../../../../../_context/CompletedChapterContext';

function ChapterNav({course,userCourse,setActiveChapter}) {
    const [activeIndex,setActiveIndex]=useState(0);
    const {completedChapter,setCompletedChapter}=useContext(CompletedChapterContext)
    useEffect(()=>{
        setActiveChapter(course?.chapter[0]);

    },[])

    const isChapterCompleted=(chapterId)=>{
       return completedChapter.find(item=>item.chapterId==chapterId)
    }
  return (
    <div>
        <div className='border-b p-5'>
            <h2 className='font-medium text-[20px]'>{course.name}</h2>
            <h2 className='text-gray-500 text-[14px]'>By {course.author}</h2>
        </div>
        <div className='overflow-auto  h-[600px]'>
            {course?.chapter?.map((chapter,index)=>(
                <div key={index} 
                onClick={()=>{setActiveIndex(index);
                setActiveChapter(chapter)}}
                className={`flex gap-2 text-gray-500
                md:text-[14px] text-[12px] px-5 p-4 cursor-pointer
                hover:bg-gray-100
                ${isChapterCompleted(chapter.chapterNumber)&&activeIndex!=index?'bg-purple-100 text-purple-600':null}
                ${activeIndex==index?'bg-green-100 text-green-700':null}`}>
                   {activeIndex==index
                   ?<PauseCircle height={25} width={25}/>: 
                   isChapterCompleted(chapter.chapterNumber)?
                   <CheckCircle2 height={25} width={25}/>:
                   <PlayCircle height={25} width={25}/>}
                    <h2 className='line-clamp-2'>{chapter.name}</h2>
                </div>
            ))}
        </div>
    </div>
  )
}

export default ChapterNav