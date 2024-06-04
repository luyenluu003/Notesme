import { useNavigate } from "react-router-dom"
import { getInitials } from "../utils/helper"

const ProfileInfo = ({userInfo, onLogout }) => {
    const navigate = useNavigate()

    const handleLogin = () =>{
      navigate("/login")
    }
    return (
        userInfo ? (
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 flex items-center justify-center rounded-full text-black font-medium bg-grey">
                {getInitials(userInfo.fullName)}
              </div>
              <div>
                <p className="text-sm font-medium">{userInfo.fullName}</p>
                <button className="text-sm text-gray-dark underline" onClick={onLogout}>
                  Logout
                </button>
              </div>
            </div>
          ) : <button className="text-sm text-blue-gwen underline" onClick={handleLogin()}>
            login
            </button>
    )
}

export default ProfileInfo