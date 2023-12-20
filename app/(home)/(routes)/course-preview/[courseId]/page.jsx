"use client"
import React, { useEffect, useState } from 'react'
import { getCourseById } from '../../../../_services'
import VideoPlayer from './_components/VideoPlayer'
import CourseDetails from './_components/CourseDetails'
import OptionSection from './_components/OptionSection'
import EnrollmentSection from './_components/EnrollmentSection'
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import { useAptabase } from '@aptabase/react'

function CoursePreview({params}) {
  const [courseDetail,setCourseDetails]=useState([]);
  const [userCourse,setUserCourse]=useState([]);
  const { trackEvent } = useAptabase();

  const {user}=useUser();
  useEffect(()=>{
    params.courseId?getCourse(params.courseId):null;
  },[user])

  const getCourse=()=>{
    getCourseById(params.courseId,user?.primaryEmailAddress?.emailAddress)
    .then(resp=>{
      setCourseDetails(resp.courseList);
      setUserCourse(resp?.userEnrollCourses[0])
    })

    trackEvent('course-preview',{
      courseName:courseDetail?.name,
      email:user?.primaryEmailAddress?.emailAddress
    });
  }
  return courseDetail?.name&&(
    <div className=''>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
        <div className='col-span-2'>
       {courseDetail?.chapter[0]? <VideoPlayer 
          videoUrl={courseDetail?.chapter[0]?.video.url} />:
          <Image src={courseDetail?.banner?.url}
          width={1000}
          height={500}
          alt='banner'
          className='rounded-lg'/>}
          <CourseDetails courseDetail={courseDetail}/>
        </div>
        <div className=' mt-5 md:mt-0'>
          <OptionSection courseDetail={courseDetail}/>
          <EnrollmentSection courseDetail={courseDetail}
          userCourse={userCourse} />
        </div>

      </div>
    </div>
  )
}

export default CoursePreview