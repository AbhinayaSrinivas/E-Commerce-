import React from 'react'

export default function Category({finalcat, setcatName}) {
    let cat = finalcat.map((v,i)=>{
        return (
            <li onClick={()=>setcatName(v)} key={i} className='bg-[#ccc] p-[7px] cursor-pointer text-[20px] font-serif font-[500] mb-2'>{v.name}</li>
        )
    })
  return (
    <div>
        <h3 className='text-[25px] font-[500] p-[10px]'>Product Category</h3>
        <ul>
            {cat}
        </ul>
    </div>
  )
}
