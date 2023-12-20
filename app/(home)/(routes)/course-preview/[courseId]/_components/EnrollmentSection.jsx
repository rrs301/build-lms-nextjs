import React, { useContext } from 'react'
import { EnrollCourse, PublishCourse } from '../../../../../_services'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation';
import { UserMembershipContext } from '../../../../../_context/UserMembershipContext';

function EnrollmentSection({courseDetail,userCourse}) {
    const {user}=useUser();
    const router=useRouter();
  const {userMembership,setUserMembership}=
  useContext(UserMembershipContext);
    const enrollCourse=async()=>{
        if(user)
        {
        await EnrollCourse(courseDetail.id,user.primaryEmailAddress.emailAddress)
        .then(async(resp)=>{
            if(resp)
            {
                await PublishCourse(resp?.createUserEnrollCourse?.id)
                .then(result=>{
                    if(result)
                    {
                        courseDetail.totalChapters?
                        router.push('/view-course/'+courseDetail.id)
                        :window.location.reload();
                    }
                })
            }
        })
    }
    else{
        router.push('/sign-in');
    }
    }
  return (
    <div>
        {userCourse?.courseId&&!courseDetail.youtubeUrl?
        <div className='mt-5 border rounded-lg p-4 text-center'>
        <h2 className='text-gray-500 '>Continue to Build Project,Access Source Code and Track your Progress for free!</h2>
        <button
        className='p-2 w-full bg-purple-500
        text-white rounded-lg text-[14px] mt-2 
        hover:bg-purple-700' 
        onClick={()=>courseDetail?.totalChapters
            ?router.push('/view-course/'+courseDetail.id):window.location.reload()}
        >Continue</button>
    </div>:null
        }
       {courseDetail.free
       &&!courseDetail.youtubeUrl||(userMembership&&!userCourse?.courseId) ?
       <div className='mt-5 border rounded-lg p-4 text-center'>
            <h2 className='text-gray-500'>Learn and Build Project,Access Source Code and Track your Progress for free!</h2>
            <button
            className='p-2 w-full bg-purple-500
            text-white rounded-lg text-[14px] mt-2 
            hover:bg-purple-700' 
            onClick={()=>enrollCourse()}>Enroll Now</button>
        </div>
       : !userCourse?.courseId&&!courseDetail.youtubeUrl?
       <div className='mt-5 border rounded-lg p-4 text-center'>
            <h2 className='text-gray-500 font-light'>
                Buy Monthly membership and get access to all course, Source code and Track your progress 
            </h2>
            <button
            onClick={()=>router.push('/membership')}
            className='p-2 w-full bg-purple-500
            text-white rounded-lg text-[14px] mt-2 
            hover:bg-purple-700'>Buy Membership $2.99/Month</button>
        </div>
      :
      courseDetail.youtubeUrl?
        <div className='mt-5 
        border rounded-lg p-4 text-center'>
            <h2 className='text-gray-500'>
                Watch Comlete Course on Youtube for Free! 
            </h2>
            <button
            className='p-2 w-full bg-red-500
            text-white rounded-lg text-[14px] mt-2 
            hover:bg-red-700' 
            onClick={()=>window.open(courseDetail.youtubeUrl)}>Watch On Youtube</button>
            </div>
        :null}

     {/* {!userMembership?   <div className='mt-5 border rounded-lg p-4 text-center'>
            <h2 className='text-gray-500'>
                Buy Monthly membership and get access to all course, Source code and Track your progress 
            </h2>
            <button
            onClick={()=>router.push('/membership')}
            className='p-2 w-full bg-purple-500
            text-white rounded-lg text-[14px] mt-2 
            hover:bg-purple-700'>Buy Membership $2.99/Month</button>
        </div>:null} */}
    </div>
  )
}

export default EnrollmentSection