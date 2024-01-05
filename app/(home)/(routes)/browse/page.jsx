"use client"
import React, { useContext, useEffect, useState } from 'react'
import CategoryFilter from './_components/CategoryFilter'
import {getCourseList} from './../../../_services/index'
import CourseList from './_components/CourseList'
import GlobalApi from './../../../_services/GlobalApi';
import { useUser } from '@clerk/nextjs'
import { UserMembershipContext } from '../../../_context/UserMembershipContext'
import { useAptabase } from '@aptabase/react'
function Browse() {
  const { trackEvent } = useAptabase();
  const [courses,setCourses]=useState([]);
  const [coursesOrg,setCoursesOrg]=useState([]);
  const {user}=useUser();
  const {userMembership,setUserMembership}=useContext(UserMembershipContext);
  useEffect(()=>{
    getCourses()
    //user&&getUserSubscription_();
    
  },[user])

  const getUserSubscription_= ()=>{
     GlobalApi.getUserSubscription().then(resp=>{
     
     const data= resp.data.data.find(item=>item.payer_email==user.primaryEmailAddress.emailAddress);

     if(data)
      {
        
        setUserMembership(true)
      }
    })
  }
  const getCourses=()=>{
    getCourseList().then(resp=>{
     
      setCourses(resp.courseLists);
      setCoursesOrg(resp.courseLists)
    })
    trackEvent('user-home', { userEmail:user?.primaryEmailAddress?.emailAddress });

  }

  const filterCourse=(category)=>{
    if(category=='all')
    {
      setCourses(coursesOrg);
      return ;
    }

    const filteredList=coursesOrg.filter(course=>{
      return course.tag.includes(category);
    })

    setCourses(filteredList);
  }
  return (
    <div>
      <CategoryFilter selectedCategory={(category)=>filterCourse(category)} />
     {courses? <CourseList courses={courses} />:null}
    </div>
  )
}

export default Browse