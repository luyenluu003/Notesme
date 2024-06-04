import { useState } from "react"
import TagInput from "../components/taginput"
import { MdClose } from "react-icons/md"
import axiosInstance from "../utils/axiosInstance"

const AddEditNote = ({noteData,type,getAllNotes,onClose,showToastMessage}) => {

    const [title,setTitle] = useState(noteData?.title || "")
    const [content,setContent] = useState(noteData?.content || "")
    const [tags,setTags] = useState(noteData?.tags || [])

    const [error,setError] = useState(null)
    // Add note
    const addNewNote = async() =>{
        try{
            const reponse = await axiosInstance.post('/add-note',{
                title,
                content,
                tags
            })
            if(reponse.data && reponse.data.note){
                showToastMessage("Note Added Successfully")
                getAllNotes()
                onClose()
            }
        }catch(error){
            if(
                error.reponse &&
                error.reponse.data &&
                error.reponse.data.message
            ){
                setError(error.reponse.data.message)
            }
        }
    }

    // Edit note
    const editNote = async() =>{
        const noteId= noteData._id
        try{
            const reponse = await axiosInstance.put('/edit-note/'+noteId,{
                title,
                content,
                tags
            })
            if(reponse.data && reponse.data.note){
                showToastMessage("Note Update Successfully")
                getAllNotes()
                onClose()
            }
        }catch(error){
            if(
                error.reponse &&
                error.reponse.data &&
                error.reponse.data.message
            ){
                setError(error.reponse.data.message)
            }
        }
    }

    const handleAddNote = () =>{
        if(!title){
            setError("Please enter the title")
            return
        }
        if(!content){
            setError("Please enter the content")
            return
        }

        setError("")

        if(type==="edit"){
            editNote()
        }else{
            addNewNote()
        }
    }

    return (
        <div className="relative">

            <button className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-[#ccc]"
            onClick={onClose}>
            <MdClose className="text-xl text-dark-grey "/>
            </button>
            <div className="flex flex-col gap-2">
                <label className="input-label">TITLE</label>
                <input type="text" className="text-2xl text-black outline-none" placeholder="Please enter a title"
                value={title}
                onChange={({target})=>setTitle(target.value)} />
            </div>

            <div className="flex flex-col gap-2 mt-4">
                <label className="input-label">CONTENT</label>
                <textarea type="text" className="text-sm text-black outline-none bg-grey p-2 rounded" 
                placeholder="Content"
                rows={10}
                value={content}
                onChange={({target})=>setContent(target.value)} />
            </div>
            <div className="mt-3">
                <label className="input-label">TAGS</label>
                <TagInput tags={tags} setTags={setTags}/>
            </div>

            {error && (<p className="text-xs text-red mt-4">{error}</p>)}

            <button className="btn-primary font-medium mt-5 p-3" onClick={handleAddNote}>{type==="edit" ? "UPDATE" : "ADD"}</button>
        </div>
    )
}

export default AddEditNote