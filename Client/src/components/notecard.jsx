import {MdOutlinePushPin} from 'react-icons/md'
import { MdCreate ,MdDelete } from 'react-icons/md'
import moment from 'moment'

const NoteCard = ({ title, date, content, tags, isPinned, onEdit, onDelete, onPinNote }) => {
    return (
        <div className='border rounded p-4 bg-white/50 hover:shadow-xl transition-all ease-in-out'>
            <div className="flex items-center justify-between">
                <div>
                    <h6 className="text-sm font-medium">{title}</h6>
                    <span className="text-xs text-gray">{moment(date).format("Do MMM YYYYY")}</span>
                </div>
                <MdOutlinePushPin className={`icon-btn ${isPinned ? 'text-primary':'text-gray'} `} onClick ={onPinNote} />
            </div>
            <p className="text-xs text-gray mt-2">{content?.slice(0,60)}</p>

            <div className='flex items-center justify-between mt-2'>
                <div className='text-xs text-gray'>
                    {tags.map((item)=>`#${item} `)}
                </div>

                <div className='flex items-center gap-2'>
                    <MdCreate className='icon-btn hover:text-[#00F700]' onClick={onEdit}/>
                    <MdDelete className='icon-btn hover:text-red' onClick={onDelete}/>
                </div>
            </div>
        </div>
    )
}

export default NoteCard