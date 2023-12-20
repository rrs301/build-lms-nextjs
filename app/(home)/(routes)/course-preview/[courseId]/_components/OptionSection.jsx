import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react'
import { UserMembershipContext } from '../../../../../_context/UserMembershipContext';

function OptionSection(courseDetail) {
    const optionsList=[
        {
            id:1,
            name:'Github',
            icon:'/github.png',
            url:'sourceCode'
        },
        {
            id:2,
            name:'Demo',
            icon:'/demo.png',
            url:'demoUrl'
        },
        {
            id:3,
            name:'Youtube',
            icon:'/youtube.png',
            url:'youtubeUrl'
        },
    ]
    const router=useRouter();
    const {userMembership,setUserMembership}=
    useContext(UserMembershipContext);
  return (
    <div className='flex items-center gap-3'>
        {optionsList.map((option,index)=>(
            <div key={index}
            className='p-2 border rounded-lg flex flex-col 
            items-center w-full cursor-pointer'
            onClick={()=>
                !userMembership
                ?router.push('/membership')
                :window.open(courseDetail.courseDetail
                    [option.url])}
            >
                <Image src={option.icon}
                width={30}
                height={30}
                alt='icons'
                />
                <h2 className='text-[14px]
                texr-gray-500'>{option.name}</h2>
            </div>
        ))}
    </div>
  )
}

export default OptionSection