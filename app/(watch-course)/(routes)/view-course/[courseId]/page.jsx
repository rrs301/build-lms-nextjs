"use client"
import React, { useEffect, useState } from 'react'
import ChapterNav from './_components/ChapterNav'
import FullVideoPlayer from './_components/FullVideoPlayer'
import { UserButton, useUser } from '@clerk/nextjs'
import { getCourseById } from '../../../../_services';
import {CompletedChapterContext} from '../../../../../app/_context/CompletedChapterContext'
import { useAptabase } from '@aptabase/react'
function ViewCourse({params}) {
    const {user}=useUser();
    const [course,setCourse]=useState([]);
    const [userCourse,setUserCourse]=useState();
    const [activeChapter,setActiveChapter]=useState();
    const [completedChapter,setCompletedChapter]=useState();

  const { trackEvent } = useAptabase();

    useEffect(()=>{
       user? getCourse():null;
    },[user])

    const getCourse=async()=>{
        await getCourseById(params?.courseId,
            user.primaryEmailAddress.emailAddress)
            .then(resp=>{
                setCourse(resp.courseList);
                setUserCourse(resp?.userEnrollCourses[0]);
                setCompletedChapter(resp?.userEnrollCourses[0]?.completedChapter)
            });
        trackEvent("Watch-Course",{
          courseName:course?.name,
          userEmail:user?.primaryEmailAddress?.emailAddress
        })
    }
  return course?.name&&(
    <div className=''>
        <CompletedChapterContext.Provider value={{completedChapter,setCompletedChapter}}>
        <div className='hidden fixed bg-white md:block 
        md:w-80 border  shadow-sm h-screen z-50'>
         {course?  <ChapterNav course={course}
            userCourse={userCourse}
            setActiveChapter={(chapter)=>setActiveChapter(chapter)} />
            :null}
        </div>
        <div className='md:ml-80'>
            <div className='float-right p-5 '>
            <UserButton/>
            </div> 
           
            <FullVideoPlayer
             userCourse={userCourse}
              activeChapter={activeChapter} />

              <div className='md:hidden'>
              {course?  <ChapterNav course={course}
            userCourse={userCourse}
            setActiveChapter={(chapter)=>setActiveChapter(chapter)} />
            :null}
              </div>
        </div>
        </CompletedChapterContext.Provider>
    </div>
  )
}

export default ViewCourse