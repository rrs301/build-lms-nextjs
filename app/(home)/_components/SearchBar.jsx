import { Search } from 'lucide-react'
import React from 'react'

function SearchBar() {
  return (
    <div className='flex gap-3 text-[14px]
    items-center border p-2 rounded-md
    bg-gray-50 text-gray-500'>
        <Search height={17}/>
        <input type="text" 
        placeholder='Search Course'
        className='bg-transparent outline-none'/>
    </div>
  )
}

export default SearchBar