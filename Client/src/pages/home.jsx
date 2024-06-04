import { MdAdd } from "react-icons/md"
import NavBar from "../components/navbar"
import NoteCard from "../components/notecard"
import AddEditNote from "./addEditNotes"
import { useEffect, useState } from "react"
import Modal from "react-modal"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../utils/axiosInstance"
import ToastMessage from "../components/toastmessage"
import EmptyCard from "../components/emptycard"
import addNotesImg from "../imgs/nodata.png"



const Home = () => {

    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShown: false,
        type: "add",
        data: null
    })

    const [userInfo, setUserInfo] = useState(null)
    const [allNotes, setAllNotes] = useState(null)
    const [showToastMsg,setShowToastMsg] = useState({
        isShown:false,
        message:"",
        type:"add"
    })
    const [isSearch ,setIsSearch] =useState(false)

    const navigate = useNavigate()

    const handleEdit = (noteDetails) =>{
        setOpenAddEditModal({
            isShown:true,
            data:noteDetails,
            type:"edit"
        })
    }

    const showToastMessage = (message,type) =>{
        setShowToastMsg({
            isShown:true,
            message,
            type
        })
    }

    const handleCloseToast = () =>{
        setShowToastMsg({
            isShown:false,
            message:"",
        })
    }

    //get user info
    const getUserInfo = async () => {
        try {
            const response = await axiosInstance.get("/get-user")
            if (response.data && response.data.user) {
                setUserInfo(response.data.user)
            }
        } catch (error) {
            if (error.response.status === 401) {
                localStorage.clear()
                navigate("/login")
            }
        }
    }



    // getAllNotes api call
    const getAllNotes = async () => {
        try {
            const response = await axiosInstance.get("/get-all-notes")
            if (response.data && response.data.notes) {
                setAllNotes(response.data.notes)
            }
        } catch (error) {
            console.log("An unexpected error occurred. Please try again.")
        }
    }

    // delete note
    const deleteNote = async (data) => {
        const noteId= data._id
        try{
            const reponse = await axiosInstance.delete('/delete-note/'+noteId)
            if(reponse.data && !reponse.data.error){
                showToastMessage("Note Deleted Successfully","delete")
                getAllNotes()
                onClose()
            }
        }catch(error){
            if(
                error.reponse &&
                error.reponse.data &&
                error.reponse.data.message
            ){
                console.log("An unexpected error occurred. Please try again.")
            }
        }
    }
    //search
    const onSearchNote = async (query) =>{
        try{
            const response = await axiosInstance.get("/search-notes",{
                params:{query}
            })
            if(response.data && response.data.notes){
                setIsSearch(true)
                setAllNotes(response.data.notes)
            }
        }catch(error){
            console.log(error)
        }

    }

    const handleClearSearch = () =>{
        setIsSearch(false)
        getAllNotes()
    }

    const updateIsPinned= async (noteData)=>{
        const noteId= noteData._id
        try{
            const reponse = await axiosInstance.put('/update-note-pinned/'+noteId,{
                "isPinned":!noteData.isPinned
            })
            if(reponse.data && reponse.data.note){
                showToastMessage("Note Update Successfully")
                getAllNotes()
            }
        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        getAllNotes()
        getUserInfo()
        return () => { }
    }, [])


    return (
        <>

            <div className="  h-screen bg-image w-full ">
            <NavBar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch}/>

                <div className="px-auto px-5 md:px-10">
                {
                    allNotes?.length > 0 ? <div className="grid md:grid-cols-4 gap-4 mt-8">
                    {allNotes?.map((item, index) => (
                        <NoteCard key={item._id} title={item.title} date={item.createdOn} content={item.content} tags={item.tags} isPinned={item.isPinned} onEdit={() => {handleEdit(item) }} onDelete={() => {deleteNote(item)}} onPinNote={() => {updateIsPinned(item)}} />
                        
                    ))}
                    
                    
                       
                </div>:
                <EmptyCard imgSrc={addNotesImg} message={`Start craeting you note! click the 'Add' button to jot down your thoughts, ideas, and reminders. Let's get started!`} />
                }
                </div>
            </div>

            <button className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-800 absolute right-10 bottom-10" onClick={() => {
                setOpenAddEditModal({
                    isShown: true,
                    type: "add",
                    data: null
                })
            }}>
                <MdAdd className="text-[32px] text-white" />
            </button>

            <Modal isOpen={openAddEditModal.isShown}
                onRequestClose={() => { }}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0,0,0,0.2)",
                    },
                }}
                contentLabel=""
                className="w-[95%] md:w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 "
            >
                <AddEditNote type={openAddEditModal.type} noteData={openAddEditModal.data} onClose={() => {
                    setOpenAddEditModal({ isShown: false, type: "add", data: null })
                }}
                getAllNotes= {getAllNotes}
                showToastMessage={showToastMessage}
                 />
            </Modal>
            <ToastMessage
                isShown={showToastMsg.isShown}
                message={showToastMsg.message}
                type ={showToastMsg.type}
                onClose={handleCloseToast}
             />
        </>
    )
}

export default Home