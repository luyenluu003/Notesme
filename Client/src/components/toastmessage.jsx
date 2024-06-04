import { useEffect } from 'react'
import {LuCheck} from 'react-icons/lu'
import { MdDeleteOutline } from 'react-icons/md'

const ToastMessage = ({isShown,message,type,onClose}) =>{

    useEffect(()=>{
       const timeoutId = setTimeout(()=>{
        onClose()
       },3000)
       return()=>{
        clearTimeout(timeoutId)
       } 
    },[onClose])

    return (
        <div className={`absolute top-20 right-6 transition-all duration-500 ${isShown ? "opacity-100" : "opacity-0"}`}>
            <div className={`min-w-52 bg-white border shadow-2xl rounded-md after:w-[5px] after:h-full ${type==='delete'? "after:bg-red" : "after:bg-[#00F700]"} after:absolute after:left-0 after:top-0 after:rounded-l-lg`}>
            <div className="flex items-center gap-3 py-2 px-4">
                <div className={`w-10 h-10 flex items-center justify-center rounded-full ${type==='delete'? "bg-red" : "bg-[#00F700]"}`}>
                    {type==="delete" ? (<MdDeleteOutline className='text-xl text-white' />):(
                    <LuCheck className="text-xl text-white"/>
                    )}
                </div>

                <p className="text-sm text-dark-grey">{message}</p>
            </div>
            </div>
            
        </div>

    )
}

export default ToastMessage